/* 
 * 加载中的方法函数
*/
;(function($){
    var mocLoadingTimer1 = 0;
    $.fn.mocLoading = function(options){
        // 版本号
        this.version = "1.0";
        // 参数
        var defaults = {
            time            : false,
            theme           : false,
            text            : '加载中...'
        };
        var options = $.extend(defaults,options || {});
        // 开始执行
        return this.each(function(){
            var self = this;
            startLoading(self);
            // 是否自动拆除加载中
            if ( options.time && !isNaN(options.time) ) {
                mocLoadingTimer1 = window.setTimeout(function(){
                    endLoading(self);
                },options.time);                    
            }
        });

        function startLoading(self){
            var Loading = $("<div>", {
                "class" : "moc-Loading"
            }).addClass(options.theme).appendTo(self);
            
            var content = $("<div>", {
                "class" : "moc-Loading-content"
            }).appendTo(Loading);

            $("<div>", {
                "class" : "moc-Loading-img"
            }).appendTo(content);
            
            $("<div>", {
                "class" : "moc-Loading-text",
                "text"  : options.text
            }).appendTo(content);

            // 判断是不是body标签
            if ( $(self).prop("tagName") === "BODY" ) {
                Loading.addClass('moc-page-Loading');
            } else {
                var pos = $(self).css('position');
                if ( pos === "static" ) {
                    $(self).addClass('moc-Loading-parent');
                } 
            }
        }
        function endLoading(self){
            $(self).find(".moc-Loading").remove();
            $(self).removeClass('moc-Loading-parent');
        }
    };

    // 加载结束
    $.fn.mocLoadingDestroy = function(options){
        // 版本号
        this.version = "1.0";
        // 参数
        var defaults = {
            callback    : false
        };
        var options = $.extend(defaults,options || {});
        // 开始执行
        return this.each(function(){
            var self = this;
            endLoading(self);
        });
        function endLoading(self){
            $(self).find(".moc-Loading").remove();
            $(self).removeClass('moc-Loading-parent');
            // 回调
            if ( typeof options.callback == 'function' ) {
                options.callback();
            }
            // 清空定时器
            window.clearTimeout(mocLoadingTimer1);
        }
    };
})(jQuery);



