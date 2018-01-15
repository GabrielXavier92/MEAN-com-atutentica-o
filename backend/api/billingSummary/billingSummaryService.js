//Implementacao de uma rota de maneira mais manual
//Poderia ter sido utilizado o node-restfull como usado para fazer o crud de pagamentos
//mas é uma segunda forma de implementacao
const _ = require('lodash')

const BillingCycle = require('../billingCyle/billingCycle')

function getSummary(req, res){
    //operacao de fluxo de agregacao
    BillingCycle.aggregate(
        [//utiliza o metodo project do mongo para extrair apenas algumas informacoes do objeto
        //nesse caso iremos extrair os valores de debitos e creditos para calcular o total  
        {
            $project:{ 
                credit: {$sum: "$credits.value"},
                debit: {$sum: "$debits.value"}
            }
        },
        //segundo metodo de agregacao group
        //ele ira utilizar os valores de credit e debit do project e agrupar de acordo com um parametro  
        {
            $group: {
                _id: null,
                credits:{ $sum: "$credit" },
                debits: { $sum: "$debit" }
            }  
        },
        //mais um project para eliminar o atributo id, pegue apenas os creditos e debitos que contem alguma coisa, true ou 1
        //e ignore o id, false ou 0
        {
            $project:{
                _id: 0,
                credits: 1,
                debits: 1
            }
        }],

        function(error, result){
            if(error){
                res.status(500).json({ errors: [error]})
            }else{
                //chama a funcao defaults do lodash
                //se no objeto result[0] nao houver valor de credito ou debito,
                //é colocado o valor 0 no que estiver faltando
                //se result[0] for null ou undefined ele tambem retorna 0 para credito e debito
                res.json(_.defaults(result[0],{credits:0, debits: 0}))
            }
        }

    )
}

module.exports = { getSummary }