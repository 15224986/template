/**
 * 数字向上卷动的方法
 */
;(function($){
    $.fn.numberRock = function(options){
        var defaults = {
            deVal: 0,                   // 传入值
            className:'numberRock',     // 样式名称
            digit: false,               // 默认显示几位数字
            newVal: false,              // 再次调用要显示的新的数值
            speed: 2000,                // 初始化时滚动的时间
            itemSpeed: 500              // 动画运动的时间 
        };
        var options = $.extend(defaults,options || {});
        return this.each(function(){
            var obj = $(this);
            // 判断是初始化还是间隔调用
            if ( !options.newVal ) {
                _init(obj, options);
            }else{
                againNum(obj, options);
            }
        });
        function _init(obj,options){
            var strHtml = '<ul class="' + options.className + '">';
            var valLen = options.digit || options.deVal.toString().length; // 判断要生成的数量
            
            $(obj).attr('data-numberRock-init', options.deVal);

            if(obj.find('.'+options.className).length <= 0){
                for(var i = 0; i<  valLen; i++){
                    strHtml += '<li class="numberRock-list"><div class="numberRock-list-device"><div class="numberRock-list-item"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> </div></div></li>';
                }
                strHtml += '</ul>';
                obj.html(strHtml);
            }
            scroNum(obj, options);
        }
        function scroNum(obj,options){
            var numberStr = options.deVal.toString(); // 获取到要到达的值.并转化为字符串
            var $num_item = $(obj).find('.numberRock-list-item'); // 找到移动的标签
            var h = $(obj).find('.numberRock-list-device').height(); // 获取到每一个数字的高度
            // 判断数值的个数和要显示的个数是否相等，不想等 在前面添加0
            if(numberStr.length <= $num_item.length - 1){
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++){
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }
            // 转换为数组
            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) {
                setTimeout(function(){
                    $num_item.eq(i).animate({
                        'top':-parseInt(numberArr[i])*h - h*10 + 'px'
                    }, options.speed, function(){
                        $num_item.eq(i).attr('data-numberRock', numberArr[i] );
                    });
                },i*100);
            });
        }
        function againNum(obj,options){
            var numberStr = options.newVal.toString(); // 获取到要到达的值.并转化为字符串
            var $num_item = $(obj).find('.numberRock-list-item'); // 找到移动的标签
            var h = $(obj).find('.numberRock-list-device').height(); // 获取到每一个数字的高度

            // 判断新的数字的位数与显示窗口的个数的大小
            
            if(numberStr.length <= $num_item.length){
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++){
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }else{
                var li = '<li class="numberRock-list" id="numberRockLatestAdditions"><div class="numberRock-list-device"><div class="numberRock-list-item"><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span> <span class="num2">2</span> <span class="num3">3</span> <span class="num4">4</span><span class="num5">5</span> <span class="num6">6</span> <span class="num7">7</span> <span class="num8">8</span> <span class="num9">9</span><span class="num0">0</span> <span class="num1">1</span></div></div></li>';
                $(obj).find('.' + options.className).append( li );

                var l = $num_item.length+1;
                $("#numberRockLatestAdditions .numberRock-list-item").animate({
                    'top': - h*10 + 'px'
                }, l*100+options.itemSpeed, function(){
                    $("#numberRockLatestAdditions").removeAttr('id');
                });
            }
            // 转换为数组
            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) {
                setTimeout(function(){
                    var numberRock = $num_item.eq(i).attr('data-numberRock');
                    if( numberRock === '9' && numberArr[i]=== '0' ){
                        $num_item.eq(i).animate({
                            'top':-2*h*10 + 'px'
                        }, options.itemSpeed, function(){
                            $num_item.eq(i).css('top', -h*10 + 'px');
                            $num_item.eq(i).attr('data-numberRock', 0 );
                        })
                    }else if( numberRock === '9' && numberArr[i]=== '1' ){
                        $num_item.eq(i).animate({
                            'top':-2*h*10-h + 'px'
                        }, options.itemSpeed, function(){
                            $num_item.eq(i).css('top', -h*10-h + 'px');
                            $num_item.eq(i).attr('data-numberRock', 1 );
                        })
                    }else {
                        $num_item.eq(i).animate({
                            'top':-parseInt(numberArr[i])*h - h*10 + 'px'
                        }, options.itemSpeed, function(){
                            $num_item.eq(i).attr('data-numberRock', numberArr[i] );
                        });
                    }
                },i*100);
            });
        }
    };
})(jQuery);

/**
 * animate 语法 2
 * $(selector).animate(styles,options)
 *
 * speed - 设置动画的速度
 * duration：动画时间//执行animate的时间
 * easing - 规定要使用的 easing 函数
 * queue - 布尔值。指示是否在效果队列中放置动画。如果为 false，则动画将立即开始
 * specialEasing - 来自 styles 参数的一个或多个 CSS 属性的映射，以及它们的对应 easing 函数
 *
 * 回掉函数
 * start：动画开始的时候调用
 * step：每次属性调整的回掉函数
 * always：动画被终止或者意外发生没有执行完时发生
 * complete：完成动画的回掉函数
 */
(function($) {
    $.fn.numberRoll = function(options) {
        var defaults = {
            lastNumber: 100,    // 最后的结果  data-last-number="等级高"     类型：number
            duration: 2000,     // 动画时间  执行animate的时间  data-duration="等级高"   类型：number
            easing: 'swing',    // 规定要使用的 easing 函数
            beforeCallBack: false,
            afterCallBack: false
        };
        var opts = $.extend({}, defaults, options);
        // 版本号
        var self = this;
        self.version = "1.0";

        // 开始执行
        return self.each(function(){

            var $this = $(this),
                lastNumber = $this.data('lastNumber') || opts.lastNumber,
                duration = $this.data('duration') || opts.duration;

            $this.animate({
                "this-is": "numberRoll"
            }, {
                duration: duration,
                easing: opts.easing,
                start: function(a, b) {
                    if ( $.type(opts.beforeCallBack) === 'function' ) {
                        opts.beforeCallBack.call(this);
                    }
                },
                step: function(a, b) {
                    $this.text( parseInt(b.pos * lastNumber) );
                },
                complete: function(a, b) {
                    if ( $.type(opts.afterCallBack) === 'function' ) {
                        opts.afterCallBack.call(this);
                    }
                }
            });
        });
    }
})(jQuery);