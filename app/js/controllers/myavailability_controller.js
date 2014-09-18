angular.module("app").controller("MyavailabilityController", function($scope, SessionService, TimeSlotResource, getweekService) {
    $scope.user = SessionService.currentUser;
    
    // Get data from TimeSlotResource
    TimeSlotResource.query(function(response){
        $scope.slot = response[0];
    });
    
    // Create weeklist
    var currWeekDates = getweekService.getCurrWeek(),
        PrevWeekDates = getweekService.getPrevWeek(currWeekDates[0].getDay()-1),
        PrevPrevWeekDates = getweekService.getPrevPrevWeek(currWeekDates[0].getDay()-8),
        nextWeekDates = getweekService.getNextWeek(currWeekDates[1].getDay()+1),
        nextNextWeekDates = getweekService.getNextNextWeek(nextWeekDates[1].getDay()+8);
    
    // Week day list based on currWeekDates
    var sevenWeekDayArr = new Array();
    for(var i=0; i<7; i++) {
        sevenWeekDayArr[i] = new Date(nextNextWeekDates[0].getTime() + i*86400000);
    }
    $scope.sevenWeekDayArr = sevenWeekDayArr;
    
    // Show 5 week in buttons
    $scope.weeklist = [PrevPrevWeekDates, PrevWeekDates, currWeekDates, nextWeekDates, nextNextWeekDates];
    
    $scope.showWeekDays = function(startDate, endDate) {
        var sevenWeekDayArr = new Array();
        for(var i=0; i<7; i++) {
            sevenWeekDayArr[i] = new Date(startDate.getTime() + i*86400000);
        }
        $scope.sevenWeekDayArr = sevenWeekDayArr;
    };
    
    
    // Get 7 days from current day to 2 weeks ahead
    /*
    var sevenWeekDayArr = new Array();
    
    
    for(var i=0; i<7; i++) {
        var inc = 14 + i;
        var currDate = new Date();
        sevenWeekDayArr[i] = new Date(currDate.setDate(currDate.getDate() + inc));
    }
    $scope.sevenWeekDayArr = sevenWeekDayArr;
    
    $scope.nextSevenWeekDayArr = new Date(sevenWeekDayArr.slice(-1)[0].setDate(sevenWeekDayArr.slice(-1)[0].getDate() + 1));
    */
    /*
    $scope.showNextWeek = function(weekdate) {
        var sevenWeekDayArr = new Array();
        for(var i=0; i< 7; i++) {
            sevenWeekDayArr[i] = new Date(weekdate.setDate(weekdate.getDate() + i));
        }
        $scope.sevenWeekDayArr = sevenWeekDayArr;
        
    };
    */
    
    // CALENDAR VIEW WORK - START
    /*
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    
    $(document).ready(function(){
        $(".datepicker").datepicker({todayHighlight: true, startDate: now})
        .on('changeDate', function(ev){
            
            if (ev.date.valueOf() > sevenWeekDayArr[6].valueOf() ) {
                // Do not show availability beyond the last
                alert("its away from your current range");
            }
            else if (ev.date.valueOf() == now.valueOf() ) {
                alert("Current Date");
            }
            else if ( ev.date.valueOf() < now.valueOf() ) {
                alert("Previous Day lasting!");
            }
            
        })
    });
    */
    // CALENDAR VIEW WORK - END
    
    $scope.submitAvailability = function(availability){
        
            var availability = {};
            availability.modified_by = SessionService.currentUser._id;
            availability.modified_date = new Date();
            
            // Get data from TimeSlotResource
            TimeSlotResource.query(function(response){
                $scope.slot = response[0];
            });
            availability.slot_time.morning_start_time = $scope.slot.morning_start_time;
            availability.slot_time.morning_start_time_period = $scope.slot.morning_start_time_period;
            availability.slot_time.morning_end_time = $scope.slot.morning_end_time;
            availability.slot_time.morning_end_time_period = $scope.slot.morning_end_time_period;
            availability.slot_time.afternoon_start_time = $scope.slot.afternoon_start_time;
            availability.slot_time.afternoon_start_time_period = $scope.slot.afternoon_start_time_period;
            availability.slot_time.afternoon_end_time = $scope.slot.afternoon_end_time;
            availability.slot_time.afternoon_end_time_period = $scope.slot.afternoon_end_time_period;
            availability.slot_time.night_start_time = $scope.slot.night_start_time;
            availability.slot_time.night_start_time_period = $scope.slot.night_start_time_period;
            availability.slot_time.night_end_time = $scope.slot.night_end_time;
            availability.slot_time.night_end_time_period = $scope.slot.night_end_time_period;
            availability.slot_time.late_night_start_time = $scope.slot.late_night_start_time;
            availability.slot_time.late_night_start_time_period = $scope.slot.late_night_start_time_period;
            availability.slot_time.late_night_end_time = $scope.slot.late_night_end_time;
            availability.slot_time.late_night_end_time_period = $scope.slot.late_night_end_time_period;
            availability.modified_date = new Date();
            availability.modified_by = SessionService.currentUser._id;
            console.log(availability);
    };
    
});