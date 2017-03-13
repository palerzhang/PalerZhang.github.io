window.onload = function () {
    var days = document.getElementById('days');
    var currentTime = new Date(),
        monthFirstDay = getMonthFirstDay(currentTime),
        monthLastDay = getMonthLastDay({date: currentTime});

    var lists = createDaysList(monthFirstDay, monthLastDay);


    getSignLog().then(function (data) {
        var signLogs = JSON.parse(data);
        lists.forEach(function (li) {

            days.appendChild(li);
        });

    });


    function getMonthFirstDay(ct) {
        return new Date(ct.setDate(1));
    }

    function getMonthLastDay(params) {
        var month, year, date;
        if (params.date) {
            month = params.date.getMonth() + 1;
            year = params.date.getYear();
            date = params.date;
        }
        else if (params.month && params.year) {
            month = params.month;
            year = params.year;
            date = new Date(year, month, 1);
        }

        var result;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                result = date.setDate(31);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                result = date.setDate(30);
                break;
            case 2:
                if (year % 400 !== 0) {
                    result = date.setDate(28);
                }
                else {
                    result = date.setDate(29);
                }
                break;
            default:
                result = date.setDate(31);
        }

        return new Date(result);
    }


    function createDaysList(startDay, endDay) {
        var i, len, li, result = [];
        var previousMonth = startDay.getMonth() > 0 ? startDay.getMonth() : 12;
        previousMonth = getMonthLastDay({month: previousMonth, year: startDay.getYear() + 1900});
        previousMonth = previousMonth.getDate();
        console.log(previousMonth);
        for (i = startDay.getDay() - 1; i > 0; i--) {
            li = document.createElement('li');
            li.innerHTML = previousMonth - i + 1;
            result.push(li);
        }

        for (i = startDay.getDate(), len = endDay.getDate(); i < len; i++) {
            li = document.createElement('li');
            li.innerHTML = i;
            result.push(li);
        }

        for (i = 0, len = 7 - endDay.getDay(); i < len; i++) {
            li = document.createElement('li');
            li.innerHTML = i + 1;
            result.push(li);
        }


        return result;
    }

    function getSignLog() {
        return $.ajax({
            url: 'http://sign-1252956018.cossh.myqcloud.com/data.json',
            method: 'GET'
        })
    }


    function signature(params) {

    }
};