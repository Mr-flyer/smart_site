<template>
    <div class="role-manage main-content">
        <div class="add-role-btn">
            <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增角色</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                width="80px"
                label="序号">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column
                prop="role"
                width="150"
                label="角色">
            </el-table-column>
            <el-table-column
                prop="roleDescribe"
                label="角色描述">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="delBtn">删除</el-button>
                    <el-button type="text" size="small" @click="dialogPermissionVisible = true">权限设置</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="role-page"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="20"
            layout="sizes, prev, pager, next, jumper"
            :total="100">
        </el-pagination>
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item 
                    label="角色名"
                    prop="role"
                    :rules="[
                        { required: true, message: '请输入角色名', trigger: 'blur' },
                    ]">
                    <el-input v-model="form.role" placeholder="请输入角色名"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.roleDescribe" placeholder="请输入角色描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addRoleSub('form')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="权限配置" :visible.sync="dialogPermissionVisible" width="500px">
            <el-form :model="permissionForm" ref="permissionForm" label-width="150px">
                <el-form-item class="permission-form-item" :label="item.name+' ：'" :key="item.name" v-for="item in permissionList">
                    <el-checkbox-group v-model="permissionForm[item.value]" v-if="!item.radio">
                        <el-checkbox v-for="site in item.list" :key="site.name" :label="site.name" name="type"></el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-model="permissionForm[item.value]" v-else>
                        <el-radio v-for="site in item.list" :key="site.name" :label="site.name"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogPermissionVisible = false">保存</el-button>
                    <el-button @click="dialogPermissionVisible = false">取消</el-button>
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
                        role: '超级管理员',
                        roleDescribe: '数据维护'
                    }
                ],
                currentPage: 1,
                dialogFormVisible: false,
                form: {
                    role: '',
                    roleDescribe: ''
                },
                dialogPermissionVisible: false,
                permissionList: [
                    {name: '首页管理', value: 'home', list: [{name: '项目信息'}, {name: '视频管理'}]},
                    {name: '管理员设置', value: 'admin', radio: true, list: [{name: '仅限本公司'}, {name: '所有人员'}]},
                    {name: '角色管理', value: 'role', list: [{name: '新增配置权限'}]},
                    {name: '视频监控', value: 'video', list: [{name: '操作权限'}]},
                    {name: '人员管理', value: 'person', list: [{name: '操作权限'}]},
                    {name: '扬尘管控', value: 'raise', list: [{name: '操作权限'}]},
                    {name: '车辆道闸', value: 'car', list: [{name: '操作权限'}]}
                ],
                permissionForm: {
                    home: [],
                    admin: '',
                    role: [],
                    video: [],
                    person: [],
                    raise: [],
                    car: []
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
            // 新增角色提交
            addRoleSub(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    }
                });
            },
            // 删除角色
            delBtn() {
                this.$confirm('确定要删除此角色吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('删除成功');
                }).catch(() => {});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .role-manage {
        .add-role-btn {
            text-align: right;
            margin-bottom: 24px;
        }
        .role-page {
            text-align: right;
            margin-top: 24px;
        }
        .form-tips {
            font-size: 12px;
            color: #88B;
            margin-top: 10px;
        }
        /* ::v-deep .el-form-item__content {
            line-height: 16px;
        } */
        .permission-form-item {
            margin-bottom: 8px !important;
        }
    }
</style>