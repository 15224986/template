/**
 * @effect  简单显示日历
 * @author  作者
 * @param  参数
 * @example    例子
 * @link   链接
 * @namespace  命名空间
 * @requires   依赖
 * @return 返回值
 * @version    版本号
 * @date    时间
 *
 */
;(function($){
    //定义Beautifier的构造函数
    var privateFunction = function(ele, options) {
        var self = this;
        // 版本号
        self.version = "1.01";

        // 定义默认参数
        self.defaults = {
            'date'              : new Date(),           // 默认时间
            'weekArr'           : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'], // 头部文字
            'dayClick'          : true,                 // 本月是否添加点击事件
            'neighborClick'     : true,                 // 其它月是否添加点击事件
            'callBack'          : false,                // 点击后的后调 返回点击的日期
            'slotCallBack'      : false
        };
        self.options = $.extend({}, self.defaults, options);
        
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        
        // 初始化插件
        self.init();
    };

    /**
     * 可以外部调用的公共方法
     */
    privateFunction.prototype.init = function (dateval) {
        var self = this,
            options = this.options;
        var activeType = true; // 是否设置当前日期
        if (dateval) {
            if (dateval.length<8) {     // 判断所给日期是否含有年月日
               activeType = false; 
            }
            var date = new Date(dateval);   // 获取加载的时间
        }else{
            var date = new Date(options.date);   // 获取加载的时间
        }
        var year = date.getFullYear(),                  // 获取年
            month = date.getMonth(),                    // 获取月
            day = date.getDate();                       // 获取日

        var dnm = _getDaysInOneMonth(year, month),       // 获得本月的总天数
            fdw = _getFirstDayWeek(year, month, 1),      // 获得本月的第一天是星期几
            ldw = _getFirstDayWeek(year, month, dnm);    // 获得本月的最后一天是星期几

        // 记录当前年月
        self.year = year;
        self.month = month+1;
        /**
         * 插件框架
         */
        self.$element.children('.moc-kalendar').remove();
        var kalendar = $('<div>', {
            class:'moc-kalendar'
        }).appendTo(self.$element);
        // 日历头部
        var weekBox = $('<ul>', {
            class:'moc-kalendar-week'
        }).appendTo(kalendar);
        for (var i = 0; i < 7; i++) {
            var weekList = $('<li>', {
                class:'moc-kalendar-week-list',
                text: options.weekArr[i]
            }).appendTo(weekBox);
            if (i === 0 || i === 6 ) {
                weekList.addClass('moc-kalendar-holiday');
            }
        }
        // 天数的盒子
        var dayBox = $('<ul>', {
            class:'moc-kalendar-day'
        }).appendTo(kalendar);

        // 生成上个月的天数
        var pnm = _getDaysInOneMonth(year, month-1);       // 获得本月的总天数
        for(var i = 1; i <= fdw; i++){
            var prevList = $("<li>", {
                    class:'moc-kalendar-prev-day'
                }).appendTo(dayBox);
            $("<span>", {
                text: pnm-(fdw-i)
            }).appendTo(prevList);
            // 添加点击事件
            if(options.neighborClick){
                prevList.on("click",function(){
                    _prevDayclick(this,self);
                });
            }
        };

        // 生成当月的天数
        for(i = 1; i <= dnm; i++){
            var dw = _getFirstDayWeek(year, month, i);
            var dayList = $("<li>", {
                    class:'moc-kalendar-day-list'
                }).appendTo(dayBox);
            $("<span>", {
                text: i
            }).appendTo(dayList);
            if(i === day && activeType){
                dayList.addClass('moc-kalendar-now moc-kalendar-active');
            }
            if ( dw===0 || dw===6 ) {
                dayList.addClass('moc-kalendar-holiday');
            }
            if ( $.isFunction(options.slotCallBack) ) {
                options.slotCallBack();
            }
            // 添加点击事件
            if(options.dayClick){
                dayList.on("click",function(){
                    _dayclick(this,self);
                });
            }
        };

        // 生成下个月的天数
        var nextL = 6-ldw;
        if ( dayBox.children().length+nextL < 42 ) {
            nextL = nextL+7;
        }
        for(var i = 1; i <= nextL; i++){
            var nextList = $("<li>", {
                    class:'moc-kalendar-next-day'
                }).appendTo(dayBox);
            $("<span>", {
                text: i
            }).appendTo(nextList);
            // 添加点击事件
            if(options.neighborClick){
                nextList.on("click",function(){
                    _nextDayclick(this,self);
                });
            }
        };
    }


    /**
     * 上月的点击事件
     */
    function _prevDayclick(_this,self){
        var year = self.year,                   // 获取年
            month = self.month-1,               // 获取月
            day = $(_this).text();              // 获取日

        if( month<1 ){
            year = year - 1;
            month = 12;
        }
        // 单位数添加 0 补位
        month = month<10? '0'+month:month;
        day = day<10? '0'+day:day;
        // 是否需要回调
        var date = year+'-'+month+'-'+day;
        self.init(date);
        
        if ($.isFunction(self.options.callBack)) {
            self.options.callBack(date);
        }
    }
    /**
     * 本月的点击事件
     */
    function _dayclick(_this,self){
        var year = self.year,                   // 获取年
            month = self.month,                 // 获取月
            day = $(_this).text();              // 获取日

        $(_this).addClass('moc-kalendar-active').siblings().removeClass('moc-kalendar-active');
        // 单位数添加 0 补位
        month = month<10? '0'+month:month;
        day = day<10? '0'+day:day;
        // 是否需要回调
        var date = year+'-'+month+'-'+day;
        if ($.isFunction(self.options.callBack)) {
            self.options.callBack(date);
        }
    }
    /**
     * 下月的点击事件
     */
    function _nextDayclick(_this,self){
        var year = self.year,                   // 获取年
            month = self.month+1,               // 获取月
            day = $(_this).text();              // 获取日

        if( month>12 ){
            year = year + 1;
            month = 1;
        }
        // 单位数添加 0 补位
        month = month<10? '0'+month:month;
        day = day<10? '0'+day:day;
        // 是否需要回调
        var date = year+'-'+month+'-'+day;
        self.init(date);
        
        if ($.isFunction(self.options.callBack)) {
            self.options.callBack(date);
        }
    }
    /* 
     * 获得某年某月某日是星期几
    */
    function _getFirstDayWeek(year, month, day){
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        return date.getDay();
    };
    /* 
     * 获得这个月有多少天
    */
    function _getDaysInOneMonth(year, month){  
        var days,
            mouth = month+1;
        
        if(mouth == 2){
            days = year % 4 == 0 ? 29 : 28;
        }else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days= 31;
        }else{
            //其他月份，天数为：30.
            days= 30;    
        }
        return days;
    };

    //在插件中使用Beautifier对象
    $.fn.mocKalendar = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);
