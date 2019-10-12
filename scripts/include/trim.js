// 去除所有空格
WidgetFun.prototype.trimAll = function (val) {
    if(!val) {  
        return "";  
    };
    return val.replace(/\s/ig,''); 
};
// 去除左侧空格
WidgetFun.prototype.trimLeft = function (val) {
    if(!val) {
        return "";
    };
    return val.replace(/(^\s*)/g, "");
};
// 去除右侧空格
WidgetFun.prototype.trimRight = function (val) {
    if(!val) {
        return "";
    };
    return val.replace(/(\s*$)/g, "");
};
