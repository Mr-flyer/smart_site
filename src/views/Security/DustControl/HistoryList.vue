<template>
  <div class="container">
    <el-card class="page_header" shadow="never">
      <el-page-header @back="goBack" content="监测历史数据" />
    </el-card>
    <el-row class="page_cont">
      <el-card class="mb-20 search-wrap" shadow="never" body-style="padding-bottom: 0">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
          <el-form-item label="类型">
            <el-select v-model="formSearch.type" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备选择">
            <el-select v-model="formSearch.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formSearch.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-select v-model="formSearch.dataType" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button >导出</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="mb-20" shadow="never">
        <div slot="header" class="table-title">扬尘在线监测系统数据报表</div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="设备名称"></el-table-column>
          <el-table-column prop="date" label="时间" width="180"></el-table-column>
          <el-table-column prop="name" label="pm2.5(mg/m³)" width="180"></el-table-column>
          <el-table-column prop="name" label="pm10(mg/m³）" width="180"></el-table-column>
          <el-table-column prop="name" label="TSP(mg/m³）" width="180"></el-table-column>
          <el-table-column prop="name" label="噪声（dB）" width="180"></el-table-column>
          <el-table-column prop="name" label="温度（℃）" width="180"></el-table-column>
          <el-table-column prop="name" label="湿度（%）" width="180"></el-table-column>
          <el-table-column prop="name" label="气压（百帕)" width="180"></el-table-column>
          <el-table-column prop="name" label="风速（m/s）" width="180"></el-table-column>
          <el-table-column prop="name" label="风向" width="180"></el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄"
  }
];
export default {
  data: () => ({
    formSearch: {
      type: "",
      region: "",
      time: "",
      dataType: ""
    },
    tableData
  }),
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.table-title {
  display: flex;
  justify-content: center;
}
</style>