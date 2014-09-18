angular.module("app").controller("DashboardController", function($scope, SessionService, $location) {
    //console.log(SessionService.currentUser);
    //$scope.testCtrl = SessionService.currentUser;
    //$scope.data = SessionService.currentUser;
	console.clear();
	console.log(SessionService.currentUser);
	$scope.siteurl = $location.absUrl().split(":8000/")[0];
	
	$scope.role = '';
	$scope.fullName = SessionService.currentUser.first_name + ' ' + SessionService.currentUser.last_name;
	$scope.userFullData = SessionService.currentUser;
	$scope.password_change = SessionService.currentUser.password_change;
	$scope.prof_image = SessionService.currentUser.prof_image || "test";
	
	$scope.user = SessionService.currentUser;
	
	$scope.pagetitle = function(pagetitle){
		$scope.title = pagetitle;
	};
	
	if(SessionService.currentUser.roles.indexOf('admin') > -1)
		$scope.role = 'admin';
	else if(SessionService.currentUser.roles.indexOf('manager') > -1)
		$scope.role = 'manager';
	else if(SessionService.currentUser.roles.indexOf('employee') > -1)
		$scope.role = 'employee';
		
		$scope.title = "Dashboard";
});
