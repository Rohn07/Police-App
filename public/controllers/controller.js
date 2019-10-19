var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/thieflist').success(function(response) {
    console.log("I got the data I requested");
    $scope.thieflist = response;
    $scope.thief = "";
  });
};

refresh();

$scope.addthief = function() {
  console.log($scope.thief);
  $http.post('/thieflist', $scope.thief).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/thieflist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/thieflist/' + id).success(function(response) {
    $scope.thief = response;
  });
};  

$scope.update = function() {
  console.log($scope.thief._id);
  $http.put('/thieflist/' + $scope.thief._id, $scope.thief).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.thief = "";
}

}]);