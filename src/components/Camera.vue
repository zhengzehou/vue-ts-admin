<template>
  <div>
    <div class="camera-photo" ref="divGenres" v-show="isPhoto" @click="choiceImg">
      <img style="width:300px;height:300px;" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1528077222&di=69a2ffcffd12e35216ab71da7a610abe&src=http://img.zcool.cn/community/01f15555b4df7e6ac725ca50c172a1.png@2o.png" />
      <br>
      <span>请选择图片上传</span>
      <input type="file" ref="uploadImage" @change="onFileChange" accept="image/*" capture="camera" style="display: none;">
    </div>

    <div class="list-li" v-show="show">
      <div style="display: inline-block;">
        <a class="list-link" @click='previewImage(imgsrc)'>
          <img :src="imgsrc">
        </a>
        <span class="list-img-close" @click='delImage'></span>
      </div>
      <div class="add-preview" v-show="isPreview" @click="closePreview">
        <img :src="previewImg">
      </div>
      <button type="button" class="upload-button" @click="upload">图片上传</button>
    </div>
  </div>
</template>

<script>  
export default {
  data () {
    return {
      imgsrc: '',//上传的·图片的地址
      show: false,//图片放大预览
      previewImg: '',//预览图片的地址
      isPreview: false,//是否预览当前图片
      isPhoto: true,
      uploadFile: null
    }
  },
  methods: {

    choiceImg () {
      let self = this;
      if (!window.plus) {
        self.addPic()//如果不支持plus,就用本地相册上传即可
        return;
      }

      let title = "选择照片"
      let btns = ['拍照', '相册']

      var func = function (e) {
        var index = e.index;
        if (index == 1) self.choiceCamera();
        if (index == 2) self.choicePic();
      }
      if (title && btns && btns.length > 0) {
        var btnArray = [];
        for (var i = 0; i < btns.length; i++) {
          btnArray.push({ title: btns[i] });
        }

        plus.nativeUI.actionSheet({
          title: title,
          cancel: '取消',
          buttons: btnArray
        }, function (e) {
          if (func) func(e);
        });
      }
    },

    choiceCamera () {
      let self = this;
      var cmr = plus.camera.getCamera();
      cmr.captureImage(function (path) {

        plus.io.resolveLocalFileSystemURL(path, function (entry) {
          // self.imgsrc = entry.toLocalURL();
          self.resetImg(entry.toLocalURL())
          // self.show = true;

        }, function (e) { plus.nativeUI.toast("读取拍照文件错误：" + e.message); });
      }, function (e) { }, { index: 1, filename: "_doc/camera/" });
    },

    choicePic () {
      let self = this;
      plus.gallery.pick(function (p) {
        plus.io.resolveLocalFileSystemURL(p, function (entry) {
          // self.imgsrc = entry.toLocalURL();
          self.resetImg(entry.toLocalURL())
          // self.show = true;
        }, function (e) {
          plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });
      }, function (e) { plus.nativeUI.toast("读取拍照文件错误：" + e.message); }, {
          filename: "_doc/camera/",
          filter: "image"
        });
    },
    resetImg (imgsrc) {
      var self = this
      var img = new Image,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
      img.src = imgsrc ? imgsrc : self.imgsrc;
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio = 1
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      img.onload = function () {
        let data = self.compress(img, 6)
        self.imgsrc = data
        self.show = true
      }
    },
    upload () {
      debugger
      var self = this
      var wt;
      if (window.plus)
        wt = plus.nativeUI.showWaiting();
      console.log('upload start')
      var img = new Image,
        width = 512, //image resize   压缩后的宽
        quality = 0.5, //image quality  压缩质量
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
      img.src = self.imgsrc;
      console.log('upload start  onload')
      img.onload = function () {//利用canvas压缩图片
        canvas.width = width;
        canvas.height = width * (img.height / img.width);
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        debugger
        var base64 = canvas.toDataURL("image/*", quality);
        var pic = base64.split(',')[1];//图片的base64编码内容
        var f = self.imgsrc;
        var filename = f.replace(f.substring(0, f.lastIndexOf('/') + 1), '');//图片名称
        console.log('upload start  ' + filename)
        console.log('upload start  f=' + f)
        if (self.uploadFile !== null) {//addPic方法得到的图片文件
          filename = self.uploadFile.name
          let reader = new FileReader();
          reader.readAsDataURL(self.uploadFile);
          reader.onload = function (e) {
            img.src = e.target.result;
          }
          console.log('upload start  img.src=' + img.src)
          img.onload = function () {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            base64 = canvas.toDataURL("image/*", quality);
            pic = base64.split(',')[1];
            console.log('base64=' + base64)
            console.log('pic=' + pic)
            if (window.plus)
              wt = plus.nativeUI.closeWaiting();
          }
        }
        //此处是将图片上传到服务器的代码，略过
      }
    },

    onFileChange (e) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];//File对象
      self.uploadFile = file;
      console.log('onFileChange', file)
      let Orientation = 8;
      console.log('onFileChange>Orientation', Orientation)
      let reader = new FileReader();//FileReader对象
      reader.readAsDataURL(file);//该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。

      //  reader.onload = function (e) {
      //   self.imgsrc = e.target.result;//图片内容的base64编码
      //   self.show = true;
      // } 

      // 读取成功后的回调
      reader.onloadend = function (e) {
        let result = e.target.result;
        let img = new Image()
        img.src = result
        // self.imgsrc = result
        self.show = true;
        //判断图片是否大于100K,是就直接上传，反之压缩图片
        if (result.length <= 100 * 1024) {
          console.log('onFileChange>onloadend')
          self.imgsrc = result
          // self.upload(result)
        } else {
          img.onload = function () {
            let data = self.compress(img, 1)
            self.imgsrc = result
          }
        }
      }

    },
    addPic: function (e) {
      let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
      els[0].click()
      return false
    },

    delImage: function () {
      this.imgsrc = "";
      this.show = false;
      this.isPreview = false;
    },

    previewImage: function (url) {
      let vm = this;
      vm.isPreview = true;
      vm.previewImg = url;
    },

    closePreview: function () {
      let vm = this;
      vm.isPreview = false;
      vm.previewImg = "";
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            ctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            )
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas) //转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log(
        '压缩率：' + ~~((100 * (initSize - ndata.length)) / initSize) + '%'
      )
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    },
    rotateImg (img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      debugger
      const min_step = 0
      const max_step = 3
      if (img == null) return
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    }
  },
}
</script> 

<style>
.upload-button {
  display: block;
  margin-top: 10px;
}
.camera-photo {
  text-align: center;
  margin-top: 80px;
}
.list-li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-top: 10px;
  position: relative;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.list-link img {
  width: 150px;
  height: 150px;
}
.list-link a:visited {
  background-color: #465c71;
  border: 1px #4e667d solid;
  color: #dde4ec;
  display: flex;
  line-height: 1.35em;
  padding: 4px 20px;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
}
.list-link a:hover {
  background-color: #bfcbd6;
  color: #465c71;
  text-decoration: none;
}
.list-link a:active {
  background-color: #465c71;
  color: #cfdbe6;
  text-decoration: none;
}
.list-img-close {
  background: #ffffff
    url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526905315674&di=4c2d6a6985b34e141f37bc9fae7f2209&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F55%2F73%2F39I58PICCqK_1024.png)
    no-repeat right top;
  border-color: #ff4a00;
  background-position: center;
  background-size: 35px 35px;
  display: block;
  float: left;
  top: 5px;
  width: 10px;
  height: 10px;
  position: absolute;
  margin-top: 0px;
  margin-left: 135px;
  padding: 8px;
  z-index: 10;
  border-radius: 5px;
  text-align: center;
}
.add-preview {
  width: 300px;
  height: 300px;
}
.add-preview img {
  width: 100%;
  height: 100%;
}
</style>