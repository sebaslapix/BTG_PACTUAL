from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from uuid import uuid4 as uuid
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from twilio.rest import Client
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Fondo(BaseModel):
    id: str
    nombre: str
    montoMinimo: int
    categoria: str
    suscrito: datetime = datetime.now()

class Transaccion(Fondo):
    accion: str

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_FROM=os.getenv('MAIL_FROM'),       
    MAIL_PORT=os.getenv('MAIL_PORT'),
    MAIL_SERVER=os.getenv('MAIL_SERVER'),
    MAIL_FROM_NAME=os.getenv('MAIL_FROM_NAME'),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)

class Notificacion(BaseModel):
    to: str
    mensaje: str

ACCOUNT_SID = os.getenv('ACCOUNT_SID')
AUTH_TOKEN = os.getenv('AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

client = Client(ACCOUNT_SID, AUTH_TOKEN)

fondos = [
    {
        "id": '1',
        "nombre": 'FPV_BTG_PACTUAL_RECAUDADORA',
        "montoMinimo": 75000,
        "categoria": 'FPV'
    },
    {
        "id": '2',
        "nombre": 'FPV_BTG_PACTUAL_ECOPETROL',
        "montoMinimo": 125000,
        "categoria": 'FPV'
    },
    {
        "id": '3',
        "nombre": 'DEUDAPRIVADA',
        "montoMinimo": 50000,
        "categoria": 'FIC'
    },
    {
        "id": '4',
        "nombre": 'FDO-ACCIONES',
        "montoMinimo": 250000,
        "categoria": 'FIC'
    },
    {
        "id": '5',
        "nombre": 'FPV_BTG_PACTUAL_DINAMICA',
        "montoMinimo": 100000,
        "categoria": 'FPV'
    }
]

fondosInscritos = []

transacciones = []

MONTO_INICIAL = 500000

@app.get('/monto_inicial')
def obtener_monto_inicial():
    return {"status": "success", "monto": MONTO_INICIAL}

@app.get('/fondos')
def obtener_fondos():
     try:
        return {"status": "success", "fondos": fondos}
     except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}

@app.get('/transacciones')
def obtener_transacciones():
    try:
        return {"status": "success", "fondos": transacciones}
    except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}

@app.get('/fondos-inscritos')
def obtener_fondos_inscritos():
    return {"status": "success", "fondos": fondosInscritos}

@app.post('/fondos-inscrito')
def guardar_fondos_inscritos(fondo: Fondo):
    print(fondo)
    try:
        fondo.id = str(uuid())
        fondosInscritos.append(fondo.model_dump())
        guardar_transaccion(fondo, 'Vinculación')
        return{"status": 'success', "fondos_inscritos": fondosInscritos}
    except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}

@app.delete('/fondos-inscrito/{fondo_id}')
def delete_fondos_inscritos(fondo_id: str):
    try:
        for index, fondoInscritos in enumerate(fondosInscritos):
            if fondoInscritos['id'] == fondo_id:
                fondo: Fondo = Fondo.model_validate(fondoInscritos)
                fondosInscritos.pop(index)
                guardar_transaccion(fondo, 'Cancelación')
                return{'status': 'success'}
        return{'status': 'error'}
    except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}

@app.post("/send-email")
async def enviar_email(email: Notificacion):
    message = MessageSchema(
        subject='Notificación de nueva inscripción a Fondo',
        recipients=[email.to],
        body=email.mensaje,
        subtype="plain"
    )

    fm = FastMail(conf)

    try:
        await fm.send_message(message)
        return {"status": "success", "message": "Correo enviado correctamente"}
    except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}
    
@app.post("/send-sms")
async def send_sms(sms: Notificacion):
    try:
        account_sid = os.getenv('account_sid')
        auth_token = os.getenv('auth_token')
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            messaging_service_sid=os.getenv('messaging_service_sid'),
            body=sms.mensaje,
            to='+57'+sms.to
        )
        print(message.sid)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": "No pudimos completar la acción"}

def guardar_transaccion(fondo: Fondo, accion: str):
    fondo.id = str(uuid())
    nueva_transaccion = {**fondo.model_dump(), 'accion': accion}
    print(nueva_transaccion)
    transacciones.append(nueva_transaccion)