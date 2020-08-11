<template>
    <div class="not-found">
        <div class="not-found-icon">
            <img src="../assets/not_found_icon.png"/>
            <div>
                <div>NOT FOUND</div>
                <div class="des">页面飞走了~</div>
            </div>
        </div>
        <div class="second">{{second}} 秒后跳回首页</div>
        <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                second: 5,
                setIn: ''
            }
        },
        created() {
            this.setIn = setInterval(()=>{
                if(this.second === 1) {
                    clearInterval(this.setIn);
                    this.goHome();
                }else {
                    this.second --;
                }
            }, 1000)
        },
        methods: {
            // 跳回首页
            goHome() {
                this.$router.push({path: '/'})
            }
        },
        destroyed() {
            clearInterval(this.setIn);
        }
    }
</script>
<style lang="scss" scoped>
    .not-found {
        width: 100%;
        padding-top: 6%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .not-found-icon {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &>img {
                width: 390px;
                height: 200px;
            }
            &>div {
                /* font-size: 20px; */
                font-weight: bold;
                margin-left: 32px;
                .des {
                    margin-top: 12px;
                    font-size: 24px;
                    color: #409EFF;
                }
            }
        }
        .second {
            font-size: 24px;
            margin: 42px 0 24px 0;
        }
    }
</style>