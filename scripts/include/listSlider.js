/**
 *
 * @effect 不固定宽度的轮播图 moc-listSlider 的方法
 * @requires   jQuery
 * @date
 *
 */
;(function($){
    $.fn.mocListSlider = function(options){
        // 版本号
        this.version = "1.0";
        if (typeof options === "string") {
            return this.each(function(){
                // 内部参数初始化
                var $this = $(this);
                initMethod($this,options);
            });
        }else{
            // 参数
            var defaults = {
                navigation      : true,
                button          : true,
                index           : 0,
                speed           : 500
            };
            var options = $.extend(defaults,options || {});
            // 开始执行
            return this.each(function(){
                var $this = $(this);
                init($this);
            });
        };
        // 执行回调
        function init($this) {
            /**
             * 计算宽度，并赋值
             */
            var list = $this.find('.moc-listSlider-list'),
                groupW = 0;
            list.each(function(index, listDom) {
                groupW += $(listDom).mocActual('outerWidth',{includeMargin:true});
            });
            $this.find('.moc-listSlider-group').width(groupW);
            
            /**
             * 生成窗口
             */
            $this.children().wrapAll('<div class="moc-listSlider"><div class="moc-listSlider-win"></div></div>');
            $this.css({
                'position': 'relative',
                'overflow': 'visible'
            });
            var listSliderBox = $this.find('.moc-listSlider');
            listSliderBox.attr('data-state-type', 'true')
            /**
             * 生成顺序按钮
             */
            // 获取要生成的个数,最少生成一个
            var navNumber = Math.ceil(groupW/$this.width())||1;
            var navigation = $("<div>", {
                "class" : "moc-listSlider-navigation"
            }).appendTo(listSliderBox);

            // 判断是否显示
            if ( !options.navigation ){
                navigation.hide();
            }
            // 生成按钮结构
            var dataIndex = $this.attr('data-index') || options.index;
            var navigationUl = $("<ul>").appendTo(navigation);
            for (var i = 0; i < navNumber; i++) {
                var navigationLi = $("<li>").on("click", _navigation_Click).appendTo(navigationUl);
                $("<span>", {
                    text    : (i+1)
                }).appendTo(navigationLi);
            }
            // 判断当前要选中的和总共的个数关系
            var lastIndex = navigationUl.children('li').length-1;
            if ( dataIndex > lastIndex ) {
                dataIndex = lastIndex;
            }
            // 添加选中状态
            navigationUl.children('li').eq(dataIndex).addClass('on');

            /**
             * 生成上下按钮
             */
            if ( options.button ){
                var btnBox = $("<div>", {
                    "class" : "moc-listSlider-btns"
                }).appendTo(listSliderBox);
                var prevBtn = $("<a>", {
                    href : "javascript:;",
                    "class" : "moc-listSlider-prev"
                }).on("click", _prev_Click).appendTo(btnBox);
                var nextBtn = $("<a>", {
                    href : "javascript:;",
                    "class" : "moc-listSlider-next"
                }).on("click", _next_Click).appendTo(btnBox);
                // 判断是否要添加状态
                if ( dataIndex==0 ) {
                    prevBtn.addClass('disabled');
                }
                if ( dataIndex == lastIndex ) {
                    nextBtn.addClass('disabled');
                }
            }

            /**
             * 根据要显示的给定的坐标，调整位置
             */
            var win = $this.find('.moc-listSlider-win'),
                winWidth = win.width(),
                scrollL = winWidth*dataIndex;
                // 调整位置
            win.scrollLeft(scrollL);
        }
        function _navigation_Click(){
            var listSlider = $(this).closest(".moc-listSlider");
            if ( listSlider.attr('data-state-type') === 'true' ) {
                listSlider.attr('data-state-type','false');
                var length = $(this).parent().children().length-1,
                    index = $(this).index(),
                    win = listSlider.find('.moc-listSlider-win'),
                    winWidth = win.width();

                if (index==0) {
                    listSlider.find('.moc-listSlider-prev').addClass('disabled');
                    if ( length>0 ){
                        listSlider.find('.moc-listSlider-next').removeClass('disabled');
                    };
                }else if ( index==length ) {
                    listSlider.find('.moc-listSlider-next').addClass('disabled');
                    if ( length>0 ){
                        listSlider.find('.moc-listSlider-prev').removeClass('disabled');
                    };
                }else{
                    listSlider.find('.moc-listSlider-btns .disabled').removeClass('disabled');
                }
                $(this).addClass('on').siblings().removeClass('on');
                win.animate({ scrollLeft: winWidth*index }, options.speed, 'linear', function(){
                    listSlider.attr('data-state-type','true');
                });
            }
        }
        function _prev_Click(){
            var listSlider = $(this).closest(".moc-listSlider");
            if ( listSlider.attr('data-state-type') === 'true' && !$(this).hasClass('disabled') ) {
                listSlider.attr('data-state-type','false');
                var index = listSlider.find('.moc-listSlider-navigation').find('.on').index()-1,
                    win = $(this).closest(".moc-listSlider").find('.moc-listSlider-win'),
                    winWidth = win.width(),
                    scrollL = winWidth*index;

                if (index > 0) {
                    listSlider.find('.moc-listSlider-navigation li').eq(index).addClass('on').siblings().removeClass('on');
                    $(this).siblings().removeClass('disabled');
                }else if( index === 0 ){
                    listSlider.find('.moc-listSlider-navigation li').eq(index).addClass('on').siblings().removeClass('on');
                    $(this).addClass('disabled');
                    $(this).siblings().removeClass('disabled');
                }
                win.animate({ scrollLeft: scrollL }, options.speed, 'linear', function(){
                    listSlider.attr('data-state-type','true');
                });
            }
        }
        function _next_Click(){
            var listSlider = $(this).closest(".moc-listSlider");
            if ( listSlider.attr('data-state-type') === 'true' && !$(this).hasClass('disabled') ) {
                listSlider.attr('data-state-type','false');
                var index = listSlider.find('.moc-listSlider-navigation').find('.on').index()+1,
                    navNumber = listSlider.find('.moc-listSlider-navigation li').length,
                    win = $(this).closest(".moc-listSlider").find('.moc-listSlider-win'),
                    winWidth = win.width(),
                    scrollL = winWidth*index;

                if ( index < navNumber-1 ) {
                    listSlider.find('.moc-listSlider-navigation li').eq(index).addClass('on').siblings().removeClass('on');
                    $(this).siblings().removeClass('disabled');
                }else if ( index == navNumber-1 ) {
                    listSlider.find('.moc-listSlider-navigation li').eq(index).addClass('on').siblings().removeClass('on');
                    $(this).addClass('disabled');
                    $(this).siblings().removeClass('disabled');
                }
                win.animate({ scrollLeft: scrollL }, options.speed, 'linear', function(){
                    listSlider.attr('data-state-type','true');
                });
            }
        }
        // 执行方法
        function initMethod($this,option){
            if ( option === "width" ) {  // 从新计算宽度
                _calc_width($this);
            }
        }
        function _calc_width($this){
            var list = $this.find('.moc-listSlider-list'),
                groupW = 0;
            
            list.each(function(index, listDom) {
                groupW += $(listDom).mocActual('outerWidth',{includeMargin:true});
            });
            $this.find('.moc-listSlider-group').width(groupW);

            // 从新更换顺序按钮结构
            var winW = $this.find('.moc-listSlider-win').width(),
                navNumber = Math.ceil(groupW/winW),
                navigationBox = $this.find('.moc-listSlider-navigation ul'),
                listIndex = $this.find('.moc-listSlider-navigation ul li.on').index();
            navigationBox.html("");
            for (var i = 0; i < navNumber; i++) {   // 生成顺序按钮
                var navigationLi = $("<li>").on("click", _navigation_Click).appendTo(navigationBox);
                $("<span>", {
                    text    : (i+1)
                }).appendTo(navigationLi);
            }
            listLength = $this.find('.moc-listSlider-navigation ul li').length-1;
            if (listIndex>listLength) {
                listIndex = listLength;
            }
            navigationBox.children("li").eq(listIndex).addClass('on');

            // 判断上一个下一个按钮是否显示
            listIndex = $this.find('.moc-listSlider-navigation ul li.on').index();
            if ( listLength === listIndex ) {
                $this.find('.moc-listSlider-next').addClass('disabled');
            }else{
                $this.find('.moc-listSlider-next').removeClass('disabled');
            }
            if (listIndex===0) {
                $this.find('.moc-listSlider-prev').addClass('disabled');
            }else{
                $this.find('.moc-listSlider-prev').removeClass('disabled');
            }
        }
    };
})(jQuery);