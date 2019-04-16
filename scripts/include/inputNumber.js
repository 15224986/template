/**
 *
 * @effect      InputNumber 计数器
 * @requires    jQuery
 * @Example     form.html
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
        	inputClass: '.inputNumber-input',
        	increaseClass: '.inputNumber-increase',
        	decreaseClass: '.inputNumber-decrease',
        	min: false,									// 设置计数器允许的最小值  类型：number
        	max: false,									// 设置计数器允许的最大值  类型：number
        	step: 1,									// 计数器步长  类型：number
        	precision: false,							// 数值精度  类型：number
            beforeCallBack: false,
            afterCallBack: false
        };
        self.options = $.extend({}, self.defaults, options);
        // 找到DOM,this是插件本身
        self.$element = $(ele);

        self.$element.each(function(index, el) {
        	if( self.options.precision ){
	    		var value = Number($(el).find(self.options.inputClass).val()).toFixed(self.options.precision);
	    		$(el).find(self.options.inputClass).val(value)
	    	}
        });

        // 调用事件
        _event(self);
    };
    function _event(self){
        $(document).on('click', self.options.increaseClass, function(event) {
        	event.preventDefault();
        	_calc(self,this,'+');
        });
        $(document).on('click', self.options.decreaseClass, function(event) {
        	event.preventDefault();
        	_calc(self,this,'-');        	
        });
    }
    function _calc(self,_this,typr){ 
    	/**
    	 * 获取当前值 状态
    	 */
    	var $element = $(_this).closest(self.$element);
    	if ( $element.find(self.options.inputClass).prop('disabled') ) {
    		return;
    	}
    	var oldVal = $element.find(self.options.inputClass).val();

    	/**
    	 * 从新获取参数
    	 */
    	var min = $element.data('min') || self.options.min,
    		max = $element.data('max') || self.options.max,
    		step= $element.data('step') || self.options.step;

    	/**
    	 * 计算
    	 */
    	var m = _accNum(oldVal,step);
    	if(typr==='+'){
    		var newVal = (oldVal*m + step*m)/m;
    		$element.find(self.options.decreaseClass).removeClass('disabled');
    	}else{
    		var newVal =  (oldVal*m - step*m)/m;
			$element.find(self.options.increaseClass).removeClass('disabled');
    	}
    	
    	/**
    	 * 设置计数器允许的值的范围
    	 */
    	if( min && newVal <= min ){
    		newVal = min;
    		$(_this).addClass('disabled');
    	}
    	if( max && newVal >= max ){
    		newVal = max;
    		$(_this).addClass('disabled');
    	}

    	/**
    	 * 数值精度
    	 */
    	if( self.options.precision ){
    		newVal = newVal.toFixed(self.options.precision);
    	}

    	// 计算前回调
    	if ( $.type(self.options.beforeCallBack) === 'function' ) {
        	self.options.beforeCallBack.call(_this,oldVal);
        }
        // 赋值
    	$element.find(self.options.inputClass).val(newVal);
    	// 计算后回调
    	if ( $.type(self.options.beforeCallBack) === 'function' ) {
    		self.options.afterCallBack.call(_this,Number(newVal));
    	}
    }
    /**
     * 获取有几位小数
     */
    function _accNum(num1, num2){
        var sq1, sq2, m;
		try {
		    sq1 = num1.toString().split(".")[1].length;
		} catch (e) {
		    sq1 = 0;
		}
		try {
		    sq2 = num2.toString().split(".")[1].length;
		} catch (e) {
		    sq2 = 0;
		}
		return Math.pow(10, Math.max(sq1, sq2));
    }

    //在插件中使用privateFunction对象
    $.fn.mocInputNumber = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);