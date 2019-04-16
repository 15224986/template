/*
 * Notification 通知
 */
;(function($, undefined){
    $.mocNotification = function(options){
        var defaults = {
            title: '通知',
            content: '内容', 
            duration: 5000,             // {类型：number 默认：5000} 是否自动关闭，若是0或false 则不自动关闭
            type: false,                // 四种通知类型：notification-success, notification-warning, notification-info, notification-error。通过type字段来设置，除此以外的将会以类名的形式添加到body上，默认为false。
            theme: 'top-right',         // 修改位置，宽度等：top-right、top-left、bottom-right、bottom-left，默认为top-right。
            showClose: true             // 将showClose属性设置为false即可隐藏关闭按钮。
        };
        var options = $.extend(defaults,options || {});
        // 定义自身
        var self = this;
        // 版本号
        self.version = "1.0";

        /**
         * 初始化
         */
        self.init = function(){
            // 盒子
            var notificationBox;

            if ( $(".moc-notification-box").length>0 ) {
                var boxType = true;
                $(".moc-notification-box").each(function(index, el) {
                    var theme = $(el).attr('data-theme');
                    if (theme===options.theme) {
                        notificationBox = $(el);
                        boxType = false;
                    }
                });
                if (boxType) {
                    notificationBox = $('<div>' ,{
                        class :'moc-notification-box '+options.theme,
                        'data-theme' : options.theme
                    }).appendTo('body');
                }
            }else{
                notificationBox = $('<div>' ,{
                    class :'moc-notification-box '+options.theme,
                    'data-theme' : options.theme
                }).appendTo('body');
            }

            var notification = $('<div>' ,{
                class :'moc-notification'
            }).appendTo(notificationBox);
            if ( options.title) {
                var notificationHead = $('<div>' ,{
                    class :'moc-notification-head'
                }).appendTo(notification);
                $('<p>' ,{
                    class :'moc-notification-title',
                    text : options.title
                }).appendTo(notificationHead);
            }
            if ( options.showClose ) {
                var closeBtn = $('<a>' ,{
                    class :'moc-notification-close',
                    html : '&times;'
                }).appendTo(notification);
                // 关闭按钮的点击事件
                closeBtn.on('click', function(event) {
                    event.preventDefault();
                    notification.animate({'margin-top': -height, 'opacity':0.6}, 500,function(){
                        notification.remove();
                    });
                });
            }
            var notificationBody = $('<div>' ,{
                class :'moc-notification-body',
                html : options.content
            }).appendTo(notification);

            // 添加倾向性
            if (options.type) {
                var notificationBody = $('<i>' ,{
                    class :'moc-notification-icon'
                }).prependTo(notification);
                notification.addClass(options.type);
            }

            notification.animate({'left': 0}, 500);
            var height = notification.mocActual('outerHeight',{includeMargin:true});
            if ( options.duration ) {
                setTimeout(function(){
                    notification.animate({'margin-top': -height, 'opacity':0.6}, 500, function(){
                        notification.remove();
                    });
                }, options.duration);
            }
        };

        // 初始化 且 返回jQuery对象，便于Jquery的链式操作
        self.init();
        return self;
    };
    
    /**
     * 简单的
     */
    $.mocAlertLog = function(options){
        // 外部可配置参数
        var defaults = {
            content:'显示的文字',  //提示框中显示的内容
            duration : 5000, //黑框显示后多长时间后消失
            top:'70%',  //弹出框距离顶部的拒离
            speeds : 300    //弹出时的动画时间
        };
        var options = $.extend(defaults,options || {});
        (function(o){
            var alertLog = $("<p>", {
                'class' : "mocAlertLog",
                text    : o.content
            }).appendTo($("body"));

            var cur = Number(-$(alertLog).mocActual('outerWidth')/2);
            alertLog.css({
                "left" : '50%',
                'margin-left': cur+'px'
            });
            // 显示方式
            alertLog.animate({
                top : o.top
            }, o.speeds, function(){
                var Top = alertLog.position().top;
                $(this).css('top', Top);
            });
            // 隐藏并且消失
            
            setTimeout(function(){
                var Top = alertLog.position().top-200;
                alertLog.animate({
                    'top': Top,
                    'opacity': 0
                }, o.speeds, function(){
                    $(this).remove();
                });
            },o.duration);
        }(options)); 
    };
}(jQuery));