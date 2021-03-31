const configExpress = require('./config/configExpress')
const conexao = require('./infra/conexao')

const app = configExpress()
const port = 3000

conexao.connect(error => {
    if(error) {
        throw error;
    }

    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
})


