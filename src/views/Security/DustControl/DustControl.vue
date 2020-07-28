<template>
  <div class="container" v-loading="loading">
    <el-card class="page_header" shadow="never" :body-style="{ paddingBottom: 0 }">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>扬尘管控</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-tabs class="pdge_tabs" v-model="active" @tab-click="handleClick">
        <el-tab-pane label="扬尘噪声监测" name="0"></el-tab-pane>
        <el-tab-pane label="厂界降尘自动喷淋系统" name="1" disabled></el-tab-pane>
        <el-tab-pane label="塔吊自动喷淋系统" name="2" disabled></el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="page_cont">
      <el-card class="mb-20" shadow="never" :body-style="bodyStyle">
        <span>实时监测</span>
        <el-button type="primary" plain size="small" @click="gotoHistory">监测历史数据</el-button>
      </el-card>
      <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="mb-20" shadow="never">
                <div slot="header">参数排序</div>
                <el-table :data="options" max-height="250" style="width: 100%" border>
                  <el-table-column label="设备名称">
                    <template slot-scope="scope">
                      <div>{{scope.row.name ? scope.row.name : scope.row.mn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="pm2_5" :label="'pm2.5|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="pm10" :label="'pm10|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="tsp" :label="'TSP|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="noise" :label="'噪音|(dB)'" sortable :render-header="renderheader"></el-table-column>
                </el-table>
            </el-card>
            <el-card class="mb-20 map-wrap" shadow="never" v-loading="imgLoading">
                <div slot="header" class="map-hd">
                    <span>地图</span>
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-change="changeFile"
                        :before-upload="beforeAvatarUpload"
                        accept="image/png,image/gif,image/jpg,image/jpeg">
                        <el-button style="float: right; padding: 3px 0" type="text">上传地图</el-button>
                    </el-upload>
                </div>
                <div class="map-bd">
                    <img
                    v-if="mapPic"
                    class="access-control-pic"
                    :src="mapPic"/>
                    <img
                    v-else
                    class="access-control-pic"
                    src="../../../assets/security_map.jpg"/>
                </div>
            </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="mb-20" shadow="never">
            <div slot="header">
              设备选择
              <el-select :value="formEquipment.mn" @change="changeDevice" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.mn"
                ></el-option>
              </el-select>
            </div>
            <div class="formEquipment-table" v-if="JSON.stringify(formEquipment) != '{}' && formEquipment!=''">
                <div><span class="device-label">设备名称：</span>{{formEquipment.name ? formEquipment.name : formEquipment.mn}}<el-button
                    class="equipment-name-btn"
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="editEquipmentName">
                </el-button></div>
                <div><span class="device-label">设备ID：</span>{{formEquipment.mn}}</div>
                <div><span class="device-label">更新时间：</span>{{update_time}}</div>
            </div>
            <div class="formEquipment-table" v-show="JSON.stringify(formEquipment) == '{}'">
                <v-empty :value="formEquipment"></v-empty>
            </div>
          </el-card>
          <el-card class="mb-20" shadow="never" v-loading="sdLoading">
            <div slot="header" class="test_header">
              <div>实时监测
                <el-tooltip class="item" effect="dark" placement="right-end">
                  <div slot="content">
                    N：仪表正常 F：停用 M：处于维护期产生的数据 <br />
                    S: 手动输入的设定值 D：故障 B：异常 <br />
                    T：超过上限，爆表 C:处于校准状态 <br />
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <el-tooltip class="item" effect="dark" content="标准值设置" placement="top">
                <!-- <el-button type="info" icon="el-icon-s-tools" size="small" circle @click="showEquipmentVisible = true"></el-button> -->
                <i class="el-icon-setting icon-size" @click="standradSet"></i>
              </el-tooltip>
            </div>
            <div class="weather_wrap" v-if="JSON.stringify(securityDetection) != '{}' && securityDetection!=''">
              <div class="weather_item color_warning" v-for="(item, key) of securityDetection" :key="key">
                <img class="security_icon" :src="item.icon"/>
                <div class="weather_cont">
                  <div class="title">
                    {{item.name}}
                    <b>{{item.flag}}</b>
                  </div>
                  <div class="count">
                    <b :class="parseFloat(item.value) > formValue[key] ? 'red' : ''">{{item.value}}</b>{{item.unit}}
                  </div>
                  <div class="desc" v-if="formValue[key]">标准值：{{formValue[key]}}{{item.unit}}</div>
                </div>
              </div>
            </div>
            <div class="weather_wrap" v-show="JSON.stringify(securityDetection) == '{}'">
                <v-empty :value="securityDetection"></v-empty>
            </div>
          </el-card>
          <el-card shadow="never" v-loading="lineLoading">
            <div slot="header">查看数据方式
                <el-select :value="checkTypeValue" @change="changeCheckType">
                    <el-option
                    v-for="item in checkType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <div class="grid-main" v-if="lineList.length> 0">
              <div class="grid-item">
                <lineEchart :infoObj="TPP" />
              </div>
              <div class="grid-item">
                <lineEchart :infoObj="noise" />
              </div>
            </div>
            <div class="grid-main" v-show="lineList.length<=0">
                <v-empty :value="lineList"></v-empty>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 设备标准值设置 -->
    <el-dialog title="标准值设置" :visible.sync="showEquipmentVisible">
      <el-form :model="form" label-width="80px" v-loading="equipmentLoading">
        <el-form-item label="pm2.5">
          <el-input v-model="form.pm2_5" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="pm10">
          <el-input v-model="form.pm10" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="TSP">
          <el-input v-model="form.tsp" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="噪音">
          <el-input v-model="form.noise" autocomplete="off">
            <template slot="append">dB</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="equipmentSub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lineEchart from "@/components/lineEchart";
import empty from "@/components/empty";
import dayjs from "dayjs";
// 校验input 为空
const noEmpty = (rule, value, callback) => {
  if (value === "") callback(new Error("必填项不能为空"));
  callback();
};
export default {
  data: () => ({
    bodyStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "space-between"
    },
    active: "0",
    loading: false,
    imgLoading: false,      //地图loading
    options: [],
    tableData: [],
    formEquipment: '',
    rules: {
      name: [{ validator: noEmpty, trigger: "blur" }],
      code: [{ validator: noEmpty, trigger: "blur" }],
      time: [{ validator: noEmpty, trigger: "blur" }]
    },
    showEquipmentVisible: false,
    form: {
        pm2_5: null,
        pm10: null,
        tsp: null,
        noise: null
    },
    formValue:  '',
    TPP: {
      title: "扬尘监测TSP+PM2.5+PM10",
      legend: ["TSP", "PM2.5", "PM10"],
      xdata: [],
      color: ["#9357F1", "#5599FE", "#EF8C49"],
      data: []
    },
    noise: {
      title: "噪声监测",
      legend: ["噪声"],
      xdata: [],
      color: [],
      data: []
    },
    mapPic: '',
    securityDetection: '',
    sdLoading: false,
    checkTypeValue: '',
    checkType: [
        {name: '实时', value: ''},
        {name: '按小时', value: 'hour'},
        {name: '按天', value: 'day'},
        {name: '按月', value: 'month'},
        {name: '按年', value: 'year'}
    ],
    equipmentLoading: false,
    update_time: '',
    seter: null,
    lineList: '',
    lineLoading: false
  }),
  created() {
    // 设备列表
    this.loading = true;
    this.$http.get('api/v1/security/equipment/')
    .then((res)=>{
        this.loading = false;
        this.options = res.data;
        if(this.options.length > 0) {
            this.formEquipment = this.options[0];
            // 实时监测
            this.imgLoading = true;
            this.sdLoading = true;
            this.$http.get(`api/v1/security/dust?mn=${this.formEquipment.id}`)
            .then((res)=>{
                this.handelSecurity(res);
            })
            .catch(()=>{})
            this.lineFun();
        }else {
            this.formEquipment = {};
            this.securityDetection = {};
        }
    }).catch(()=>{})
    // 标准值设置
    this.$http.get('api/v1/security/dust_set/')
    .then((res) => {
        this.form.pm2_5 = res.data.pm2_5;
        this.form.pm10 = res.data.pm10;
        this.form.tsp = res.data.tsp;
        this.form.noise = res.data.noise;
        this.formValue = JSON.parse(JSON.stringify(this.form));
    })
    .catch((err) => {})
  },
  mounted() {
    this.seter = setInterval(()=>{
      // 实时监测
      this.imgLoading = true;
      this.sdLoading = true;
      this.$http.get(`api/v1/security/dust?mn=${this.formEquipment.id}`)
      .then((res)=>{
          this.handelSecurity(res);
      })
      .catch(()=>{})
      // 折线图
      this.lineFun();
    }, 600000)
  },
  methods: {
    lineFun() {
      this.lineLoading = true;
      // 折线图
      this.$http.get(`api/v1/security/dust_chart?check_mode=${this.checkTypeValue}&mn=${this.formEquipment.id}`)
      .then((res) => {
        this.lineList = res.data;
        this.TPP.xdata = res.data.map(v => dayjs(v.time).format('HH:mm'));
        let TSP = res.data.map(v => Number(v.tsp));
        let PM2_5 = res.data.map(v => Number(v.pm2_5));
        let PM10 = res.data.map(v => Number(v.pm10));
        this.TPP.data = [TSP, PM2_5, PM10];
        this.noise.xdata = this.TPP.xdata;
        this.noise.data = [res.data.map(v => Number(v.noise))];
        this.lineLoading = false;
      })
      .catch(()=>{})
    },
    renderheader(h, { column, $index }) {
      return h('span', {
          class: ['head-unit']
      }, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ]);
    },
    handleClick(val) {
      console.log(`tabs切换: `, val);
    },
    handelSecurity(res) {
        this.sdLoading = false;
        this.imgLoading = false;
        if(JSON.stringify(res.data) !== '{}') {
            this.mapPic = res.data.img;
            this.update_time = res.data.time;
            this.securityDetection = {
                'pm2_5': {
                    name: 'pm2.5',
                    standardValue: 0,
                    value: res.data.pm2_5,
                    flag: 'N',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/pm_icon.png')
                },
                'pm10': {
                    name: 'pm10',
                    standardValue: 0,
                    value: res.data.pm10,
                    flag: 'F',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/pm_ten_icon.png')
                },
                'tsp': {
                    name: 'TSP',
                    standardValue: 0,
                    value: res.data.tsp,
                    flag: 'M',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/tsp_icon.png')
                },
                'noise': {
                    name: '噪音',
                    standardValue: 0,
                    value: res.data.noise,
                    flag: 'S',
                    unit: 'dB',
                    icon: require('../../../assets/security/zaoyin_icon.png')
                },
                'centigrade': {
                    name: '温度',
                    standardValue: '',
                    value: res.data.centigrade,
                    flag: 'D',
                    unit: '℃',
                    icon: require('../../../assets/security/wendu_icon.png')
                },
                'wind_direction': {
                    name: '风向',
                    standardValue: '',
                    value: res.data.wind_direction,
                    flag: 'B',
                    unit: '',
                    icon: require('../../../assets/security/fengxiang_icon.png')
                },
                'humidity': {
                    name: '湿度',
                    standardValue: '',
                    value: res.data.humidity,
                    flag: 'N',
                    unit: '%',
                    icon: require('../../../assets/security/shidu_icon.png')
                },
                'pressure': {
                    name: '气压',
                    standardValue: '',
                    value: res.data.pressure,
                    flag: 'C',
                    unit: '千帕',
                    icon: require('../../../assets/security/qiya_icon.png')
                },
                'wind_speed': {
                    name: '风速',
                    standardValue: '',
                    value: res.data.wind_speed,
                    flag: 'T',
                    unit: 'm/s',
                    icon: require('../../../assets/security/fengsu_icon.png')
                }
            }
        }else {
            this.securityDetection = {};
        }
    },
    // 修改设备名称
    editEquipmentName() {
      this.$prompt("设备名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.formEquipment.name ? this.formEquipment.name : this.formEquipment.mn
      }).then(({ value }) => {
          if(!value) {
              this.$message.warning('请填写设备名称');
          }else {
              this.$http.put(`api/v1/security/equipment/${this.formEquipment.id}`, {
                  name: value
              })
              .then((res) => {
                  this.$message.success('设备名称修改成功');
                  for(let i=0;i<this.options.length;i++) {
                      if(this.options[i].mn === res.data.mn) {
                          this.options[i].name = res.data.name;
                          this.formEquipment = res.data;
                          break;
                      }
                  }
              })
              .catch(()=>{})
          }
      });
    },
    // 改变设备
    changeDevice(e) {
        for(let i=0;i<this.options.length;i++) {
            if(this.options[i].mn == e) {
                this.formEquipment = this.options[i];
                // 实时监测
                this.imgLoading = true;
                this.sdLoading = true;
                this.$http.get(`api/v1/security/dust?mn=${this.formEquipment.id}`)
                .then((res)=>{
                    this.handelSecurity(res);
                    this.checkTypeValue ='';
                })
                .catch(()=>{})
                // 折线图
                this.lineFun();
                break;
            }
        }
    },
    // 上传地图
    changeFile(res) {
        let _that = this;
        var reader = new FileReader();    
        reader.readAsDataURL(res.raw);
        reader.onloadend = function(e) {
            _that.imgLoading = true;
            let params = new FormData();
            params.append('img', res.raw);
            _that.$http.put('api/v1/security/dust_set/', params)
            .then((res) => {
                _that.imgLoading = false;
                _that.$message.success('地图上传成功');
                _that.mapPic = e.target.result;
            })
            .catch((err) => {
                _that.imgLoading = false;
            })
        }
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return false;
    },
    // 标准值设置
    standradSet() {
      this.showEquipmentVisible = true;
      this.form = JSON.parse(JSON.stringify(this.formValue));
    },
    // 更改查看方式
    changeCheckType(e) {
      this.checkTypeValue = e;
      this.lineFun();
    },
    equipmentSub() {
        this.equipmentLoading = true;
        this.$http.put('api/v1/security/dust_set/', this.form)
        .then((res) => {
            this.equipmentLoading = false;
            this.$message.success('标准值设置成功');
            this.showEquipmentVisible = false;
            this.formValue = JSON.parse(JSON.stringify(this.form));
            // this.handelSecurity(res);
        })
        .catch((err) => {
            this.equipmentLoading = false;
        })
    },
    gotoHistory() {
      this.$router.push("/Security/DustControlHistoryList");
    }
  },
  destroyed() {
    clearInterval(this.seter);
  },
  components: {
    lineEchart,
    'v-empty': empty
  }
};
</script>

<style lang="scss" scoped>
$colorSuccess: #67c23a;
$colorWarning: #e6a23c;
$colorDanger: #f56c6c;
$colorInfo: #909399;
::v-deep .el-table th>.cell {
    display: flex;
}
::v-deep .head-unit {
    &>span:nth-child(3) {
        font-size: 12px;
        color: #bbb;
    }
}
.page_cont {
  .icon-size {
    font-size: 20px;
  }
  .test_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
// 地图
.map-wrap {
  .map-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .map-bd {
    min-height: 250px;
    .access-control-pic {
        width: 100%;

    }
  }
}
.formEquipment-table {
    min-height: 150px;
    &>div {
        margin-top: 20px;
        .device-label {
            width: 100px;
            display: inline-block;
            text-align: right;
        }
        .equipment-name-btn {
            margin-left: 20px;
        }
    }
    &>div:first-child {
        margin-top: 0;
    }
}
.weather_wrap {
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
}
.weather_item {
  display: flex;
  /* align-items: center; */
  min-width: 200px;
  margin-bottom: 20px;
  // max-width: 20%;
  .el-icon-s-flag {
    flex: none;
  }
  .security_icon {
      width: 50px;
      height: 50px;
      margin-right: 16px;
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
  min-height: 250px;
  .grid-item {
    height: 330px;
    position: relative;
    margin-top: 36px;
  }
  &>div:first-child {
    margin: 0;
  }
}
</style>