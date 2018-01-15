//padrao de criacao de factorys do anguarJS
angular.module('primeiraApp').factory('gridSystem', [function(){
    //essa funcao permite criar varios atributos de class
   //passando apenas os numeros de sejados para cada uma
   function toCssClass(numbers){
      //separa a string, se existir, usando o delimitador de espaco e coloca
      //em um array      
      const cols = numbers ? numbers.split(' ') : []
      let classes = ''

      if(cols[0]) classes += `col-xs-${cols[0]}`
      if(cols[1]) classes += ` col-sm-${cols[1]}`
      if(cols[2]) classes += ` col-md-${cols[2]}`
      if(cols[3]) classes += ` col-lg-${cols[3]}`

      return classes
   }

   return { toCssClass }
}])
  