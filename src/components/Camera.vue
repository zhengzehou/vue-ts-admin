<template>
  <div class="animated fadeIn">
    <header id="header">
      <div class="nvbt iback" onclick="back()"></div>
      <div class="nvtt">Camera</div>
      <div class="nvbt idoc" onclick="openDoc('Camera Document','/doc/camera.html')"></div>
    </header>
    <div id="dcontent" class="dcontent">
      <!--<div class="button" onclick="changeIndex();">
				选择：<span id="display" style="color:#FF0000">主摄像头</span>
				<div style="width:0px;height:0px;overflow:hidden;"><select id="index">
					<option value='1' selected="true">主摄像头</option>
					<option value='2' >辅摄像头</option>
				</select></div>
			</div>-->
      <div class="button" @click="getImage()">拍照</div>
      <div class="button" @click="getVideo()">录像</div>
      <br />
      <!-- History list -->
      <ul id="history" class="dlist" style="text-align:left;">
        <li id="empty" class="ditem-empty">无历史记录</li>
      </ul>
      <br />
      <div class="button button-waring" @click="cleanHistory()">清空历史记录</div>
      <br />
    </div>
    <div id="output">
      Camera管理摄像头设备，可用于拍摄照片、录制视频文件。
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import clickoutside from '@/directives/CustomDirectives'
let win: any = window
let plus: any = win.plus

var i = 1,
  gentry: any = null,
  w: any = null
var hl: any = null,
  le: any = null,
  de: any = null,
  ie: any = null
var unv = true
var bUpdated = false //用于兼容可能提前注入导致DOM未解析完更新的问题

@Component
export default class Camera extends Vue {
  codeUrl = ''
  changeIndex() {
    console.log('选择摄像头：')
    ie.focus()
  }
  indexChanged() {
    de.innerText = ie.options[ie.selectedIndex].innerText
    i = parseInt(ie.value)
    console.log(de.innerText)
  }
  // 拍照
  getImage() {
    let that = this
    console.log('开始拍照：')
    var cmr = plus.camera.getCamera()
    cmr.captureImage(
      function(p: any) {
        console.log('成功：' + p)
        plus.io.resolveLocalFileSystemURL(
          p,
          function(entry: any) {
            that.createItem(entry)
          },
          function(e: any) {
            console.log('读取拍照文件错误：' + e.message)
          }
        )
      },
      function(e: any) {
        console.log('失败：' + e.message)
      },
      { filename: '_doc/camera/', index: 1 }
    )
  }
  // 录像
  getVideo() {
    let that = this
    console.log('开始录像：')
    var cmr = plus.camera.getCamera()
    cmr.startVideoCapture(
      function(p: any) {
        console.log('成功：' + p)
        plus.io.resolveLocalFileSystemURL(
          p,
          function(entry: any) {
            that.createItem(entry)
          },
          function(e: any) {
            console.log('读取录像文件错误：' + e.message)
          }
        )
      },
      function(e: any) {
        console.log('失败：' + e.message)
      },
      { filename: '_doc/camera/', index: i }
    )
  }
  // 显示文件
  displayFile(li: any) {
    if (w) {
      console.log('重复点击！')
      return
    }
    if (!li || !li.entry) {
      console.log('无效的媒体文件')
      return
    }
    var name = li.entry.name
    var suffix = name.substr(name.lastIndexOf('.'))
    var url = ''
    if (
      suffix == '.mov' ||
      suffix == '.3gp' ||
      suffix == '.mp4' ||
      suffix == '.avi'
    ) {
      //if(unv){plus.runtime.openFile('_doc/camera/'+name);return;}
      url = '/plus/camera_video.html'
    } else {
      url = '/plus/camera_image.html'
    }
    w = plus.webview.create(url, url, {
      hardwareAccelerated: true,
      scrollIndicator: 'none',
      scalable: true,
      bounce: 'all'
    })
    w.addEventListener(
      'loaded',
      function() {
        w.evalJS('loadMedia("' + li.entry.toLocalURL() + '")')
        //w.evalJS('loadMedia("'+'http://localhost:13131/_doc/camera/'+name+'")');
      },
      false
    )
    w.addEventListener(
      'close',
      function() {
        w = null
      },
      false
    )
    w.show('pop-in')
  }

  // 添加播放项
  createItem(entry: any) {
    var li: any = document.createElement('li')
    li.className = 'ditem'
    li.innerHTML =
      '<span class="iplay"><font class="aname"></font><br/><font class="ainf"></font></span>'
    li.setAttribute('onclick', 'displayFile(this)')
    hl.insertBefore(li, le.nextSibling)
    li.querySelector('.aname').innerText = entry.name
    li.querySelector('.ainf').innerText = '...'
    li.entry = entry
    this.updateInformation(li)
    // 设置空项不可见
    le.style.display = 'none'
  }
  // 获取录音文件信息
  updateInformation(li: any) {
    if (!li || !li.entry) {
      return
    }
    var entry = li.entry
    entry.getMetadata(
      function(metadata: any) {
        li.querySelector('.ainf').innerText = metadata.modificationTime
      },
      function(e: any) {
        console.log('获取文件"' + entry.name + '"信息失败：' + e.message)
      }
    )
  }
  // 获取录音历史列表
  updateHistory() {
    if (bUpdated || !gentry || !document.body) {
      //兼容可能提前注入导致DOM未解析完更新的问题
      return
    }
    var reader = gentry.createReader()
    let that = this
    reader.readEntries(
      function(entries: any) {
        for (var i in entries) {
          if (entries[i].isFile) {
            that.createItem(entries[i])
          }
        }
      },
      function(e: any) {
        console.log('读取录音列表失败：' + e.message)
      }
    )
    bUpdated = true
  }
  // 清除历史记录
  cleanHistory() {
    hl.innerHTML = '<li id="empty" class="ditem-empty">无历史记录</li>'
    le = document.getElementById('empty')
    // 删除音频文件
    console.log('清空拍照录像历史记录：')
    gentry.removeRecursively(
      function() {
        // Success
        console.log('成功！')
      },
      function(e: any) {
        console.log('失败：' + e.message)
      }
    )
  }

  mounted() {
    this.$nextTick(() => {})
  }
  plusReady() {
    // 获取摄像头目录对象
    plus.io.resolveLocalFileSystemURL(
      '_doc/',
      function(entry: any) {
        entry.getDirectory(
          'camera',
          { create: true },
          function(dir: any) {
            gentry = dir
            // updateHistory()
          },
          function(e: any) {
            console.log('Get directory "camera" failed: ' + e.message)
          }
        )
      },
      function(e: any) {
        console.log('Resolve "_doc/" failed: ' + e.message)
      }
    )
  }
  created() {
    let that = this
    if (win.plus) {
      this.plusReady()
    } else {
      document.addEventListener('plusready', this.plusReady, false)
    }
    // 监听DOMContentLoaded事件
    document.addEventListener(
      'DOMContentLoaded',
      function() {
        // 获取DOM元素对象
        hl = document.getElementById('history')
        le = document.getElementById('empty')
        de = document.getElementById('display')
        if ((ie = document.getElementById('index'))) {
          ie.onchange = that.indexChanged()
        }
        // 判断是否支持video标签
        unv = !document.createElement('video').canPlayType
        // updateHistory()
      },
      false
    )
  }
}
</script>
<style>
* {
  -webkit-user-select: none;
  -ms-touch-select: none;
  /*
	-ms-touch-action: none;
*/
}
html {
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial;
  font-size: 16px;
  color: #6c6c6c;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: none;
}
header {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 17px;
  text-align: center;
  line-height: 44px;
  background: #d74b28;
  /*background: -webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8));*/
  z-index: 9999;
  /*border-bottom: 1px solid rgba(215,75,40,0.8);*/
  -ms-touch-action: none;
}
.nvbt {
  width: 15%;
  height: 100%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nvbt:active {
  background-color: rgba(170, 170, 170, 0.1);
}
.nvtt {
  width: 70%;
  height: 100%;
  color: #cccccc;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  text-align: center;
  padding-top: 44px;
}
.scontent {
  width: 100%;
  position: fixed;
  top: 44px;
  bottom: 0px;
  text-align: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-touch-action: pan-y cross-slide-y;
  -ms-scroll-chaining: none;
  -ms-scroll-limit: 0 50 0 50;
}
.dcontent {
  text-align: center;
  padding-top: 44px;
  padding-bottom: 80px;
}
.sdcontent {
  width: 100%;
  position: fixed;
  top: 44px;
  bottom: 80px;
  text-align: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-touch-action: pan-y cross-slide-y;
  -ms-scroll-chaining: none;
  -ms-scroll-limit: 0 50 0 50;
}
.heading {
  margin: 0 1em;
  text-align: left;
}
.des {
  padding: 0 1em;
  text-align: left;
  text-indent: 2em;
  word-break: break-all;
}
.logo {
  width: 100%;
  text-align: center;
}
.button {
  font-size: 18px;
  font-weight: normal;
  text-decoration: none;
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  background-color: #ffcc33;
  border: 1px solid #ecb100;
  padding: 0.5em 0em;
  margin: 0.5em 0.7em;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.button:active {
  outline: 0;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.button-waring {
  color: #666;
  background-color: #ebebeb;
  border-color: #e0e0e0;
}
.button-select {
  font-size: 14px;
  background-color: #cccccc;
  border: 0;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}
.dlist {
  padding: 0px;
  margin: 1em;
  background: #fff;
  border: 1px solid #ddd;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
.ditem {
  overflow: hidden;
  list-style-type: none;
  font-size: 1em;
  padding: 1em;
  border-bottom: inset 1px #ebebeb;
  vertical-align: middle;
}
.ditem:active {
  background: #f4f4f4;
}
.ditem:last-child {
  border-bottom: inset 0px #ebebeb;
}
.ditem-empty {
  overflow: hidden;
  list-style-type: none;
  font-size: 1em;
  padding: 1em;
  vertical-align: middle;
}
#output {
  height: 64px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: #f00;
  background: #fff;
  font-size: 12px;
  line-height: 16px;
  word-break: break-all;
  z-index: 6666;
  padding: 8px 16px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-top: 2px solid #aaa;
  -webkit-overflow-scrolling: touch;
}
.iback {
  background: no-repeat center center
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABYCAYAAAADWlKCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAKwwAACsMBNCkkqwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xMi8xM5w+I3MAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAACcklEQVR4nO3a0XESURiG4TeO99iBWoGZ+RvADtKBpAPtwBLsANJBrEAs4MyYDmIHSQXkgk0mMLK7ILt8/+F778ici394OGfDsher1Qqn05tTD+A2M4hYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYb089wNCVUq6Ay+blfUQsTjhOZxc1P9tbSlkAX7b+/C0ifpxgnF5Ve2TtwAD4OvIoe1UlSAsGwPsRR9m76kA6MAD+jjTKQVUF0gMD4HaEUQ6umot6T4ybiJgNP83hVbFDasGACnZIT4yfEXE1wjj/Xeod0hPjDpgNPsyRSguyB8Y0Ih6Gn+g4pQSpFQMSgtSMAclAaseARCDngAFJQM4FAxKAnBMGiH8xLKVMgV89ln6MiPthpxkn6R0SEUvgusfSZSnlsnuZftI75LlSygyYdyx7ZH1s/Rl+ouFKAQIvx9ctMGlZlh4lDQhAcywtqRhF+hqyXfMmT1m/6buasL6mzMaY6dilAoENlLuWZRNgnhEl1ZH1ulLKO9bH16eOpdfqz2K9Lt0Oea75EjilfadAsp2SFgQ2UH53LJ2XUr4PPtARSntkbVfL7+rVgEBvlM/NHQDJUh9Z2zWf/puOZbPhJzm8qkDgBaXt/teHcSY5rOpAAJp/c/vclJSrShDYifKI+NPvVV3U/1VzU3LavFyo/25SPUi2qj2ysmYQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsZ4Ak9fPFwUy/HsAAAAASUVORK5CYII=);
  background-size: 50px 44px;
}
.idoc {
  background: no-repeat center center
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABYCAYAAAADWlKCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAKwwAACsMBNCkkqwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xMi8xM5w+I3MAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAC2klEQVR4nO3bMU9TURjG8T9qIpskDjqYUAejm5B3MS4yOJoUNzd0dCJ+Av0IMrrVTSfK5oiT05vAJG64OUp0carDOdBbjLWBYp+W55fckHC5Nyf8c+5pk3Pner0epuPCpAdggxxEjIOIcRAxDiLGQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEXNp0gMYVWY+BV4DO0AX2I6InYkO6gzMqe9czMwFSog2JcQqsFBPfwW2gW5EdCcywDGTDpKZS0AH6AGPgW/APeAi8AhYAZYal2zRD7T//0Y6PrJBGo+oTeAFME+ZHdfqnxwA+8AP4EY9t8Lg7Dl8tE3N7JEMkpkdYA14FhGdzGwBT4DLQy77Qgl0FXhICdSq5w6oM4cSaH/8ox4P1UV9DXhLWcABrgCfKf/ghb9cc7seUOI8B34CQZk5q5R1iMzcpQTqqH0wUJ0hzUEdLdz15zywSIlzZ4Tb/QL2KLPnFnCfxuyJiLlxjHlcpiHIcQMLd2YuUsK0gOsj3P4rJdAncJCR/CNI08DCnZnzlMdWi+GPN4BXoBdk2r+pLwLrwGaN+A5YBnYjYgN4A3ygzIipoLqon1SbPxfubkS8r797ObmhjWbWgjTdrcc6IPVYGmbaH1kzx0HEOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIgYBxHjIGJUgyzTfznnXJHcBlQ3QO8A1J3vbfobpsfp+5jvd2qSQZrqqwMb9SAz2/TfBWmd8LZ7lFnoIKcVEVuUDdeHb1gdBloadl3DdkR8PKPhnZrkZuuTqO8iNmfP0UZrtQ3Vw8xMkOMy8wElzmpE3Jz0eEY1s0GmlerH3nPLQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEeMgYhxEjIOI+Q2gWbiBmTXKQQAAAABJRU5ErkJggg==);
  background-size: 50px 44px;
}

.aname {
  font-size: 16px;
}
.ainf {
  font-size: 12px;
}
.iplay {
  display: block;
  background: no-repeat right center
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABYCAYAAAADWlKCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAKwwAACsMBNCkkqwAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOS8xMi8xM5w+I3MAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAD9UlEQVR4nO2b3XETMRRGDwzvoYOkg5hRAVkqiKmAdIA7wHSQVECoALsC1gXciV0BTge4gvCwgnHk9d/+WF8m97ztxrlXs8fS1Urym6enJxwd3uZugPMcFyKGCxHDhYjhQsRwIWK4EDFciBguRAwXIoYLEcOFiOFCxHAhYrgQMVyIGC5EDBcihgsRw4WI4ULEcCFiuBAx3uVuwDGY2XtgCBTAALjc8tEFMAdKYBJC+HOK9nXBm5dwUM7MCmAEXDcMMQVuQwhlV23qC2khZjYAboGrjkLOgFEIYd5RvM6RrSFmdgs80J0MYqyHGFsSuR4S60TJ9vrwCEziZ+YhhGXy/xdU9aWgqjfnW+IsgEKtvkgJiUPUPfUyZsD42DoQ68+Y+p62AG6UhjAZITt6xopq3L9vGf+Gqh6dJX+S6ilKNaRkU8YCGLSVARBjDGLMdS5jbgkkhMQiWyejSGtEG2KsghopKoU++5AV68ZDcrvXYWTH8Pghdz1R6CHpN3MFDPsc02PsYcy1qy0nJ6uQOANKZz+jfcOUmd3H6W1jYo5RcvsqtikbuXtI+kBmBxbwz8DczMZtksdcsz1tOinZhMRxPF2bGh8R4gz4amZLMxu2aEqa8zq2LQs5e0j6EB8bLv6dAz/NrGwyjMWcj3vadjJyCimS60nLeFfAbzO7bfANT3MXLdvSmJxCBsl12VHcL8AyvpkfSpo7bdvJyCkkfQfocv5/Bnw3s/mBs6Y097aFzd7JPcv6T5dv5GtcAr/2TZN7yt0IGSE908k0+RS8FiEvhhd1yKEFUw5YAVBApoe0XQrZwgL4GEIY7pLRU+5G5OwhC57PZgbAsqPYK6rdxUMXC9Npbro8fzJy9pB0qll0FPcOuDhCRl3ubEvwOYWUyXXb5YoZ1X7GqMHSfZq7bNmWxuQUki5XnDdc+n4EPoUQiiabSzFnejKl7TJOY7IJid/iaXJ7fESIFfCNas+9zQNMc05zHnjIPctKx/mrA9egflCJGLd5eDFXukGWdddQYU+95PlDWVE97GXPeS+oivf6saBZCKHoM+8+cvcQ2NyhOwMmfW4SxdgTNs9oZd0tBAEhsRDfJbcvgbIPKTtOnNzlPnECAkPWP8xsTv3ZrJ1v2UfmuKDqGRt5QgjZ9kDWyd5D1iioP1U4P3KzqZYYY5v0om38rpDpIeCHrUFMCPjPEeSE/COetf3SU/i7EEL2GVUdSjXkGfGBfWDzIFsb/q93dRizU2R7yDr+o09R/GfRzsmRrSGvFRcihgsRw4WI4ULEcCFiuBAxXIgYLkQMFyKGCxHDhYjhQsRwIWK4EDFciBguRAwXIoYLEcOFiOFCxHAhYrgQMf4CVuqCm+17t3sAAAAASUVORK5CYII=);
  background-size: 50px 44px;
  -ms-touch-action: auto;
}
</style>
