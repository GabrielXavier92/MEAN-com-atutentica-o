const express = require('express')
const auth = require('./auth')

//chama uma funcao que passa uma informacao para outro modulo
module.exports = function(server){

    //Rotas Abertas, sem necessidade de token
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    //Rotas protegidas por Token jwt
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    //nesse ponto rodamos o metodo auth criado, caso ele seja valido as outras rotas serao liberadas
    protectedApi.use(auth)

    //mapeando usando a api node-restful
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    //mapeando usando a api do express
    const billingSumaryService = require('../api/billingSummary/billingSummaryService')
    protectedApi.route('/billingSumary').get(billingSumaryService.getSummary)
    //billingSumaryService.register(protectedApi, '/billingSumary')

}