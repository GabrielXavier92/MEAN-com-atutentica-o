const BillingCycle = require('./billingCycle')
const _ = require('lodash')

//usa o node-restful para criar os metodos HTTP
//facilita para implementar a API
//define todos os metodos HTTP que poderam ser usados na aplicacao
BillingCycle.methods(['get', 'post', 'put', 'delete'])

//sempre que der um update retorna o objeto novo
//faz as validacoes de max e min
BillingCycle.updateOptions({new: true, runValidators: true})

//metodo que interceptam os metodos HTTP antes ou depois de serem enviados
//para o servidor
//nesse caso é após o metodo post/put
BillingCycle.after('post', sendErrorOrNext).after('put', sendErrorOrNext)

function sendErrorOrNext(req, res, next){
    const bundle = res.locals.bundle
    
    if(bundle.errors){
        var erro = parseErrors(bundle.errors)
        res.status(500).json({erro})
    }else{
        next()
    }
}
//essa funcao pega o erro passado, e extrai somente a message dele
//utiliza o metodo forIn do lodash para fazer isso
function parseErrors(nodeErrors){
    const err = []
    _.forIn(nodeErrors, (error) => err.push(error.message))

    return err
}

//utiliza o metodo rounte para implementar um contador, utilizado na paginacao
//da aplicacao.
//Esse contador é do mongoose.
//Estamos utilizando funcoes do express junto com o mongoose
BillingCycle.route('count', function(req, res, next){
    //callback do mongo
    BillingCycle.count(function(error, value){
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }

    })
})
module.exports = BillingCycle