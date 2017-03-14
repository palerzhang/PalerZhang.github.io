window.onload = function () {


    getSignLog().then(function (data) {
        setCalendar(new Date(), data);
        setToday(new Date());
        setArrowClickFunc();
        setSignBtnClickFunc(data);
    });


    function setCalendar(date, signLog) {
        setYear(date.getYear() + 1900);
        setMonth(date.getMonth() + 1);
        setDays(date, signLog);
    }


    function setYear(year) {
        document.getElementById('year').innerHTML = year;
    }

    function setMonth(month) {
        var monthStr;
        switch (month) {
            case 1:
                monthStr = 'January';
                break;
            case 2:
                monthStr = 'February';
                break;
            case 3:
                monthStr = 'March';
                break;
            case 4:
                monthStr = 'April';
                break;
            case 5:
                monthStr = 'May';
                break;
            case 6:
                monthStr = 'June';
                break;
            case 7:
                monthStr = 'July';
                break;
            case 8:
                monthStr = 'August';
                break;
            case 9:
                monthStr = 'September';
                break;
            case 10:
                monthStr = 'October';
                break;
            case 11:
                monthStr = 'November';
                break;
            case 12:
                monthStr = 'December';
                break;
        }

        document.getElementById('month').innerHTML = monthStr;
    }

    function setDays(date, signLog) {
        var firstDay = getMonthFirstDay(date),
            lastDay = getMonthLastDay(date);

        var list = createDaysList(firstDay, lastDay);

        var days = document.getElementById('days');

        list.forEach(function (li) {
            if (signLog && signLog[li.year] && signLog[li.year][li.month] && signLog[li.year][li.month][li.date]) {
                li.setAttribute('class', 'active');
            }
            days.appendChild(li);
        });
    }


    function setArrowClickFunc() {

    }

    function setToday(time) {
        var year = time.getYear() + 1900,
            month = time.getMonth() + 1,
            date = time.getDate();

        document.getElementById('today').innerHTML = year + '-' + month + '-' + date;
    }

    function setSignBtnClickFunc(data) {
        var ct = new Date();
        var signBtn = document.getElementById('sign-btn');
        signBtn.onclick = function () {
            var year = ct.getYear() + 1900,
                month = ct.getMonth() + 1,
                date = ct.getDate();

            if (!data[year]) {
                data[year] = {};
            }

            if (!data[year][month]) {
                data[year][month] = {};
            }

            if (data[year][month][date]) {
                alert('今天已经签过到了哦');
            }
            else {
                data[year][month][date] = true;
                setSignLog(data);
                Array.from(document.getElementsByTagName('li')).forEach(function (li) {
                    if (li.year && li.year == year && li.month && li.month == month && li.date && li.date == date) {
                        li.setAttribute('class', 'active');
                    }
                });
            }
        };
    }


    function getMonthFirstDay(ct) {
        return new Date(ct.setDate(1));
    }

    function getMonthLastDay(time) {
        var year = time.getYear() + 1900,
            month = time.getMonth() + 1,
            result;

        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                result = time.setDate(31);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                result = time.setDate(30);
                break;
            case 2:
                if (year % 400 !== 0) {
                    result = time.setDate(28);
                }
                else {
                    result = time.setDate(29);
                }
                break;
            default:
                result = time.setDate(31);
        }

        return new Date(result);
    }


    function createDaysList(startDay, endDay) {
        var year = startDay.getYear() + 1900,
            month = startDay.getMonth() + 1;

        var i, len, li, result = [];
        for (i = 0, len = startDay.getDay(); i < len; i++) {
            li = document.createElement('li');
            li.innerHTML = '';
            result.push(li);
        }

        for (i = startDay.getDate(), len = endDay.getDate(); i <= len; i++) {
            li = document.createElement('li');
            li.innerHTML = i;
            li.year = year;
            li.month = month;
            li.date = i;
            result.push(li);
        }

        return result;
    }

    function getSignLog() {
        return $.ajax({
            url: 'https://palerzhang.oss-cn-shanghai.aliyuncs.com/data.json',
            method: 'GET'
        });
    }


    function setSignLog(data) {
        return $.ajax({
            url: 'https://palerzhang.oss-cn-shanghai.aliyuncs.com/data.json',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });
    }
};