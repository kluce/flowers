var routerApp = angular.module('flowerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/flowers');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/flowers',
            templateUrl: '/partials/flowers-home.html',
            controller: 'FlowerCtrl'
        })
        
        .state('addFlower', {
            url: '/add',
            templateUrl: '/partials/add-flower.html'    
        })

        .state('flower-view', {
            url: '/flower/:_id',
            templateUrl: '/partials/individual-flower.html',
            controller: 'FlowerViewCtrl'
        })
         .state('flower-create', {
        	url: '/flower/create', 
        	templateUrl: '/partials/create-flower.html',
        	controller: 'FlowerCreateCtrl'
        })
         
        .state('flower-update', {
        	url: '/flower/update/:_id', 
        	templateUrl: '/partials/update-flower.html',
        	controller: 'FlowerUpdateCtrl'
        })



        
});

routerApp.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });
}]);

 routerApp.directive('header', function(){
 	return {
 		restrict: 'AEC',
 		templateUrl: '/partials/header.html'
 	}
 });

 routerApp.directive('footer', function(){
 	return {
 		restrict: 'AEC',
 		templateUrl: '/partials/footer.html'
 	}
 });

 routerApp.directive('flowerForm', function(){
 	return {
 		restrict: 'AEC', 
 		templateUrl: '/partials/flower-form.html'
 	}
 });

 routerApp.directive('listItem', function(){
 	return {
 		restrict: 'AEC',
 		templateUrl: '/partials/list-item.html'
 	}
 });

 routerApp.directive('buttons', function(){
 	return {
 		restrict: 'AEC', 
 		templateUrl: '/partials/buttons.html'
 	}
 });

 routerApp.directive('singleView', function(){
 	return {
 		restrict: 'AEC',
 		templateUrl: '/partials/single-view.html'
 	}
 });

 routerApp.service('Flowers', function($http){
 	this.create = function(flower, cb) {
 		$http.post('/api/flowers', flower).then(function(data) {
 			return cb(null, data);
 		}, function(err) {
 			return cb(err, null);
 		});
 	};

 	this.getOne = function(_id, cb){
 		$http.get('/api/flowers/' + _id).then(function(data) {
 			return cb(null, data);
 		}, function(err) {
 			return cb(err, null);
 		});

 	};

 	this.getAll = function(cb){
 		$http.get('/api/flowers').then(function(data) {
 			return cb(null, data);
 		}, function(err) {
 			return cb(err, null);
 		});
 	};

 	this.update	 = function(_id, flower, cb){
 		$http.put('/api/flowers/' + _id, flower, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(data) {
 			return cb(null, data);
 		}, function(err) {
 			return cb(err, null);
 		});
 	};

    this.remove = function(_id, cb){
    	$http.delete('/api/flowers/' + _id).then(function(data) {
 			return cb(null, data);
 		}, function(err) {
 			return cb(err, null);
 		}); 
 	};   
 });

routerApp.controller('FlowerCtrl', function($scope, Flowers){
	Flowers.getAll(function(err, flowers) {
		$scope.flowers = flowers.data;
		console.log(flowers);
	})
})

routerApp.controller('FlowerViewCtrl', function($scope, Flowers, $stateParams){
	Flowers.getOne($stateParams._id, function(err, flower){
		$scope.flower = flower.data[0];
	})
})

routerApp.controller('FlowerUpdateCtrl', function($scope, Flowers, $stateParams, $location){
	Flowers.getOne($stateParams._id, function(err, flower){
		$scope.flower = flower.data[0];
	});

	$scope.submit = function( fl){
		console.log("Updated flower ", fl);
		Flowers.update($stateParams._id, fl, function(err, result) {
			$location.path('/flowers');
		})
	}

	$scope.remove = function(){
		Flowers.remove($stateParams._id, function(err, result){
			if (result.status === 200) $location.path('/flowers');
		})
	}
})

routerApp.controller('FlowerCreateCtrl', function($scope, Flowers, $location){
	$scope.flower = {name: " ", season: " ", meaning: " "}

	$scope.submit = function( fl){
		console.log("Updated flower ", fl);
		Flowers.create(fl, function(err, result) {
			$location.path('/flowers');
		})
	}

});



