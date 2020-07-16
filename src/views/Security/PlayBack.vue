<template>
    <div>
        <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
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
                    },
                    {
                        label: '区域2',
                        children: [
                            {
                                label: '出入口',
                                children: [ { label: '监控1' }, { label: '监控2' } ]
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            
        },
        methods: {
            handleNodeClick() {

            }
        }
    }
</script>
<style lang="scss" scoped>

</style>