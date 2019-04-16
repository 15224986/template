/**
 * 'page.html'弹出窗口的文件名；
 * 'newwindow'弹出窗口的名字（不是文件名），非必须，可用空''代替；
 * height=100窗口高度；
 * width=400窗口宽度；
 * top=0窗口距离屏幕上方的象素值；
 * left=0窗口距离屏幕左侧的象素值；
 * toolbar=no是否显示工具栏，yes为显示；
 * menubar，scrollbars表示菜单栏和滚动栏。
 * resizable=no是否允许改变窗口大小，yes为允许；
 * location=no是否显示地址栏，yes为允许；
 * status=no是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
 */
WidgetFun.prototype.openWin = function (fname, wname, width, height) {
    var w = width || 1200,
        h = height || 580;
    if ( w > $(window).width() ) {
        w = $(window).width();
    }
    if (h > $(window).height()) {
        h = $(window).height();
    }
    var t = ($(window).height()-h)/2,
        l =($(window).width()-w)/2;
    window.open (fname, wname, 'width='+w+', height='+h+', top='+t+',left='+l+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
};