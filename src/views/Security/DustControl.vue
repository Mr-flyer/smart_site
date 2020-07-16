<template>
  <div class="container">
    <el-card class="pdge_header" shadow="never" :body-style="{ paddingBottom: 0 }">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">扬尘管控</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs class="pdge_tabs" v-model="active" @tab-click="handleClick">
        <el-tab-pane label="扬尘噪声监测" name="0"></el-tab-pane>
        <el-tab-pane label="厂界降尘自动喷淋系统" name="1"></el-tab-pane>
        <el-tab-pane label="塔吊自动喷淋系统" name="2"></el-tab-pane>
      </el-tabs>
    </el-card>

    <el-row class="page_cont" :gutter="20">
      <el-col :span="8">
        <el-card shadow="never">
          <div slot="header">地图</div>
          <div></div>
        </el-card>
        <el-card shadow="never">
          <div slot="header">参数排序</div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="设备名称" width="180"></el-table-column>
            <el-table-column prop="date" label="pm2.5 mg/m³" width="180"></el-table-column>
            <el-table-column prop="date" label="pm10 mg/m³" width="180"></el-table-column>
            <el-table-column prop="date" label="TSP mg/m³" width="180"></el-table-column>
            <el-table-column prop="address" label="噪音 dB"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <div slot="header">
            设备选择
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-form
            :model="formEquipment"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="设备名称" prop="name">
              <el-input type="password" v-model="formEquipment.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备ID" prop="code">
              <el-input type="password" v-model="formEquipment.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" prop="time">
              <el-input v-model="formEquipment.time"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formEquipment')">提交</el-button>
              <el-button type="primary" @click="editEquipment">修改</el-button>
              <el-button @click="showEquipmentVisible = true">基准值设置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="never">
          <div slot="header">实时监测</div>
          <div class="weather_wrap">
            <div class="weather_item color_warning" v-for="(item, index) of 9" :key="index">
              <i class="el-icon-s-flag"></i>
              <div class="weather_cont">
                <div class="title">
                  pm2.5
                  <b>N</b>
                </div>
                <div class="count">
                  <b>30</b>mg/m³
                </div>
                <div class="desc">标准值：75mg/m³</div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never">
          <div slot="header">查看数据方式</div>
          <div class="grid-main">
            <div class="grid-item">
              <lineEchart :infoObj="infoSourceTrend" />
            </div>
            <div class="grid-item">
              <lineEchart :infoObj="infoSourceTrend02" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 设备标准值设置 -->
    <el-dialog title="标准值设置" :visible.sync="showEquipmentVisible">
      <el-form :model="form">
        <el-form-item label="pm2.5" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="pm10" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="TSP" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="showEquipmentVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lineEchart from "@/components/lineEchart";
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
// 设备选择
const options = [
  {
    value: "选项1",
    label: "黄金糕"
  },
  {
    value: "选项2",
    label: "双皮奶"
  },
  {
    value: "选项3",
    label: "蚵仔煎"
  },
  {
    value: "选项4",
    label: "龙须面"
  },
  {
    value: "选项5",
    label: "北京烤鸭"
  }
];
// 校验input 为空
const noEmpty = (rule, value, callback) => {
  if (value === "") callback(new Error("必填项不能为空"));
};
export default {
  data: () => ({
    active: "0",
    options,
    value: "",
    tableData,
    formEquipment: {
      name: "",
      code: "",
      time: ""
    },
    rules: {
      name: [{ validator: noEmpty, trigger: "blur" }],
      code: [{ validator: noEmpty, trigger: "blur" }],
      time: [{ validator: noEmpty, trigger: "blur" }]
    },
    showEquipmentVisible: false,
    form: {
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    },
    formLabelWidth: "80px",
    infoSourceTrend: {
      title: "扬尘监测TSP+PM2.5+PM10",
      isLoading: true,
      legend: ["腾讯新闻", "微信公众号"],
      xdata: [],
      color: ["#9357F1", "#5599FE"],
      data: []
    },
    infoSourceTrend: {
      title: "噪声监测",
      isLoading: true,
      legend: ["腾讯新闻", "微信公众号"],
      xdata: [],
      color: ["#9357F1", "#5599FE"],
      data: []
    },
  }),
  created() {
    // 扬尘监测
    this.infoSourceTrend = {
      title: "扬尘监测TSP+PM2.5+PM10",
      isLoading: true,
      legend: ["TSP", "PM2.5", "PM10"],
      xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"],
      color: ["#9357F1", "#5599FE", "red"],
      data: [
        [120, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 232, 201, 154, 190, 330, 410]
      ]
    };
    // 噪声监测
    this.infoSourceTrend02 = {
      title: "噪声监测",
      isLoading: true,
      legend: ["噪声"],
      xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"],
      color: ["#9357F1"],
      data: [
        [120, 132, 101, 134, 90, 230, 210]
      ]
    };
  },
  methods: {
    handleClick(val) {
      console.log(`tabs切换: `, val);
    },
    // 修改设备名称
    editEquipment() {
      this.$prompt("请输入设备名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的设备名称是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 修改设备名称
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    lineEchart
  }
};
</script>

<style lang="scss">
$colorSuccess: #67c23a;
$colorWarning: #e6a23c;
$colorDanger: #f56c6c;
$colorInfo: #909399;
.weather_wrap {
  display: flex;
  flex-wrap: wrap;
}
.weather_item {
  display: flex;
  align-items: center;
  min-width: 200px;
  // max-width: 20%;
  .el-icon-s-flag {
    flex: none;
  }
  .weather_cont {
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
  }
  .title {
    b {
      font-size: 20px;
    }
  }
  .count {
    b {
      font-size: 25px;
    }
  }
  .desc {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
  }
  &.color_success {
    b {
      color: $colorSuccess;
    }
  }
  &.color_warning {
    b {
      color: $colorWarning;
    }
  }
  &.color_danger {
    b {
      color: $colorDanger;
    }
  }
  &.color_info {
    b {
      color: $colorInfo;
    }
  }
}
.grid-main {
  .grid-item {
    height: 330px;
    position: relative;
  }
}
</style>