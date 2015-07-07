
var Operator = function() {
  this.operation = "";
};
 
Operator.prototype = {
    setStrategy: function(operator) {
		this.operation = operator;
    },
 
    operate: function(value,type,search) {
        return this.operation.operate(value,type,search);
    }
};

var EqualsOperator = function() {
    this.name = 'equals';
    this.operate = function(value,type,search) {
        return value && search && value == search;
    }
};

var LikeOperator = function() {
    this.name = 'like';
    this.operate = function(value,type,search) {
        return (""+value).indexOf(search) > -1;
    }
};

var GreaterThanOperator = function() {
    this.name = 'greater than';
    this.operate = function(value,type,search) {
        return value > search;
    }
};

var LessThanOperator = function() {
    this.name = 'less than';
    this.operate = function(value,type,search) {
        return value < search;
    }
};
 
 angular.module('searchTable',['ui.bootstrap'])
     .directive('tableFilter',['$location',function() {
       return {
         templateUrl:'directives/table-data/table-filter.html',
         restrict: 'E',
		 controller : function($scope) {
		    $scope.filters = [{}];
		    $scope.newFilter = {};
		    $scope.operators = [ new EqualsOperator(),new LikeOperator(),new GreaterThanOperator(),new LessThanOperator()];
            
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
	   this.operate = function(value,operator,type,searchValue) {
	     operatorStrategy.setStrategy(operator);
		 return operatorStrategy.operate(value,type,searchValue);
	   }
	   
       angular.forEach(input, function(row) {
	     output.push(row);
		 for(i = 0; i < query.length; i++) { 
		   var filtro = query[i];	 
			if(angular.isDefined(filtro.column) &&
		       angular.isDefined(filtro.column.property) &&
               angular.isDefined(filtro.operator) &&
               angular.isDefined(filtro.value) &&
			   !operate(row[filtro.column.property]
			           ,filtro.operator
					   ,filtro.column.type
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
