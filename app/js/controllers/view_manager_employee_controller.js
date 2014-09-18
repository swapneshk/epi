angular.module("app").controller("ViewManagerEmployeeController", function($scope, $location, SessionService, $http, $filter) {
    $scope.user = SessionService.currentUser;    
    $scope.siteurl = $location.absUrl().split(":8000/")[0];
    
    $(document).ready(function(){
        $("body").removeClass("events");
    });
    
    var orderBy = $filter('orderBy');
    
    // Get user listing
    $http.post("/api/getmanagerempl", {manager_id: SessionService.currentUser._id}).then(function(response){
        if (response.status == 200) {
            console.log(response.data.data);
            $scope.empData = response.data.data;
            setPagingData($scope.empData);         
        }
        else {
            console.log('400');
        }
    });
    
    $scope.reverse = false;
    $scope.order = function(predicate, reverse) {
      $scope.empData = orderBy($scope.empData, predicate, reverse);
    };

            /** Pagination Code START **/
            function setPagingData(datam){
                $scope.allData = {};
                $scope.perPage = 5;
                //$scope.allData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                $scope.allData = datam;
                $scope.offset = 0;
                $scope.navButtons = [];
                
                $scope.isPreviousDisabled = false;
                $scope.isNextDisabled = false;
        
                $scope.buildNavButtons = function () {
                    for (var i = 0, len = ($scope.allData.length / $scope.perPage); i < len; i = i + 1) {
                        $scope.navButtons.push(i);
                    }
                    //alert("Nav Buttons : " + $scope.navButtons);
                };
        
                $scope.paginate = function() {
                    $scope.empData = $scope.allData.slice($scope.offset, $scope.offset + $scope.perPage);
                    //alert("Sliced Data : " + $scope.data);
                };
        
                $scope.previous = function() {                    
                    $scope.offset = $scope.offset - $scope.perPage;
                };
        
                $scope.next = function() {
                    //alert("offset value : "+os);
                    $scope.offset = $scope.offset + $scope.perPage;
                    
                };	
        
                $scope.$watch('offset', function() {
                    if( $scope.offset < 0 ){
                        $scope.isPreviousDisabled = true;
                        $scope.isNextDisabled = false;
                        $scope.offset = 0;
                        return false;
                    }
                    else{
                        $scope.isPreviousDisabled = false;
                    }
                    
                    //disable Next button
                    //if( $scope.offset > (($scope.perPage * ($scope.allData.length/$scope.perPage))-1) ){
                    if( $scope.offset > ($scope.allData.length-1) ){
                        $scope.isNextDisabled = true;
                        $scope.isPreviousDisabled = false;
                        //alert("Next button disabled : "+$scope.offset);
                        $scope.offset = ($scope.perPage * ($scope.allData.length/$scope.perPage));
                        //alert("Offset Value changed to : "+$scope.offset);
                        return false;
                    }
                    else{
                        $scope.isNextDisabled = false;
                    }
                    $scope.paginate();
                    //alert("In else...");
                });
                $scope.buildNavButtons();
            }            
            /** Pagination Code ENDS **/



    
});