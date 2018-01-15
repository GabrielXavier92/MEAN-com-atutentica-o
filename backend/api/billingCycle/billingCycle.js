//facilita a exposicao da api usando o node-restful
const restful = require('node-restful')

const mongoose = restful.mongoose

//mapeamento dos ciclos de pagamentos

//informacoes de como sera armazenado o credito no mongo
const creditSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do Credito'] },
    value: { type: Number, min: 0, required: [true, 'Infome o VALOR do Credito'] },
})

//informacoes de como sera armazenado o debito no mongo
const debtSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do Debito'] },
    value: { type: Number, min: 0, required: [true, 'Informe o VALOR do Debito'] },
    status: { type: String, required: false, uppercase: true,
        //valores especificos dentro da propriedade status do schema
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
})

//ciclo de pagamento
const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do Ciclo de Pagametos'] },
    month: { type: Number, min: 1, max: 12, required: [true, 'Informe o MES do Ciclo de Pagamentos'] },
    year: { type: Number, min: 1970, max: 2100, required: [true, 'Informe o ANO do Cilco de Pagamentos'] },
    credits: [ creditSchema ],//define um array de creditos para o ciclo de pagamento
    debits: [ debtSchema ] //define um array de debitos para o ciclo de pagamento
})

module.exports = restful.model('BillingCycle', billingCycleSchema)

