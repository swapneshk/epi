angular.module("app").controller("EditEmployeeController", function($scope, SessionService, $http, $routeParams, fileUpload, $location, $filter) {

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
   
    // Current Session User Role
    $scope.userrole = SessionService.currentUser.roles[0];
    if ($scope.userrole === "admin") {
        $scope.activate = true;
    }
    else {
        $scope.activate = false;
    }
    console.clear();
    console.log($scope.userrole);
    $scope.employee = {};
    $scope.id = $routeParams.id;
    $scope.is_active_yes = '';
    $scope.is_active_no = '';
    $scope.siteurl = $location.absUrl().split(":8000/")[0];
    
    // Get Employee Info
    $http.get('/api/users/' + $scope.id).
    success(function(response) {
      //console.log("--EDIT EMPLOYEE--");
      //console.log(response);
      console.clear();
      //console.log(response.date_of_birth);
      if (response.date_of_birth !== undefined ) {
        response.date_of_birth = $filter('date')(response.date_of_birth, 'MM/dd/yyyy');
      }
      $scope.employee = response;
      
      console.log($scope.employee.active);
      if( true == $scope.employee.active ) {
        $scope.is_active_yes = true;
        $scope.is_active_no = false;
      }
      else {
        $scope.is_active_yes = false;
        $scope.is_active_no = true;
      }
    });
    
    $scope.updateEmployee = function(employee) {
        console.log(employee);
        
        // Code for Image handling - START
        if ($scope.myFile) {
            console.log("In IF");
            var file = $scope.myFile;
            var chkData = "";
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "/api/fileUpload";
            //fileUpload.uploadFileToUrl(file, uploadUrl);

            fileUpload.uploadFileToUrl(file, uploadUrl, function(retData){
                if ( true === retData.success ) {
                    // Save Image name to DataBase
                    employee.prof_image = retData.save_image_name;
                    if (employee.date_of_birth != "") {
                        jsDate = new Date(employee.date_of_birth);
                    }
                    employee.date_of_birth = jsDate;
                    employee.created_by = SessionService.currentUser._id;
                    employee.roles = ["employee"];
                    //employee.active = true;
                    //employee.password = "password";
                    //employee.password_change = false;
                    console.log(employee);
                    $http.put("/api/users/"+$routeParams.id, employee).then(function(response){
                        if (response.data) {
                            if (response.data.data.date_of_birth !== undefined ) {
                                $scope.employee.date_of_birth = $filter('date')(response.data.data.date_of_birth, 'MM/dd/yyyy');
                            }    
                            toastr.success("Employee information updated successfully.");
                            $scope.employeeForm.$setPristine();
                        }
                    });
                }
                else
                    console.log("Failure");
            });
        }
        else {
            console.log("IN ELSE");
            //employee.prof_image = retData.save_image_name;
            if (employee.date_of_birth != "") {
                jsDate = new Date(employee.date_of_birth);
            }
            employee.date_of_birth = jsDate;
            employee.created_by = SessionService.currentUser._id;
            employee.roles = ["employee"];
            //employee.active = true;
            employee.password = "password";
            //employee.password_change = false;
            console.log(employee);
            $http.put("/api/users/"+$routeParams.id, employee).then(function(response){
                if (response.data) {
                    if (response.data.data.date_of_birth !== undefined ) {
                      $scope.employee.date_of_birth = $filter('date')(response.data.data.date_of_birth, 'MM/dd/yyyy');
                    }
                    toastr.success("Employee information updated successfully.");
                    $scope.employeeForm.$setPristine();
                }
            });
        }
        // Code for Image handling - END
        

    };
});