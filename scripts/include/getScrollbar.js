// js 获取滚动条的宽和高
WidgetFun.prototype.getScrollbar = function (options) {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflow: 'scroll'
        },
        i,
        scrollbar;
    for (i in styles){
        oP.style[i] = styles[i];
        oP.className = 'mocgetScrollbar';
    }
    document.body.appendChild(oP);
    if( options == "height" ){
        scrollbar = oP.offsetHeight - oP.clientHeight;
    }else if(options == "width"){
        scrollbar = oP.offsetWidth - oP.clientWidth;
    }
    $(".mocgetScrollbar").remove();
    return scrollbar;
};