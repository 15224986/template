
/**
 * 顶部导航
 */
Vue.component('page-header', {
    props: ['todo'],
    template: '<header id="page-header">'+
        '<div class="page-top">'+
            '<div class="mine">'+
                '<a class="mine-list" href="javascript:;">'+
                    '<span>王升库</span>'+
               '</a>'+
                '<a class="mine-list" href="javascript:;">'+
                    '<i class="fa fa-cog"></i>'+
                    '<span>个人设置</span>'+
                '</a>'+
                '<a class="mine-list" href="javascript:;">'+
                    '<i class="fa fa-power-off"></i>'+
                    '<span>退出系统</span>'+
                '</a>'+
           '</div>'+
        '</div>'+
        '<div class="page-nav">'+
            '<div class="logo">'+
                '<a href="index.html"><img src="images/logo-fchsoft.png" alt=""></a>'+
            '</div>'+
            '<div class="nav">'+
                '<a class="nav-btn active" href="index.html"><span>首页</span></a>'+
                '<a class="nav-btn" href="table.html"><span>表格</span></a>'+
                '<a class="nav-btn" href="form.html"><span>表单</span></a>'+
                '<a class="nav-btn" href="grid.html"><span>栅格</span></a>'+
                '<a class="nav-btn" href="辅助类.html"><span>辅助类</span></a>'+
                '<a class="nav-btn" href="图标icons.html"><span>图标</span></a>'+
                '<a class="nav-btn" href="布局容器.html"><span>布局容器</span></a>'+
                '<a class="nav-btn" href="按钮.html"><span>按钮</span></a>'+
            '</div>'+
        '</div>'+
    '</header>'
});



/**
 * 左侧导航
 */
Vue.component('left-nav', {
    props: ['todo'],
    template: '<ul class="left-nav left-nav-default">'+
        '<li><a href="index.html"><i class="icon icon-books"></i>组件集合</a>'+
            '<ul>'+
                '<li><a href="javascript:;" class="active">组件列表<i class="icon icon-left"></i></a></li>'+
                '<li><a href="rules.html">基本原则<i class="icon icon-left"></i></a></li>'+
            '</ul>'+
        '</li>'+
        '<li><a href="javascript:;"><i class="icon icon-books"></i>表格</a>'+
            '<ul>'+
                '<li><a href="table.html">基本实例</a></li>'+
                '<li><a href="table-fixed.html"><i class="icon icon-left"></i>固定表头</a></li>'+
                '<li><a href="table-sort.html"><i class="icon icon-left"></i>表头排序</a></li>'+
                '<li><a href="table-draggable.html"><i class="icon icon-left"></i>行排序</a></li>'+
                '<li><a href="table-extra.html"><i class="icon icon-left"></i>表格杂项</a></li>'+
            '</ul>'+
        '</li>'+
        '<li><a href="form.html"><i class="icon icon-books"></i>表单</a></li>'+
        '<li><a href="grid.html"><i class="icon icon-books"></i>栅格</a></li>'+
        '<li><a href="辅助类.html"><i class="icon icon-books"></i>辅助类</a></li>'+
        '<li><a href="图标icons.html"><i class="icon icon-books"></i>图标</a></li>'+
        '<li><a href="布局容器.html"><i class="icon icon-books"></i>布局容易</a></li>'+
        '<li><a href="按钮.html"><i class="icon icon-books"></i>按钮</a></li>'+
        '<li><a href="英文单词.html"><i class="icon icon-books"></i>英文单词</a></li>'+
        '<li><a href="bootstrap.html"><i class="icon icon-books"></i>bootstrap</a></li>'+
    '</ul>'
});


/**
 * 顶部连接
 */
Vue.component('head-link', {
    props: ['todo'],
    template: '<!-- IE 老版本浏览器支持css的新属性 -->'+
    '<!--[if lt IE 10]>'+
        '<script src="scripts/html5/html5shiv.js" type="text/javascript"></script>'+
        '<script src="scripts/html5/respond.min.js" type="text/javascript"></script>'+
    '<![endif]-->'+
    '<link rel="stylesheet" type="text/css" href="styles/css/global.css" />'+
    '<script type="text/javascript" src="scripts/jquery-1.11.3.min.js"></script>'+
    '<!-- 获取隐藏元素的宽高等 -->'+
    '<script type="text/javascript" src="scripts/actual/jquery.actual.min.js"></script>'+
    '<!-- 常用简单插件 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/widget/css/widget.css" />'+
    '<script type="text/javascript" src="scripts/widget/AreaData.js"></script>'+
    '<script type="text/javascript" src="scripts/widget/widget.js"></script>'+
    '<!-- 时间插件 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/My97DatePicker/skin/WdatePicker.css">'+
    '<script type="text/javascript" src="scripts/My97DatePicker/WdatePicker.js"></script>'+
    '<!-- 下拉插件 多选 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/select2-4.0.2/select2.css">'+
    '<script type="text/javascript" src="scripts/select2-4.0.2/select2.js"></script>'+
    '<script type="text/javascript" src="scripts/select2-4.0.2/select2-Initials.js"></script>'+
    '<!-- 多选和单选的美化 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/icheck/icheck.css">'+
    '<script type="text/javascript" src="scripts/icheck/icheck.js"></script>'+
    '<!-- ztree的组件 -->'+
    '<link rel="stylesheet" href="scripts/ztree/css/zTreeStyle.css" type="text/css">'+
    '<script type="text/javascript" src="scripts/ztree/jquery.ztree.all-3.5.min.js"></script>'+
    '<!-- 上传附件的组件 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/webuploader/css/webuploader.css">'+
    '<link rel="stylesheet" type="text/css" href="scripts/webuploader/css/diyUpload.css">'+
    '<script type="text/javascript" src="scripts/webuploader/js/webuploader.js"></script>'+
    '<script type="text/javascript" src="scripts/webuploader/js/diyUpload.js"></script>'+
    '<!-- 表单验证 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/Validform/Validform_v5.css">'+
    '<script type="text/javascript" src="scripts/Validform/Validform_v5.3.2.js"></script>'+
    '<!-- 图片放大插件 -->'+
    '<link rel="stylesheet" href="scripts/lightbox/css/lightbox.css" />'+
    '<script src="scripts/lightbox/js/lightbox.min.js"></script>'+
    '<!-- 分页器 -->'+
    '<script src="scripts/pagination/jquery.pagination.js"></script>'+
    '<!-- bootstrap 的 js -->'+
    '<script src="scripts/bootstrap/bootstrap.js"></script>'+
    '<!-- 流程进度条 -->'+
    '<script src="scripts/step/jquery.step.js"></script>'+
    '<!-- 环形进度条插件 -->'+
    '<script src="scripts/radialIndicator/radialIndicator.js"></script>'+
    '<!-- textarea根据内容自动延伸 -->'+
    '<script src="scripts/autosize/autosize.min.js"></script>'+
    '<!-- 鼠标右键菜单插件 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/smartMenu/smartMenu.css">'+
    '<script src="scripts/smartMenu/jquery-smartMenu-min.js"></script>'+
    '<!-- 轮播图 -->'+
    '<link rel="stylesheet" type="text/css" href="scripts/flexslider/scripts/flexslider/jquery.flexslider.css" />'+
    '<script type="text/javascript" src="scripts/flexslider/scripts/flexslider/jquery.flexslider-min.js"></script>'+
    '<!-- 两种字体图标 -->'+
    '<link rel="stylesheet" type="text/css" href="fonts/glyphicons/css/glyphicons.css" />'+
    '<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />'+
    '<!-- jquery-ui-abridged 由于jq-ui的方法很多用不上还会占用资源和与别的插件冲突，把不用的移除了 -->'+
    '<script type="text/javascript" src="scripts/jquery-ui-1.9.2/jquery-ui-abridged.js"></script>'+
    '<!-- 响应式图片 picture标签 解决IE等浏览器不支持 的问题 -->'+
    '<script type="text/javascript" src="scripts/picturefill/picturefill.min.js"></script>'+
    '<!-- css3 动画库 -->'+
    '<link rel="stylesheet" type="text/css" href="styles/animate.css" />'+
    '<!-- 项目需求的特殊样式 （放到最后） -->'+
    '<link rel="stylesheet" type="text/css" href="styles/css/item.css" />'+
    '<script type="text/javascript" src="scripts/common.js"></script>'
});

new Vue({
    el: '#page-container',
    data: {
        
    }
});



