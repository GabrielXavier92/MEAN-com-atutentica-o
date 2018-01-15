(function(){
//padrao de criacao de componentes do anguarJS
angular.module('primeiraApp').component('meuInput', {
   bindings: {
      grid: "@",      
      label: "@",
      id: "@",
      placeholder: "@",
      type: "@",
      //a propriedade = faz com que oque seja alterado no componente seja refletido no controller
      //e vice versa, bind de duas direções.Nao prcisa de {{}} para ser usado no template
      model: "=",
      //a propriedade < é na direcao do parent para o component
      readonly: '<',
   },
   controller:[
      'gridSystem',
      function(gridSystem){
         //o metodo onInit é um controle de ciclo de vida do angularJS
        //nesse caso ele só chama a funcao depois de todos os atributos do component
        //terem sido carregados  
         this.$onInit = function(){
            this.gridClass = gridSystem.toCssClass(this.grid)
         }                
      }
   ],
   template: `
      <div class="{{ $ctrl.gridClass }}">
         <div class="form-group">
            <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
            <input id="{{ $ctrl.id }}" 
                   class="form-control" 
                   placeholder="{{ $ctrl.placeholder}}" 
                   type="{{ $ctrl.type }}"
                   ng-model="$ctrl.model"
                   ng-readonly="$ctrl.readonly" />
         </div>
      </div>

   `
})
})()
