<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁状态</span>
                        <div class="access-control-op">
                            <div class="access-control-icons">
                                <div><img src="../../../assets/open_door.png"/>开门</div>
                                <div><img src="../../../assets/close_door.png"/>关门</div>
                                <div><img src="../../../assets/c_open_door.png"/>常开</div>
                                <div><img src="../../../assets/c_close_door.png"/>常关</div>
                            </div>
                            <i class="el-icon-refresh"></i>
                        </div>
                    </div>
                    <div class="text item access-controls">
                        <div class="access-control-item" v-for="item in AccessControlList">
                            <img @click="accessControlItem(item)" :class="item.active?'img-active':''" v-if="item.status==0" src="../../../assets/c_close_door.png"/>
                            <img @click="accessControlItem(item)" :class="item.active?'img-active':''" v-else-if="item.status==1" src="../../../assets/close_door.png"/>
                            <img @click="accessControlItem(item)" :class="item.active?'img-active':''" v-else-if="item.status==2" src="../../../assets/c_open_door.png"/>
                            <img @click="accessControlItem(item)" :class="item.active?'img-active':''" v-else src="../../../assets/open_door.png"/>
                            <div>{{item.name}}号门</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁地图</span>
                        <!-- <el-upload
                            class="upload-demo"
                            action="#"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload> -->
                        <el-upload
                            class="avatar-uploader"
                            action="#"
                            :show-file-list="false"
                            :on-change="changeFile"
                            :before-upload="beforeAvatarUpload"
                            accept="image/png,image/gif,image/jpg,image/jpeg">
                            <el-button style="float: right; padding: 3px 0" type="text">上传地图</el-button>
                            <!-- <img v-if="form.projectImg" :src="form.projectImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        </el-upload>
                    </div>
                    <div class="text item access-control-pics">
                        <el-image
                        class="access-control-pic"
                        :src="accessControlPic"
                        fit="cover"></el-image>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="main-row" :gutter="20">
            <el-col :span="16">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁事件</span>
                        <el-button @click="historyListBtn" style="float: right; padding: 3px 0" type="text">查看历史记录</el-button>
                    </div>
                    <div class="text item access-controls">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="100">
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="eventType"
                                label="事件类型"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="发生时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="门禁点">
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="出入类型"
                                width="100">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>当前识别信息</span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="20">
                            <el-col :span="16" class="current-info">
                                <div class="info-weight"><span class="info-name">门禁点：</span><span>1号门</span></div>
                                <div><span class="info-name">人员姓名：</span>王大力</div>
                                <div><span class="info-name">员工ID：</span>1321321</div>
                                <div class="info-weight"><span class="info-name">身份：</span><span>管理人员</span></div>
                                <div><span class="info-name">单位类型：</span>施工单位</div>
                                <div><span class="info-name">公司名称：</span>中国建筑有限公司</div>
                                <div><span class="info-name">有效期：</span>2020-07-11-2020-09-11</div>
                            </el-col>
                            <el-col :span="8">
                                <el-image
                                class="current-info-pic"
                                :src="accessControlPic"
                                fit="cover"></el-image>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                AccessControlList: [
                    { name: '1', status: 0 , active: true },
                    { name: '2', status: 1 , active: false},
                    { name: '3', status: 2 , active: true},
                    { name: '4', status: 3 , active: true}
                ],
                tableData: [
                    {
                        eventType: '人脸识别',
                        name: '张三',
                        time: '2020-04-04 20:00:00',
                        address: '1号门',
                        type: '出'
                    }
                ],
                accessControlPic: require('../../../assets/head_img.jpg')
            }
        },
        methods: {
            // 门禁状态
            accessControlItem(item) {
                if(item.active) this.$set(item, 'active', false);
                else this.$set(item, 'active', true);
            },
            // 查看历史记录
            historyListBtn() {
                this.$router.push({path: '/Security/HistoryList'})
            },
            changeFile(res) {
                let _that = this;
                var reader = new FileReader();    
                reader.readAsDataURL(res.raw);
                reader.onloadend = function(e) {
                    _that.accessControlPic = e.target.result;
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main-row {
        margin-top: 24px;
    }
    .access-control-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .access-control-op {
            display: inline-flex;
            align-items: center;
            .access-control-icons {
                display: inline-flex;
                align-items: center;
                &>div {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 20px;
                    &>img {
                        width: 20px;
                        margin-right: 4px;
                    }
                }
            }
            &>i {
                font-size: 22px;
                cursor: pointer;
            }
        }
    }
    .access-controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 24px;
        padding-top: 0;
        box-sizing: border-box;
        .access-control-item {
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            font-weight: bold;
            font-size: 16px;
            margin-top: 24px;
            &>img {
                width: 100px;
                margin-bottom: 12px;
                border: 2px solid #fff;
                padding: 24px 16px;
                border-radius: 6px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,0);
                cursor: pointer;
            }
            &>img:hover {
                opacity: .8;
            }
            .img-active {
                border: 2px solid #409EFF;
                border-radius: 6px;
                box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
            }
        }
    }
    .access-control-pics {
        display: flex;
        justify-content: center;
    }
    .access-control-pic {
        /* width: 100%;
        height: auto; */
    }
    .current-info {
        &>div {
            margin-bottom: 16px;
            .info-name {
                display: inline-block;
                width: 80px;
                text-align: right;
                margin-right: 4px;
            }
        }
        .info-weight {
            font-weight: bold;
            font-size: 18px;
        }
        &>div:last-child {
            margin: 0;
        }
    }
    .current-info-pic {
        width: 100%;
    }
</style>