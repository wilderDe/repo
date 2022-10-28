const { request, response } = require("express");
const { validarClientes } = require("../helpers/validar-Clientes");
const Tienda = require("../models/tienda");


//revizar su funcion
const tiendaGet = async(req=request, res=response) =>{
    const tienda  = await Tienda.find({estado:true});
    res.json(tienda)
}
const tiendaGetCliente = async(req,res)=>{
    const {id} = req.params;
    const cliente = await Tienda.findById({_id:id});
    if(cliente){
        res.json(cliente)
    }else{
        res.json({msj: 'no existe cliente'})
    }
}

const tiendaPost = async(req, res )=>{
    const datos = validarClientes(req.body);
    const tienda = new Tienda(datos);
    const nuevo = await tienda.save();
    res.json(nuevo)

}
const tiendaDelete = async(req, res)=>{
    const {id} = req.params;
    await Tienda.findByIdAndUpdate(id,{estado:false});
    const cliente = await Tienda.findById(id);
    res.json(cliente)
}

const tiendaPut = async(req, res) =>{
    const {id} = req.params;
    const datos = req.body
    for(const propiedad in datos){
        datos[propiedad] = datos[propiedad].toUpperCase();
    }
    const validar = await Tienda.findById(id);
    if(id == validar.id){
        await Tienda.findByIdAndUpdate(id,datos);
        const modificado = await Tienda.findById(id);
        res.json(modificado)
    }else{
        res.json('paso algo')
    }
}
//****************************************************************************** */
const tiendaBusquedaGet = async(req, res) =>{
    const {termino} = req.params;
    const regex = new RegExp(termino.toUpperCase(),'i');
    const tienda = await Tienda.find({estado:true,
        $or:[{cliente:regex}]
    })
    res.json(tienda)

}
const totalesGet = async(req,res)=>{
    const nombres =[];
    const restantes = [];
    const data = await Tienda.find({estado:true})
    const conta = await Tienda.find({estado:true}).count();
    data.map(cli =>{
        nombres.push(cli.cliente)
    })  
    restantes.push(nombres[0]);

    for (let i = 0; i < nombres.length; i++) {
       if(!restantes.includes(nombres[i])){
            restantes.push(nombres[i])
       }
    }

    res.json({
        total:restantes.length,
        conta
    })
}

const InformeTecnico = async(req, res) =>{
    const {nombre, start , end } = req.params;

    const regex = new RegExp(nombre.toUpperCase(),'i');
    const tienda = await Tienda.find({estado:true,
        $or:[{tecnico:regex}]
    })
    const fechaStart = new Date(start);
    const fechaEnd = new Date(end);

    const results =  tienda.map(value => {
        const armandoFecha = new Date(value.start);
        if(armandoFecha >= fechaStart && armandoFecha <= fechaEnd){
            return value;
        }      
    }).filter(notUndefined => notUndefined !== undefined);
    res.json(results)

} 
module.exports = {
    //crud de un cliente
    tiendaGet,
    tiendaGetCliente,
    tiendaPost,
    tiendaPut,
    tiendaDelete,

    //extras de la seccion cliente
    totalesGet,
    tiendaBusquedaGet,
    InformeTecnico

}