const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '46194673@',
    database: 'agenda'
})

module.exports = conexao;