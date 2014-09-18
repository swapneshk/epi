angular.module("app").controller("AddEmployeeController", function($scope, NotificationService, SessionService, $http, $location) {
    
        $(document).ready(function(){
            /****  Datepicker  ****/
            if ($('.datepicker').length && $.fn.datepicker) {
                $('.datepicker').each(function () {
                    var datepicker_inline = $(this).data('inline') ? $(this).data('inline') : false;
                    $(this).datepicker({
                        inline: datepicker_inline,
                        formatDate:'Y-m-d'
                    });
                });
            }
            
            /****  Datetimepicker  ****/
            if ($('.datetimepicker').length && $.fn.datetimepicker) {
                $('.datetimepicker').each(function () {
                    var datetimepicker_inline = $(this).data('inline') ? $(this).data('inline') : false;
                    $(this).datetimepicker({
                        inline: datetimepicker_inline,
                        formatDate:'Y-m-d'
                    });
                });
            }        
        });    
    
    
    $scope.user = SessionService.currentUser;
    $scope.empData = {};
    
    $scope.addEmployee = function(employee){
        if (employee.date_of_birth != "") {
            jsDate = new Date(employee.date_of_birth);
        }
        employee.date_of_birth = jsDate;
        employee.created_by = SessionService.currentUser._id;
        employee.roles = ["employee"];
        employee.active = true;
        employee.password = "password";
        employee.password_change = false;
        employee.created_date = new Date();
        console.log(employee);

        //Code to create new user(role employee)
        $http.post("/api/users", employee).then(function(response){
            if (response.data) {
                toastr.success("Employee added successfully.");
                $scope.employeeForm.$setPristine();
                $scope.employee = {};
                if ("admin" === SessionService.currentUser.roles[0]) {
                    $location.path("/viewadminemployee");
                }
                else if ("manager" === SessionService.currentUser.roles[0]) {
                    $location.path("/viewmanageremployee");
                }
                else {
                    $location.path("/login");
                }
            }
            else {                
                if (employee.date_of_birth != "") {
                    $scope.employee.date_of_birth = jsDate;
                }
                toastr.error("Something went wrong, check your credentials");
            }
        })
    };
    
    $scope.cleardata = function(){
        toastr.info("You cleared the data.");
        $scope.employeeForm.$setPristine();
        $scope.employee = {};
    };
});