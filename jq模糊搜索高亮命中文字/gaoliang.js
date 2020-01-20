/**
 * Created by dell on 2018/2/28.
 */
(function ($) {
    $.fn.highlightText = function (content,option) {
        var defaults = {
            content     : content,                  // 高亮的内容  类型：String, Array, Number
            className   : 'is-highlight-text',      // 高亮添加的标签的类名
            listEndBack : false,                    // 标记完一条的回调
            endBack     : false                     // 标记完所有的回调
        };
        var options = $.extend(defaults, option);

        $(this).each(function(){
            var _this = $(this);
            /**
             * 清除上一次的样式
             * 找到所有highlight属性的元素；
             */
            _this.find("." + options.className ).each(function(){
                $(this).after($(this).text());
                $(this).remove(); //将他们的属性去掉；
            });

            /**
             * 判断是否为数组
             */
            if( $.isArray(options.content) ){
                if( options.content.length > 0 ){
                    $.each( options.content, function(index,value){
                        activeText(_this, value);
                    });
                }
            }else{
                activeText(_this, options.content);
            }
            if ( options.listEndBack && typeof(options.listEndBack)==="function" ) {
                options.listEndBack.call(this);
            };
        });
        if ( options.endBack && typeof(options.endBack)==="function" ) {
            options.endBack();
        };
        
        function activeText($self, contentText){
            if(contentText=='' || !contentText ){
                return false;
            }else{
                //创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了；
                var regExp = new RegExp("(" + contentText.replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
                var contentHtml = $self.html();
                //将找到的关键字替换，加上highlight属性；
                var newHtml = contentHtml.replace(regExp, '<em class="'+options.className+'">'+contentText+'</em>'); 
                //更新文章；
                $self.html(newHtml);
            }
        }        
    }
})(jQuery);