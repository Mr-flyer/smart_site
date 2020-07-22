<template>
    <div class="empty-main" v-if="showEmpty">
        <img class="empty-icon" src="../assets/empty_icon.png"/>
        <div class="empty-text">暂未监测到数据</div>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String | Array | Object
            }
        },
        data() {
            return {
                showEmpty: false
            }
        },
        watch: {
            'value': function() {
                if(JSON.stringify(this.value) === "{}") {
                    this.showEmpty = true;
                }else if(this.value!=='' && this.value.length <=0) {
                    this.showEmpty = true;
                }else {
                    this.showEmpty = false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .empty-main {
        width: 100%;
        min-height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .empty-icon {
            width: 60px;
            height: 60px;
            margin: 20px 0;
        }
        .empty-text {
            color: #888;
        }
    }
</style>