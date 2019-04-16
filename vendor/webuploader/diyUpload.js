/*
 *  jQuery文件上传插件,封装UI,上传处理操作采用Baidu WebUploader;
 *  @Author 黑爪爪;
 */
(function( $ ) {

    $.fn.extend({
        /*
         *  上传方法 opt为参数配置;
         *  serverCallBack回调函数 每个文件上传至服务端后,服务端返回参数,无论成功失败都会调用 参数为服务器返回信息;
         */
        diyUpload:function( opt, serverCallBack ) {
            if ( typeof opt != "object" ) {
                alert('参数错误!');
                return;
            }

            var $fileInput = $(this);
            var $fileInputId = $fileInput.attr('id');

            // 组装参数;
            if( opt.url ) {
                opt.server = opt.url;
                delete opt.url;
            }
            // 当文件被加入队列之前触发
            if( opt.beforeQueued ) {
                var beforeQueuedCallBack = opt.beforeQueued;
                delete opt.beforeQueued;
            }
            // 当某个文件的分块在发送前触发
            if( opt.uploadBeforeSend ) {
                var uploadBeforeSendCallBack = opt.uploadBeforeSend;
                delete opt.uploadBeforeSend;
            }
            // 上传成功后回调
            if( opt.success ) {
                var successCallBack = opt.success;
                delete opt.success;
            }
            // 上传失败后回调
            if( opt.error ) {
                var errorCallBack = opt.error;
                delete opt.error;
            }
            //迭代出默认配置
            $.each( getOption( '#'+$fileInputId ),function( key, value ){
                opt[ key ] = opt[ key ] || value;
            });
            // 获取按钮相关的
            if ( opt.buttonText ) {
                opt['pick']['label'] = opt.buttonText;
                delete opt.buttonText;
            }
            // 调用上传插件
            var webUploader = getUploader( opt );
            // 判断浏览器是否支持
            if ( !WebUploader.Uploader.support() ) {
                alert( ' 上传组件不支持您的浏览器！');
                return false;
            }
            // 绑定文件加入队列事件;
            webUploader.on('beforeFileQueued', function( file ) {
                // 当文件被加入队列之前触发
                if ( beforeQueuedCallBack ) {
                    var type = beforeQueuedCallBack(file);
                    if( type === false ){
                        return false;
                    }
                }
            });

            // 绑定文件加入队列事件;
            webUploader.on('uploadBeforeSend', function( object , data ) {
                // 当文件被加入队列之前触发
                if ( uploadBeforeSendCallBack ) {
                    var type = uploadBeforeSendCallBack(data);
                    if( type === false ){
                        return false;
                    }
                }
            });

            // 绑定文件加入队列事件;
            webUploader.on('fileQueued', function( file ) {
                createBox( $fileInput, file ,webUploader, opt);
            });
            // 进度条事件
            webUploader.on('uploadProgress',function( file, percentage  ){
                var $fileBox = $('#fileBox_'+file.id);
                var $diyBar = $fileBox.find('.diyBar');
                $diyBar.show();
                percentage = percentage*100;
                showDiyProgress( percentage.toFixed(2), $diyBar);
            });
            //全部上传结束后触发;
            webUploader.on('uploadFinished', function(){
                $fileInput.next('.parentFileBox').children('.diyButton').remove();
            });
            //绑定发送至服务端返回后触发事件;
            webUploader.on('uploadAccept', function( object ,data ){
                if ( serverCallBack ) serverCallBack( data );
            });
            /**
             * 上传成功后触发事件;
             * @param  {[type]} file        dom树相关的信息
             * @param  {[type]} response    后台传递回来的路径等信息
             * @return {[type]}             成功后的回调
             */
            webUploader.on('uploadSuccess',function( file, response ){
                var $fileBox = $('#fileBox_'+file.id);
                var $diyBar = $fileBox.find('.diyBar');
                // 添加状态类名
                $fileBox.addClass('diyUploadSuccess');
                // 当echoType 是 hide的时候，隐藏上传结束的
                if ( opt.echoType === 'hide' ) {
                    $fileBox.fadeOut( 1000 );
                }
                // 添加状态类
                $fileBox.children('.diyType').text('上传成功');
                $diyBar.fadeOut( 1000 );
                // 是否可以重复上传
                if (opt.repeatType) {
                    webUploader.removeFile( file.id );
                }
                // 上传成功后回调
                if ( successCallBack ) {
                    successCallBack(response, file);
                }
            });
            //上传失败后触发事件;
            webUploader.on('uploadError',function( file, reason ){
                var $fileBox = $('#fileBox_'+file.id);
                var $diyBar = $fileBox.find('.diyBar');
                // 添加状态类名
                $fileBox.addClass('diyUploadError');
                // 当echoType 是 hide的时候，隐藏上传结束的
                if ( opt.echoType === 'hide' ) {
                    $fileBox.fadeOut( 1000 );
                }
                // 添加状态类
                $fileBox.children('.diyType').text('上传失败');
                // 进度条
                showDiyProgress( 0, $diyBar , '上传失败!' );
                var err = '上传失败! 文件:'+file.name+' 错误码:'+reason;
                // 是否可以重复上传
                if (opt.repeatType) {
                    webUploader.removeFile( file.id );
                }
                // 上传失败后回调
                if ( errorCallBack ) {
                    errorCallBack( err );
                }
            });
            //选择文件错误触发事件;
            webUploader.on('error', function( code ) {
                var text = '';
                switch( code ) {
                    case  'F_DUPLICATE' : text = '该文件已经被选择了!' ;
                        break;
                    case  'Q_EXCEED_NUM_LIMIT' : text = '上传文件数量超过限制!' ;
                        break;
                    case  'F_EXCEED_SIZE' : text = '文件大小超过限制!';
                        break;
                    case  'Q_EXCEED_SIZE_LIMIT' : text = '所有文件总大小超过限制!';
                        break;
                    case 'Q_TYPE_DENIED' : text = '文件类型不正确或者是空文件!';
                        break;
                    default : text = '未知错误!';
                        break;
                }
                alert( text );
            });
            
            /**
             * 编辑页面之前上传文件的删除事件
             */
            var $fileBox = $fileInput.next('.parentFileBox').find('li').find('.diyCancel-edit');
            $fileBox.on('click',function(event){
                event.preventDefault();
                var $li = $(this).closest('li');
                if ( typeof opt.removeList === 'function' ) {
                    opt.removeList.call($li);
                }
                // 清楚dom结构
                if ( $li.siblings('li').length <= 0 ) {
                    $li.parents('.parentFileBox').remove();
                } else {
                    $li.remove();
                } 
            });
        }
    });

    //Web Uploader默认配置;
    function getOption(objId) {
        /*
         *  配置文件同webUploader一致,这里只给出默认配置.
         *  具体参照:http://fex.baidu.com/webuploader/doc/index.html
         */
        return {
            // swf文件路径
            swf:'webuploader/swf/Uploader.swf',
            //按钮容器;
            pick:{
                id:objId,
                label:"选择文件"
            },
            // 显示回显类型 {string} [默认值："img"] img 带有缩略图的回显  files 文件名回显  hide 没有回显
            echoType:"img",
            // 是否可以重复上传 {Boolean} [默认值：false] 设置为 true 后，可以上传重复文件。
            repeatType:false
        };
    }

    /**
     * 实例化Web Uploader
     */
    function getUploader( opt ) {
        return new WebUploader.Uploader( opt );;
    }

    /**
     * 操作进度条
     */
    function showDiyProgress( progress, $diyBar, text ) {
        if ( progress >= 100 ) {
            progress = progress + '%';
            text = text || '上传完成';
        } else {
            progress = progress + '%';
            text = text || progress;
        }
        var $diyProgress = $diyBar.find('.diyProgress');
        var $diyProgressText = $diyBar.find('.diyProgressText');
        $diyProgress.width( progress );
        $diyProgressText.text( text );
    }

    /**
     * 取消事件
     */
    function removeLi ( $li ,file_id ,webUploader, opt) {
        if ( typeof opt.removeList === 'function' ) {
            opt.removeList.call($li);
        }
        webUploader.removeFile( file_id );
        // 清楚dom结构
        if ( $li.siblings('li').length <= 0 ) {
            $li.parents('.parentFileBox').remove();
        } else {
            $li.remove();
        }  
    }

    /**
     * 创建文件操作div
     */
    function createBox( $fileInput, file, webUploader, opt ) {
        var file_id = file.id;
        var $parentFileBox = $fileInput.next('.parentFileBox');

        // 添加父系容器;
        if ( $parentFileBox.length <= 0 ) {
            var div = '<div class="parentFileBox"> \
                        <ul class="fileBoxUl"></ul>\
                    </div>';
            $fileInput.after( div );
            $parentFileBox = $fileInput.next('.parentFileBox');
        }

        // 判断回显的类型
        if ( opt.echoType === 'img' ) {
            $parentFileBox.addClass('fileBox-img');
        }else if ( opt.echoType === 'files' ) {
            $parentFileBox.addClass('fileBox-files');
        }else if( opt.echoType === 'hide' ){
            $parentFileBox.addClass('fileBox-hide');
        }

        // 创建按钮
        if ( $parentFileBox.find('.diyButton').length <= 0 ) {
            var div = '<div class="diyButton"> \
                        <a class="diyStart" href="javascript:void(0)">开始上传</a> \
                        <a class="diyCancelAll" href="javascript:void(0)">全部取消</a> \
                    </div>';
            $parentFileBox.append( div );
            var $startButton = $parentFileBox.find('.diyStart');
            var $cancelButton = $parentFileBox.find('.diyCancelAll');
            // 如果是自动上传
            if (opt.auto){
                $startButton.text('暂停上传');
            }
            // 开始上传,暂停上传,重新上传事件;
            $startButton.on('click',function () {
                if ( $(this).text() === '开始上传' ){
                    webUploader.upload();
                    $(this).text('暂停上传');
                }else if( $(this).text() === '暂停上传' ){
                    webUploader.stop(true);
                    $(this).text('开始上传');
                }
            });
            // 绑定取消全部按钮;
            $cancelButton.on('click',function(){
                var fileArr = webUploader.getFiles('queued');
                $.each( fileArr ,function( i, v ){
                    removeLi( $('#fileBox_'+v.id), v.id, webUploader, opt );
                });
            });
        }

        // 添加子容器;
        var li = '<li id="fileBox_'+file_id+'"> \
                    <div class="viewThumb"></div> \
                    <div class="diyFileName">'+file.name+'</div>\
                    <div class="diyType">正在上传中...</div> \
                    <div class="diyCancel">删除</div> \
                    <div class="diyBar"> \
                            <div class="diyProgress"></div> \
                            <div class="diyProgressText">0%</div> \
                    </div> \
                </li>';
        $parentFileBox.children('.fileBoxUl').append( li );

        // 绑定取消事件;
        var $fileBox = $parentFileBox.find('#fileBox_'+file_id);
        $fileBox.children('.diyCancel').on('click',function(){
            removeLi( $(this).parent('li'), file_id, webUploader, opt );
        });

        /**
         * 如果显示缩略图的话
         * 1.生成缩略图
         * 2.计算宽度
         */
        if ( opt.echoType === 'img' ) {
            // 父容器计算宽度;
            // var $width = $('.fileBoxUl>li').length * 180;
            // var $maxWidth = $fileInput.parent().width();
            // $width = $maxWidth > $width ? $width : $maxWidth;
            // $parentFileBox.width( $width );

            // 如果不是图片，显示文件的图标
            if ( file.type.split("/")[0] != 'image' ) {
                var liClassName = getFileTypeClassName( file.name.split(".").pop() );
                $fileBox.addClass(liClassName);
                return;
            }
            // 如果是图片，显示图片的缩略图
            webUploader.makeThumb( file, function( error, dataSrc ) {
                if ( !error ) {
                    $fileBox.find('.viewThumb').append('<img src="'+dataSrc+'" >');
                }
            });
        }
    }

    /**
     * 获取文件类型
     */
    function getFileTypeClassName ( type ) {
        var fileType = {
            'pdf':'pdf',
            'zip':'zip',
            'rar':'rar',
            'csv':'csv',
            'doc':'doc',
            'docx':'doc',
            'rtf':'doc',
            'xls':'xls',
            'xlsx':'xls',
            'txt':'txt',
            'mp4':'avi',
            'mp3':'mp3'
        };
        var suffix = '_diy_bg';
        var file_type = fileType[type] || 'txt';
        return  file_type+suffix;
    }
})( jQuery );