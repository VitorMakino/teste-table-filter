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
			  },
			  {
				name: "Expiration Date",
				property:'expdt',
				type: 'date'
			  }
			  ];									
		  $scope.sushi = [
			{ name: 'Cali Roll', fish: 'Crab', tastiness: 2, price: 1, expdt: new Date(2015, 7, 7)  },
			{ name: 'Philly', fish: 'Tuna', tastiness: 4, price: 2, expdt: new Date(2015, 7, 12)  },
			{ name: 'Tiger', fish: 'Eel', tastiness: 7, price: 3, expdt: new Date(2015, 7, 15) },
			{ name: 'Rainbow', fish: 'Variety', tastiness: 6, price: 4, expdt: new Date() }
		  ]; 
	} ]);
