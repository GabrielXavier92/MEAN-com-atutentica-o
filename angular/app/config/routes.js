//array com 3 elementos, 2 strings e uma funcao
//padrao angularJS para fazer injecao de dependencias

angular.module('primeiraApp').config([
    //objetos dentro do UI router
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $stateProvider.state('dashboard',{
            url: "/dashboard",
            templateUrl: "components/dashboard/dashboard.html"
        })
        .state('billingCycle',{
            url: "/billingCycle?page",
            templateUrl: "components/billingCycle/tab.html"
        }) 
        
        $urlRouterProvider.otherwise('/dashboard')
    }
])