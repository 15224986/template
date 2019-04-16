/* 
 * mocActions 操作表
*/
;(function($){
    $.mocActions = function(options){
        // 版本号
        var self = this;
        self.version = "1.0";

        // 定义默认参数
        self.defaults = {
            head        : true,
            title       : '请选择',
            data        : false,
            fail        : false,
            failText    : '取消'
        };
        self.options = $.extend({}, self.defaults, options);

        init(self);
        
    };
    function init(self){
        var overlay =  $('<div>', {
            'class' : "moc-actions-overlay"
        }).appendTo('body');

        var actions =  $('<div>', {
            'class' : "moc-actions-modal"
        }).appendTo('body');

        var content =  $('<div>', {
            'class' : "moc-actions-content"
        }).appendTo(actions);

        if(self.options.head){
            var head =  $('<div>', {
                'class' : "moc-actions-title",
                'html': self.options.title
            }).appendTo(content);
        }

        // 生成按钮列表
        var box =  $('<div>', {
            'class' : "moc-actions-box"
        }).appendTo(content);
        $.each(self.options.data,function(index, el) {
            var btn = $('<a>', {
                'class' : "moc-actions-btn",
                'href' : "javascript:;",
                'html': el.text
            }).addClass(el.theme).appendTo(box);

            $(btn).on('click',function(event) {
                event.preventDefault();
                if ( $.type(el.onClick) === 'function' ) {
                    el.onClick();
                }
                $(actions).removeClass('moc-actions-in');
                $(overlay).removeClass('moc-actions-in');
                setTimeout(function () {
                    $(actions).remove();
                    $(overlay).remove();
                }, 1000);
            });
        });

        if (self.options.fail) {
            var btns =  $('<div>', {
                'class' : "moc-actions-btns"
            }).appendTo(content);
            var failBtn = $('<a>', {
                'class' : "moc-actions-btn ctions-btn-fail",
                'href' : "javascript:;",
                'html': self.options.failText
            }).appendTo(btns);
            $(failBtn).on('click',function(event) {
                event.preventDefault();
                if( $.type(self.options.fail) === 'function' ){
                    self.options.fail();
                }
                $(actions).removeClass('moc-actions-in');
                $(overlay).removeClass('moc-actions-in');
                setTimeout(function () {
                    $(actions).remove();
                    $(overlay).remove();
                }, 1000);
            });
        }

        setTimeout(function () {
            $(actions).addClass('moc-actions-in');
            $(overlay).addClass('moc-actions-in');
        }, 10);
    }
})(jQuery);