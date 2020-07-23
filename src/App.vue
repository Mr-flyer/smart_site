<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
p {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
  width: 100%;
  height: 100%;
}
.search-input {
  width: 220px;
}
.el-tag-t {
  margin: 4px;
}
.primary-select {
  width: 180px;
}
.tips {
  margin-left: 12px;
  color: #9fa6b1;
}
.green {
  color: green !important;
}
.red {
  color: red !important;
}
.set-btns {
  width: 100%;
  text-align: center;
}
// 文本多行溢出省略
// .line-over3 {
//   overflow: hidden;
//   overflow-wrap: break-word; // 单词不截断换行
//   text-overflow: ellipsis; // 溢出文本省略号显示
//   text-overflow: -o-ellipsis-lastline;
//   display: -webkit-box;
//   -webkit-line-clamp: 3; // 限制块级元素文本行数
//   /*! autoprefixer: off */
//   -webkit-box-orient: vertical; // 重置文本排列方式
//   /* autoprefixer: on */
// }
.content-title {
  box-sizing: border-box;
  width: 100%;
  color: #595959;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  & > span:first-child {
    font-size: 16px;
    border-left: 4px solid #0868ac;
    padding-left: 10px;
    height: 16px;
    margin-right: 24px;
    line-height: 16px;
  }
}
/* 主内容样式 */
.main-content {
  width: 100%;
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
}
.select-btns {
  width: 100%;
  text-align: right;
}
.admin-page {
  text-align: right;
  margin-top: 24px;
}
.add-admin-btn {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
  .admin-search {
    display: inline-flex;
  }
}

/* 自定义时间 */
.modal-time-con {
  width: 444px;
  position: absolute;
  padding: 16px 12px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 10;
  .modal-time {
    .time-input {
      width: 360px;
    }
  }
}
/* 重写input [textarea] 禁用样式*/
.el-textarea.is-disabled .el-textarea__inner {
  background-color: #eee !important;
  border-color: #eee !important;
  color: #333 !important;
}
/* 重写区域加载样式 */
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
/* 导航条样式 */
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: #c2c2c2;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #f7f7f7;
}
/* ==================
        maogu
================== */
.el-popover {
  max-width: 200px;
}

// 自定义样式
.container {
  .page_header {
    margin: -20px -20px 0;
    border: none;
    border-top: 1px solid #ebeef5;
  }
  .el-tabs__header {
    margin-bottom: 0 !important;
  }
  .page_cont {
    padding-top: 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
}
</style>
