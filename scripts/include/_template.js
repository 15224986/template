/* 
 * Cascader 级联选择器
 * 当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。
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
            data:[],                        // 可选项的数据源，格式参照示例说明  类型：Array  默认值：[]
            value:[],                       // 当前已选项的数据，格式参照示例说明  类型：Array  默认值：[]
            name:'cascader',                // 输入框的name  类型：String  默认值：' cascader '
            separator: ' / ',               // 选项分隔符  类型：String  默认值：' / '
            trigger: 'click',               // 次级菜单展开方式，可选值为 click 或 hover  类型：String  默认值：click
            changeSelect: false,            // 是否允许选择任意一级的选项  类型：Boolean  默认值：true
            clearable: true,                // 是否支持清除  类型：Boolean  默认值：true
            disabled: false,                // 是否禁用选择器  类型：Boolean  默认值：false
            placeholder: '请选择',           // 输入框占位符  类型：String  默认值：请选择
            beforeShow : false,             // 下拉框显示前触发的事件
            changeCallBack: false           // 当绑定值变化时触发的事件
        };
        self.options = $.extend({}, self.defaults, options);
        
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        
        //调用其方法
        self.init();

        _event(self);
    };

    /**
     * 调用插件
     */
    privateFunction.prototype.init = function () {
        var self = this;

        self.$element.each(function(index, el) {
            // 获取自身参数
            var data = eval( $(this).data('options') ) || self.options.data;
            var value = eval( $(this).data('value') ) || self.options.value;
            var disabled = $(this).attr('disabled') || self.options.disabled;
            var name = $(this).attr('name') || self.options.name;

            // 添加插件的类名
            $(this).addClass('cascader');

            /**
             * 生成主体部分
             */
            var cascaderRel = $('<div>', {
                class:'cascader-rel'
            }).appendTo($(this));
            if( disabled ){
                cascaderRel.addClass('disabled');
            }
            var inputText = $('<input>', {
                class:'cascader-input cascader-text',
                name:name+'Text',
                readonly:'readonly',
                type:'text'
            }).appendTo(cascaderRel);
            var inputValue = $('<input>', {
                class:'cascader-input cascader-value hide',
                name:name,
                readonly:'readonly',
                type:'hidden'
            }).appendTo(cascaderRel);
            // 下拉三角
            $('<span>', {
                class:'cascader-arrow'
            }).appendTo(cascaderRel);
            if(self.options.clearable === true ){
                $('<span>', {
                    class:'cascader-clear'
                }).appendTo(cascaderRel);
            }

            /**
             * 生成下拉按钮列表
             */ 
            var dropdown = $('<div>', {
                class:'cascader-dropdown'
            }).appendTo($(this));

            // 生成第一组选择按钮
            var menu = $('<ul>', {
                class:'cascader-menu'
            }).appendTo(dropdown);
            $.each(data, function(index,el){
                var item = $('<li>', {
                    class:'cascader-menu-item',
                    'data-value': el.value,
                    text: el.label,
                    'data-index': index
                }).appendTo(menu);
                // 判断是否有下一级
                if(el.children && el.children.length>0){
                    $('<i>', {
                        class:'cascader-menu-item-right'
                    }).appendTo(item);
                }
                // 添加自定义值
                if(el.data){
                    for (var key in el.data) {
                        item.attr(key, el.data[key]);
                    }
                }
                if(el.disabled){
                    item.addClass('disabled');
                }
            });

            /**
             * 添加默认选中值
             */
            if( $.type(value)==="array" && value.length>0 ){
                value.push('');
                var newData;
                // 添加已经赋值的样式
                $(this).addClass('cascader-show-clear');

                $.each(value, function(index,el){
                    var dataType = true;
                    // 当是第一个选中的值的时候，不用新生成dom结构
                    if( index === 0 ){
                        $.each(data, function(i,e){ // 循环数据
                            /**
                             * 找到选中的数据
                             */
                            if( el == e.value ){
                                newData = e.children;   // 获得下一级的数据
                                menu.children().eq(i).addClass('active');   // 给选中的添加样式
                                // 给input添加值
                                inputText.val(e.label);
                                inputValue.val(e.value);
                                dataType = false;
                            }
                        });
                    }else{
                        // 判断新的数据是不是一个数组，有没有子节点
                        if( $.type(newData)==="array" && newData.length>0 ){
                            var assMenu = $('<ul>', {
                                class:'cascader-menu'
                            }).appendTo(dropdown);
                            $.each(newData, function(i,e){      // 循环新的数据
                                /**
                                 * 生成新的dom结构
                                 */
                                var assItem = $('<li>', {
                                    class:'cascader-menu-item',
                                    'data-value': e.value,
                                    text: e.label,
                                    'data-index': i
                                }).appendTo(assMenu);
                                // 判断是否有下一级
                                if( e.children && e.children.length>0 ){
                                    $('<i>', {
                                        class:'cascader-menu-item-right'
                                    }).appendTo(assItem);
                                }
                                // 添加自定义值
                                if(e.data){
                                    for (var key in e.data) {
                                        assItem.attr(key, e.data[key]);
                                    }
                                }
                                if(e.disabled){
                                    assItem.addClass('disabled');
                                }
                                /**
                                 * 找到选中的数据
                                 */
                                if( el == e.value ){
                                    newData = e.children;   // 获得下一级的数据
                                    assItem.addClass('active');   // 给选中的添加样式
                                    // 给input添加值
                                    inputText.val( inputText.val()+self.options.separator+e.label);
                                    inputValue.val(inputValue.val()+','+e.value);
                                    dataType = false;
                                }
                            });
                        }
                    }

                    if(dataType){
                        newData=false;
                    }
                });
            }
        });
    };
    
    /**
     * 拆除插件的方法
     */
    privateFunction.prototype.destroy = function () {
        var self = this;
        self.$element.removeClass('cascader-show-clear cascader-visible').children().remove();
    }
    /**
     * 事件相关的
     */
    function _event(self){
        // 点击任意地方，弹出框消失
        $(document).on('click', function(event) {
            event.preventDefault();
            $(".cascader-visible").removeClass('cascader-visible');
            $(".cascader-dropdown").slideUp('400');
        });
        $(document).on('click', '.cascader', function(event) {
            event.stopPropagation();
            /* Act on the event */
        });
        // 点击显示下拉按钮
        $(document).on('click', '.cascader-rel:not(.disabled)', function(event) {
            event.preventDefault();
            var $dropdown = $(this).closest('.cascader').find('.cascader-dropdown');
            if( $dropdown.is(':hidden') ){
                // 下拉框显示前触发的事件
                if ( $.type(self.options.beforeShow) === 'function' ) {
                    self.options.beforeShow.call(this);
                }
                $('.cascader-dropdown').slideUp('400');
                // 下拉框显示
                $dropdown.slideDown('400').closest('.cascader').addClass('cascader-visible');
            }else{
                $dropdown.slideUp('400').closest('.cascader').removeClass('cascader-visible');
            }
        });

        // 点击选项
        $(document).on('click', '.cascader-menu-item:not(.disabled)', function(event) {
            event.preventDefault();

            var $dropdown = $(this).closest('.cascader-dropdown');
            var inputText = $(this).closest('.cascader').find('.cascader-text');
            var inputValue = $(this).closest('.cascader').find('.cascader-value');
            var changeSelect = $(this).closest('.cascader').attr('changeSelect') || self.options.changeSelect;

            _eventAddDom(self,$(this));

            var isLastMenu = false;

            if( $.type(newData)==="array" && newData.length>0 ){

            }else{
                // 关闭下拉按钮
                $dropdown.slideUp('400').closest('.cascader').removeClass('cascader-visible');
                isLastMenu = true;
            }

            if( changeSelect || isLastMenu ){
                // 获得已选的值，并进行显示
                var text = '';
                var value = '';
                $dropdown.find('.active').each(function(index, el) {
                    if( index>0 ){
                        text += self.options.separator+$(el).text();
                        value += ','+$(el).data('value');
                    }else{
                        text += $(el).text();
                        value += $(el).data('value');
                    }                     
                });
                inputText.val(text);
                inputValue.val(value);
                // 添加已经赋值的样式
                $(this).closest('.cascader').addClass('cascader-show-clear');

                // 下拉框显示前触发的事件
                if ( $.type(self.options.changeCallBack) === 'function' ) {
                    self.options.changeCallBack.call(this,value);
                }
            }
        });

        $(document).on('mouseenter mouseleave','.cascader-menu-item:not(.disabled)',function(event){
            var trigger = $(this).closest('.cascader').attr('trigger') || self.options.trigger;
            if( trigger !== 'hover' ){
                return;
            }
            if (event.type === 'mouseenter') {
                _eventAddDom(self,$(this));
            }else{
                // console.log('mouseleave');
            }
        });

        // 清空按钮的点击
        $(document).on('click', '.cascader-clear', function(event) {
            event.stopPropagation();
            $(this).closest('.cascader').removeClass('cascader-show-clear cascader-visible');
            $(this).closest('.cascader').find('.cascader-input').val('');
            $(this).closest('.cascader').find('.active').removeClass('active');
            $(this).closest('.cascader').find('.cascader-menu:not(:first)').remove();
            $(this).closest('.cascader').find('.cascader-dropdown').slideUp('400');
        });
    }
    var newData;
    function _eventAddDom(self,$this){
        // 获得要使用的dom
        var $dropdown = $this.closest('.cascader-dropdown');
        
        // dom操作
        $this.closest('.cascader-menu').nextAll().remove();
        $this.addClass('active').siblings().removeClass('active');

        // 找到下一组的数据
        var dataArr = eval( $this.closest('.cascader').data('options') ) || self.options.data;
        $dropdown.find('.active').each(function(index, el) {
            var i = $(el).data('index');
            dataArr = dataArr[i].children;
        });
        newData = dataArr;
        
        // 判断还有没有下一组数据，如果有生成dom。
        // 如果没有，进行赋值
        if( $.type(newData)==="array" && newData.length>0 ){
            // 生成下一组数据的盒子
            var assMenu = $('<ul>', {
                class:'cascader-menu'
            }).appendTo($dropdown);
            $.each(newData, function(i,e){      // 循环新的数据
                /**
                 * 生成新的dom结构
                 */
                var assItem = $('<li>', {
                    class:'cascader-menu-item',
                    'data-value': e.value,
                    text: e.label,
                    'data-index': i
                }).appendTo(assMenu);
                // 判断是否有下一级
                if( e.children && e.children.length>0 ){
                    $('<i>', {
                        class:'cascader-menu-item-right'
                    }).appendTo(assItem);
                }
                // 添加自定义值
                if(e.data){
                    for (var key in e.data) {
                        assItem.attr(key, e.data[key]);
                    }
                }
                if(e.disabled){
                    assItem.addClass('disabled');
                }
            });
        }
    }

    //在插件中使用privateFunction对象
    $.fn.mocCascader = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);


