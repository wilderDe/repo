

const validarClientes = (datos="")=>{
    
    for(const propiedad in datos){
        let armandoPalabra = ""
        datos[propiedad] = datos[propiedad].toUpperCase();
        const separar = datos[propiedad].split(" ")

        for(let i=0; i<separar.length;i++){   
            if(separar[i] !== ""){
                armandoPalabra = armandoPalabra + separar[i]+" ";
            }
        }
        datos[propiedad] = armandoPalabra.trim();
    }

    return datos;
}

module.exports = {
    validarClientes
}