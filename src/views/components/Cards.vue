<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col col-span-24">
        <div class="doc-header">
          <Card style="width:100%;">
            <div slot="header">
              <span>经典电影</span>
              <Button type="text" class="el-button--text" style="float: right;padding: 3px 0px;" @click.prevent="changeLimit">
                换一换
              </Button>
            </div>

            <div v-for="item in randomMovieList" class="text item">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
              <span>
                <i type="ios-star" v-for="n in 4" :key="n" color="#ffac2d"></i>
                <i type="ios-star" v-if="item.rate >= 9.5" color="#ffac2d"></i>
                <i type="ios-star-half" v-else color="#ffac2d"></i>
                {{ item.rate }}
              </span>
            </div>
          </Card>

        </div>
        <div style="" class="doc-content">
          <h5>基本用法</h5>
          <p>自定义标题、额外操作和主体内容，可以完全自由控制各个部分，也可以结合其它组件一起使用，较为灵活。</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'

@Component({ components: { Card, Button } })
export default class Cards extends Vue {
  movieList = [
    {
      name: '肖申克的救赎',
      url: `https://movie.douban.com/subject/1292052/`,
      rate: 9.6
    },
    {
      name: '这个杀手不太冷',
      url: `https://movie.douban.com/subject/1295644/`,
      rate: 9.4
    },
    {
      name: '霸王别姬',
      url: `https://movie.douban.com/subject/1291546/`,
      rate: 9.5
    },
    {
      name: '阿甘正传',
      url: `https://movie.douban.com/subject/1292720/`,
      rate: 9.4
    },
    {
      name: '美丽人生',
      url: `https://movie.douban.com/subject/1292063/`,
      rate: 9.5
    },
    {
      name: '千与千寻',
      url: `https://movie.douban.com/subject/1291561/`,
      rate: 9.2
    },
    {
      name: '辛德勒的名单',
      url: `https://movie.douban.com/subject/1295124/`,
      rate: 9.4
    },
    {
      name: '海上钢琴师',
      url: `https://movie.douban.com/subject/1292001/`,
      rate: 9.2
    },
    {
      name: '机器人总动员',
      url: `https://movie.douban.com/subject/2131459/`,
      rate: 9.3
    },
    {
      name: '盗梦空间',
      url: `https://movie.douban.com/subject/3541415/`,
      rate: 9.2
    }
  ]
  getArrayItems(arr: any, num: number) {
    const temp_array = []
    for (let index in arr) {
      temp_array.push(arr[index])
    }
    const return_array = []
    for (let i = 0; i < num; i++) {
      if (temp_array.length > 0) {
        const arrIndex = Math.floor(Math.random() * temp_array.length)
        return_array[i] = temp_array[arrIndex]
        temp_array.splice(arrIndex, 1)
      } else {
        break
      }
    }
    return return_array
  }
  changeLimit() {
    return this.getArrayItems(this.movieList, 5)
  }
  get randomMovieList() {
    return this.changeLimit()
  }
}
</script>
