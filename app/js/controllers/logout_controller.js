angular.module("app").controller("LogoutController", function($scope, NotificationService, SessionService, $location, $window) {

  $scope.logout = function() {
    SessionService.unset("user");
    //$window.location.href = "/login";
    NotificationService.notify("Logged out successfully", "success");
      $location.path('/login');
  };

});