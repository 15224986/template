/**
 *
 * @effect      进度条 progress 的方法
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
        self.version = "1.00";
        // 定义默认参数
        self.defaults = {
            value: 0,
            min: 0,
            max: 100,
            speen: 550,
            type: '',
            barMin: false
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
    function _init(self,value){
        self.$element.each(function(index, el) {
            var valuenow = value || $(el).attr('progress-value') || self.options.value,
                valuemin = $(el).attr('progress-min') || self.options.min,
                valuemax = $(el).attr('progress-max') || self.options.max,
                dataType = $(el).attr('progress-type') || self.options.type,
                speen    = $(el).attr('progress-speen') || self.options.speen;
                barmin   = $(el).attr('progress-bar-min') || self.options.barMin;

            if ( dataType!==undefined ) {
                if ( Number(valuenow) < Number(valuemin) ) {
                    valuenow = valuemin;
                }
                var Width = Number(valuenow/valuemax*100);
                if ( _progressisMeet(Width) ) {
                    Width = parseFloat( Width.toFixed(2) );
                }
                if (Width>100) {
                    $(el).animate({width:"100%"}, speen);
                }else{
                    if (barmin && barmin> Width ) {
                        $(el).animate({width:barmin+"%"}, speen);
                    }else{
                        $(el).animate({width:Width+"%"}, speen);
                    }
                }
                $(el).children('.progress-val').text(valuenow);
            }else{
                if ( valuemax!==undefined ) {
                    if ( Number(valuenow) < Number(valuemin) ) {
                        valuenow = valuemin;
                    }
                    var Width = Number(valuenow/valuemax*100);
                    if ( _progressisMeet(Width) ) {
                        Width = parseFloat( Width.toFixed(2) );
                    }
                    if (Width>100) {
                        $(el).animate({width:"100%"}, speen);
                    }else{
                        if (barmin && barmin> Width ) {
                            $(el).animate({width:barmin+"%"}, speen);
                        }else{
                            $(el).animate({width:Width+"%"}, speen);
                        }
                    }
                    $(el).children('.progress-val').text(Width+"%");
                }else{
                    if ( Number(valuenow)>100 ) {
                        $(el).animate({width:"100%"}, speen);
                    }else{
                        if (barmin && barmin> Width ) {
                            $(el).animate({width:barmin+"%"}, speen);
                        }else{
                            $(el).animate({width:Width+"%"}, speen);
                        }
                    }
                    $(el).children('.progress-val').text(valuenow+"%");
                }
            }
        });
    }
    function _progressisMeet(val,length){
        var y = String(val).indexOf(".") + 1;
        var count = String(val).length - y;
        if (!length) {
            length = 2;
        };
        if( y>0 && count>=length ) {
            return true
        } else {
            return false;
        }
    }
    privateFunction.prototype.evaluate = function (value) {
        var self = this;
        _init(self,value);
    }
    //在插件中使用privateFunction对象
    $.fn.mocProgress = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);