	angular.module('searchTableApp',['ui.bootstrap','searchTable'])
	.controller('mainController',[ '$scope', function($scope) {	
        $scope.columns = [{
				name: "Sushi Roll",
				property:'name'
			  },{
				name: "Fish Type",
				property:'fish'
			  },{
				name: "Taste Level",
				property:'tastiness'
			  },{
				name: "Price",
				property:'price'
			  }];									
		  $scope.sushi = [
			{ name: 'Cali Roll', fish: 'Crab', tastiness: 2, price: 1 },
			{ name: 'Philly', fish: 'Tuna', tastiness: 4, price: 2 },
			{ name: 'Tiger', fish: 'Eel', tastiness: 7, price: 3 },
			{ name: 'Rainbow', fish: 'Variety', tastiness: 6, price: 4 }
		  ]; 
	} ]);
