var portfolio = angular.module('portfolio', ['portfolio.service']);

portfolio.controller('controller', function($scope, user, repos) {

    $scope.user={};
    
    function GetUserInfo() {
      var getUserData = user.getUserInfo();

      getUserData.then(function (user) {
         $scope.user = user.data;

      }, function () {
         alert('Error in getting user records');
      });
    }
          
    GetUserInfo();

    $scope.repos={};
    
    function GetAllRepos() {
      var getReposData = repos.getRepos();

      getReposData.then(function (repos) {
         $scope.repos = repos.data;

      }, function () {
         alert('Error in getting repos records');
      });
    }
          
    GetAllRepos();
    
});

angular.module('portfolio.service',['portfolio.config'])
  .service('user', function ($http, USER_URL, REPOS_URL) {
    this.getUserInfo = function () {
       return $http.get(USER_URL);
    };
 })
  .service('repos', function ($http, USER_URL, REPOS_URL) {
    this.getRepos = function () {
       return $http.get(REPOS_URL);
    };
 });
 

portfolio.filter('masonry', function() {
  return function (items, column, columns) {
    var filtered = [];
    var counter = 0;
    
    for (var i = 0; i < items.length; i++) {

      if (counter % columns == column) {
        filtered.push(items[i]);
      }
      
      counter++;
    }
    return filtered;
  };
});
