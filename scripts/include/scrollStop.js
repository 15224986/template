/* 
 * 里面元素滚动到底外部容器的滚动条不滚动实例页面
*/
;(function($){
    $.fn.mocScrollStop = function() {
        return this.each(function() {
            var eventType = 'mousewheel';
            if (document.mozHidden !== undefined) {
                eventType = 'DOMMouseScroll';
            }
            $(this).on(eventType, function(event) {
                // 一些数据
                var scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    height = this.clientHeight;
                var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        
                if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                    // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                    this.scrollTop = delta > 0? 0: scrollHeight;
                    // 向上滚 || 向下滚
                    event.preventDefault();
                }        
            });
        });
    };
})(jQuery);