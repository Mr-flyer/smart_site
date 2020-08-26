<template>
  <div class="wrap" ref="wrap">
    <div class="box" ref="box">  
      <div class="marquee">{{text}}</div>  
      <div class="copy" ref="copy"></div>  
    </div>
    <div class="node" ref="node">{{text}}</div> 
  </div>
</template>
<script>
export default {
  name: 'Marquee',
  props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
  data () {
    return {
      text: '' // 数组文字转化后的字符串
    }
  },
  methods: {
    move () {
    // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      // let width = document.querySelector('.node').getBoundingClientRect().width 
      // let box = document.querySelector('.box')
      // let copy = document.querySelector('.copy')
      let width = this.$refs['node'].getBoundingClientRect().width 
      let box = this.$refs['box']
      let copy = this.$refs['copy']
      copy.innerText = this.text // 文字副本填充
      let distance = 0 // 位移距离
      //设置位移
      setInterval(function () {
        distance = distance - 1
         // 如果位移超过文字宽度，则回到起点
        if (-distance >= width) {
          distance = 16
        }
        box.style.transform = 'translateX(' + distance + 'px)'
      }, 20)  
    }
  },
// 把父组件传入的arr转化成字符串
  mounted: function () {
    console.log("测试--", this.lists);
    for (let i = 0; i < this.lists.length; i++) {
      this.text += ' ' + this.lists[i]
    }
  },
// 更新的时候运动
  updated: function () {
    let times=setTimeout(()=>{
        // let wrapw=document.querySelector('.wrap').offsetWidth
        // let nodew=document.querySelector('.node').offsetWidth
        let wrapw=this.$refs['wrap'].offsetWidth
        let nodew=this.$refs['node'].offsetWidth
        // console.log(this.$refs['node'].offsetWidth);
        if(wrapw<nodew){  //判断文字长度大于盒子宽度时，执行滚动
            this.move()
        }
        clearTimeout('times')
    },2000)  //页面更新2s后执行
  }
}
</script>
<style scoped>
/* 限制外框宽度，隐藏多余的部分 */
.wrap {
  overflow: hidden;
  height:30px;
  line-height:30px;
}
 /* 移动框宽度设置 */
.box {
  width: 80000%;
}
 /* 文字一行显示 */
.box div {
  float: left;
}
 /* 设置前后间隔 */
.marquee {
   margin: 0 16px 0 0;
}
/* 获取宽度的节点，隐藏掉 */
.node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>