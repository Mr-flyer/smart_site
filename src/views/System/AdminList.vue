<template>
  <div class="admin-manage main-content" v-loading="isLoading">
        <div class="add-admin-btn">
            <div class="admin-search">
                <el-input v-model="searchValue" placeholder="请输入姓名"/>
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <div>
                <!-- <el-button icon="el-icon-top-right" type="primary">导出</el-button> -->
                <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增管理员</el-button>
            </div>
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
            <el-table-column
                prop="username"
                label="账号"
                width="140">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <!-- <el-table-column
                prop="staffId"
                label="员工ID"
                width="100">
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
                label="角色"
                width="140">
                <template slot-scope="scope">
                    <div v-if="scope.row.identity">
                        <div v-if="scope.row.identity == item.id" v-for="item in identityList" :key="item.id">{{item.name}}</div>
                    </div>
                    <div v-else>/</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="date_joined"
                label="创建时间"
                width="180">
            </el-table-column>
            <el-table-column
                label="状态"
                width="100">
                <template slot-scope="scope">
                    <div :class="scope.row.is_active?'green':'red'">{{scope.row.is_active?'上线':'下线'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button @click="offlineBtn" type="text" size="small">下线</el-button>
                        <el-button @click="delBtn" type="text" size="small">删除</el-button>
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
        <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" label-width="100px">
                <el-form-item label="账户名">
                    <el-input v-model="form.account" placeholder="请输入汉字、英文或数字"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.staffId" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="初始密码">
                    <el-input v-model="form.password" placeholder="请输入8-16位的数字、英文"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option label="超级管理员" value="shanghai"></el-option>
                        <el-option label="普通员工" value="beijing"></el-option>
                    </el-select>
                    <el-button @click="addRoleBtn" icon="el-icon-plus" type="primary">创建角色</el-button>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option label="正常" value="shanghai"></el-option>
                    <el-option label="下线" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                searchValue: '',
                tableData: [],
                currentPage: 1,
                count: 0,
                dialogFormVisible: false,
                form: {
                    account: '',
                    name: '',
                    staffId: '',
                    password: '',
                    role: '',
                    status: ''
                },
                isLoading: false,
                companyTypeList: [],
                companyList: [],
                teamList: [],
                workTypeList: []
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
            let firstRequest = this.$http.get(`api/v1/user/admin/?name=${this.searchValue}&page=1&page_size=${this.pageSize}`).then((res)=>{
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
                this.$http.get(`api/v1/user/admin/?name=${this.searchValue}&page=${this.currentPage}&page_size=${this.pageSize}`)
                .then((res)=>{
                    this.isLoading = false;
                    this.tableData = res.data;
                    this.count = res.count;
                })
                .catch(()=>{})
            },
            handleCurrentChange(val) {
                this.requestInfo(val);
            },
            searchBtn() {
                this.requestInfo(1);
            },
            // 创建角色
            addRoleBtn() {
                this.$router.push({path: '/System/RoleSet'})
            },
            // 下线管理员
            offlineBtn() {
                this.$confirm('确定要下线此管理员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success("下线成功");
                }).catch(() => {});
            },
            // 删除管理员
            delBtn() {
                this.$confirm('确定要删除此管理员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success("删除成功");
                }).catch(() => {});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .admin-manage {
        .add-admin-btn {
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            .admin-search {
                display: inline-flex;
            }
        }
        .admin-page {
            text-align: right;
            margin-top: 24px;
        }
    }
</style>