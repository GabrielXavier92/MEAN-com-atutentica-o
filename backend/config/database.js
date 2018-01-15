const mongoose = require('mongoose')
module.exports = mongoose.connect("mongodb://localhost/db_finance")

//Qualquer erro que tenha a propriedade required ira emitir esse erro
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio"
mongoose.Error.messages.Number.min = "O valor: '{VALUE}' informado é menor do que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O valor: '{VALUE}' informado é maior do que o limite minimo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'."