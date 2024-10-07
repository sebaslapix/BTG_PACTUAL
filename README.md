# BTG_PACTUAL
plataforma mediante la cual un cliente pueda manejar los fondos a los que está o le gustaría estar inscrito y no tenga que contactarse siempre con su comercial.

## Instalación

Guía detallada sobre cómo instalar y configurar el proyecto en un entorno local.

### Requisitos previos

- Tener instalado node en el sistema operativo
- Tener instalado la ultima versión de python y pip

## Clonamos el repositorio
Abrimos una terminal y nos ubicamos donde deseamos tener nuestro proyecto

#HTTPS
git clone https://github.com/sebaslapix/BTG_PACTUAL.git
#SSH
git clone git@github.com:sebaslapix/BTG_PACTUAL.git

### Backend
Entramos a la carpeta del back. Para ello usamos el comando:

cd fondos-BTG-Pactual

Necesitamos crear un entorno para python, para ello ejecutamos el siguiente comando:

python3 -m venv .venv

Luego lo activamos

source .venv/bin/activate

Instalamos dependencias

pip3 install -r requirements.txt

Necesitamos configurar las variables de entorno, para ello primero instalamos lo siguiente:

pip install python-dotenv fastapi

MAIL_USERNAME=

MAIL_PASSWORD=

MAIL_FROM=    

MAIL_PORT=

MAIL_SERVER=

MAIL_FROM_NAME=

ACCOUNT_SID = 

AUTH_TOKEN = 

TWILIO_PHONE_NUMBER = 

account_sid = 

auth_token = 

messaging_service_sid=

Por último, podemos ejecutar la aplicación:

uvicorn app:app --reload

En el navegador, entrar a: http://localhost:8000/docs para hacer pruebas

### FrontEnd

En una terminal nueva, vamos a la carpeta del proyecto clonado.

Entramos a la carpeta del front e instalamos las dependencias

cd fondos-BTG-Pactual

npm install


Se está usando una variable de entorno para la api del servidor, por lo que en la raíz del proyecto, deberá crear el archivo .env y configurar la siguiente variable de entorno: VITE_APP_API_URL=su_api


Usamos el comando npm run dev para ejecutar el proyecto