//padrao de criacao de componentes do anguarJS
angular.module('primeiraApp').component('contentHeader', {
    
    //parametros do componente
    bindings: {
        titulo: '@',
        small: '@'      
    },
    //$ctrl. é padrao para acessar variaveis de controle
    template: `
        <section class="content-header">
            <h1>{{ $ctrl.titulo }} <small>{{ $ctrl.small }}</small></h1>
        </section>
    `
})