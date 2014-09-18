angular.module("app").controller("EmployeeAvailabilityController", function($scope, SessionService, $http, $routeParams) {
    
    
    $(document).ready(function(){
        var today = new Date();
        var now = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        $(".datepicker").datepicker()
        .on('changeDate', function(ev){
            if (ev.date.valueOf() > now.valueOf()) {
                
            }
        })
    });
    

});