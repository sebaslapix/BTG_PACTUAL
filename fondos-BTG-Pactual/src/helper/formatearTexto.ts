function capitalizeWords(texto: string) {
    return texto
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function formatoFecha(fecha: Date) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0, por eso se suma 1
    const anio = fecha.getFullYear();
    const formatoFecha = `${dia}/${mes}/${anio}`;
    return formatoFecha
}

export {
    capitalizeWords,
    formatoFecha
}