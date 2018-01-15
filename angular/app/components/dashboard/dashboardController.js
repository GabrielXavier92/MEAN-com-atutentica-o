(function (){
   angular.module('primeiraApp').controller('DashboardCtrl', [
      '$http',
      DashBoardController
   ])
   
   function DashBoardController($http){
      
      const vm = this

      vm.getSumary = function(){
         const url = 'http://localhost:3003/api/billingSumary'
         $http.get(url).then(function(response){
            const {credits = 0, debits = 0} = response.data
            vm.credito = credits
            vm.debito = debits
            vm.total = credits - debits           
         })
      }      
      vm.getSumary()     
   }
})()

