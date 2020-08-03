<template>
    <div class="container">
        <el-card class="page_header" shadow="never">
            <el-page-header @back="goBack" content="监测历史数据" />
        </el-card>
        <el-row class="page_cont">
            <el-card class="mb-20 search-wrap" shadow="never" body-style="padding-bottom: 0">
                <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                    <el-form-item label="类型">
                        <el-select v-model="formSearch.type" placeholder="请选择类型">
                            <el-option :label="item.name" :value="item.value" :key="item.value" v-for="item in checkType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备选择">
                        <el-select v-model="formSearch.device" placeholder="请选择设备">
                            <el-option label="全部" :value="''"></el-option>
                            <el-option :label="item.name" :value="item.mn" :key="item.mn" v-for="item in deviceList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker
                            v-model="formSearch.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="数据类型">
                        <el-select v-model="formSearch.dataType" placeholder="请选择数据类型">
                            <el-option :label="item.name" :value="item.value" :key="item.value" v-for="item in dataType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="select-btns">
                        <el-button type="primary" :disabled="isLoading" @click="search">查询</el-button
                        ><el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="mb-20" shadow="never" v-loading="isLoading">
                <div slot="header" class="table-title">
                    <span>扬尘在线监测系统数据报表</span> 
                    <el-button class="export-icon"  icon="el-icon-top-right" type="primary">导出</el-button></div>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="name" label="设备名称"></el-table-column>
                    <el-table-column prop="time" label="时间" width="180"></el-table-column>
                    <el-table-column label="pm2.5(mg/m³)" width="120">
                        <template slot-scope="scope">
                            <div :class="scope.row.pm2_5 >= standardValue.pm2_5?'red':''">{{scope.row.pm2_5}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="pm10(mg/m³）" width="120">
                        <template slot-scope="scope">
                            <div :class="scope.row.pm10 >= standardValue.pm10?'red':''">{{scope.row.pm10}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="TSP(mg/m³）" width="120">
                        <template slot-scope="scope">
                            <div :class="scope.row.tsp >= standardValue.tsp?'red':''">{{scope.row.tsp}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="噪声（dB）" width="120">
                        <template slot-scope="scope">
                            <div :class="scope.row.noise >= standardValue.noise?'red':''">{{scope.row.noise}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="centigrade" label="温度（℃）" width="120"></el-table-column>
                    <el-table-column prop="humidity" label="湿度（%）" width="120"></el-table-column>
                    <el-table-column prop="pressure" label="气压（百帕)" width="120"></el-table-column>
                    <el-table-column prop="wind_speed" label="风速（m/s）" width="120"></el-table-column>
                    <el-table-column prop="wind_direction" label="风向" width="120"></el-table-column>
                </el-table>
                <el-pagination
                    class="admin-page"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="20"
                    layout="sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </el-card>
        </el-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        formSearch: {
            type: "",
            device: "",
            time: "",
            dataType: ""
        },
        checkType: [
            {name: '实时', value: ''},
            {name: '按小时', value: 'hour'},
            {name: '按天', value: 'day'},
            {name: '按月', value: 'month'},
            {name: '按年', value: 'year'}
        ],
        deviceList: [],
        dataType: [
            {name: '全部', value: ''},
            {name: '正常', value: 0},
            {name: '异常', value: 1},
        ],
        tableData: [],
        pagesize: 20,
        currentPage: 1,
        count: 0,
        isLoading: false,
        standardValue: ''
    }),
    created() {
        this.pagesize = this.pageSize;
        // 设备列表
        let device_list = this.$http.get('api/v1/security/equipment/')
        .then((res)=>{
            this.deviceList = res.data;
        }).catch(()=>{})
        // 标准值设置
        let standard_value = this.$http.get('api/v1/security/dust_set/')
        .then((res) => {
            this.standardValue = res.data;
        })
        .catch((err) => {})
        this.isLoading = true;
        this.$http.requestAll([device_list, standard_value])
        .then(()=>{
            this.requestInfo(1);
        }).catch(()=>{})
    },
    methods: {
        requestInfo(val) {
            this.isLoading = true;
            this.currentPage = val;
            this.$http.get(`api/v1/security/dusts?page=${this.currentPage}&page_size=${this.pagesize}`)
            .then((res)=>{
                this.tableData = res.data;
                this.count = res.count;
                this.isLoading = false;
            })
            .catch(()=>{})
        },
        handleCurrentChange(val) {
            this.$store.commit('timeStamp', Date.parse(new Date()));
            this.requestInfo(val);
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.$store.commit('timeStamp', Date.parse(new Date()));
            this.requestInfo(1);
        },
        // 查询
        search() {

        },
        // 重置
        reset() {},
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
  position: relative;
  .export-icon {
      position: absolute;
      right: 0;
      top: -10px;
  }
}
</style>