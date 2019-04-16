/* 
 * 文字的个数限制，多余的用...代替
 *  
*/
;(function($){
    $.fn.mocWordLength = function(options){
        // 外部可配置参数
        var defaults = {
            length : 10
        };
        var options = $.extend(defaults,options || {});
        return this.each(function(){
            var self = $(this),
                maxLength = self.attr('wordLength-length') || options.length;
            if(self.text().length>maxLength){
                var titType = self.attr('wordLength-title')==="false"? false : true;
                if (titType) {
                    self.attr('title',self.text());
                }
                var txt = self.text().substring(0,maxLength)+'...';
                self.text(txt);
            }
        });
    };
})(jQuery);