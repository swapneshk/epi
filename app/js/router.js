angular.module("app").config(function($routeProvider, $locationProvider, $httpProvider) {
  
  var interceptor = function($rootScope, $q) {

    function success(response) {
      return response;
    }

    function error(response) {
      if (!response.headers("authenticated user")) {
        var deferred = $q.defer();
        $rootScope.$broadcast('event:auth-loginRequired', response);
        return deferred.promise;
      }
      // otherwise, default behaviour
      return $q.reject(response);
    }

    return function(promise) {
      return promise.then(success, error);
    };
  };
  $httpProvider.responseInterceptors.push(interceptor);
  
  var routeRoleChecks = {
    admin: {
        auth: function(AuthenticationService) {
          return AuthenticationService.authorizeCurrentUserForRoute("admin");
        }
      },
    manager: {
        auth: function(AuthenticationService) {
          return AuthenticationService.authorizeCurrentUserForRoute("manager");
        }
      },
    user: {
        auth: function(AuthenticationService) {
          return AuthenticationService.authorizeAuthenticatedUserForRoute();
        }
      }
  };

  $routeProvider
    .when("/login", {
      template: JST["app/templates/login"],
      controller: "LoginController",
    })
    .when("/editpassword", {
      template: JST["app/templates/editpassword"],
      controller: "PasswordController",
      resolve: routeRoleChecks.user
    })
    .when("/dashboard", {
      template: JST["app/templates/dashboard"],
      controller: "DashboardController",
      resolve: routeRoleChecks.user
    })
    .when("/users", {
      template: JST["app/templates/users/list"],
      controller: "UserListController",
      resolve: routeRoleChecks.admin
    })
    .when("/users/:id", {
      template: JST["app/templates/users/profile"],
      controller: "UserController",
      resolve: routeRoleChecks.user
    })
    .when("/users/:id/edit", {
      template: JST["app/templates/users/form"],
      controller: "UserController",
      resolve: routeRoleChecks.user
    })
    .when("/forgetpassword", {
      template: JST["app/templates/forgetpassword"],
      controller: "ForgetController"
    }).
    when("/adminprofile", {
      template: JST["app/templates/admins/adminprofile"],
      controller: "AdminProfileController"
    }).
    when("/viewadminprofile", {
      template: JST["app/templates/admins/viewadminprofile"],
      controller: "ViewAdminProfileController",
      resolve: routeRoleChecks.admin
    }).
    when("/viewadminemployee", {
      template: JST["app/templates/admins/viewadminemployee"],
      controller: "ViewAdminEmployeeController",
      resolve: routeRoleChecks.admin
    }).
    when("/viewadminclient", {
      template: JST["app/templates/admins/viewadminclient"],
      controller: "ViewAdminClientController",
      resolve: routeRoleChecks.admin
    }).
    when("/viewmanageremployee", {
      template: JST["app/templates/managers/viewmanageremployee"],
      controller: "ViewManagerEmployeeController"
    }).
    when("/viewmanagerclient", {
      template: JST["app/templates/managers/viewmanagerclient"],
      controller: "ViewManagerClientController",
      resolve: routeRoleChecks.manager
    }).     
    when("/viewmanagerprofile", {
      template: JST["app/templates/managers/viewmanagerprofile"],
      controller: "ViewManagerProfileController"
    }).
    when("/viewemployeeprofile", {
      template: JST["app/templates/employees/viewemployeeprofile"],
      controller: "ViewEmployeeProfileController"
    }).
    when("/managerprofile", {
          template: JST["app/templates/managers/managerprofile"],
          controller: "ManagerProfileController"
    }).
    when("/addemployee", {
          template: JST["app/templates/addemployee"],
          controller: "AddEmployeeController"
    }).
    when("/addclient", {
          template: JST["app/templates/addclient"],
          controller: "AddClientController"
    }).
    when("/addevent", {
          template: JST["app/templates/addevent"],
          controller: "AddEventController"
    }).
    when("/eventlist", {
          template: JST["app/templates/eventlist"],
          controller: "ViewEventController"
    }).
    when("/employeeprofile", {
          template: JST["app/templates/employees/employeeprofile"],
          controller: "EmployeeProfileController"
    }).
    when("/viewschedule", {
          template: JST["app/templates/viewschedule"],
          controller: "ScheduleController"
    }).    
    when("/employee/edit/:id", {
          template: JST["app/templates/editemployee"],
          controller: "EditEmployeeController"
    }).
    when("/employee/availibility/:id", {
          template: JST["app/templates/view_employee_availability"],
          controller: "EmployeeAvailabilityController"
    }).
    when("/event/edit/:id", {
          template: JST["app/templates/editevent"],
          controller: "EditEventController"
    }).
    when("/client/:id", {
          template: JST["app/templates/editclient"],
          controller: "EditClientController"
    }).
    when("/clientinfo/:id", {
          template: JST["app/templates/viewclientinfo"],
          controller: "ShowClientController"
    }).
    when("/timeslot", {
          template: JST["app/templates/admins/timeslot"],
          controller: "TimeSlotController"
    }).
    when("/myavailability", {
          template: JST["app/templates/employees/myavailability"],
          controller: "MyavailabilityController"
    })
    .otherwise({ redirectTo: function() {
        window.location = "/login";
      }
    });
    
    $locationProvider.html5Mode(true);
});

angular.module("app").run(function($rootScope, $location, NotificationService) {
  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    if (rejection === "Not Authorized") {
      NotificationService.notify("You are not authorized to view the content.");
      //$location.path("/login");
      window.location = "/login";
    }
  });
});

