<template>
    <div>
        <div id="support"></div>
        <div id="contentHolder">
            <video id="video" width="320" height="320" autoplay>
            </video>
            <canvas style="display:none; background-color:#F00;" id="canvas" width="320" height="320">
            </canvas> <br />
            <button id="snap" @click="startPat" style="display:none; height:50px; width:120px;">开始扫描</button>
        </div>
    </div>
</template>

<script lang="ts">
// let scan = null;
// //点手机虚拟返回键
// document.addEventListener("plusready", function () {
//     // 注册返回按键事件
//     plus.key.addEventListener('backbutton', function () {
//         // 事件处理
//         scan.close();//关闭条码识别控件
//         window.history.back();
//     }, false);
// });
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class VueScan extends Vue {
  // codeUrl = ''
  // isShow = true
  // 这段代 主要是获取摄像头的视频流并显示在Video 签中
  canvas: any
  context: any = null
  video: any
  mounted() {
    // this.startScan() //进入页面就调取扫一扫
  }
  created() {
    // this.startRecognize();
    // this.startScan();
    let that = this
    window.addEventListener(
      'DOMContentLoaded',
      function() {
        try {
          that.canvas = document.getElementById('canvas')
          that.context = that.canvas.getContext('2d')
          that.video = document.getElementById('video')

          var videoObj = { video: true, audio: false },
            flag = true,
            MediaErr = function(error: any) {
              flag = false
              if (error.PERMISSION_DENIED) {
                alert('用户拒绝了浏览器请求媒体的权限')
              } else if (error.NOT_SUPPORTED_ERROR) {
                alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器')
              } else if (error.MANDATORY_UNSATISFIED_ERROR) {
                alert('指定的媒体类型未接收到媒体流')
              } else {
                alert(
                  '系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试'
                )
              }
            }
          let nav: any = navigator
          //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
          if (navigator.getUserMedia) {
            //qq浏览器不支持
            if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
              alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器')
              return false
            }
            navigator.getUserMedia(
              videoObj,
              function(stream) {
                that.video.src = stream
                that.video.play()
              },
              MediaErr
            )
          } else if (nav.webkitGetUserMedia) {
            nav.webkitGetUserMedia(
              videoObj,
              function(stream: any) {
                console.log(stream)
                // that.video.src = window.webkitURL.createObjectURL(stream)
                that.video.play()
              },
              MediaErr
            )
          } else if (nav.mozGetUserMedia) {
            nav.mozGetUserMedia(
              videoObj,
              function(stream: any) {
                that.video.src = window.URL.createObjectURL(stream)
                that.video.play()
              },
              MediaErr
            )
          } else if (nav.msGetUserMedia) {
            nav.msGetUserMedia(
              videoObj,
              function(stream: any) {
                // $(document).scrollTop($(window).height());
                that.video.src = window.URL.createObjectURL(stream)
                that.video.play()
              },
              MediaErr
            )
          } else {
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器')
            return false
          }
          if (flag) {
            alert(
              '为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能'
            )
          }
          // //这个是拍照按钮的事件，
          // $("#snap").click(function () { startPat(); }).show();
        } catch (e) {
          that.printHtml('浏览器不支持HTML5 CANVAS')
        }
      },
      false
    )
  }
  //开始拍照
  startPat() {
    let that = this
    setTimeout(function() {
      //防止调用过快
      if (that.context) {
        that.context.drawImage(that.video, 0, 0, 320, 320)
        that.catchCode()
      }
    }, 200)
  }
  //打印内容到页面
  printHtml(content: any) {
    console.log(content)
    // this..append(content + '<br/>')
  }
  //抓屏获取图像流，并上传到服务器
  catchCode() {
    if (this.canvas != null) {
      //以下开始编 数据
      var imgData = this.canvas.toDataURL()
      //将图像转换为base64数据
      var base64Data = imgData //.substr(22); //在前端截取22位之后的字符串作为图像数据
      //开始异步上
      debugger
      // $.post("saveimg.php", { "img": base64Data }, function (result) {
      //     printHtml("解析结果：" + result.data);
      //     if (result.status == "success" && result.data != "") {
      //         printHtml("解析结果成功！");
      //     } else {
      //         startPat();//如果没有解析出来则重新抓拍解析
      //     }
      // }, "json");
    }
  }
  //创建扫描控件
  // startRecognize () {
  //     let that = this;
  //     if (!window.plus) return;
  //     that.isShow = false;
  //     // 创建条码扫描识别控件
  //     scan = new plus.barcode.Barcode('bcid');
  //     // 条码识别成功
  //     scan.onmarked = onmarked;
  //     function onmarked (type, result, file) {
  //         switch (type) {
  //             case plus.barcode.QR:
  //                 type = 'QR';
  //                 break;
  //             case plus.barcode.EAN13:
  //                 type = 'EAN13';
  //                 break;
  //             case plus.barcode.EAN8:
  //                 type = 'EAN8';
  //                 break;
  //             default:
  //                 type = '其它' + type;
  //                 break;
  //         }
  //         result = result.replace(/\n/g, '');
  //         that.codeUrl = result;//扫描后返回值
  //         alert(result);
  //         scan.cancel();//关闭扫描
  //         scan.close();//关闭条码识别控件
  //         if (that.codeUrl) {
  //             that.isShow = true
  //         }
  //     }
  // }
  //开始扫描
  // startScan () {
  //     if (!window.plus) return;
  //     this.startRecognize()//创建控件
  //     scan.start();
  // }

  // cancelScan () {
  //     this.isShow = true;
  //     scan.cancel();//关闭扫描
  //     scan.close();//关闭条码识别控件
  // }
}
</script>
<style scoped>
</style>