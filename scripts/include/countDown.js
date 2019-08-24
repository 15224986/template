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
            isShowDays: true,                      // 默认不显示天数
            endDate: "2028-12-12 00:00:00",         // 结束日期
            callBack: false                         // 回调
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
        // 循环元素执行
        self.$element.each(function(index, el) {

            var time = new Date().getTime(),
                endDate = $(el).attr('data-endDate') || self.options.endDate,
                millisecond = _toDateGetTime(endDate) - time,
                timer = '',
                options = self.options,
                $el = $(el);

            _calcTime($el, timer, millisecond, options);
            timer = setInterval(function(){
                millisecond = millisecond-1000;
                _calcTime($el, timer, millisecond, options);
            },1000);
        });   
    };

    function _calcTime($el,timer,time,options){
        if(time>=1000){
        var days = parseInt(time / (1000 * 60 * 60 * 24));
        if(options.isShowDays){
            var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        }else{
            var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days*24;
        }
        var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time % (1000 * 60)) / 1000);
        if(minutes > 0 && minutes < 10){
            minutes = '0'+minutes;
        }
        if(seconds > 0 && seconds < 10){
            seconds = '0'+seconds;
        }
        _assignment($el,options,days,hours,minutes,seconds);
        }else{
            _assignment($el,options,'0','0','0','0');
            if( $.type(options.callBack) === "function" ){
                options.callBack.call($el);
            }
            clearTimeout(timer);
        }
    }

    function _assignment($el,options,days,hours,minutes,seconds){
        var text = "";
        if(options.isShowDays){
            if(days>0){
                hours = hours>9?hours:'0'+hours;
                text = '<span class="moc-count-down-item moc-count-down-days">'+days+'</span><span class="moc-count-down-symbol">天</span><span class="moc-count-down-item moc-count-down-hours">'+hours+'</span><span class="moc-count-down-symbol">时</span><span class="moc-count-down-item moc-count-down-minutes">'+minutes+'</span><span class="moc-count-down-symbol">分</span><span class="moc-count-down-item moc-count-down-seconds">'+seconds+'</span><span class="moc-count-down-symbol">秒</span>';
            }else{
                text = '<span class="moc-count-down-item moc-count-down-hours">'+hours+'</span><span class="moc-count-down-symbol">时</span><span class="moc-count-down-item moc-count-down-minutes">'+minutes+'</span><span class="moc-count-down-symbol">分</span><span class="moc-count-down-item moc-count-down-seconds">'+seconds+'</span><span class="moc-count-down-symbol">秒</span>';
            }
        }else{
            text = '<span class="moc-count-down-item moc-count-down-hours">'+hours+'</span><span class="moc-count-down-symbol">:</span><span class="moc-count-down-item moc-count-down-minutes">'+minutes+'</span><span class="moc-count-down-symbol">:</span><span class="moc-count-down-item moc-count-down-seconds">'+seconds+'</span>';
        }
        $el.html(text);
    }

    function _toDateGetTime(date){
        var time = new Date(date);
        return time.getTime();
    }

    //在插件中使用privateFunction对象
    $.fn.mocCountDown = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);


