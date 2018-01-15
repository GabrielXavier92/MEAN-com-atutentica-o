const express = require('express')

//chama uma funcao que passa uma informacao para outro modulo
module.exports = function(server){
    //API routes
    //utiliza o server importado para criar as rotas

    //declara um midlware e a primeira rota /api
    const router = express.Router()
    server.use('/api', router)

    //rotas da API

    router.get('/teste', function(req, res){
        res.send('Ola');
    })

    const billingCycleService = require('../api/billingCyle/billingCycleService')

    //utiliza o metodo registre do node-restfull para registrar uma rota
    billingCycleService.register(router, '/billingCycles')

    
    //como nesse caso nao utilizamos o node-restful temos que criar a rota completa e atribuir
    //quais verbos HTTP estarao disponivels na rota
    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    //toda vez que houver uma requisicao get em /api/billingSumary o metodo getSummary
    //sera chamado
    router.route('/billingSumary').get(billingSummaryService.getSummary)
}