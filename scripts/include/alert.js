/*
 * mocAlert 模拟alert等弹出框
 */
;(function($, undefined){ 
    // Global Queue
    var _Queue      = [];
    
    // Default Settings
    var _defaults = {
        content         : "你要提示的内容",     // 显示的内容  可以使html
        theme           : "mocAlert",         // 添加皮肤，在遮罩层上，可以通过类名隐藏遮罩层
        head            : true,               // 判断是否显示顶部的 head
        headTxt         : "系统提示",          // 顶部的标题文字
        closeBtn        : true,               // 是否显示顶部右侧的关闭按钮
        type            : false,              // 默认不显示，为false。有三种状态：success 成功、error 失败错误、warning 注意提醒
        buttonDone      : "确定",             // 确定按钮的文字
        buttonFail      : undefined,         // 取消按钮的文字
        input           : false,             // 是否含有输入框
        placeholders    : "请输入",          // 输入框的文字
        draggable       : true,              // 是否可以拖动。true:可以拖动。（ 依赖jquery-ui-abridged.js ）且 head不可以是false
        speed           : 350,              // 动画时间
        top             : "80px",           // 距离顶部的距离 如果为 middle 则在屏幕中间显示
        width           : undefined         // 设置宽度
    };
    
    $.mocAlertSetup = function(options){
        $.extend(true, _defaults, options);
    };
    
    $.mocAlert = function(options){
        if (typeof options !== "object"){
            options = { content : options};
        }
        // 获取参数
        var settings    = $.extend(true, {}, _defaults, options);

        /**
         * 工厂函数
         * deferred对象就是jQuery的回调函数解决方案
         */
        var retDeferred = $.Deferred();
        
        
        /**
         * 1.将所有的调用参数等都放进一个数组( _Queue )里
         * 2.通过 _ExecuteQueue() 方法进行操作，判断数组( _Queue )里面的数据个数
         *   如果存在返回第一个并且删除，
         *   如果不存在或页面中已经存在弹出框，则 return
         * 3.在当前的弹出框消失的时候后，继续调用 _ExecuteQueue() 方法进行操作
         *   这样就可以进行队列操作了
         */
        _Queue.push({
            settings    : settings,
            retDeferred : retDeferred
        });
        _ExecuteQueue();
        
        return retDeferred.promise();
    };
    
    function _ExecuteQueue(){
        if (_Queue.length === 0 || $("#mocAlert_overlay").length){
            return;
        }
        var q           = _Queue.shift();
        var settings    = q.settings;
        var retDeferred = q.retDeferred;
        
        // Overlay
        var overlay = $("<div>", {
            'class' : settings.theme,
            id  : "mocAlert_overlay"
        }).appendTo($("body"));
        
        // alert Box
        var mocAlert = $("<div>", {
            id  : "mocAlert"
        }).appendTo(overlay);
        
        if (settings.head) {
            var alertHead = $("<div>", {
                'class' : "mocAlert_head"
            }).appendTo(mocAlert);
            $("<p>", {
                'class' : "mocAlert_title",
                text    : settings.headTxt
            }).appendTo(alertHead).si;

            if (settings.closeBtn) {
                $("<a>", {
                    'herf' : 'javascript:;',
                    'class' : "mocAlert_close",
                    id      : "mocAlert_close",
                    text    : "x"
                }).on("click", _Button_Click).appendTo(alertHead);
            }else{
                $("<a>", {
                    'herf' : 'javascript:;',
                    'class' : "mocAlert_close hide",
                    id      : "mocAlert_close",
                }).on("click", _Button_Click).appendTo(alertHead);
            }
        }
        if (settings.width !== undefined){
            mocAlert.width(settings.width);
        }
        
        // Content
        var content = $("<div>", {
            id      : "mocAlert_content"
        }).appendTo(mocAlert);

        // 是否添加状态图标和动画
        if ( settings.type==="success" || settings.type==="error" || settings.type==="warning" ) {
            var contentTip = $("<div>", {
                'class'     : "mocAlert_content_tip"
            }).appendTo(content);
            content.addClass('mocAlert_tip');
            // 正确、成功状态
            if (settings.type==="success") {
                var suc =" <div class='mocAlert_success'>";
                    suc +=      "<div class='mocAlert_success_short'></div>";
                    suc +=      "<div class='mocAlert_success_long'></div>  ";      
                    suc +=  "</div>";
                contentTip.append(suc);
                content.addClass('mocAlert_tip_success');
            }else if(settings.type==="error"){
                var err  =   "<div class='mocAlert_error'>";
                    err +=  "       <div class='mocAlert_error_box'>";
                    err +=  "           <div class='mocAlert_error_left'></div>";
                    err +=  "           <div class='mocAlert_error_right'></div>";
                    err +=  "       </div>";
                    err +=  "   </div>";
                contentTip.append(err);
                content.addClass('mocAlert_tip_error');
            }else if(settings.type==="warning"){
                var warning  =   "<div class='mocAlert_warning'>";
                    warning +=  "       <div class='mocAlert_warning_box'>i</div>";
                    warning +=  "</div>";
                contentTip.append(warning);
                content.addClass('mocAlert_tip_warning');
            }  
        }

        $("<div>", {
            'class'     : "mocAlert_content_txt",
            html    : settings.content
        }).appendTo(content);

        
        // Input
        if (settings.input) {
            var inputBox = $("<div>", {
                'class' : "content_input_box"
            }).appendTo(content);
            $("<input>", {
                id      : "mocAlert_content_input",
                type    : "text",
                placeholder : settings.placeholders
            }).appendTo(inputBox);
            $("#mocAlert_content_input").trigger("focus");
        }
        
        // Buttons
        if (settings.buttonDone || settings.buttonFail ){
            var buttons = $("<div>", {
                id  : "mocAlert_buttons"
            }).appendTo(mocAlert);
            // 确定按钮
            if (settings.buttonDone){
                $("<a>", {
                    "herf" :"javascript:;",
                    id      : "mocAlert_button_done",
                    text    : settings.buttonDone
                }).on("click", _Button_Click).appendTo(buttons);
            }
            // 取消按钮
            if (settings.buttonFail){
                $("<a>", {
                    "herf" :"javascript:;",
                    id      : "mocAlert_button_fail",
                    text    : settings.buttonFail
                }).on("click", _Button_Click).prependTo(buttons);
            }
            // 判断是否加类名
            if(settings.buttonDone && settings.buttonFail){
                buttons.addClass('mocAlert_buttons_double');
            }
        }

        // 添加事件
        if ( $(document).draggable && settings.draggable && settings.head ) {
            mocAlert.draggable({
                handle: ".mocAlert_head"
            });
            alertHead.addClass('mocAlert_draggable');
        }
        // Attach Window Events Handlers
        $(window)
            .on("resize", {mocAlert : mocAlert}, _Window_Resize)
            .on("keydown", _Window_KeyDown)
            .triggerHandler("resize");
        
        // Save Data
        mocAlert.data("settings",       settings);
        mocAlert.data("retDeferred",    retDeferred);
        
        // Show alert Box
        if ( settings.top === "middle" ) {
            var mocAlertTop = ($(window).height()-mocAlert.height())/2;
            mocAlert.animate({
                top : mocAlertTop
            }, settings.speed);
        }else{
            mocAlert.animate({
                top : settings.top
            }, settings.speed);
        }    
    }
    
    
    // ******************************
    //  EVENTS
    // ******************************
    function _Button_Click(event){
        var $this       = $(event.currentTarget);
        var mocAlert    = $this.closest("#mocAlert");
        var settings    = mocAlert.data("settings");
        var retDeferred = mocAlert.data("retDeferred");
        mocAlert.animate({
            top : "-100%"
        }, settings.speed, function(){
            // Remove Window Events Handlers
            $(window)
                .off("resize", _Window_Resize)
                .off("keydown", _Window_KeyDown);
            // Remove Overlay
            $("#mocAlert_overlay").remove();
            // Resolve or Reject retDeferred
            if ($this.attr("id") === "mocAlert_button_done") {
                retDeferred.resolve(mocAlert.find("#mocAlert_content_input").val());
            } else {
                retDeferred.reject();
            }
            _ExecuteQueue();
        });
    }
    
    function _Window_Resize(event){
        var mocAlert = event.data.mocAlert;
        mocAlert.css("left", ($(event.currentTarget).width() - mocAlert.mocActual('outerWidth')) / 2);
        //mocAlert.css("top", ($(event.currentTarget).height() - mocAlert.outerHeight()) / 2);
    }
        
    function _Window_KeyDown(event) {
        if (event.keyCode === 27) {
            if (!$("#mocAlert_button_fail").trigger("click").length){
                if (!$("#mocAlert_close").trigger("click").length){
                    $("#mocAlert_button_done").trigger("click");
                }
            }
            return false;
        } else if (event.keyCode === 13) {
            $("#mocAlert_button_done").trigger("click");
            return false;
        }
    }
}(jQuery));