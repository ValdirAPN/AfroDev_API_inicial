const conexao = require('../infra/conexao')
const moment = require('moment')

class Agendamento {
    alterar(id, valores, res) {
        const sql = `UPDATE agendamentos SET ? WHERE id = ?`

        if(valores.data_servico) {
            valores.data_servico = moment(valores.data_servico).format('YYYY-MM-DD')
        }

        conexao.query(sql, [valores, id], (error, results) => {
            if(error) {
                res.status(400).json(error)
            }

            res.status(201).json({...valores, id})
        })
    }

    remover(id, res) {
        const sql = `DELETE FROM agendamentos WHERE id = ${id}`

        conexao.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error)
            }

            res.status(201).json({
                mensagem: `Agendamento com id ${id} removido com sucesso!`
            })
        })
    }

    buscaPorID(id, res) {
        const sql = `SELECT * from agendamentos WHERE id = ${id}`

        conexao.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            }

            res.status(201).json(results)
        })
    }

    listagem(res) {
        const sql = 'SELECT * from agendamentos';

        conexao.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            }

            res.status(201).json(results)
        })
    }

    inserir(agendamento, res) {
        const sql = 'INSERT INTO agendamentos SET ?'
        
        const data_servico = moment(agendamento.data_servico).format('YYYY-MM-DD')
        const data_agendamento = moment().format('YYYY-MM-DD')
        const agendamentoComData = {...agendamento, data_agendamento, data_servico}

        const isDataValida = moment(agendamento.data_servico).isSameOrAfter(agendamento.data_agendamento)
        const isNomeClienteValido = agendamento.nome_cliente.length >= 3

        const validacoes = [
            {
                nome: "data_servico",
                valido: isDataValida,
                mensagem: "Data do agendamento deve ser igual ou superior a atual"
            },
            {
                nome: "nome_cliente",
                valido: isNomeClienteValido,
                mensagem: "O nome do cliente deve possuir ao menos 3 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        if (erros.length > 0) {
            res.status(400).json(erros)
        }

        conexao.query(sql, agendamentoComData, (error, results) => {
            if (error) {
                res.status(400).json(erros)
            }

            res.status(201).json({...agendamentoComData, id: results.insertId})
        })
    }
}

module.exports = new Agendamento