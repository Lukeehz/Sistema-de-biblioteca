const {Sequelize} = require ("sequelize")
const sequelize = new Sequelize ('PersonalLib', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log("Conectado ao sequelize")
}
catch(err){
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize