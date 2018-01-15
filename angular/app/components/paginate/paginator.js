(function(){
angular.module('primeiraApp').component('paginator', {
   bindings: {
      url: '@',
      pages: '@',
   },
   controller: [
      '$location',
      function($location){

         this.$onInit = function(){
            //transforma o valor passado em pages para um inteiro
            //caso nao venha nada ele atribui 1
            const pages = parseInt(this.pages) || 1
            this.pagesArray = Array(pages).fill(0).map((e,i) => i + 1)
            this.current = parseInt($location.search().page) || 1
            this.needPagination = true
            this.hasPrev = this.current > 1
            this.hasNext = this.current < this.pages
         }


         this.isCurrent = function(i){
            return this.current == i
         }

         console.log(this)
         
         
      }
   ],
   template:
   `
   <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
      <li ng-if="$ctrl.hasPrev">
         <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1 }}">&laquo;<a/>
      </li>
      <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
         <a href="{{ $ctrl.url }}?page={{index}}">{{index}}</a>
      </li>
      <li ng-if="$ctrl.hasNext">
         <a href="{{ $ctrl.url }}?page={{ $ctrl.current +1 }}">&raquo;</a>
      </li>
   </ul>
   `

})
})()

/*
<li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
         <a href="{{ $ctrl.url }}?page={{index}}">{{index}}</a>
      </li>
*/