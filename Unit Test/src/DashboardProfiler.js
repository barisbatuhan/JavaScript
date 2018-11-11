var DashboardProfiler = function () {
    var that = {};
    var timeStart = null;
    
    getTimeDifference = function () {
        var timeEnd = new Date();
        return (timeEnd.getTime() - timeStart.getTime());
    };

    that.startTimer = function () {
        timeStart = new Date();
    };
    that.getTimeStart = function () {
        return timeStart;
    };
    
    that.setTimeStartHelper = function(year, month, day, hour, min, sec, millisec) {
        
        var febDayLen = 28;
        var change = false;
        var dateArr = [];
        try{
            
            if(year % 4 === 0) febDayLen = 29;
            var monthArray = [31, febDayLen, 31, 30, 31, 30, 31, 31,
                                30, 31, 30, 31];
            if(millisec < 1){
                adddlert("Millisec is not between correct values");
            }
            else if(millisec > 999){
                sec++;
                millisec -= 1000;
                change = true;
            }
            if(sec < 1){
                adddlert("Sec is not between correct values");
            }
            else if(sec > 59){
                min++;
                sec -= 60;
                change = true;
            }
            if(min < 1){
                adddlert("Min is not between correct values");
            }
            else if(min > 59){
                hour++;
                min -= 60;
            }
            if(hour < 1){
                adddlert("Hour is not between correct values");
            }
            else if(hour > 23){
                day++;
                hour -= 24;
                change = true;
            }

            if(day < 1){
                adddlert("Day is not between correct values");
            }
            else if(day > monthArray[month-1]){
                month++;
                day -= monthArray[month-1] - 1;
                change = true;
            }

            if(month < 1){
                adddlert("Month is not between correct values");
            }
            else if(month > 12){
                year++;
                month -= 12;
                change = true;
            }

        }catch(err){
            console.log(err.message);
        }
        
        if(change){
            dateArr = that.setTimeStartHelper(year, month, day, hour, min, sec, millisec);
        }
        else{
            dateArr = [year, month, day, hour, min, sec, millisec];    
        }
        return dateArr;
    }

    that.setTimeStart = function(year, month, day, hour, min, sec, millisec){
        var dateArr = that.setTimeStartHelper(year, month, day, hour, min, sec, millisec);
        timeStart = new Date(dateArr[0],dateArr[1],dateArr[2],dateArr[3],dateArr[4],dateArr[5],dateArr[6]);
    }

    that.getTimeDifferenceString = function () {

        var timeDifference = getTimeDifference();
        var minuteDiff = 0;
        var secondDiff = 0;
        if (timeDifference > 60000) {
            minuteDiff = Math.floor(timeDifference / 60000);
            timeDifference %= 60000;
        }
        if (timeDifference > 1000) {
            secondDiff = Math.floor(timeDifference / 1000);
            timeDifference %= 1000;
        }
        var timeDifferenceStrArr = [];
        if (minuteDiff < 10) {
            timeDifferenceStrArr.push("0");
        }
        timeDifferenceStrArr.push(minuteDiff);
        timeDifferenceStrArr.push(":");

        if (secondDiff < 10) {
            timeDifferenceStrArr.push("0");
        }
        timeDifferenceStrArr.push(secondDiff);
        timeDifferenceStrArr.push(":");

        if (timeDifference < 10) {
            timeDifferenceStrArr.push("000");
        } else if (timeDifference > 10 && timeDifference < 99) {
            timeDifferenceStrArr.push("00");
        } else if (timeDifference < 1000 && timeDifference > 99) {
            timeDifferenceStrArr.push("0");
        }
        timeDifferenceStrArr.push(timeDifference);
        return timeDifferenceStrArr.join("");
    };
    
    return that;
}

module.exports = DashboardProfiler;