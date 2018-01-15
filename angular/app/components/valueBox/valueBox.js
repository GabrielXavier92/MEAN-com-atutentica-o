//padrao de criacao de componentes do anguarJS
angular.module('primeiraApp').component('valueBox',{
   bindings: {
      grid: '@',
      background: '@',
      valor: '@',
      texto: '@',
      icone: '@'
   },
   controller: [     
      'gridSystem',
      function(gridSystem){
        //o metodo onInit é um controle de ciclo de vida do angularJS
        //nesse caso ele só chama a funcao depois de todos os atributos do component
        //terem sido carregados
        this.$onInit = function () {                  
          this.class = gridSystem.toCssClass(this.grid)           
        }       
      }

   ],
   template: 
   /*A classe col-xs-4 faz a div ocupar 1/3 da tela
     Segundo o bootstrap a tela é dividida em 4 partes
     e nesse caso estamos utilizando 4 partes dela.
     O termo xs faz com que seja ocupado 4 partes da tela
     independente do tamanho da tela, exe celular
   */
   `<div class="{{ $ctrl.class }}">
      <div class="small-box {{ $ctrl.background }}">
         <div class="inner">
           <h3>R$ {{ $ctrl.valor }}</h3>
           <p>{{ $ctrl.texto }}</p>
         </div>
         <div class="icon">
           <i class="{{ $ctrl.icone }}"></i>
         </div>
      </div>
   </div>
   `

})