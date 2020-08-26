<template>
    <div class="home-set main-content">
        <el-tabs :value="$store.state.TabName" @tab-click="changeTabs">
            <el-tab-pane label="实名管理" name="first" lazy>
                <v-realName></v-realName>
            </el-tab-pane>
            <el-tab-pane label="门禁管理" name="second" lazy>
                <v-accessControl></v-accessControl>
            </el-tab-pane>
            <el-tab-pane label="在岗信息" name="three" lazy>
                <v-jobInfo></v-jobInfo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import realName from './RealName';
    import accessControl from './AccessControl';
    import jobInfo from './JobInfo';
    export default {
        components: {
            'v-realName': realName,
            'v-accessControl': accessControl,
            'v-jobInfo': jobInfo
        },
        data() {
            return {
                
            }
        },
        methods: {
            changeTabs(val) {
                this.$store.commit('TabName', val.name);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-set {
        
    }
</style>