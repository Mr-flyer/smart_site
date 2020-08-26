<template>
    <div class="project-info" v-loading="isLoading">
        <el-form style="width: 590px;" ref="form" :model="form" label-width="140px">
            <el-form-item label="项目名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目开始时间">
                <el-date-picker
                    v-model="form.start_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="项目图片">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :on-change="changeFile"
                    :before-upload="beforeAvatarUpload"
                    accept="image/png,image/gif,image/jpg,image/jpeg">
                    <img v-if="form.projectImg" :src="form.projectImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item> -->
            <el-form-item label="项目地点">
                <el-input v-model="form.addr"></el-input>
            </el-form-item>
            <el-form-item label="工程造价">
                <el-input @input="form.cost = form.cost.replace(/\D/g, '')" :value="form.cost">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="场地面积">
                <el-input v-model="form.field_area">
                    <template slot="append">平方米</template>
                </el-input>
            </el-form-item>
            <el-form-item label="建筑面积">
                <el-input v-model="form.area">
                    <template slot="append">平方米</template>
                </el-input>
            </el-form-item>
            <el-form-item label="建设单位">
                <i v-if="form.build_company.length<=0" class="project-icon-n el-icon-circle-plus-outline" @click.prevent="add('build_company')"></i>
                <div v-else class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.build_company" :key="index">
                        <el-input v-model="form.build_company[index]"></el-input>
                        <i v-if="form.build_company.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('build_company')"></i
                        ><i class="project-icon el-icon-delete" @click.prevent="remove('build_company', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="设计单位">
                <i v-if="form.design_company.length<=0" class="project-icon-n el-icon-circle-plus-outline" @click.prevent="add('design_company')"></i>
                <div v-else class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.design_company" :key="index">
                        <el-input v-model="form.design_company[index]"></el-input>
                        <i v-if="form.design_company.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('design_company')"></i
                        ><i class="project-icon el-icon-delete" @click.prevent="remove('design_company', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="监理单位">
                <i v-if="form.supervisor_company.length<=0" class="project-icon-n el-icon-circle-plus-outline" @click.prevent="add('supervisor_company')"></i>
                <div v-else class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.supervisor_company" :key="index">
                        <el-input v-model="form.supervisor_company[index]"></el-input>
                        <i v-if="form.supervisor_company.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('supervisor_company')"></i
                        ><i class="project-icon el-icon-delete" @click.prevent="remove('supervisor_company', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="施工单位">
                <i v-if="form.construction_company.length<=0" class="project-icon-n el-icon-circle-plus-outline" @click.prevent="add('construction_company')"></i>
                <div v-else class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.construction_company" :key="index">
                        <el-input v-model="form.construction_company[index]"></el-input>
                        <i v-if="form.construction_company.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('construction_company')"></i
                        ><i class="project-icon el-icon-delete" @click.prevent="remove('construction_company', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading: false,
                isAdd: true,
                form: {
                    name: '',
                    start_date: '',
                    addr: '',
                    // projectImg: '',
                    cost: '',
                    field_area: '',
                    area: '',
                    build_company: [],
                    design_company: [],
                    construction_company: [],
                    supervisor_company: []
                }
            }
        },
        created() {
            this.isLoading = true;
            this.$http.get('api/v1/system/project/')
            .then((res)=>{
                this.isLoading = false;
                if(JSON.stringify(res.data) === '{}') { this.isAdd = true; }
                else {this.form = res.data; this.isAdd = false;}
            })
            .catch(()=>{})
        },
        methods: {
            add(name) {
                this.form[name].push('')
            },
            // 删除建设单位
            remove(name, index) {
                this.form[name].splice(index, 1);
            },
            changeFile(res) {
                let _that = this;
                var reader = new FileReader();    
                reader.readAsDataURL(res.raw);
                reader.onloadend = function(e) {
                    _that.form.head_img = e.target.result;
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return false;
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let build = this.form.build_company.some((item)=>{
                            return item == '';
                        })
                        if(build) {
                            this.$message.warning('建设单位里包含空值，请填写完整');
                            return false;
                        }
                        let design = this.form.design_company.some((item)=>{
                            return item == '';
                        })
                        if(design) {
                            this.$message.warning('设计单位里包含空值，请填写完整');
                            return false;
                        }
                        let construction = this.form.construction_company.some((item)=>{
                            return item == '';
                        })
                        if(construction) {
                            this.$message.warning('施工单位里包含空值，请填写完整');
                            return false;
                        }
                        let supervisor = this.form.supervisor_company.some((item)=>{
                            return item == '';
                        })
                        if(supervisor) {
                            this.$message.warning('监理单位里包含空值，请填写完整');
                            return false;
                        }
                        if(this.isAdd) {        //添加
                            this.isLoading = true;
                            this.$http.post('api/v1/system/project/', {
                                name: this.form.name,
                                start_date: this.form.start_date ? this.common.YMD(Date.parse(this.form.start_date)/1000): null,
                                addr: this.form.addr,
                                cost: this.form.cost ? this.form.cost : null,
                                field_area: this.form.field_area,
                                area: this.form.area,
                                build_company: this.form.build_company,
                                design_company: this.form.design_company,
                                construction_company: this.form.construction_company,
                                supervisor_company: this.form.supervisor_company
                            })
                            .then((res)=>{
                                this.isLoading = false;
                                this.isAdd = false;
                                this.$message.success('设置成功');
                            })
                            .catch(()=>{
                                this.isLoading = false;
                            })
                        }else {         //修改
                            this.isLoading = true;
                            this.$http.put('api/v1/system/project/', {
                                name: this.form.name,
                                start_date: this.form.start_date ? this.common.YMD(Date.parse(this.form.start_date)/1000): null,
                                addr: this.form.addr,
                                cost: this.form.cost ? this.form.cost : null,
                                field_area: this.form.field_area,
                                area: this.form.area,
                                build_company: this.form.build_company,
                                design_company: this.form.design_company,
                                construction_company: this.form.construction_company,
                                supervisor_company: this.form.supervisor_company
                            })
                            .then((res)=>{
                                this.isLoading = false;
                                this.isAdd = false;
                                this.$message.success('设置成功');
                            })
                            .catch(()=>{
                                this.isLoading = false;
                            })
                        }
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .project-info {
        width: 100%;
        .form-divs {
            .form-div {
                display: flex;
                align-items: center;
                margin-top: 12px;
                ::v-deep .el-input__inner {
                    width: 450px;
                }
            }
            &>div:first-child {
                margin-top: 0;
            }
        }
        .project-icon, .project-icon-n {
            font-size: 22px;
            margin-left: 12px;
            cursor: pointer;
        }
        .project-icon-n {
            margin-top: 9px;
        }
        ::v-deep .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        ::v-deep .el-upload:hover {
            border-color: #409EFF;
        }
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
</style>