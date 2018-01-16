const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

//expressoes regulares de validacao de email e senha
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) =>{
   const errors = []
   _.forIn(dbErrors.errors, error => errors.push(error.message))
   return res.status(4000).json({errors})
}

const login = (req, res) => {
   const email = req.body.email || ''
   const password = req.body.password || ''

   User.findOne({email}, (err, user)=>{
      if(err){
         return sendErrorsFromDB(res, err)
      }else if(user && bcrypt.compareSync(password, user.password)){
         const token = jwt.sign(user, env.authSecret, {
            //tempo que um token fica valido na aplicacao
            expiresIn: "1 day"
         })
         const { name, emai } = user
         res.json({ name, email, token})
      }
      else {
         return res.status(4000).send({ errors: ['Usuario/Senha inválidos']})
      }
   })
}

const validateToken = (req, res, next) => {
   const token = req.body.token || ''
   jwt.verify(token, env.authSecret, function(err, decoded){
      return res.status(200).send({valid: !err})
   })
}

const signup = (req, res, next) => {
   const name = req.body.name || ''
   const email = req.body.email || ''
   const password = req.body.password || ''
   const confirmPassword = req.body.confirm_password || ''

   if(!email.match(emailRegex)){
      return res.status(400).send({ errors: [
         'O email informado está invalido'
      ]})
   }

   if(!password.match(passwordRegex)){
      return res.status(400).send({errors: [
         "Senha precisa ter uma letra maiuscula, uma minuscula, um numero e um caracter especial"
      ]})
   }
   
   const salt = bcrypt.genSaltSync()
   const passwordHash = bcrypt.hashSync(password, salt)
   if(!bcrypt.compareSync(confirmPassword, passwordHash)){
      return res.status(400).send({errors: ["As senhas nao conferem"]})
   }

   User.findOne({email}, (err, user)=>{
      if(err){
         return sendErrorsFromDB(res, err)
      } else if(user){
         return res.status(400).send({errors: ["Email ja cadastrado"]})
      } else{
         const newUser = new User({ name, email, password: passwordHash})
         newUser.save(err=>{
            if(err){
               return sendErrorsFromDB(res, err)
            }else {
               login(req, res, next)
            }
         }) 
      }
   })
}

module.exports = { login, signup, validateToken }