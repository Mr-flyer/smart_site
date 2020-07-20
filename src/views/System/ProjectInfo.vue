<template>
    <div class="project-info">
        <el-form style="width: 590px;" ref="form" :model="form" label-width="140px">
            <el-form-item label="项目名称">
                <el-input v-model="form.name"></el-input>
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
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="工程造价">
                <el-input v-model="form.address">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="合同工期">
                <el-input v-model="form.address">
                    <template slot="append">天</template>
                </el-input>
            </el-form-item>
            <el-form-item label="建筑面积">
                <el-input v-model="form.address">
                    <template slot="append">平方米</template>
                </el-input>
            </el-form-item>
            <el-form-item label="建设单位">
                <div class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.constructing" :key="index">
                        <el-input v-model="item.value"></el-input
                        ><i v-if="form.constructing.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('constructing')"></i
                        ><i v-if="index!==0" class="project-icon el-icon-delete" @click.prevent="remove('constructing', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="设计单位">
                <div class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.design" :key="index">
                        <el-input v-model="item.value"></el-input
                        ><i v-if="form.design.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('design')"></i
                        ><i v-if="index!==0" class="project-icon el-icon-delete" @click.prevent="remove('design', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="监理单位">
                <div class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.control" :key="index">
                        <el-input v-model="item.value"></el-input
                        ><i v-if="form.control.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('control')"></i
                        ><i v-if="index!==0" class="project-icon el-icon-delete" @click.prevent="remove('control', index)"></i>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="施工单位">
                <div class="form-divs">
                    <div class="form-div" v-for="(item, index) in form.construction" :key="index">
                        <el-input v-model="item.value"></el-input
                        ><i v-if="form.construction.length === index+1" class="project-icon el-icon-circle-plus-outline" @click.prevent="add('construction')"></i
                        ><i v-if="index!==0" class="project-icon el-icon-delete" @click.prevent="remove('construction', index)"></i>
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
                form: {
                    name: '',
                    address: '',
                    // projectImg: '',
                    constructing: [{value: ''}],
                    design: [{value: ''}],
                    control: [{value: ''}],
                    construction: [{value: ''}]
                }
            }
        },
        methods: {
            // 添加建设单位
            add(name) {
                this.form[name].push({value: ''})
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
        .project-icon {
            font-size: 22px;
            margin-left: 12px;
            cursor: pointer;
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