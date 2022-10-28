const { mongoose } = require("mongoose")


const dbConnection = async()=>{
    try {
        
        await mongoose.connect('mongodb+srv://electronica:KbjHx7PBwVV9rbH5@cluster0.xmddsgo.mongodb.net/dbElectronica');
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}
module.exports = {
    dbConnection
}