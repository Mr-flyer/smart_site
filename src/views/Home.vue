<template>
  <el-container>
    <el-header>虹洋热电联产扩建项目驾驶舱</el-header>
    <el-main class="main">
      <el-row class :gutter="10">
        <el-col :span="6">
          1
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">2</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">3</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "Home"
};
</script>
<style lang="scss">
.main {
  width: 100%;
  height: 100%;
}
.el-container ::v-deep {
  height: 100%;
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
  ::v-deep .el-row .el-col {
    height: 100%;
  }
</style>
