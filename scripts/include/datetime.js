/**
 * 日期对象转换为指定格式的字符串
 * @param formatStr 日期格式,yyyy-MM-dd HH:mm:ss等,如果为空则默认为yyyy-MM-dd HH:mm:ss
 * @param date Date日期对象,如果为空，则默认当前时间
 * @returns {*|string}
 */
WidgetFun.prototype.dateToStr = function (formatStr, date) {
    if (typeof arguments[0] == 'undefined') {
        formatStr = "yyyy-MM-dd HH:mm:ss";
        date = new Date();
    }else{
        if(typeof arguments[0] == 'string'){
            formatStr = arguments[0];
        }else{
            formatStr = "yyyy-MM-dd HH:mm:ss";
            date = arguments[0];
        }
    }
    if (typeof arguments[1] == 'undefined') {
        date = new Date();
    }else{
        if(typeof arguments[1] == 'string'){
            formatStr = arguments[1];
        }else{
            date = arguments[1];
        }
    }
    var str = formatStr;
    var Week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    str=str.replace(/yyyy|YYYY/,date.getFullYear());
    str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));
    str=str.replace(/MM/,date.getMonth()>9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));
    str=str.replace(/M/g,date.getMonth());
    str=str.replace(/w|W/g,Week[date.getDay()]);
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
    str=str.replace(/d|D/g,date.getDate());

    str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());
    str=str.replace(/h|H/g,date.getHours());
    str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());
    str=str.replace(/m/g,date.getMinutes());

    str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());
    str=str.replace(/s|S/g,date.getSeconds());

    return str;
};
/**
 * 字符串时间转换为日期时间
 * @param dateStr 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
 */
WidgetFun.prototype.strToDate = function (dateStr) {
    var data = dateStr;
    var reCat = /(\d{1,4})/gm;
    var t = data.match(reCat);
    t[1] = t[1] - 1;
    var d = eval('new Date('+t.join(',')+');');
    return d;
};
/**
 * 字符串时间转换为时间戳
 * @param dateStr 格式为yyyy-MM-dd HH:mm:ss
 */
WidgetFun.prototype.getTimeTtamp = function (dateStr) {
    dateStr = dateStr.replace(/-/g, '/');
    return new Date(dateStr).getTime();
};
/**
 * 获取当前日期字符串，格式为yyyy-MM-dd
 * @returns {*|string}
 */
WidgetFun.prototype.getNowDateStr = function () {
    var date = new Date();
    var dateStr = this.dateToStr("yyyy-MM-dd",date);
    return dateStr;
};
/**
 * 获取当前时间字符串，格式为yyyy-MM-dd HH:mm:ss
 * @returns {*|string}
 */
WidgetFun.prototype.getNowTimeStr = function () {
    var date = new Date();
    var dateStr = this.dateToStr("HH:mm:ss",date);
    return dateStr;
};
/**
 * 指定日期是星期几
 * @param date Date日期对象,如果为空，则默认当前时间
 */
WidgetFun.prototype.date = function (date) {
    date = arguments[0] || new Date();
    var a = ['日','一','二','三','四','五','六'];
    var week = a[date.getDay()];
    return week;
};
/**
 * 增加年数(返回Date类型日期)
 * @param date 字符串类型日期或者Date类型日期
 * @param addYears
 * @returns {Date}
 */
WidgetFun.prototype.addYear = function (date, addYears) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setFullYear(a.getFullYear() + addYears);
    return a;
};
/**
 * 增加月数(返回Date类型日期)
 * @param date 字符串类型日期或者Date类型日期
 * @param addMonths
 * @returns {Date}
 */
WidgetFun.prototype.addMonth = function (date, addMonths) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setMonth(a.getMonth() + addMonths);
    return a; 
};
/**
 * 增加天数(返回Date类型日期)
 * @param date 字符串类型日期或者Date类型日期
 * @param addDays
 * @returns {Date}
 */
WidgetFun.prototype.addDay = function (date, addDays) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setDate(a.getDate()+addDays);
    return a;
};
/**
 * 增加小时数(返回Date类型日期)
 * @param Hour 字符串类型日期或者Date类型日期
 * @param addHour
 * @returns {Hour}
 */
WidgetFun.prototype.addHour = function (date, addHours) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setHours(a.getHours()+addHours);
    return a;
};
/**
 * 增加分钟数(返回Date类型日期)
 * @param Minute 字符串类型日期或者Date类型日期
 * @param addMinute
 * @returns {Minute}
 */
WidgetFun.prototype.addMinute = function (date, addMinutes) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setMinutes(a.getMinutes()+addMinutes);
    return a;
};
/**
 * 增加秒数(返回Date类型日期)
 * @param Second 字符串类型日期或者Date类型日期
 * @param addSecond
 * @returns {Second}
 */
WidgetFun.prototype.addSecond = function (date, addSeconds) {
    var a = new Date();
    if (typeof date == "string") {
        a = new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        a = date;
    }
    a.setSeconds(a.getSeconds()+addSeconds);
    return a;
};
/**
 * 计算两个时间之间的差
 * @param Second 字符串类型日期或者Date类型日期
 * @param addSecond
 * @returns {Second}
 */
WidgetFun.prototype.calcDate = function (startDate, endDate) {
    // 判断格式
    if ( $.type(startDate) === 'string' ) {
        startDate = startDate.replace(/-/g,"/");
    }
    if ( $.type(endDate) === 'string' ) {
        endDate = endDate.replace(/-/g,"/");
    }
    if ( new Date(startDate) == 'Invalid Date' || new Date(endDate) == 'Invalid Date' ) {
        alert('日期格式为：yyyy-MM-dd HH:mm:ss 或 yyyy/MM/dd HH:mm:ss');
        return "Invalid Date";
    }
    // 计算相差的毫秒数
    var Millisecond = new Date(startDate).getTime() - new Date(endDate).getTime();
    // 转化
    var days = parseInt(Millisecond / (1000 * 60 * 60 * 24));
    var hours = parseInt((Millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((Millisecond % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((Millisecond % (1000 * 60)) / 1000);
    // 返回
    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
};