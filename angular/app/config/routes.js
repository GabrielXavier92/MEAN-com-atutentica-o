//array com 3 elementos, 2 strings e uma funcao
//padrao angularJS para fazer injecao de dependencias

angular.module('primeiraApp').config([
    //objetos dentro do UI router
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider){

        $stateProvider.state('dashboard',{
            url: "/dashboard",
            templateUrl: "components/dashboard/dashboard.html"
        })
        .state('billingCycle',{
            url: "/billingCycle?page",
            templateUrl: "components/billingCycle/tab.html"
        }) 

        //sempre que após uma requisição for retornado uma mensagem de erro é chamado
        //a factory handleResponseError
        $httpProvider.interceptors.push('handleResponseError')
    }
])
.run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function($rootScope, $http, $location, $window, auth){
        validateUser()
        $rootScope.$on('$locationChangeStart', () => validateUser())

        function validateUser(){
            const user = auth.getUser()
            const authPage = '/auth.html'
            const isAuthPage = $window.location.href.includes(authPage)

            if(!user && !isAuthPage){
                //se nao existe usuario e nao esta na pagina de autenticacao entao redireciona
                //para a pagina de autenticacao
                $window.location.href = authPage
            } else if(user && !user.isValid){
                //se existe usuario e ele é valido, redireciona para a pagina inicial
                auth.validateToken(user.token, (err, valid) =>{
                    if(!valid){
                        $window.location.href = authPage
                    }else{
                        user.isValid = true
                        $http.defaults.headers.common.Authorization = user.token
                        isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                    }
                })
            }
        }
    }
])