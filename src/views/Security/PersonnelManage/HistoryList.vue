<template>
  <div class="admin-manage main-content" v-loading="isLoading">
        <el-page-header class="list-head" @back="goBack" content="历史记录">
        </el-page-header>
        <div class="real-name">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                <el-form-item label="员工姓名">
                    <el-input v-model="formInline.user" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位类型">
                    <el-select v-model="formInline.company_type" placeholder="请选择单位类型">
                        <el-option :label="item.name" :value="item.id" v-for="item in companyTypeList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-select v-model="formInline.company" placeholder="请选择单位">
                        <el-option :label="item.name" :value="item.id" v-for="item in companyList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班组">
                    <el-select v-model="formInline.team" placeholder="请选择班组">
                        <el-option :label="item.name" :value="item.id" v-for="item in teamList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工种">
                    <el-select v-model="formInline.workType" placeholder="请选择工种">
                        <el-option :label="item.name" :value="item.id" v-for="item in workTypeList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出入类型">
                    <el-select v-model="formInline.accessType" placeholder="请选择出入类型">
                        <el-option label="全部" :value="''"></el-option>
                        <el-option label="出" :value="0"></el-option>
                        <el-option label="入" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发生时间">
                    <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="门禁点">
                    <el-select v-model="formInline.address" placeholder="请选择门禁点">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="1号门" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="select-btns">
                <el-button @click="search" :disabled="isLoading" type="primary">查询</el-button
                ><el-button @click="reset">重置</el-button>
            </div>
        </div>
        <div class="set-btns-right">
            <el-button icon="el-icon-top-right" type="primary">导出</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                label="序号"
                width="80">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <!-- <el-table-column
                prop="eventType"
                label="事件类型"
                width="100">
            </el-table-column> -->
            <el-table-column
                prop="name"
                label="姓名"
                width="100">
            </el-table-column>
            <!-- <el-table-column
                prop="staffId"
                label="员工ID">
            </el-table-column> -->
            <el-table-column
                label="单位类型"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.company_type">
                        <div v-if="scope.row.company_type == item.id" v-for="item in companyTypeList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="单位名称">
                <template slot-scope="scope">
                    <div v-if="scope.row.company">
                        <div v-if="scope.row.company == item.id" v-for="item in companyList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="身份"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.identity!=null">
                        <div v-if="scope.row.identity == item.id" v-for="item in identityList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="班组"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.team">
                        <div v-if="scope.row.team == item.id" v-for="item in teamList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="工种"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.work_type">
                        <div v-if="scope.row.work_type == item.id" v-for="item in workTypeList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="time"
                label="发生时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="door_no"
                label="门禁点"
                width="120">
            </el-table-column>
            <el-table-column
                label="出入类型"
                width="80px">
                <template slot-scope="scope">
                    <div>{{scope.row.in_or_out===0?'出':'入'}}</div>
                </template>
            </el-table-column>
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
  </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading: false,
                tableData: [],
                pagesize: 20,
                currentPage: 1,
                count: 0,
                formInline: {
                    user: '',
                    company_type: '',
                    company: '',
                    team: '',
                    workType: '',
                    accessType: '',
                    time: [],
                    address: ''
                },
                identityList: [
                    {id: 0, name: '管理人员'},
                    {id: 1, name: '施工人员'}
                ],
                companyTypeList: [],
                companyList: [],
                teamList: [],
                workTypeList: []
            }
        },
        created() {
            this.pagesize = this.pageSize;
            // 单位类型
            let company_type = this.$http.get('api/v1/user/company_type/').then((res)=>{
                this.companyTypeList = res.data;
                this.companyTypeList.unshift({id: '', name: '全部'});
            }).catch(()=>{})
            // 单位名称
            let company = this.$http.get('api/v1/user/company/').then((res)=>{
                this.companyList = res.data;
                this.companyList.unshift({id: '', name: '全部'});
            }).catch(()=>{})
            // 班组
            let team = this.$http.get('api/v1/user/team/').then((res)=>{
                this.teamList = res.data;
                this.teamList.unshift({id: '', name: '全部'});
            }).catch(()=>{})
            // 工种
            let work_type = this.$http.get('api/v1/user/work_type/').then((res)=>{
                this.workTypeList = res.data;
                this.workTypeList.unshift({id: '', name: '全部'});
            }).catch(()=>{})
            let firstRequest = this.$http.get(`api/v1/security/user_door?page=1&page_size=${this.pageSize}`).then((res)=>{
                this.tableData = res.data;
                this.count = res.count;
            }).catch(()=>{})
            this.isLoading = true;
            this.$http.requestAll([company_type, company, team, work_type])
            .then(()=>{
                this.isLoading = false;
            }).catch(()=>{})
        },
        methods: {
            requestInfo(val) {
                this.isLoading = true;
                this.currentPage = val;
                let start_time='';
                let end_time='';
                if(this.formInline.time && this.formInline.time.length===2) {
                    start_time = this.common.formatTimestamp_min(Date.parse(this.formInline.time[0])/1000);
                    end_time = this.common.formatTimestamp_min(Date.parse(this.formInline.time[1])/1000);
                }
                this.$http.get(`api/v1/security/user_door?page=${this.currentPage}&page_size=${this.pagesize}&name=${this.formInline.user}&company_type=${this.formInline.company_type}&company=${this.formInline.company}&team=${this.formInline.team}&work_type=${this.formInline.workType}&start_time=${start_time}&end_time=${end_time}&in_or_out=${this.formInline.accessType}`)
                .then((res)=>{
                    this.isLoading = false;
                    this.tableData = res.data;
                    this.count = res.count;
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
                this.requestInfo(1);
            },
            // 重置
            reset() {
                this.formInline = {
                    user: '',
                    company_type: '',
                    company: '',
                    team: '',
                    workType: '',
                    accessType: '',
                    time: [],
                    address: ''
                }
                this.requestInfo(1);
            },
            // 返回上一页
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .admin-manage {
        .list-head {
            margin-bottom: 24px;
        }
        .real-name {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 20px;
            box-sizing: border-box;
            ::v-deep .el-input input {
                width: 180px;
            }
        }
        .set-btns-right {
            margin: 20px 0;
        }
        .add-admin-btn {
            margin-bottom: 24px;
            display: flex;
            justify-content: flex-end;
            .admin-search {
                display: inline-flex;
            }
        }
        .admin-page {
            text-align: right;
            margin-top: 24px;
        }
        .staff-form {
            max-height: 500px;
            overflow: auto;
            position: relative;
            .form-title {
                font-weight: bold;
                padding:  6px 12px;
                box-sizing: border-box;
                background-color: #eee;
                margin-bottom: 12px;
            }
            ::v-deep .el-input input {
                width: 180px;
            }
            ::v-deep .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .form-head-img {
                position: absolute;
                right: 60px;
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }
        }
    }
</style>