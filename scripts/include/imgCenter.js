/* 
 * 图片居中
 *  
*/
;(function($){
    $.fn.mocImgCenter = function(options){
        return this.each(function(){
            var _this = $(this),
                img = _this.find("img"),
                maxHeight = _this.mocActual('height'),
                curHeight= img.mocActual('outerHeight');
            if (maxHeight>curHeight) {
                var paddingTop=(maxHeight-curHeight)/2+"px";
                img.css("padding-top",paddingTop);
            }
        });
    };
})(jQuery);