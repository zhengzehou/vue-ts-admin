<template>
    <div class="animated fadeIn">
        <div class="ivu-col ivu-col-span-24">
            <div class="doc-header">
                <Button name="Default"></Button>
                <!-- <button type="button" class="ivu-btn">
                    <span>Default</span>
                </button> -->
                <Button name="Primary" @click="testHeaders" clazz="ivu-btn-primary"></Button>
                <!-- <button type="button" class="ivu-btn ivu-btn-primary">
                    <span>Primary</span>
                </button> -->
                <Button name="Ghost_test" clazz="ivu-btn-ghost"></Button>
                <Button name="Dashed" clazz="ivu-btn-dashed"></Button>
                <Button name="Text" clazz="ivu-btn-text"></Button>
                <br /><br />
                <Button name="信息按钮" clazz="ivu-btn-info"></Button>
                <Button name="成功按钮" clazz="ivu-btn-success"></Button>
                <Button name="警告按钮" clazz="ivu-btn-warning"></Button>
                <Button name="错误按钮" clazz="ivu-btn-error"></Button>
            </div>
            <div class="doc-content">
                <h5 data-v-7d6f0da8="">按钮类型</h5>
                <p data-v-7d6f0da8="">按钮类型有：默认按钮、主按钮、幽灵按钮、虚线按钮、文字按钮以及四种颜色按钮。</p>
                <p data-v-7d6f0da8="">通过设置type为primary、ghost、dashed、text、info、success、warning、error创建不同样式的按钮，不设置为默认样式。</p>
            </div>
        </div>
        <div class="ivu-col ivu-col-span-24">
            <div class="doc-header">
                <Button clazz="ivu-btn-primary ivu-btn-circle ivu-btn-icon-only" icon="ivu-icon-ios-search"></Button>
                <!-- <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-icon-only">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                </button> -->
                <Button name="搜索" clazz="ivu-btn-primary" icon="ivu-icon-ios-search"></Button>
                <!-- <button type="button" class="ivu-btn ivu-btn-primary">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                    <span>搜索</span>
                </button> -->
                <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-circle">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                    <span>搜索</span>
                </button>
                <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-circle">
                    <span>圆角按钮</span>
                </button> <br data-v-7d6f0da8=""><br data-v-7d6f0da8="">
                <button type="button" class="ivu-btn ivu-btn-ghost ivu-btn-circle ivu-btn-icon-only">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                </button>
                <button type="button" class="ivu-btn ivu-btn-ghost">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                    <span>搜索</span>
                </button>
                <button type="button" class="ivu-btn ivu-btn-ghost ivu-btn-circle">
                    <i class="ivu-icon ivu-icon-ios-search"></i>
                    <span>搜索</span>
                </button>
                <button type="button" class="ivu-btn ivu-btn-ghost ivu-btn-circle">
                    <span>圆角按钮</span>
                </button>
            </div>
            <div class="doc-content">
                <h5 data-v-7d6f0da8="">图标按钮及按钮形状</h5>
                <p data-v-7d6f0da8="">通过设置icon属性在Button内嵌入一个Icon，或者直接在Button内使用Icon组件。</p>
                <p data-v-7d6f0da8="">使用Button的icon属性，图标位置将在最左边，如果需要自定义位置，需使用Icon组件。</p>
                <p data-v-7d6f0da8="">通过设置shape属性为circle，可将按钮置为圆的形状。</p>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">

                <div style="" class="doc-header">

                    <Button size="large">Large</Button>
                    <Button>Default</Button>
                    <Button type="primary" size="small">Small</Button>
                    <br><br>
                    <Button type="primary" shape="circle" size="large">Large</Button>
                    <Button type="primary" shape="circle">Default</Button>
                    <Button type="primary" shape="circle" size="small">Small</Button>

                </div>
                <div style="" class="doc-content">
                    <h5>按钮尺寸</h5>

                    <p>按钮有三种尺寸：大、默认（中）、小</p>
                    <p>通过设置size为large和small将按钮设置为大和小尺寸，不设置为默认（中）尺寸。</p>
                </div>

            </div>

        </div>
        <div class="row">
            <div class="col col-md-12">

                <div style="" class="doc-header">
                    <Button>Default</Button>
                    <Button disabled>Default(Disabled)</Button>
                    <br>
                    <Button type="primary">Primary</Button>
                    <Button type="primary" disabled>Primary(Disabled)</Button>
                    <br>
                    <Button type="ghost">Ghost</Button>
                    <Button type="ghost" disabled>Ghost(Disabled)</Button>
                    <br>
                    <Button type="dashed">Dashed</Button>
                    <Button type="dashed" disabled>Dashed(Disabled)</Button>
                    <br>
                    <Button type="text">Text</Button>
                    <Button type="text" disabled>Text(Disabled)</Button>
                </div>
                <div style="" class="doc-content">
                    <h5>不可用状态</h5>
                    <p>通过添加disabled属性可将按钮设置为不可用状态。</p>
                </div>

                <Button type="primary" clazz="ivu-btn-loading" icon="ivu-icon-load-c ivu-load-loop" :loading="loading">Loading...</Button>
                <Button type="primary" :loading="loading" @click="toLoading">
                    <span v-if="!loading">Click me!</span>
                    <span v-else>Loading...</span>
                </Button>
                <Button type="primary" icon=" ivu-icon-checkmark-round" :loading="loading2" @click="toLoading2">
                    <span v-if="!loading2">Click me!</span>
                    <span v-else>Loading...</span>
                </Button>
                <div>
                    <div class="ivu-btn-group">
                        <Button disabled>昨日</Button>
                        <Button disabled>今日</Button>
                        <Button disabled>明日</Button>
                    </div>
                    <div class="ivu-btn-group">
                        <Button type="primary">L</Button>
                        <Button>M</Button>
                        <Button type="ghost">M</Button>
                        <Button type="dashed">R</Button>
                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Button from '@/components/Button.vue'
import { testHeaders } from '@/service/login'

@Component({
  components: { Button }
})
export default class Buttons extends Vue {
  loading: boolean = false
  loading2: boolean = false
  toLoading() {
    this.loading = true
  }
  toLoading2() {
    this.loading2 = true
  }
  testHeaders() {
    testHeaders().then(_ => {
      console.log(_)
    })
  }
  created() {
    alert(1)
  }
}
</script>
<style scoped lang="css">
.btn {
  margin-bottom: 4px;
}

.showallcode {
  height: 100px;
}
.hidecode {
  height: 100%;
}
.highlight {
  transition: 1000ms ease all;
}
</style>
