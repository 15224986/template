/**
 *
 * @effect      左侧导航 left-nav 的事件
 * @requires    jQuery
 * @Example     index.html
 * @date
 *
 */
;(function($, window, document,undefined) {
    // 定义Beautifier的构造函数
    var privateFunction = function(ele, options) {
        // 版本号
        this.version = "1.01";
        // 定义默认参数
        this.defaults = {
            data: false,
            openCls: 'open',
            activeCls: 'active',
            beforeCallBack: false,
            afterCallBack: false
        };
        this.options = $.extend({}, this.defaults, options);
        // 找到DOM,this是插件本身
        this.element = ele;
        this.$element = $(ele);
        // 调用其方法
        this._init();
    };

    function buildMenu(arr,activeCls) {
        if( $.type( arr ) == "array" && arr.length>0 ){
            var str = "<ul>";
            $.each(arr, function (index, item) {
                // 获取属性的字符串
                var attrData = "";
                // 类名
                if( item.active ){
                    attrData+=' class="'+activeCls +'"';
                }
                // id
                if( item.id ){
                    attrData+=' id="'+item.id +'"';
                }
                // data-属性
                if( item.data ){
                    $.each(item.data, function(key, val) {
                        attrData+=' data-'+key+'="'+val +'"';
                    });
                }
                // href
                if( item.href ){
                    attrData+=' href="'+item.href +'"';
                }else{
                    attrData+=' href="javascript:;"';
                }
                // 循环结构
                if ( $.type( item.children ) == "array" ) {
                    str += '<li><a'+attrData+'>' + item.text + '</a>';
                    str += buildMenu(item.children, activeCls); //递归判断是不是object,直到不是li 
                    str += '</li>';
                }else {
                    str += '<li><a'+attrData+'>' + item.text + '</a></li>';
                }
            });
            str += "</ul>";
            return str;
        }
    }
    //定义Beautifier的方法
    privateFunction.prototype = {
        _init: function() {
            var activeCls = this.options.activeCls;
            // 判断是否生成dom结构
            this.$element.html( buildMenu(this.options.data, activeCls) );
            // 添加选中的类名
            this.$element.find('.'+ activeCls).parentsUntil(this.element).children('ul').addClass(this.options.openCls);
            this.$element.find('.'+ activeCls).parentsUntil(this.element).children('a').addClass(activeCls);
            this._type();
        },
        _type: function() {
            this.$element.find('li').each(function() {
                if ($(this).find('ul').length === 0) {
                    $(this).addClass('leaf');
                } else {
                    $(this).addClass('parent');
                }
            });
            this._click();
        },
        _click: function() {
            var self = this;
            self.$element.find('a').click(function(e) {
                var opts = self.options;
                if ( $.type(opts.beforeCallBack) === 'function' ) {
                    opts.beforeCallBack.call(this);
                }
                if ($(this).next().length > 0) {
                    e.preventDefault();
                    $(this).toggleClass(opts.activeCls);
                    $(this).next().slideToggle("slow");
                    $(this).parent().siblings().find('a').removeClass(opts.activeCls);
                    $(this).parent().siblings().find('ul').slideUp("slow", "linear", function(){
                        if ( $.type(opts.afterCallBack) === 'function' ) {
                            opts.afterCallBack.call(this);
                        }
                    });  
                }
            });
        }
    };
    //在插件中使用Beautifier对象
    $.fn.mocLeftNav = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery, window, document);