const Peticion = async (url="", metodo="GET", datos={}) => {

    let options = {};

    if(metodo === "GET" || metodo === "DELETE"){
        options = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    if(metodo === "POST"){
        options = {
            method: metodo,
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export default Peticion;