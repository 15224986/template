/* 
 * 向上无缝滚动（翻滚）或向左无缝滚动
*/
;(function($){
    $.fn.mocListScroll = function(options){
        // 外部可配置参数
        var defaults = {
            direction: 'horizontal',  // horizontal 水平方向    vertical 垂直方向  rollup 向上翻滚
            rollInterval: 2000, // 翻滚的间隔，在rollup状态下有效果
            speed: 20, // 滑动速度，即slider自动滑动开始到结束的时间（单位ms）
            empty: false
        };
        var insideoptions = {
            'num' : 0
        };
        var options = $.extend(defaults,options || {});
        // 开始执行
        return this.each(function(){
            insideoptions = {
                'num' : 0
            };
            var o = options,
                _this = this;
            
            if ( o.empty ) {
                SScrollEmpty(_this);
            }else{
                // 外层添加相对定位
                $(_this).parent().css('position', 'relative');
                // 判断滚动的方向
                if (o.direction === 'horizontal') {
                    horizontalfn(_this);
                }else if (o.direction === 'vertical') {
                    verticalfn(_this);
                }else if (o.direction === 'rollup') {
                    rollupfn(_this);
                }
            }

        });
        // 水平滚动
        function horizontalfn(self){
            var o = options,
                dom = $(self).children(),
                boxW = 0,
                boxH = $(self).mocActual('outerHeight');
            // 包裹外层
            var mocListScrollBox = $('<div class="mocListScroll-box"></div>');
            $(self).wrap(mocListScrollBox);
            // 求boxW的宽度
            for (var i = 0; i < dom.length; i++) {
                var marginL = Number(getNum($(dom[i]).css('margin-left'))),
                    marginR = Number(getNum($(dom[i]).css('margin-right'))),
                    thisW = Number($(dom[i]).mocActual('outerWidth')),
                    listW = marginL+marginR+thisW;
                boxW += listW;
            };
            $(self).css({
                'width' : boxW,
                'position' : 'static',
                'float': 'left'
            });
            var cloneBox = $(self).clone().removeAttr("id");
            var pbox = $(self).parent();
            cloneBox.appendTo(pbox);
            pbox.css({
                'width' :  boxW*2.1,
                'height': boxH,
                'position': 'absolute',
                'left': '0',
                'top': '0'
            });
            var s = setInterval(function(){
                horizontalMotion(pbox,boxW);
            },o.speed);
            pbox.hover(function(){
                clearInterval(s);
            },function(){
                s = setInterval(function(){
                    horizontalMotion(pbox,boxW);
                },o.speed);
            });
        };
        // 定义获取数字的方法
        function getNum(val){
            if(val == null) {
                return "";
            };
            return val.replace(/[^0-9]/ig, "");
        };
        function horizontalMotion(parentbox,w){
            var io = insideoptions;
            if(io.num<=-w){
                io.num=0;
            }else{
                io.num -=1;
            }
            parentbox.css({left:io.num});
        };
        // 垂直滚动
        function verticalfn(self){
            // 包裹外层
            var mocListScrollBox = $('<div class="mocListScroll-box"></div>');
            $(self).wrap(mocListScrollBox);

            var o = options,
                pbox = $(self).parent(),
                boxH = $(self).mocActual('outerHeight');

            $(self).css('position', 'static');
            var cloneBox = $(self).clone().removeAttr("id");
            cloneBox.appendTo(pbox);
            pbox.css({
                'width' :  '100%',
                'position': 'absolute',
                'left': '0',
                'top': '0'
            });
            var s = setInterval(function(){
                verticalMotion(pbox,boxH);
            },o.speed);
            pbox.hover(function(){
                clearInterval(s);
            },function(){
                s = setInterval(function(){
                    verticalMotion(pbox,boxH);
                },o.speed);
            });
        };
        function verticalMotion(parentbox,H){
            var io = insideoptions;
            if(io.num<=-H){
                io.num=0;
            }else{
                io.num -=1;
            }
            parentbox.css({top:io.num});
        };
        // 向上翻滚
        function rollupfn(self){
            var o = options,
                boxH = $(self).parent().mocActual('height');
            
            var mocListScrollBox = $('<div class="mocListScroll-box"></div>');
            $(self).wrap(mocListScrollBox);
            var pbox = $(self).parent();
            pbox.css({
                'width' :  '100%',
                'position': 'absolute',
                'left': '0',
                'top': '0'
            });
            $(self).css('position', 'static');
            var s = setInterval(function(){
                rollupMotion(pbox,boxH);
            },o.rollInterval);
            $(self).hover(function(){
                clearInterval(s);
            },function(){
                s = setInterval(function(){
                    rollupMotion(pbox,boxH);
                },o.rollInterval);
            });
        };
        function rollupMotion(self,H){
            var o = options;
            self.animate({top:-H},o.speed,function(){
                $(this).css({top:0});
                $(this).children().children().first().insertAfter($(this).children().children().last());
            });
        };

        // 拆除水平滚动
        function SScrollEmpty(self){
            $(self).insertBefore( $(self).parent('.mocListScroll-box') );
            $(self).next().remove();
        };
    };
})(jQuery);