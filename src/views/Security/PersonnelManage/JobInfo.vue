<template>
    <div class="job-info">
        <div class="job-info-head">
            <span class="job-info-title"><span>今日实时数据</span>更新时间：2020-07-09 17:21:20</span
            ><i class="el-icon-refresh"></i>
        </div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>统计选择：
                            <el-select v-model="countSelect">
                                <el-option label="人员总况" :value="0"></el-option>
                                <el-option label="施工单位总况" :value="1"></el-option>
                                <el-option label="管理人员总况" :value="2"></el-option>
                            </el-select>
                        </span>
                    </div>
                    <div class="text item count-ul" v-show="countSelect === 0">
                        <span class="count-item" v-for="(site, key) in countList" :key="key">
                            <span>
                                <div class="count-item-head">{{key}}</div>
                                <div class="count-item-main">
                                <span class="sum-person" :style="{color: site.color}">{{site.manage + site.shigong}}{{key!=='出勤率'?'人': '%'}}</span
                                    ><span class="person-explan">
                                        <div>管理单位<span :style="{color: site.color}">{{site.manage}}{{key!=='出勤率'?'人': '%'}}</span></div>
                                        <div>施工单位<span :style="{color: site.color}">{{site.shigong}}{{key!=='出勤率'?'人': '%'}}</span></div>
                                    </span>
                                </div>
                            </span>
                        </span>
                    </div>
                    <div class="text item count-ul" v-show="countSelect === 1 || countSelect === 2">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%"
                            height="250">
                            <el-table-column
                                fixed
                                prop="company"
                                label="公司名称">
                            </el-table-column>
                            <el-table-column
                                prop="sitePerson"
                                label="现场人数"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="arrivePerson"
                                label="应到人数"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="difference"
                                label="差额"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                label="出勤率"
                                width="80">
                                <template slot-scope="scope">
                                    <div :class="scope.row.attendance>=100? 'green':'red'">{{scope.row.attendance}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>统计图选择：
                            <el-select v-model="countPicSelect" v-show="countSelect===0">
                                <el-option label="人员总况分析图" :value="0"></el-option>
                            </el-select>
                            <el-select v-model="countPicSelect" v-show="countSelect===1">
                                <el-option label="现场人员公司分布图" :value="0"></el-option>
                                <el-option label="施工单位人员总况图" :value="1"></el-option>
                                <el-option label="施工单位管理人员总况图" :value="2"></el-option>
                            </el-select>
                            <el-select v-model="countPicSelect" v-show="countSelect===2">
                                <el-option label="现场人员公司分布图" :value="0"></el-option>
                                <el-option label="管理单位人员总况图" :value="1"></el-option>
                            </el-select>
                        </span>
                    </div>
                    <div class="text item">
                        <v-barChart v-if="countSelect === 0 && countPicSelect === 0" class="echart"></v-barChart>
                        <v-pieChart v-if="countSelect === 1 && countPicSelect === 0" class="echart"></v-pieChart>
                        <v-barChart v-if="countSelect === 1 && countPicSelect === 1" class="echart"></v-barChart>
                        <v-barChart v-if="countSelect === 1 && countPicSelect === 2" class="echart"></v-barChart>
                        <v-pieChart v-if="countSelect === 2 && countPicSelect === 0" class="echart"></v-pieChart>
                        <v-barChart v-if="countSelect === 2 && countPicSelect === 1" class="echart"></v-barChart>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="job-table">
            <div class="job-info-head">
                <span class="job-info-title"><span>历史数据</span></span>
            </div>
            <div class="real-name">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                    <el-form-item label="">
                        <el-input v-model="formInline.user" placeholder="请输入员工姓名、员工ID"></el-input>
                    </el-form-item>
                    <el-form-item label="施工单位">
                        <el-select v-model="formInline.constructionUnit" placeholder="请选择施工单位">
                            <el-option label="全部" value="shanghai"></el-option>
                            <el-option label="管理单位" value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="formInline.department" placeholder="请输入部门"></el-input>
                    </el-form-item>
                    <el-form-item label="工种">
                        <el-select v-model="formInline.jobType" placeholder="请选择工种">
                            <el-option label="全部" value="shanghai"></el-option>
                            <el-option label="管理单位" value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否在岗">
                        <el-select v-model="formInline.isOnJob" placeholder="请选择是否在岗">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="是" value="shanghai"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="select-btns"><el-button type="primary">查询</el-button><el-button>重置</el-button></div>
            </div>
        </div>
        <div class="add-admin-btn">
            <el-button icon="el-icon-top-right" type="primary">导出</el-button>
        </div>
        <el-table
        :data="historyList"
        border
        style="width: 100%">
            <el-table-column
                label="序号"
                width="80">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="staffId"
                label="员工ID"
                width="150">
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别"
                width="60">
            </el-table-column>
            <el-table-column
                prop="companyType"
                label="单位类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="单位名称">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色"
                width="150">
            </el-table-column>
            <el-table-column
                prop="class"
                label="班组"
                width="150">
            </el-table-column>
            <el-table-column
                prop="jobType"
                label="工种"
                width="180">
            </el-table-column>
            <el-table-column
                prop="isOnJob"
                label="是否在岗"
                width="100">
            </el-table-column>
            <el-table-column
                prop="einlass"
                label="进场时间">
            </el-table-column>
            <el-table-column
                prop="leavingTime"
                label="出场时间">
            </el-table-column>
        </el-table>
        <el-pagination
            class="admin-page"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="20"
            layout="sizes, prev, pager, next, jumper"
            :total="100">
        </el-pagination>
    </div>
</template>
<script>
    import barChart from '../../../components/BarChart';
    import pieChart from '../../../components/PieChart';
    export default {
        components: {
            'v-barChart': barChart,
            'v-pieChart': pieChart
        },
        data() {
            return {
                countSelect: 0,
                countPicSelect: 0,
                countList: {
                    '现场人数': {
                        manage: 10,
                        shigong: 490,
                        color: '#70B603'
                    },
                    '应到人数': {
                        manage: 10,
                        shigong: 490,
                        color: '#F59A23'
                    },
                    '差额': {
                        manage: 10,
                        shigong: 490,
                        color: '#D9001B'
                    },
                    '出勤率': {
                        manage: 10.2,
                        shigong: 50.1,
                        color: '#02A7F0'
                    }
                },
                tableData: [
                    {
                        company: '中国第一建筑有限公司',
                        sitePerson: 100,
                        arrivePerson: 101,
                        difference: 10,
                        attendance: '90%'
                    }
                ],
                formInline: {
                    user: '',
                    constructionUnit: '',
                    department: '',
                    jobType: '',
                    isOnJob: ''
                },
                historyList: [
                    {
                        name: '张三',
                        staffId: 1,
                        gender: '男',
                        companyType: '管理单位',
                        companyName: '中国第一建筑公司',
                        role: '超级管理员',
                        class: '班组1',
                        jobType: '工种1',
                        isOnJob: '是',
                        einlass: '2020-03-04 09:00:00',
                        leavingTime: '2020-03-04 09:00:00'
                    }
                ],
                currentPage: 1,
            }
        },
        created() {
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .job-info {
        .job-table {
            margin: 20px 0;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 20px;
        }
        .job-info-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            .job-info-title {
                &>span {
                    font-size: 16px;
                    font-weight: bold;
                    margin-right: 24px;
                }
            }
            &>i {
                font-size: 22px;
                cursor: pointer;
            }
        }
        .count-select {
            display: flex;
            align-items: center;
        }
        .count-ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .green {
                color: #70B603;
            }
            .red {
                color: #D9001B;
            }
            &>span:nth-child(2n-1) {
                padding-right: 10px;
                box-sizing: border-box;
            }
            &>span:nth-child(2n) {
                padding-left: 10px;
                box-sizing: border-box;
            }
            &>span:nth-child(1), &>span:nth-child(2) {
                margin: 0;
            }
            .count-item {
                width: 50%;
                margin-top: 20px;
                &>span {
                    width: 100%;
                    border: 1px solid #e5e5e5;
                    box-sizing: border-box;
                    display: inline-block;
                    .count-item-head {
                        border-bottom: 1px solid #e5e5e5;
                        padding: 8px 12px;
                        box-sizing: border-box;
                    }
                    .count-item-main {
                        display: flex;
                        align-items: center;
                        flex-direction: row;
                        .sum-person {
                            font-size: 20px;
                            font-weight: bold;
                            padding: 0 12px;
                            box-sizing: border-box;
                        }
                        .person-explan {
                            border-left: 1px solid #e5e5e5;
                            box-sizing: border-box;
                            flex: 1;
                            &>div {
                                padding: 12px;
                                box-sizing: border-box;
                                border-bottom: 1px solid #e5e5e5;
                                width: 100%;
                                font-size: 16px;
                                &>span {
                                    font-weight: bold;
                                    margin-left: 12px;
                                }
                            }
                            &>div:last-child {
                                border: 0;
                            }
                        }
                    }
                }
            }
        }
        .echart {
            width: 100%;
            height: 250px;
        }
    }
</style>