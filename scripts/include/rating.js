/**
 *
 * @effect      rating 评分 事件
 * @requires    jQuery
 * @Example     index.html
 * @date
 *
 */
;(function($){
    //定义privateFunction的构造函数
    var privateFunction = function(ele, options) {
        var self = this;
        // 版本号
        self.version = "1.01";
        // 定义默认参数
        self.defaults = {
            'data':['1','2','3','4','5'],   // 类型：array                 生成的评价的数值
            'texts':false,                  // 类型：array                 生成的评价的数值对应的文字
            'theme': '',                    // 类型：string                皮肤样式
            'disabled': false,              // 类型：boolean               是否为禁用状态
            'allowHalf': false,             // 类型：boolean               是否允许半选
            'showText': false,              // 类型：boolean               是否显示辅助文字
            'showTextVal': '分'             // 类型：string || boolean     辅助文字的单位
        };
        self.options = $.extend({}, self.defaults, options);
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        /**
         * 生成结构
         */
        _init(self);
    };

    /**
     * 生成结构
     */
    function _init(self){
        $.each(self.options.data, function(index, el) {
            var ratingItem = $('<div>',{
                'class':'moc-rating',
                'text':el
            }).addClass(self.options.theme).appendTo(self.$element);
            if(self.options.texts){
                ratingItem.attr('data-text', self.options.texts[index]);
            }
            if(self.options.allowHalf){
                $('<span>',{
                    'class':'moc-rating-half'
                }).addClass(self.options.theme).appendTo(ratingItem);
            }
        });
        // 添加禁用状态
        self.disabled();
        
        // 是否显示辅助文字
        if ( self.options.showText ) {
            var ratingText = $('<p>',{
                'class':'moc-rating-text' 
            }).appendTo(self.$element);
            $('<span>',{
                'class':'moc-rating-text-val'
            }).prependTo(ratingText);
            if ( self.options.showTextVal ) {
                $('<span>',{
                    'class':'moc-rating-text-unit',
                    'text':self.options.showTextVal
                }).appendTo(ratingText);
            }
        }
        // 赋值
        self.value();
        // 添加事件
        _itemEvent(self);    
    }

    /*
     * 添加事件
     */
    function _itemEvent(self){
        // 定义事件的节点
        var $Item = self.$element.find('.moc-rating');
        // 鼠标经过事件
        $Item.on("mouseover mouseout", function(event){
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if(event.type == "mouseover"){
                $(this).siblings().removeClass("hover");
                $(this).addClass('hover').prevAll('.moc-rating').addClass('hover');
                // 辅助文字的变化
                if(self.options.showText){
                    if(self.options.texts){
                        var newValue = $(this).attr('data-text');
                    }else{
                        var newValue = $(this).text();
                    }
                    $(this).parent().find('.moc-rating-text').css('display','inline-block');
                    $(this).parent().find('.moc-rating-text-val').text(newValue);
                } 
            }else if(event.type == "mouseout"){
                $(this).removeClass('hover').siblings().removeClass('hover');
                // 辅助文字的变化
                if(self.options.showText){
                    if(self.options.texts){
                        var value = $(this).parent().find('input').attr('data-text');
                    }else{
                        var value = $(this).parent().find('input').val();
                    }
                    if( value == "" ){
                        $(this).parent().find('.moc-rating-text').hide();
                    }
                    $(this).parent().find('.moc-rating-text-val').text(value);
                }
            }
        });

        // 点击事件
        $Item.on("click", function(event){
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var value = $(this).text();
            $(this).parent().find('input').val(value);
            $(this).parent().find('.moc-rating-text-val').text(value);
            $(this).siblings().removeClass("active");
            $(this).addClass('active').prevAll('.moc-rating').addClass('active');
            // 辅助文字的变化
            if(self.options.showText){
                if(self.options.texts){
                    value = $(this).attr('data-text');
                }
                $(this).parent().find('input').attr('data-text', value);
                $(this).parent().find('.moc-rating-text').css('display','inline-block').children('.moc-rating-text-val').text(value);
            }
        });
        // 第一个选项的双击事件
        $Item.on("dblclick", function(event){
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if( $(this).prevAll('.moc-rating').length==0 ){
                $(this).removeClass('active');
                $(this).parent().find('input').val('');
                // 辅助文字的变化
                if(self.options.showText){
                    $(this).parent().find('input').removeAttr('data-text');
                    $(this).parent().find('.moc-rating-text').hide();
                }
            }
        });

        // 半选的鼠标经过事件
        var $Half = self.$element.find('.moc-rating-half');
        $Half.on("mouseover mouseout", function(event){
            event.stopPropagation();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var $dom = $(this).parent();
            if(event.type == "mouseover"){
                $dom.siblings().removeClass("hover");
                $dom.addClass('allow-half-hover').prevAll('.moc-rating').addClass('hover');
                // 辅助文字的变化
                if(self.options.showText){
                    if(self.options.texts){
                        var newValue = $dom.attr('data-text');
                    }else{
                        var newValue = $dom.text()-0.5;
                    }
                    $dom.parent().find('.moc-rating-text').css('display','inline-block');
                    $dom.parent().find('.moc-rating-text-val').text(newValue);
                } 
            }else if(event.type == "mouseout"){
                $dom.removeClass('allow-half-hover').siblings().removeClass('hover');
                // 辅助文字的变化
                if(self.options.showText){
                    if(self.options.texts){
                        var value = $dom.parent().find('input').attr('data-text');
                    }else{
                        var value = $dom.parent().find('input').val();
                    }
                    if( value == "" ){
                        $dom.parent().find('.moc-rating-text').hide();
                    }
                    $dom.parent().find('.moc-rating-text-val').text(value);
                }
            }
        });
        // 半选的点击事件
        $Half.on("click", function(event){
            event.stopPropagation();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var $dom = $(this).parent();
            var value = $dom.text()-0.5;
            $dom.parent().find('input').val(value);
            $dom.parent().find('.moc-rating-text-val').text(value);

            $dom.siblings().removeClass("active allow-half");
            $dom.addClass('active allow-half').prevAll('.moc-rating').addClass('active');
            // 辅助文字的变化
            if(self.options.showText){
                if(self.options.texts){
                    value = $dom.attr('data-text');
                }
                $dom.parent().find('input').attr('data-text', value);
                $dom.parent().find('.moc-rating-text').css('display','inline-block').children('.moc-rating-text-val').text(value);
            }
        });
        // 第一个选项的双击事件
        $Half.on("dblclick", function(event){
            event.stopPropagation();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var $dom = $(this).parent();
            if( $dom.prevAll('.moc-rating').length===0 ){
                $dom.removeClass('active allow-half');
                $dom.parent().find('input').val('');
                // 辅助文字的变化
                if(self.options.showText){
                    $dom.parent().find('input').removeAttr('data-text');
                    $dom.parent().find('.moc-rating-text').hide();
                }
            }
        });
    }
    
    /**
     * 验证是否为正整数
     */
    function _isInteger(value) {
        var patrn = /^\+?[1-9][0-9]*$/;
        if ( patrn.exec(value) == null || value == "" ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 赋值
     */
    privateFunction.prototype.value = function (data) {
        var self = this;
        if( Number(data) === 0 ){ // 只有在赋值的情况下 且 值为0的时候执行
            self.$element.find('.moc-rating').removeClass("active");
            self.$element.find('input').val('');
            self.$element.find('.moc-rating-text').hide().children('.moc-rating-text-val').text('');
        }else{
            self.$element.each(function(i, el) {
                var val = data-0 || $(el).find('input').val()-0;
                var ceilVal = Math.ceil(val);
                $(el).find('.moc-rating').each(function(index, element) {
                    if( ceilVal == $(element).text() ){
                        if ( self.options.allowHalf &&  _isInteger(val) ) {
                            $(element).addClass('active allow-half').prevAll('.moc-rating').addClass('active');
                        }else{
                            $(element).addClass('active').prevAll('.moc-rating').addClass('active');
                        }
                        $(element).nextAll('.moc-rating').removeClass("active");
                        // 赋值
                        $(el).find('input').val(val);
                        // 辅助文字
                        if(self.options.showText ){
                            if( self.options.texts ){
                                $(el).find('input').attr('data-text', self.options.texts[index]);
                                $(el).find('.moc-rating-text').css('display','inline-block').children('.moc-rating-text-val').text(self.options.texts[index]);
                            }else{
                                $(el).find('.moc-rating-text').css('display','inline-block').children('.moc-rating-text-val').text(val);
                            }
                        }
                    }
                });     
            });
        }      
    }
    /**
     * 禁用
     */
    privateFunction.prototype.disabled = function (value) {
        var self = this;
        if (value===undefined) {
            var state = self.$element.find('input').prop('disabled') || self.options.disabled;
        }else{
            var state = value;
        }
        if( state ){
            self.$element.find('.moc-rating').addClass('disabled');
            self.$element.find('input').prop('disabled', true);
        }else{
            self.$element.find('.moc-rating').removeClass('disabled');
            self.$element.find('input').prop('disabled', false);
        }          
    }

    //在插件中使用privateFunction对象
    $.fn.mocRating = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }

})(jQuery);

