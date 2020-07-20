<template>
  <div class="cruise_wrap">
    <el-card class="cruise_item" :body-style="cardBodyStyle" shadow="hover" v-for="(item, index) of 5" :key="index">
      <img class="cruise_pic" />
      <div class="cruise_cont">
        <span class="cruise_title">标题</span>
        <div>视屏大小：12M</div>
        <div class="cruise_time">上传时间：2020-02-02</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    cardBodyStyle: {
      padding: 0
    },
    active: "first"
  })
}
</script>

<style lang="scss" scoped>
.cruise_wrap {
  display: flex;
  flex-wrap: wrap;
}
  .cruise_item {
    flex: none;
    width: 270px;
    margin: 0 20px 20px 0;
    font-size: 13px;
    color: #999;
    .cruise_pic {
      width: 100%;
      height: 270px;
      background-color: antiquewhite;
    }
    .cruise_cont {
      padding: 8px 10px;
      box-sizing: border-box;
    }
    .cruise_title {
      font-size: 18px;
      font-weight: 700;
    }
  }
</style>