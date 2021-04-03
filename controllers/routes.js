const Agendamento = require('../models/Agendamento')

module.exports = app => {
    app.get('/agendamentos', (req, res) => {
        Agendamento.listagem(res)
    })

    app.get('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Agendamento.buscaPorID(id, res)
    })

    app.patch('/agendamentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Agendamento.alterar(id, req.body, res)
    })

    app.delete('/agendamentos/:id', (req, res) => {
        const id = req.params.id
        Agendamento.remover(id, res)
    })

    app.post('/agendar', (req, res) => {
        const agendamento = req.body
        
        Agendamento.inserir(agendamento, res)
    })
}
