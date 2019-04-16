/* 
 * mocCountDown 倒计时插件
*/
;(function($){
    'use strict';
    //定义privateFunction的构造函数
    var privateFunction = function(ele, options) {
        var self = this;
        // 版本号
        self.version = "1.00";

        // 定义默认参数
        self.defaults = {
            type:'time',  // date  ||  time
            startDate:"1:00:00",
            endDate:"2028-12-12 00:00:00",
            callBack:false
        };
        self.options = $.extend({}, self.defaults, options);
        
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        
        //调用其方法
        self.init();
    };

    /**
     * 调用插件
     */
    privateFunction.prototype.init = function () {
        var self = this;
        self.millisecond = 0;
        if( self.options.type === 'time' ){
            var time = self.options.startDate;
            var timeArr = time.split(':');
            self.millisecond += timeArr[0]*60*60*1000;
            self.millisecond += timeArr[1]*60*1000;
            self.millisecond += timeArr[2]*1000; 
        }else if( self.options.type === 'date' ){
            var time = self.options.startDate,
                date = self.options.endDate;
            self.millisecond = toDateGetTime(time) - toDateGetTime(date);
        }
        calcTime(self);
        self.timer = setInterval(function(){
            self.millisecond = self.millisecond-1000;
            calcTime(self);
        },1000);
    };

    function calcTime(self){
        var time = self.millisecond;
        if(time>=1000){
            var days = parseInt(time / (1000 * 60 * 60 * 24));
            var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days*24;
            var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (time % (1000 * 60)) / 1000;
            minutes = minutes>9?minutes:'0'+minutes;
            seconds = seconds>9?seconds:'0'+seconds;
            self.$element.text(hours+":"+minutes+":"+seconds);
        }else{
            self.$element.text("0:00:00");
            clearTimeout(self.timer);
            if( $.type(self.options.callBack) === "function" ){
                self.options.callBack.call(self.$element);
            }
        }
        
    }

    function toDateGetTime(date){
        date = date.replace(/-/g, '/');
        var time = new Date(date);
        return time.getTime();
    }

    //在插件中使用privateFunction对象
    $.fn.mocCountDown = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);


