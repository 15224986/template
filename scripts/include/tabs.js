/* 
 * tabs切换插件
 *  
*/
;(function($){
    $.fn.mocTabs = function(options){
        var defaults = {
            type            : 'easy',           // easy结构简单，使用简单，功能简单；tab常见的结构使用；for通过头部找到身体，没有父级限制
            index           : 0,                // 初始化的时候是第几个
            incident        : 'click',          // 事件
            startBack       : false,
            endBack         : false
        };
        var options = $.extend(defaults,options || {});
        // 版本号
        this.version ="1.0";
        
        return this.each(function(){
            var $self = $(this),
                Index = $self.attr('tabs-index') || options.index,
                incident = $self.attr('tabs-incident') || options.incident;

            if ( options.type ==='easy' ) {
                // 添加body
                $self.children().wrapAll('<div class="moc-tabs-body"></div>');
                var head = $("<div>", {
                    "class" : "moc-tabs-head"
                }).prependTo($self);
                var headUl = $("<ul>",{
                    "class" : "moc-tabs-ul"
                }).appendTo(head);
                // 添加head-list 并且添加状态
                var dom = $self.find('.moc-tabs-body [tabs-title]');
                dom.each(function(index, element) {
                    var tit = $(element).attr('tabs-title');
                    var headLi = $("<li>", {
                        text : tit
                    }).appendTo(headUl);
                });
                $self.find(".moc-tabs-body [tabs-title]").eq(Index).addClass("active");
                headUl.children('li').eq(Index).addClass('active');

                // 调用切换方法
                var tabsBtn  = $self.find(".moc-tabs-ul li"),
                    tabsList = $self.find(".moc-tabs-body [tabs-title]");
                tabs_toggle(tabsBtn,tabsList,incident);

            }else if ( options.type ==='tab' ) {
                $self.find('.moc-tabs-header .moc-tabs-btn').eq(Index).addClass("active");
                $self.find('.moc-tabs-bodier .moc-tabs-list').eq(Index).addClass("active");
                
                // 调用切换方法
                var tabsBtn  = $self.find('.moc-tabs-header .moc-tabs-btn'),
                    tabsList = $self.find('.moc-tabs-bodier .moc-tabs-list');
                tabs_toggle(tabsBtn,tabsList,incident);
            }else if ( options.type ==='for' ) {
                var bodierId = $self.attr('tabs-for');
                $self.children().eq(Index).addClass("active");
                $(bodierId).children().eq(Index).addClass("active");
                
                // 调用切换方法
                var tabsBtn  = $self.children(),
                    tabsList = $(bodierId).children();
                tabs_toggle(tabsBtn,tabsList,incident);
            }
        });
        function tabs_toggle(tabsBtn,tabsList,incident){
            tabsBtn.on(incident, function() {
                var i = $(this).index();
                // 回调函数
                if ( options.startBack && typeof(options.startBack)==="function" ) {
                    options.startBack(this);
                };
                // 操作执行
                $(this).addClass("active").siblings().removeClass("active");
                tabsList.eq(i).addClass("active").siblings().removeClass("active");
                // 回调函数
                if ( options.endBack && typeof(options.endBack)==="function" ) {
                    options.endBack(this);
                };
            });
        }
    };
})(jQuery);
