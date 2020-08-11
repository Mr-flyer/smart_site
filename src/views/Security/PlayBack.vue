<template>
    <div class="play-back">
        <span class="play-back-tree">
            <div class="video-tree-input">
                <el-input placeholder="搜索监控通道"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <el-tree :data="data" highlight-current @node-click="handleNodeClick"></el-tree>
        </span>
        <span class="play-back-list">
            <div class="select-input">
                <el-input placeholder="输入名称"></el-input>
                <span class="select-type">
                    锁定类型：
                    <el-select v-model="lockType" placeholder="请选择锁定类型">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="已锁定" value="shanghai"></el-option>
                        <el-option label="未锁定" value="beijing"></el-option>
                    </el-select>
                </span>
                <el-date-picker
                    class="time-input"
                    v-model="monitoringTime"
                    type="daterange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="play-back-ul">
                <el-collapse>
                    <el-collapse-item v-for="item in 3" :key="item">
                        <template slot="title">
                            <div class="play-back-li-date"><span>2020-07-18</span><i class="el-icon-lock"></i></div>
                        </template>
                        <div class="back-list">
                            <span class="back-li" v-for="site in 10">
                                <div class="li-video"></div>
                                <i class="el-icon-lock"></i>
                                <div class="video-name">片段1</div>
                                <div class="video-size">视频大小：12M</div>
                                <div class="video-time">09:00:00~10:00:00</div>
                            </span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <!-- <div class="play-back-li" v-for="item in 3">
                    <div class="play-back-li-date"><span>2020-07-18</span><i class="el-icon-lock"></i></div>
                    
                </div> -->
            </div>
        </span>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                data: [
                    {
                        label: '区域1',
                        children: [
                            {
                                label: '消防通道',
                                children: [ { label: '监控1' }, { label: '监控2' } ]
                            },
                            {
                                label: '停车场',
                                children: [ { label: '监控1' }, { label: '监控2' } ]
                            }
                        ]
                    }
                ],
                lockType: '',
                monitoringTime: []
            }
        },
        created() {
            
        },
        methods: {
            handleNodeClick() {

            },
            timeUpdatethree(val){
                let sTime=new Date(val[0]).getTime();
                let eTime=new Date(val[1]).getTime();
                let reduceDate=(eTime-sTime)/1000/60/60/24;
                if(reduceDate>3){
                    return true;
                }
            },
            focusTime() {
                this.playBackTime = [];
            },
            changeBackTime(val) {
                if(val!=null){
                    if(this.timeUpdatethree(val)){
                        this.$message.warning('查询天数不能大于3天');
                        this.playBackTime = [];
                    }else{
                        
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .play-back {
        width: 100%;
        display: flex;
        height: 100%;
        overflow: hidden;
        .play-back-tree {
            width: 300px;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            overflow: auto;
            .video-tree-input {
                display: flex;
            }
            ::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
                color: #409EFF;
            }
            .play-back-time {
                position: absolute;
                bottom: 0;
            }
        }
        .play-back-list {
            width: calc(100% - 300px);
            display: inline-block;
            padding-left: 20px;
            box-sizing: border-box;
            height: 100%;
            overflow: auto;
            .select-input {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 20px;
                flex-wrap: wrap;
                ::v-deep .el-input {
                    width: 230px;
                }
                ::v-deep .el-input__inner {
                    width: 230px;
                }
                .select-type {
                    display: inline-flex;
                    align-items: center;
                    margin: 0 16px;
                }
                .time-input {
                    margin-right: 16px;
                }
            }
            .play-back-ul {
                width: 100%;
                .play-back-li-date {
                    width: 100%;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    line-height: 20px;
                    font-weight: bold;
                    &>i {
                        cursor: pointer;
                        margin-left: 16px; 
                    }
                }
                .back-list {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .back-li {
                        width: 150px;
                        display: inline-flex;
                        flex-direction: column;
                        margin: 20px 20px 0 0 ;
                        position: relative;
                        .el-icon-lock {
                            position: absolute;
                            padding: 8px;
                            cursor: pointer;
                            font-size: 22px;
                            left: 0;
                            top: 0;
                        }
                        .li-video {
                            width: 100%;
                            height: 200px;
                            background-color: #eee;
                        }
                        .video-name {
                            margin: 6px 0;
                        }
                        .video-time {
                            margin-top: 6px;
                        }
                    }
                }
            }
        }
    }
</style>