<template>
  <div class="admin-manage main-content">
        <div class="add-admin-btn">
            <div class="admin-search">
                <el-input placeholder="请输入姓名"/><el-button type="primary">搜索</el-button>
            </div>
            <div>
                <i>导出</i>
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
                prop="account"
                label="账号"
                width="140">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="staffId"
                label="员工ID"
                width="100">
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
                prop="createTime"
                label="创建时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="20"
            layout="sizes, prev, pager, next, jumper"
            :total="100">
        </el-pagination>
        <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" label-width="100px">
                <el-form-item label="账户名">
                    <el-input v-model="form.account" placeholder="请输入汉字、英文或数字"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="员工ID">
                    <el-input v-model="form.staffId" placeholder="请输入员工ID"></el-input>
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
                tableData: [
                    {
                        account: 'admin',
                        name: '张三',
                        staffId: 1,
                        companyType: '管理单位',
                        companyName: '中国第一建筑公司',
                        role: '超级管理员',
                        createTime: '2020-09-09 12：00：00',
                        status: '正常'
                    }
                ],
                currentPage: 1,
                dialogFormVisible: false,
                form: {
                    account: '',
                    name: '',
                    staffId: '',
                    password: '',
                    role: '',
                    status: ''
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
                    this.$message({
                        type: 'success',
                        message: '下线成功!'
                    });
                }).catch(() => {});
            },
            // 删除管理员
            delBtn() {
                this.$confirm('确定要删除此管理员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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