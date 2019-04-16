/**
 * 原型上添加的函数 
 * 数组去同、数组中的删除的方法、从数组中删除指定值元素的方法
 * 字符串原形上添加区分 全角、半角均视为是一个字符  汉字视为两个字符
 * 从字符串左边取 n 个字符
 */
// @koala-prepend "include/prototype.js"


/**
 * 简单的小功能，实用、方便、简单 (缺点：添加到了jq库中，容易与别的方法名冲突，尽量添加前缀)
 */
// @koala-prepend "include/extend.js"


/**
 * 挂在名下的方法，不与别的插件等冲突
 */
// @koala-prepend "include/widgetFun.js"

/**
 * 去除空格的方法、与小数相关、符串中的数字、清除字符串前面的所有0、Obj的深度拷贝
 * @requires 	依赖 widgetFun.js
 * @example    	例子 widget.html 挂在 moc 名下 小的方法
 */
// @koala-prepend "include/trim.js"

/**
 * 与判断浏览器相关的方法
 * @requires 	依赖 widgetFun.js
 * @example    	例子 widget.html js 判断浏览器类型
 */
// @koala-prepend "include/browser.js"

/**
 * 获取滚动条的宽和高
 * @requires 	依赖 widgetFun.js
 * @example    	例子 widget.html js 判断浏览器类型
 */
// @koala-prepend "include/getScrollbar.js"

/**
 * 随即获取字符串
 * @requires 	依赖 widgetFun.js
 * @example     例子 widget.html randomFlag
 */
// @koala-prepend "include/randomFlag.js"

/**
 * 日期、时间的公共方法
 * @requires   依赖 widgetFun.js
 * @example    例子 widget.html 日期的一些公共方法
 * koala-prepend "include/datetime.js"
 */
// 

/**
 * 浏览器全屏、退出全屏
 * @requires   依赖 widgetFun.js
 * @example    例子 widget.html 浏览器全屏显示
 */
// @koala-prepend "include/fullScreen.js"

/**
 * 弹出小的浏览器窗口
 * @requires   依赖 widgetFun.js
 * @example    例子 widget.html <a>打开链接的方式
 */
// @koala-prepend "include/openWin.js"


// 创建构造函数 WidgetFun 的实例对象
window.moc = new WidgetFun();









/**
 * 无法获取隐藏元素（display:none）宽度(width)和高度(height)的新解决方案
 */
// @koala-prepend "include/actual.js"


/**
 * 里面元素滚动到底外部容器的滚动条不滚动实例页面
 */
// @koala-prepend "include/scrollStop.js"


/**
 * tabs切换插件
 */
// @koala-prepend "include/tabs.js"


/**
 * 图片居中
 */
// @koala-prepend "include/imgCenter.js"


/**
 * 文字的个数限制，多余的用...代替
 */
// @koala-prepend "include/wordLength.js"


/**
 * 文本域限制文字个数
 */
// @koala-prepend "include/textareaMaxTxt.js"


/**
 * autosize textarea根据内容自动延伸
 */
// @koala-prepend "include/autosize.js"


/**
 * IE下实现placeholder效果和 contenteditable="true" 实现placeholder效果
 */
// @koala-prepend "include/placeholder.js"


/**
 * 表格的单元格合并and固定表头
 * @requires   依赖 actual.js
 */
// @koala-prepend "include/fixedtable.js"


/**
 * 弹出多项选择
 */
// @koala-prepend "include/multiSelect.js"


/**
 * mocAlert 模拟alert等弹出框
 */
// @koala-prepend "include/alert.js"


/**
 * mocMessager 消息弹出框
 */
// @koala-prepend "include/messager.js"


/**
 * Notification 通知
 */
// @koala-prepend "include/notification.js"


/**
 * mocActions 操作表（手机端使用）
 */
// @koala-prepend "include/actions.js"


/**
 * mocSmartMenu.js 智能上下文菜单插件
 */
// @koala-prepend "include/smartMenu.js"


/**
 * 返回顶部
 */
// @koala-prepend "include/goTop.js"


/**
 * 省市县三级联动
 * 
 * AreaData 需要的数据
 */
// @koala-prepend "include/AreaData.js"
// @koala-prepend "include/areaSelect.js"


/**
 * 向上无缝滚动（翻滚）或向左无缝滚动
 */
// @koala-prepend "include/listScroll.js"


/**
 * check 美化
 */
// @koala-prepend "include/check.js"


/**
 * lightbox图片放大
 */
// @koala-prepend "include/lightbox.js"


/**
 * 数字向上卷动的方法
 */
// @koala-prepend "include/numberRock.js"


/**
 * pagination 分页插件
 */
// @koala-prepend "include/pagination.js"


/**
 * mocProgress 进度条
 * radialIndicator 环形进度条
 */
// @koala-prepend "include/progress.js"
// @koala-prepend "include/radialIndicator.js"

/**
 * step 流程进度条
 */
// @koala-prepend "include/step.js"


/**
 * 时钟插件
 */
// @koala-prepend "include/clock.js"


/**
 * a不固定宽度的轮播图 moc-listSlider 的方法
 */
// @koala-prepend "include/listSlider.js"


/**
 * mocLoading 加载中的方法函数
 */
// @koala-prepend "include/loading.js"


/**
 * leftNav 左侧导航 left-nav 的事件
 */
// @koala-prepend "include/leftNav.js"


/**
 * mocCollapse 关闭展开 补充bootstrap的Collapse插件
 */
// @koala-prepend "include/collapse.js"


/**
 * rating 评分 事件
 */
// @koala-prepend "include/rating.js"


/**
 * mocKalendar 简单显示日历
 */
// @koala-prepend "include/kalendar.js"


/**
 * 复制一行 and 删除一行
 */
// @koala-prepend "include/cloneRow.js"


/**
 * div模拟输入框
 */
// @koala-prepend "include/contenteditable.js"


/**
 * input 前几位的值不可以改变
 */
// @koala-prepend "include/unchanged.js"


/**
 * InputNumber 计数器
 */
// @koala-prepend "include/inputNumber.js"


/**
 * jcountDown 倒计时
 */
// @koala-prepend "include/countDown.js"








/**
 * mocSelectInput 	下拉选择的输入框
 * mocFuzzy 		模糊搜索组件的各种事件
 * mocVersatility 	可选输入框组件的各种事件
 */
// @koala-prepend "include/selectInput.js"
// @koala-prepend "include/fuzzy.js"
// @koala-prepend "include/versatility.js"


/**
 * Cascader 级联选择器
 */
// @koala-prepend "include/cascader.js"


/**
 * 简单实用的方法
 */
// @koala-prepend "include/function.js"













