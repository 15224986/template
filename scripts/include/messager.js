/*
 * mocMessager 消息弹出框
 */
;(function($, undefined){   
    $.mocMessager = function(options){
        var defaults = {
            'head': true,                   // {类型：boolean 默认：true} 是否创建头部部分
            'headIcon': false,              // {类型：boolean 默认：false} 是否创建图标
            'headClose': true,              // {类型：boolean 默认：true} 是否创建关闭按钮
            'headTitle':'系统提示',          // {类型：string 默认：系统提示 } 消息窗口的表头信息
            'content':'请输入内容',          // {类型：string 默认：text } 信息的主要内容
            'width': '320px',               // {类型：string 默认：320px } 信息窗口的宽度
            'height': '140px',              // {类型：string 默认：140px } 信息窗口的高度
            'timeout': false,               // {类型：number 默认：15000 }  设定多长时间后消失
            'showType':'slide',             // {类型：string slide } 显示时的类型  slide滑动显示  fade淡入淡出
            'ok': false,                    // ok 按钮的回调函数
            'okValue': '确定',              // ok 按钮显示的文字
            'cancel': false,                // cancel 按钮的回调函数
            'cancelValue': '取消'           // cancel 按钮显示的文字
        };
        var options = $.extend(defaults,options || {});
        
        // 定义自身
        var self = this,
            o = options;
        // version 版本号
        self.version = '1.0';

        /* 
         * 初始化
        */
        function init(){
            var mocMessager = $("<div>", {
                'showType' : o.showType,
                'class' : "mocMessager"
            }).appendTo('body');

            // head
            if (o.head) {
                var head = $("<div>", {
                    'class' : "mocMessager-head"
                }).appendTo(mocMessager);
                var headTitleBox = $("<div>", {
                    'class' : "mocMessager-tit-icon"
                }).appendTo(head);
                if (o.headIcon) {
                    $("<i>", {
                        'class' : "mocMessager-icon "+o.headIcon
                    }).appendTo(headTitleBox);
                }
                $("<h2>", {
                    'class' : "mocMessager-tit",
                    'text'  : o.headTitle
                }).appendTo(headTitleBox);
                if (o.headClose) {
                    $("<a>", {
                        'class' : "mocMessager-close",
                        title : o.headCloseTitle
                    }).appendTo(head);
                    $(".mocMessager-close").on('click', function(event) {
                        event.preventDefault();
                        closefn(this);
                    });
                }
            };

            // 中间内容部分
            var MessagerBody = $("<div>", {
                'class' : "mocMessager-body"
            }).appendTo(mocMessager);
            var mocMessagerTxt = $("<div>", {
                'html': o.content,
                'class' : "mocMessager-txt"
            }).appendTo(MessagerBody);

            if (o.width) {
                mocMessagerTxt.css({
                    width: o.width
                });
            };
            if (o.height) {
                mocMessagerTxt.css({
                    height: o.height
                });
            };
            // 底部按钮部分
            if (o.ok != false || o.cancel != false ) {
                var foot = $("<div>", {
                    'class' : "mocMessager-foot"
                }).appendTo(mocMessager);
                var footBtns = $("<div>", {
                    'class' : "mocMessager-btns"
                }).appendTo(foot);
            };
            if (o.ok != false ) {
                $("<a>", {
                    'class' : 'mocMessager-ok',
                    'href' : 'javascript:;',
                    'text'  : o.okValue
                }).on("click", okFn).appendTo(footBtns);
            };
            if (o.cancel != false ) {
                $("<a>", {
                    'class' : 'mocMessager-cancel',
                    'href' : 'javascript:;',
                    'text'  : o.cancelValue
                }).on("click", cancelFn).appendTo(footBtns);
            };

            /**
             * 显示
             */
            if (o.showType === "slide") {
                var H = Math.floor(mocMessager.mocActual('outerHeight'));
                mocMessager.css({
                    'display': 'block',
                    'bottom': -H
                });
                mocMessager.animate({'bottom': 0}, 750);
            }else if (o.showType === "fade") {
                mocMessager.fadeIn(1050);
            };
            mocMessager.attr('dataType', 'open');

            /**
             * XX时间后关闭
             */
            if (o.timeout) {
                setTimeout(function(){
                    closefn(MessagerBody);
                },o.timeout);
            };
        };

        function closefn(self){
            var o = options,
                mocMessager = $(self).closest('.mocMessager'),
                H = Math.floor(mocMessager.mocActual('outerHeight')),
                showType = mocMessager.attr('showType');
            if (mocMessager.attr('dataType') == 'open'){
                if (showType === "slide") {
                    mocMessager.animate({'bottom': -H}, 750,function() {
                        mocMessager.remove();
                    });
                }else if (showType === "fade") {
                    mocMessager.fadeOut('1050', function() {
                        mocMessager.remove();
                    });
                };
            };
        };
        function okFn(){
            options.ok(this);
            closefn(this);
        }
        function cancelFn(){
            options.cancel(this);
            closefn(this);
        }

        // 执行事件 & 返回jQuery对象，便于Jquery的链式操作
        init();
        return self;
    };
}(jQuery));