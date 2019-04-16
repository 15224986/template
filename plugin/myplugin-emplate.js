/**
 *  关于插件的一些常用定义
 *
 *  self 用来定义插件本身
 *  _this 用来定义 this 就是元素
 *  $this 用来定义 $(this)
 *
 *  
 *
 *
 *
 *
 *
 * 
 */





/* 
 * 弹框等插件（点击按钮后执行的）的写法
*/
;(function($){
    'use strict';
    $.mocDialog = function(options){
        // 外部可配置参数
        var defaults = {
            'close' : false,
            'whetherCopy' : false,
            'lock': false
        };
        var options = $.extend(defaults,options || {});

        /**
         * 插件本身的信息 及参数
         */
        var self = this;
        self.version = "1.0";

        /**
         * 可外部调用的方法
         */
        self.Beautifier = function() {
            alert('也可以外部调用的方法');
        }
        
        // 开始执行
        ;(function(o){

            console.log(self.version);

            // 可外部调用的方法
            self.Beautifier();
            
            _privatefun();
            _atefun();
            // 通过外部通用的方法得到浏览器前缀
            var prefix = _prefixfn;

        }(options)); 
    };

    /* 
     * 定义私有方法
    */
    var _prefixfn = (function(){
        if (navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {
            return '-webkit-';
        }
        if (navigator.userAgent.indexOf("Firefox")>0) {
            return '-moz-';
        }
        if (!! window.opera &&  window.opera.version) {
            return '-o-';
        }
        if (/msie/i.test(navigator.userAgent)) {
            return '-ms-';
        }
        return false;
    })();
    var _privatefun = function(){
        alert("_privatefun()这样调用");
    };
    function _atefun(){
        alert("atefun()这样调用");
    }
})(jQuery);


/********************************************************** 分割线 *******************************************************************/
/* 
 * 自动执行的循环页面，所有的相同类名都执行的
*/
;(function($){
    'use strict';
    $.fn.mergeCell = function(options){
        // 外部可配置参数
        var defaults = {
            'close' : false,
            'whetherCopy' : false,
            'lock': false,
            callBack : $.noop
        };
        var options = $.extend(defaults,options || {});

        // 版本号
        var self = this;
        self.version = "1.0";

        /**
         * 可外部调用的方法
         */
        self.Beautifier = function() {
            alert('也可以外部调用的方法');
        }
        
        // 开始执行
        return self.each(function(){

            var _this = this;

            // 自身方法的调用
            self.Beautifier();

            // 方法的调用
            _callbackfn(_this);

            // 创建对话框结构
            _privatefun();

            // 通过外部通用的方法得到浏览器前缀
            var prefix = _prefixfn;

            if (typeof options.callBack === 'function') {
                options.callBack.call(_this);
            }
        });
        /* 
         * 定义私有方法 （与插件本身关系较大的，例如：涉及到结构、样式等）
        */
        function _callbackfn(_this){
            alert(_prefixfn);
        }
    };
    /* 
     * 定义私有方法与插件本身关系较小的，例如：参数的类型判断、浏览器的前缀等）
    */
    var _prefixfn = (function(){
        if (navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {
            return '-webkit-';
        }
        if (navigator.userAgent.indexOf("Firefox")>0) {
            return '-moz-';
        }
        if (!! window.opera &&  window.opera.version) {
            return '-o-';
        }
        if (/msie/i.test(navigator.userAgent)) {
            return '-ms-';
        }
        return false;
    })();
    var _privatefun = function(){
        alert("_privatefun()这样调用");
    };
})(jQuery);



/********************************************************** 分割线 *******************************************************************/
/* 
 * 自动执行的循环页面，所有的相同类名都执行的
*/
;(function($){
    'use strict';
    //定义privateFunction的构造函数
    var privateFunction = function(ele, options) {
        var self = this;
        // 版本号
        self.version = "1.01";

        // 定义默认参数
        self.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        };
        self.options = $.extend({}, self.defaults, options);
        
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        
        //调用其方法
        self.init();
        
    };

    /**
     * 内部私有的方法
     */
    function _option(){

    }
    function _closet(){

    }

    /**
     * 可以外部调用的公共方法
     */
    privateFunction.prototype.init = function () {
        var self = this,
            options = self.options;
            
        self.$element.each(function(index, el) {
            console.log( $(el).text() );
        });
        self.$element.css({
            'color': options.color,
            'fontSize': options.fontSize,
            'textDecoration': options.textDecoration
        });
        self.init2();
    }
    privateFunction.prototype.init3 = function () {
        var self = this;
        self.$element.css({
            'border-color':'blue'
        });
    }
    privateFunction.prototype.init2 = function () {
        var self = this;
        self.$element.css({
            'color': "blue"
        });
        self.init3();
    }

    //在插件中使用privateFunction对象
    $.fn.mocCheck = function(options, callback) {
        if (typeof options == 'function') { //重载
            callback = options;
            options = {};
        } else {
            options = options || {};
            callback = callback || function() {};
        }
        var privateFun = new privateFunction(this, options);
        callback(privateFun);
        return privateFun;
    }
})(jQuery);


/********************************************************** 分割线 *******************************************************************/
/* 
 * 表格的单元格合并and固定表头
*/
;(function($, window, document,undefined) {
    'use strict';
    var mocFixedtable = function (container, options) {
        if (!(this instanceof mocFixedtable)){
            return new mocFixedtable(container, options)
        };
        var defaults = {
            width:100,
            height:200
        };
        var options = $.extend( defaults,options || {} );

        // 插件本身
        var self = this;
        // version 版本号
        self.version = '1.0';
        
        /**
         * 准备-定义容器，判断页面内的个数,如果多余一个，从新调用
         */
        self.container = $(container);
        if (self.container.length === 0) return;
        if (self.container.length > 1) {
            self.container.each(function () {
                new mocFixedtable(this, options);
            });
            return;
        }

        /**
         * 获取插件自身配置的参数
         */
        var setting = self.container.attr('data-options'); 
        if ( setting && setting !== '' ) {
            setting = $.parseJSON(setting);
        }else{
            setting = {};
        }
        self.container.removeAttr('data-options');
        /**
         * 从新获取参数
         */
        // 配置参数
        self.params = {
            width : setting.width || options.width,
            height : setting.height || options.height
        };

        /**
         * Init/Destroy
         */
        self.init = function () {
            
            // console.log(self.params.width,self.params.height);

            /* 调用方法 */
            self.InitializeDom();
        };

        /**
         * 调用方法
         */
        self.InitializeDom = function () {
            self.beautify();
        };

        /**
         * Return mocFixedtable instance
         */ 
        self.init();
        return self;
    };
    // 可以在外部调用的方法
    mocFixedtable.prototype.beautify = function () {
        var self = this;
        console.log( self.params.width,self.params.height );
    }
    mocFixedtable.prototype.jisuan = function () {
        console.log("从新计算宽度");
    }
    window.mocFixedtable = mocFixedtable;

    // 插件的调用
    $(function(){
        var buttrn = new mocFixedtable('.btn',{
            "width" : 186,
            "height" : 360
        });
        buttrn.jisuan();
    })
})(jQuery, window, document);



