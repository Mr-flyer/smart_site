<template>
    <div class="admin-manage main-content" v-loading="isLoading">
        <div class="real-name">
            <el-form 
            :inline="true" 
            ref="formInline" 
            :rules="rules"
            :model="formInline" 
            class="demo-form-inline" 
            label-width="100px">
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
                <el-form-item label="性别">
                    <el-select v-model="formInline.gender" placeholder="请选择性别">
                        <el-option label="全部" :value="''" ></el-option>
                        <el-option label="男" :value="0" ></el-option>
                        <el-option label="女" :value="1" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入场时间">
                    <el-date-picker
                        v-model="formInline.inTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离场时间">
                    <el-date-picker
                        v-model="formInline.leaveTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否关联实名">
                    <el-select v-model="formInline.relevance" placeholder="请选择是否关联">
                        <el-option label="全部" :value="''" ></el-option>
                        <el-option label="是" :value="0" ></el-option>
                        <el-option label="否" :value="1" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="set-btns-right">
                    <el-button @click="search" :disabled="isLoading" type="primary">查询</el-button
                    ><el-button @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
            </el-form>
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
            <el-table-column
                label="性别">
                <template slot-scope="scope">{{scope.row.sex == 0 ?'男':'女'}}</template>
            </el-table-column>
            <el-table-column
                label="单位类型"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.company_type!=null">
                        <div v-if="scope.row.company_type == item.id" v-for="item in companyTypeList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="单位名称">
                <template slot-scope="scope">
                    <div v-if="scope.row.company!=null">
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
                    <div v-if="scope.row.team!=null">
                        <div v-if="scope.row.team == item.id" v-for="item in teamList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="工种"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.work_type!=null">
                        <div v-if="scope.row.work_type == item.id" v-for="item in workTypeList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                label="关联实名"
                width="80px">
                <template slot-scope="scope">
                    <div>{{scope.row.is_real_name===0?'是':'否'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="checkBtn(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="editStaffBtn(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-if="scope.row.is_real_name == 1" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="admin-page"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <el-dialog title="编辑员工" :visible.sync="dialogFormVisible" width="720px">
            <el-form class="staff-form" id="dialogForm" :model="form" label-width="150px" v-loading="formLoading">
                <div class="form-title">员工信息</div>
                <el-form-item class="form-head-img">
                    <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :on-change="changeFile"
                    :before-upload="beforeAvatarUpload"
                    accept="image/png, image/gif, image/jpg, image/jpeg"
                    >
                    <img v-if="form.head_img" :src="form.head_img" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option v-for="(v, i) of generList" :key="i" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="form.identity_id" placeholder="请输入身份证"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <div class="form-title">工作信息</div>
                <el-form-item label="单位名称">
                    <el-select v-model="form.company" placeholder="请选择单位名称">
                        <el-option v-for="(v, i) of companyList" :key="i" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班组">
                    <el-select v-model="form.team" placeholder="请选择班组">
                        <el-option v-for="(v, i) of teamList" :key="i" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工种">
                    <el-select v-model="form.work_type" placeholder="请选择工种">
                        <el-option v-for="(v, i) of workTypeList" :key="i" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份">
                    <el-select v-model="form.identity" placeholder="请选择角色">
                        <el-option v-for="(v, i) of identityList" :key="i" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="进场时间">
                    <el-date-picker
                        v-model="form.einlass"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-input v-html="form.einlass"></el-input> -->
                </el-form-item>
                <el-form-item label="离场时间">
                    <el-date-picker
                        v-model="form.leavingTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editStaffInfo">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="员工详情" :visible.sync="checkFormVisible" width="720px">
            <el-form :model="form" label-width="150px" class="staff-form" id="dialogForm">
                <div class="form-title">员工信息</div>
                <el-form-item class="form-head-img">
                    <img v-if="form.head_img" :src="form.head_img" class="avatar" />
                    <img v-else src="../../../assets/head_img.png" class="avatar"/>
                </el-form-item>
                <el-form-item label="姓名">
                    <div>{{form.name?form.name:'/'}}</div>
                </el-form-item>
                <el-form-item label="年龄">
                    <div>{{form.age?form.age:'/'}}</div>
                </el-form-item>
                <el-form-item label="性别">
                    <div>{{form.sex==0?'男':'女'}}</div>
                </el-form-item>
                <el-form-item label="身份证">
                    <div>{{form.identity_id?form.identity_id:'/'}}</div>
                </el-form-item>
                <el-form-item label="联系方式">
                    <div>{{form.phone?form.phone:'/'}}</div>
                </el-form-item>
                <div class="form-title">工作信息</div>
                <el-form-item label="单位名称">
                    <div v-if="form.company!=null && form.company">
                        <div v-for="(v, i) of companyList" :key="i">
                            <div v-if="v.id == form.company">{{form.company}}</div>
                        </div>
                    </div>
                    <div v-else>/</div>
                </el-form-item>
                <el-form-item label="班组">
                    <div v-if="form.team!=null && form.team">
                        <div v-for="(v, i) of teamList" :key="i">
                            <div v-if="v.id == form.team">{{form.team}}</div>
                        </div>
                    </div>
                    <div v-else>/</div>
                </el-form-item>
                <el-form-item label="工种">
                    <div v-if="form.work_type!=null && form.work_type">
                        <div v-for="(v, i) of workTypeList" :key="i">
                            <div v-if="v.id == form.work_type">{{form.work_type}}</div>
                        </div>
                    </div>
                    <div v-else>/</div>
                </el-form-item>
                <el-form-item label="人员身份">
                    <div v-if="form.identity!=null && form.identity">
                        <div v-for="(v, i) of identityList" :key="i">
                            <div v-if="v.id == form.identity">{{form.identity}}</div>
                        </div>
                    </div>
                    <div v-else>/</div>
                </el-form-item>
                <el-form-item label="进场时间">
                    <div>{{form.einlass?form.einlass:'/'}}</div>
                </el-form-item>
                <el-form-item label="离场时间">
                    <div>{{form.leavingTime?form.leavingTime:'/'}}</div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="checkFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="checkFormVisible = false">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading: false,
                tableData: [],
                companyTypeList: [],
                companyList: [],
                teamList: [],
                workTypeList: [],
                currentPage: 1,
                count: 0,
                rules: {},
                formInline: {
                    user: '',
                    company_type: '',
                    company: '',
                    team: '',
                    workType: '',
                    gender: '',
                    inTime: [],
                    leaveTime: [],
                    relevance: ''
                },
                dialogFormVisible: false,
                checkFormVisible: false,
                form: {
                    name: "",
                    age: "",
                    sex: "",
                    identity_id: "",
                    phone: "",
                    company: "",
                    company_type: '',
                    team: "",
                    work_type: "",
                    identity: "",
                    einlass: "",
                    leavingTime: "",
                    head_img: require("../../../assets/head_img.png"),
                },
                generList: [
                    { id: 0, name: "男" },
                    { id: 1, name: "女" }
                ],
                identityList: [
                    { id: 0, name: "管理人员" },
                    { id: 1, name: "施工人员" }
                ],
                formLoading: false
            }
        },
        created() {
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
            this.isLoading = true;
            this.$http.requestAll([company_type, company, team, work_type])
            .then(()=>{
                this.$http.get(`api/v1/security/user/?page=1&page_size=20`).then((res)=>{
                    this.isLoading = false;
                    this.tableData = res.data;
                    this.count = res.count;
                }).catch(()=>{})
            }).catch(()=>{})
        },
        methods: {
            requestInfo(val) {
                this.isLoading = true;
                this.currentPage = val;
                let start_into_time='';
                let end_into_time='';
                if(this.formInline.inTime && this.formInline.inTime.length===2) {
                    start_into_time = this.common.YMD(Date.parse(this.formInline.inTime[0])/1000);
                    end_into_time = this.common.YMD(Date.parse(this.formInline.inTime[1])/1000);
                }
                let start_leave_time='';
                let end_leave_time='';
                if(this.formInline.leaveTime && this.formInline.leaveTime.length===2) {
                    start_leave_time = this.common.YMD(Date.parse(this.formInline.leaveTime[0])/1000);
                    end_leave_time = this.common.YMD(Date.parse(this.formInline.leaveTime[1])/1000);
                }
                this.$http.get(`api/v1/security/user/?page=${this.currentPage}&page_size=20&name=${this.formInline.user}&
                company_type=${this.formInline.company_type}&company=${this.formInline.company}&team=${this.formInline.team}&
                work_type=${this.formInline.work_type}&sex=${this.formInline.gender}&is_real_name=${this.formInline.relevance}&
                start_into_time=${start_into_time}&end_into_time=${end_into_time}&start_leave_time=${start_leave_time}&end_leave_time=${end_leave_time}`).then((res)=>{
                    this.isLoading = false;
                    this.tableData = res.data;
                    this.count = res.count;
                }).catch(()=>{})
            },
            handleCurrentChange(val) {
                this.requestInfo(val);
            },
            // 查询
            search() {
                this.requestInfo(1);
            },
            // 重置
            resetForm(formName) {
                // this.$refs[formName].resetFields();
                this.formInline = {
                    user: '',
                    company_type: '',
                    company: '',
                    team: '',
                    workType: '',
                    gender: '',
                    inTime: [],
                    leaveTime: [],
                    relevance: ''
                }
                this.requestInfo(1);
            },
            changeFile(res) {
                let _that = this;
                this.file = res.raw;
                var reader = new FileReader();
                reader.readAsDataURL(res.raw);
                reader.onloadend = function(e) {
                    _that.form.head_img = e.target.result;
                };
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 10MB!");
                }
                return false;
            },
            // 查看
            checkBtn(item) {
                this.checkFormVisible = true;
                this.$nextTick(() => {
                    var container = this.$el.querySelector("#dialogForm");
                    container.scrollTop = 0;
                });
                this.form = JSON.parse(JSON.stringify(item));
            },
            // 编辑
            editStaffBtn(item) {
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    var container = this.$el.querySelector("#dialogForm");
                    container.scrollTop = 0;
                });
                this.form = JSON.parse(JSON.stringify(item));
            },
            // 编辑人员
            editStaffInfo() {
                this.formLoading = true;
                this.$http.put(`api/v1/security/user/${this.form.id}`, this.form)
                .then(()=>{
                    this.formLoading = false;
                    this.$message.success('人员修改成功');
                })
                .catch(()=>{
                    this.formLoading = false;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .set-btns-right {
        margin-bottom: 20px;
    }
    .staff-form {
        height: 500px;
        overflow: auto;
        position: relative;
        .form-title {
            font-weight: bold;
            padding: 6px 12px;
            box-sizing: border-box;
            background-color: #eee;
            margin-bottom: 12px;
        }
        ::v-deep .el-form-item__content {
            width: 200px;
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
            right: 40px;
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 150px;
                height: 150px;
                line-height: 150px;
                text-align: center;
            }
            .avatar {
                width: 150px;
                height: 150px;
                display: block;
            }
        }
    }
</style>