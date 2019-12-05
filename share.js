$(function(){
  var localurl=window.location.href;//本地路径
	var a=localurl.lastIndexOf('/')
	var urlWeb=localurl.slice(0,a)
    // 分享给QQ好友
    // 判断设备类型
        var os = function (){ 
        　　var ua = navigator.userAgent, 
        　　isWindowsPhone = /(?:Windows Phone)/.test(ua), 
        　　isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
        　　isAndroid = /(?:Android)/.test(ua), 
        　　isFireFox = /(?:Firefox)/.test(ua), 
        　　isChrome = /(?:Chrome|CriOS)/.test(ua), 
        　　isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)), 
        　　isPhone = /(?:iPhone)/.test(ua) && !isTablet, 
        　　isPc = !isPhone && !isAndroid && !isSymbian; 
        　　return { 
        　　　　isTablet: isTablet, 
        　　　　isPhone: isPhone, 
        　　　　isAndroid: isAndroid, 
        　　　　isPc: isPc 
        　　}; 
        }();

	   var nativeShare = new NativeShare()
       var user_id=localStorage.getItem("user_id")
       var fid=localStorage.getItem("shareid")
       var imgs=localStorage.getItem("column")
       var text=localStorage.getItem("column_des")
        // var covers=localStorage.getItem("imgs")
         var turls=urlWeb+"/weiqi-guidance.html?id="+localStorage.getItem("lastcolumn")+"&fid="+fid;
        $("#qq_id").click(function(){
             var urls=window.location.href;
             if(localStorage.getItem("islogin")){
                $("#shadow1").fadeIn();
                $("#sure1").click(function(){
                      $("#shadow1").fadeOut();
                     var imgs=localStorage.getItem("column")
                     var text=localStorage.getItem("column_des")
                     if(os.isPc){
                          var p = {
                          url : urls, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                          desc:'',
                          //title : '新玩法，再不来你就out了！', /*分享标题(可选)*/
                          title:'小不点好学堂',
                          summary :text, /*分享摘要(可选)*/
                          pics :imgs, /*分享图片(可选)*/
                          flash : '', /*视频地址(可选)*/
                          site : "小不点好学堂", /*分享来源(可选) 如：QQ分享*/
                          style : '201',
                          width : 32,
                          height : 32
                      };
                      var s = [];
                      for ( var i in p) {
                          s.push(i + '=' + encodeURIComponent(p[i] || ''));
                      }
                      var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');
                      // return url;
                      window.location.href =url;
                      //document.write(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" >分享给QQ好友</a>' ].join(''));
                    // }
                     }
                    
                    var shareData = {
                        title: '小不点好学堂',
                        desc:text,
                        // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                        link: urls,
                        icon:imgs,
                        // 不要过于依赖以下两个回调，很多浏览器是不支持的
                        success: function() {
                            alert('success')
                        },
                        fail: function() {
                            alert('fail')
                        }
                    }
                    nativeShare.setShareData(shareData)
                    function call(command) {
                        try {
                            nativeShare.call(command)
                        } catch (err) {
                            // 如果不支持，你可以在这里做降级处理
                            alert(err.message)
                        }
                    }
                    function setTitle(title) {
                      nativeShare.setShareData({
                          title: title,
                      })
                    }
                     if(os.isAndroid || os.isPhone||os.isTablet){
                           if(ua.match(/MicroMessenger/i) != 'micromessenger'){
                           		call('qqFriend')
                           }  
                     }            
                     // 发送给好友
                      if(os.isAndroid || os.isPhone||os.isTablet){ 
                           if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                              $.ajax({
                                url:"http://s.coolndns.com/new/wechatshare",
                                type:"get",
                                data:{
                                   url:window.location.href
                                },
                                success(res){
                                  var date=JSON.parse(res);
                                  var appid=date.appId;
                                  var timestamp=date.timestamp;
                                  var noncestr=date.nonceStr;
                                  var signature=date.signature;
                                  wx.config({
                                      debug: false,
                                      appId: appid,
                                      timestamp: timestamp,
                                      nonceStr: noncestr,
                                      signature:signature,
                                      jsApiList: [
                                          'checkJsApi',
                                          'onMenuShareTimeline',
                                          'onMenuShareAppMessage',
                                          'onMenuShareQQ',
                                          'onMenuShareWeibo',
                                          'onMenuShareQZone',
                                      ]
                                  });
                                  var wstitle = "小不点好学堂";
                                  var wsdesc =text;
                                  var wslink =urls;
                                  var wsimg =localStorage.getItem("column");
                                  wx.ready(function(){
                                    // 分享到朋友圈
                                      wx.onMenuShareTimeline({
                                          title: wstitle,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });

                                      // 分享给朋友
                                      wx.onMenuShareAppMessage({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                            alert('分享成功');
                                          },
                                           cancel: function () {
                                                alert("已取消")
                                            }
                                      });

                                      // 分享到QQ
                                      wx.onMenuShareQQ({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });
                                      // 分享到QQ空间
                                      wx.onMenuShareQZone({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });        
                                  })
                                }
                              })
                             alert("点击右上角进行分享")
                           }
                          
                       } 
                  
                })
            }else{
                alert("请先登录在分享");
                location.href="login.html"
            }
      })
        // 微信分享 
        ua = window.navigator.userAgent.toLowerCase();
        $(".wx").click(function(){         
             if(localStorage.getItem("islogin")){ 
                $("#shadow2").fadeIn();
               $("#sure2").click(function(){
                  $("#shadow2").fadeOut();
                  var urll=window.location.href;
                  localStorage.setItem("erurl",urll)
                   var text=localStorage.getItem("column_des")
                    var shareData = {
                        title: '小不点好学堂',
                        desc:text,
                        // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                        link: urll,
                        icon: imgs,
                        // 不要过于依赖以下两个回调，很多浏览器是不支持的
                        success: function() {
                            alert('success')
                        },
                        fail: function() {
                            alert('fail')
                        }
                    }
                    nativeShare.setShareData(shareData)
                    function call(command) {
                        try {
                            nativeShare.call(command)
                        } catch (err) {
                            // 如果不支持，你可以在这里做降级处理
                            alert(err.message)
                        }
                    }
                    function setTitle(title) {
                      nativeShare.setShareData({
                          title: title,
                      })
                    }
                     if(os.isPc){  
                        location.href="wx.html"                
                     }
                     if(os.isAndroid || os.isPhone||os.isTablet){
                          if(ua.match(/MicroMessenger/i) != 'micromessenger'){
                          	call('wechatFriend')
                          }
                          
                     }
                     // 发送给好友
                    if(os.isAndroid || os.isPhone||os.isTablet){ 
                         if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                              $.ajax({
                                url:"http://s.coolndns.com/new/wechatshare",
                                type:"get",
                                data:{
                                   url:window.location.href
                                },
                                success(res){                                
                                  var date=JSON.parse(res);
                                  var appid=date.appId;
                                  var timestamp=date.timestamp;
                                  var noncestr=date.nonceStr;
                                  var signature=date.signature;
                                  wx.config({
                                      debug: false,
                                      appId: appid,
                                      timestamp: timestamp,
                                      nonceStr: noncestr,
                                      signature:signature,
                                      jsApiList: [
                                          'checkJsApi',
                                          'onMenuShareTimeline',
                                          'onMenuShareAppMessage',
                                          'onMenuShareQQ',
                                          'onMenuShareWeibo',
                                          'onMenuShareQZone',
                                      ]
                                  });
                                  var wstitle = "小不点好学堂";
                                  var wsdesc =text;
                                  var wslink =urll;
                                  var wsimg =localStorage.getItem("column");
                                  wx.ready(function(){
                                    // 分享到朋友圈
                                      wx.onMenuShareTimeline({
                                          title: wstitle,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });

                                      // 分享给朋友
                                      wx.onMenuShareAppMessage({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                            alert('分享成功');
                                          },
                                           cancel: function () {
                                                alert("已取消")
                                            }
                                      });

                                      // 分享到QQ
                                      wx.onMenuShareQQ({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });
                                      // 分享到QQ空间
                                      wx.onMenuShareQZone({
                                          title: wstitle,
                                          desc: wsdesc,
                                          link: wslink,
                                          imgUrl: wsimg,
                                          success: function () {
                                              alert('分享成功');
                                          },
                                          cancel: function () {
                                              alert("已取消")
                                          }
                                      });        
                                  })
                                } 
                           })
                           
                          // var num=Math.ceil(Math.random()*1000)
                            alert("点击右上角进行分享")
                        }
                    }
               })          
              }else{
                  alert("请先登录在分享")
                  location.href="login.html"
               }
        })           
       


})