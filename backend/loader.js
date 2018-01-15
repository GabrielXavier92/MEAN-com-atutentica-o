//tudo que esta definido no module.exports de cada arquivo
//esta sendo retornado aqui

//como no arquivo server.js eu exportei a variavel server,
//eu posso utiliza-la aqui para usar em outros arquivos
const server = require('./config/server.js')
require('./config/database.js')

//nesse caso o module.exports era uma funcao que precisava de um parametro
require('./config/routes')(server)