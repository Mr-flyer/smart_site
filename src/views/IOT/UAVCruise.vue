<template>
  <div class="cruise_wrap">
    <el-card class="cruise_item" :body-style="cardBodyStyle" shadow="hover" v-for="(item, index) of videoList" :key="index" >
      <!-- <img class="cruise_pic" /> -->
      <video class="cruise_pic" :src="item.video" @click="openView(item.video)"></video>
      <div class="cruise_cont">
        <span class="cruise_title">{{item.video_name}}</span>
        <div v-if="item.size">视频大小：{{common.formatFileSize(item.size)}}</div>
        <div v-if="item.create_time" class="cruise_time">上传时间：{{item.create_time}}</div>
      </div>
    </el-card>
    <el-dialog title="视频预览" :visible="dialogTableVisible" width="940px" @close="dialogTableVisible = false">
      <video :src="currtVideo"  autoplay width="900" height="500" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    cardBodyStyle: {
      padding: 0
    },
    videoList: [],
    active: "first",
    dialogTableVisible: false,
    currtVideo: ''
  }),
  created() {
    this.$http.get(`api/v1/system/video`, {
      area: 1
    })
    .then(({data}) => {
      console.log(data);
      this.videoList = data
    }).catch((err) => {
      
    });
  },
  methods: {
    openView(video) {
      console.log(video);
      this.dialogTableVisible = true
      this.currtVideo = video
    }
  }
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
      object-fit: cover;
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