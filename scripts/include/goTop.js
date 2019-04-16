/* 
 * 返回顶部
*/
;(function($){
    $.mocGoTop = function(options){
        var dom = options || 'body,html';
        var win = window;
        var bod = 'body';
        if (dom != 'body,html' ) {
            bod = dom;
            win = dom;
        }
        // 生成dom元素
        var goTop = $("<div>", {
            'class' : "moc-goTop",
            'text'  : "Top"
        }).appendTo(bod);
        $("<span>").appendTo(goTop);
        
        // 点击回到顶部
        $(goTop).on('click', function(event) {
            event.preventDefault();
            $(dom).animate({ scrollTop: 0 }, 400);
        });

        // 滚动显示和隐藏
        $(win).on('scroll', function(event) {
            event.preventDefault();
            if ($(this).scrollTop()>($(this).mocActual('height')/2)) {
                $(goTop).fadeIn();
            }else{
                $(goTop).fadeOut();
            }
        });
    };
})(jQuery);