/* 
 * 时钟插件
*/
;(function($){
    $.fn.clock = function(options){
        // 外部可配置参数
        var defaults = {
            time            : new Date(),               // 如果传过来的是string类型 按这种格式"yyyy-MM-dd HH:mm:ss" 如果是object类型 标准时间 Wed Jun 27 2018 11:05:29 GMT+0800 (中国标准时间)
            scale           : 'minute',                 // hour 只显示小时的刻度 minute显示分钟的刻度
            dot             : '4',                      // 数字刻度是否显示 false不显示  显示分别是 12 4 Ⅳ Ⅻ 四种形式
            sundayWeek      : false,                    // 是否显示底部的年月日 星期
            textTime        : false                     // 是否显示底部的数字时间 false 不显示  true 正常显示  hh:mm:ss 双数显示
        };
        var options = $.extend(defaults,options || {});

        // 版本号
        this.version = "1.0";   //在这里面,this指的是用jQuery选中的元素

        // 开始执行
        return this.each(function(){
            var self = this;
            // 生成结构
            init(self);

            // 将字符串转化为标准时间
            if (typeof options.time === "string") {
                options.time = strToDate(options.time);
            }
            var timer = options.time;
            tick(self,timer);
            // 每隔1s调用一次
            setInterval(function(){
                timer = addSecond(timer,1);
                tick(self,timer);
            }, 1000);
        });
        function init(self){
            var clockBox = $("<div>", {
                'class'     : "clock-item"
            }).appendTo(self);

            /**
             * 1、时钟刻度设置
             */
            var scaleBox = $("<ol>", {
                'class'     : " clock-scale-box"
            }).appendTo(clockBox);
            if (options.scale === 'hour') {
                for (var i = 0; i < 12; i++) {
                    var scaleItem = $("<li>", {
                        'class'     : "clock-scale clock-number"
                    }).appendTo(scaleBox);
                    scaleItem.css(prefixfn+'transform', 'rotate('+(i * 30)+'deg)');
                    $("<span>", {
                        'class'     : "scale-show"
                    }).appendTo(scaleItem);
                }
            }else{
                for (var i = 0; i < 60; i++) {
                    var scaleItem = $("<li>", {
                        'class'     : "clock-scale"
                    }).appendTo(scaleBox);
                    scaleItem.css(prefixfn+'transform', 'rotate('+(i * 6)+'deg)');
                    $("<span>", {
                        'class'     : "scale-show"
                    }).appendTo(scaleItem);
                    if (i%5 ==0 ) {
                        scaleItem.addClass('clock-number');
                    }
                }
            }
                
            /**
             * 2、时钟数字
             */
            if (options.dot) {
                var dotBox = $("<ol>", {
                    'class'     : "clock-dot-box"
                }).appendTo(clockBox);
                if (options.dot ==12 ) {
                    dotBox.addClass('clock-dot-all');
                    var dotHtml = '<li class="clock-dot clock-dot-hot">6</li><li class="clock-dot">5</li><li class="clock-dot">4</li><li class="clock-dot clock-dot-hot">3</li><li class="clock-dot">2</li><li class="clock-dot">1</li><li class="clock-dot clock-dot-hot">12</li><li class="clock-dot">11</li><li class="clock-dot">10</li><li class="clock-dot clock-dot-hot">9</li><li class="clock-dot">8</li><li class="clock-dot">7</li>';
                    dotBox.html(dotHtml);
                }else if ( options.dot == 4 ) {
                    var dotHtml = '<li class="clock-dot clock-dot-hot">6</li><li class="clock-dot clock-dot-hot">3</li><li class="clock-dot clock-dot-hot">12</li><li class="clock-dot clock-dot-hot">9</li>';
                    dotBox.html(dotHtml);
                }else if ( options.dot == "Ⅳ" ) {
                    var dotHtml = '<li class="clock-dot clock-dot-hot">Ⅵ</li><li class="clock-dot clock-dot-hot">Ⅲ</li><li class="clock-dot clock-dot-hot">Ⅻ</li><li class="clock-dot clock-dot-hot">Ⅸ</li>';
                    dotBox.html(dotHtml);
                }else if (options.dot == 'Ⅻ' ) {
                    dotBox.addClass('clock-dot-all');
                    var dotHtml = '<li class="clock-dot clock-dot-hot">Ⅵ</li><li class="clock-dot">Ⅴ</li><li class="clock-dot">Ⅳ</li><li class="clock-dot clock-dot-hot">Ⅲ</li><li class="clock-dot">Ⅱ</li><li class="clock-dot">Ⅰ</li><li class="clock-dot clock-dot-hot">Ⅻ</li><li class="clock-dot">Ⅺ</li><li class="clock-dot">Ⅹ</li><li class="clock-dot clock-dot-hot">Ⅸ</li><li class="clock-dot">Ⅷ</li><li class="clock-dot">Ⅶ</li>';
                    dotBox.html(dotHtml);
                }
                // 1、12个数字的位置设置
                var dot_num = 360 / dotBox.find(".clock-dot").length; //每个div对应的弧度数
                var ahd = dot_num * Math.PI / 180;
                //每一个dot对应的弧度;
                dotBox.find(".clock-dot").each(function(index, el) {
                    var origin = dotBox.height()/2-20;
                    var radius = origin-20;
                    $(el).css({
                        "left": origin + Math.sin((ahd * index)) * radius,
                        "top": origin + Math.cos((ahd * index)) * radius
                    });
                });
            }
                
            /**
             * 3、时、分、秒 指针
             */
            var timeBox = $("<ul>", {
                'class'     : "clock-pointer"
            }).appendTo(clockBox);
            var hourPointer = $("<li>", {
                'class'     : "clock-pointer-hour"
            }).appendTo(timeBox);
            $("<span>").appendTo(hourPointer);
            var minutePointer = $("<li>", {
                'class'     : "clock-pointer-minute"
            }).appendTo(timeBox);
            $("<span>").appendTo(minutePointer);
            var secondPointer = $("<li>", {
                'class'     : "clock-pointer-second"
            }).appendTo(timeBox);
            $("<span>").appendTo(secondPointer);
            $("<li>", {
                'class'     : "clock-pointer-origin"
            }).appendTo(timeBox);

            /**
             * 4、日期
             */
            if (options.sundayWeek) {
                var infoBox = $("<dl>", {
                    'class'     : "clock-info-sunday-week"
                }).appendTo(clockBox);
                $("<dt>", {
                    text:'2018年6月2日',
                    'class'     : "clock-info-sunday"
                }).appendTo(infoBox);
                $("<dd>", {
                    text:'星期二',
                    'class'     : "clock-info-week"
                }).appendTo(infoBox);
            }
                
            /**
             * 5、数字:时、分、秒
             */
            if (options.textTime) {
                var timeBox = $("<ul>", {
                    'class'     : "clock-time"
                }).appendTo(clockBox);
                $("<li>", {
                    'class'     : "clock-time-hour"
                }).appendTo(timeBox);
                $("<li>", {
                    'class'     : "clock-time-minute"
                }).appendTo(timeBox);
                $("<li>", {
                    'class'     : "clock-time-second"
                }).appendTo(timeBox);
            }
        }
        function tick(self,nowdate){
            var year = nowdate.getFullYear(),
                month = nowdate.getMonth() + 1,
                date = nowdate.getDate(),
                hours = nowdate.getHours(),
                minutes = nowdate.getMinutes(),
                seconds = nowdate.getSeconds(),
                week = nowdate.getDay();
            var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

            // 指针时间
            var hour_rotate = hours * 30 + Math.floor(minutes / 2);
            $(self).find('.clock-pointer-hour').css(prefixfn+'transform', 'rotate('+hour_rotate+'deg)');
            $(self).find('.clock-pointer-minute').css(prefixfn+'transform', 'rotate('+ (minutes * 6) +'deg)');
            $(self).find('.clock-pointer-second').css(prefixfn+'transform', 'rotate('+ (seconds * 6) +'deg)');
            // 数字时间
            if (options.textTime) {
                if ( options.textTime === "hh:mm:ss") {
                    hours = hours>9 ? hours:"0"+hours;
                    minutes = minutes>9 ? minutes:"0"+minutes;
                    seconds = seconds>9 ? seconds:"0"+seconds;
                }
                $(self).find('.clock-time-hour').text(hours);
                $(self).find('.clock-time-minute').text(minutes);
                $(self).find('.clock-time-second').text(seconds); 
            }  
            // 年月日 星期
            if (options.sundayWeek) {
                $(self).find('.clock-info-sunday').text(year + "年" + month + "月" + date + "日");
                $(self).find('.clock-info-week').text(weekday[week]);
            }
        }
        function strToDate(dateStr) {
            dateStr = dateStr.replace(/-/g, '/');
            return new Date(dateStr);
        }
        function addSecond(date, addSeconds) {
            var a = new Date();
            if (typeof date == "string") {
                a = new Date(Date.parse(date.replace(/-/g, "/")));
            } else {
                a = date;
            }
            a.setSeconds(a.getSeconds()+addSeconds);
            return a;
        }
    };
    /* 
     * 定义一些外部通用的方法，您可以在内部调用
    */
    var prefixfn = (function(){
        if (navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {
            return '-webkit-';
        }
        if (navigator.userAgent.indexOf("Firefox")>0) {
            return '-moz-';
        }
        if (!! window.opera &&  window.opera.version) {
            return '-o-';
        }
        if (/msie/i.test(navigator.userAgent)) {
            return '-ms-';
        }
        return false;
    })();
})(jQuery);