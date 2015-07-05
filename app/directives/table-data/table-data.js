   angular.module('searchTable',['ui.bootstrap'])
     .directive('tableFilter',['$location',function() {
       return {
         templateUrl:'directives/table-data/table-filter.html',
         restrict: 'E',
         //replace: true,
   	  controller : function($scope) {
   	    $scope.filters = [{}];
   		$scope.newFilter = {};
   		$scope.operators = ['equals','like','greater than','less than'];

    	$scope.addFilter = function() {
		    if($scope.isValid()) {
    		    $scope.filters.push($scope.newFilter);
    			$scope.newFilter = {};
			}
   		  }
   		  
   		  $scope.showRemoveButton = function() {
   		    return $scope.filters.length > 1;
   		  }
   		  
   		  $scope.removeFilter = function(index) {
   			$scope.filters.splice(index,1);
   		  }
   		  
   		  $scope.isValid = function() {
   		    var valid =  $scope.searchForm.$valid;
   		    return valid;
   		  }
         },
   	  scope: {
           columns: '=columns',
   		   filters: '=query'
         }
       }
     }])
    .filter('queryFilter', function() {
     return function(input, query) {
   
       var output = [];
	   var operatorStrategy = new Operator();
	   this.operate = function(value,operator,searchValue) {
	     operatorStrategy.setStrategy(operator);
		 return operatorStrategy.operate(value,searchValue);
	   }
	   
       angular.forEach(input, function(row) {
	     output.push(row);
		 for(i = 0; i < query.length; i++) { 
		   var filtro = query[i];	 
			if(angular.isDefined(filtro.name) &&
               angular.isDefined(filtro.operator) &&
               angular.isDefined(filtro.value) &&
			   !operate(row[filtro.name]
			           ,filtro.operator
					   ,filtro.value)) {
			    output.pop(row);
				break;
            }
		  }	   
       });

       return output;
   
     }
   })
  .directive('tableData',['$location',function() {
    return {
      templateUrl:'directives/table-data/table-data.html',
      restrict: 'E',
      //replace: true,
	  controller : function($scope) {	  
		  $scope.setOrderBy = function(column, sortReverse) {
		   $scope.sortType = column.property;
		   $scope.sortReverse = !sortReverse;			
		  }
		  
		  $scope.showOrderBy = function(column) {
		   return $scope.sortType == column.property;		
		  }
      },
	  scope: {
 	    columns: '=columns',
        data: '=data',
		query: "=?query"
      }
    }
  }])
  .directive('searchTableData',['$location',function() {
    return {
      templateUrl:'directives/table-data/search-table-data.html',
      restrict: 'E',
      transclude: true,
	  controller : function($scope) {	  
	    $scope.paramsFilter = {};
	    $scope.paramsFilter.query = $scope.query;
        $scope.paramsFilter.columns = $scope.columns;		
      },
	  scope: {
 	    columns: '=',
        data: '=',
		query: "="
      }
    }
  }])
  ;


  
var Operator = function() {
  this.operation = "";
};
 
Operator.prototype = {
    setStrategy: function(operator) {
	    if(operator == 'equals') {
		  this.operation = new EqualsOperator();
		} else if(operator == 'like') {
		  this.operation = new LikeOperator();
		} else if(operator == 'greater than') {
		  this.operation = new GreaterThanOperator();
		} else if(operator == 'less than') {
		  this.operation = new LessThanOperator();
		}
    },
 
    operate: function(value,search) {
        return this.operation.operate(value,search);
    }
};

var EqualsOperator = function() {
    this.operate = function(value,search) {
        return (""+value) == (""+search);
    }
};

var LikeOperator = function() {
    this.operate = function(value,search) {
        return (""+value).indexOf(search) > -1;
    }
};

var GreaterThanOperator = function() {
    this.operate = function(value,search) {
        return value > search;
    }
};

var LessThanOperator = function() {
    this.operate = function(value,search) {
        return value < search;
    }
};