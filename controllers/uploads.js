const path = require('path');
const fs = require('fs');
const Tienda = require("../models/tienda");
const { subirArchivo } = require('../helpers/subir-archivo');
const { request } = require('http');

const cloudinary = require('cloudinary').v2;
cloudinary.config("cloudinary://714164223768162:XXNGZidqGaxSBW43uhXTp782Rig@dbcbgt8go");

const actualizarImagen = async(req, res)=>{
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'tienda':
            modelo = await Tienda.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un cliente con el id ${id}`
                })
            }
            break;
        
        default:
            return res.status(400).json({msg: 'Se me olvido validar esto'})
    }
    //limpiamos las imagenes previas
    if(modelo.img){
        //borramos la img del servidor
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
}


const actualizarImagenCloudinary = async(req, res)=>{
    const {id,coleccion} = req.params;
    console.log(req.files)
    let modelo;

    switch(coleccion){
        case 'tienda':
            modelo = await Tienda.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un cliente con el id ${id}`
                })
            }
            break;
        
        default:
            return res.status(400).json({msg: 'Se me olvido validar esto'})
    }
    //limpiamos las imagenes previas
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id ] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    res.json(secure_url);
}


const mostrarImagen = async(req, res=response)=>{
    const {id,coleccion} = req.params;

    let modelo;
    switch(coleccion){
        case 'tienda':
            modelo = await Tienda.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        
        default:
            return res.status(400).json({msg:'Se me olvido validar esto'})
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    const placeholder = path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(placeholder);

}

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}
