
   angular.module('primeiraApp').constant('consts', {
      appName: 'MEAN - Primeira Aplicacao',
      version: '1.0',
      owner: 'Gabriel',
      year: '2017',
      site: 'http://google.com',
      apiUrl: 'http://localhost:3003/api',
      oapiUrl: 'http://localhost:3003/oapi',
      userKey:'_primeira_app_user'
   }).run(['$rootScope', 'consts', function($rootScope, consts){
      $rootScope.consts = consts
   }])
