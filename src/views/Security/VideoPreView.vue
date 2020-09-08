<template>
    <div class="video-preView">
        <span class="video-tree">
            <div class="video-tree-input">
                <el-input placeholder="搜索监控通道"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <div class="video-device">
                <span class="video-sum-device">设备总数：13台</span
                ><span class="video-device-list">
                    <div style="color: #70B603">在线：10台</div>
                    <div style="color: #D9001B">异常：2台</div>
                    <div style="color: #999">离线：1台</div>
                </span>
            </div>
            <el-tree 
                :data="data"
                highlight-current
                @node-click="handleNodeClick"
            ></el-tree>
        </span
        ><span class="video-play">
            <div id="playWnd" class="playWnd" ref="haikangVideo"></div>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String
            }
        },
        data() {
            return {
                data: [
                    {
                        label: '区域1',
                        children: [
                            {
                                label: '消防通道',
                                children: [ {label: '监控1'}, { label: '监控2' }, { label: '监控3' } ]
                            },
                            {
                                label: '停车场',
                                children: [ { label: '监控1' }, { label: '监控2' } ]
                            }
                        ]
                    }
                ],
                oWebControl: null,
                initCount: 0,
                pubKey: '',
            }
        },
        watch: {
            'name': function() {
                if(this.name === 'second') {
                    if (this.oWebControl != null){
                        this.oWebControl.JS_HideWnd();  // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                        this.oWebControl.JS_Disconnect().then(function(){}, function() {});
                    }
                }else {
                    this.$nextTick(()=>{
                        let w = this.$refs.haikangVideo.offsetWidth;
                        let h = this.$refs.haikangVideo.offsetHeight;
                        this.initPlugin(w, h);
                    })
                }
            }
        },
        created() {
            this.$nextTick(()=>{
                let w = this.$refs.haikangVideo.offsetWidth;
                let h = this.$refs.haikangVideo.offsetHeight;
                this.initPlugin(w, h);
            })
        },
        mounted() {
            let _that = this;
            window.addEventListener("resize",function(){
                if (_that.oWebControl != null) {
                    _that.$nextTick(()=>{
                        let w = _that.$refs.haikangVideo.offsetWidth;
                        let h = _that.$refs.haikangVideo.offsetHeight;
                        _that.oWebControl.JS_Resize(w, h);
                    })
                    // _that.setWndCover();
                }
            }),
            window.addEventListener("scroll",function(){
                if (_that.oWebControl != null) {
                    _that.$nextTick(()=>{
                        let w = _that.$refs.haikangVideo.offsetWidth;
                        let h = _that.$refs.haikangVideo.offsetHeight;
                        _that.oWebControl.JS_Resize(w, h);
                    })
                    // _that.setWndCover();
                }
            })
        },
        methods: {
            handleNodeClick() {

            },
            initPlugin(w, h) {
                let _that = this;
                this.oWebControl = new WebControl({
                    szPluginContainer: "playWnd",
                    iServicePortStart: 15900, // 指定起止端口号，建议使用该值
                    iServicePortEnd: 15909,
                    // 用于 IE10 使用 ActiveX 的 clsid 
                    szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",
                    // 创建WebControl实例成功
                    cbConnectSuccess: function(){
                        _that.oWebControl.JS_StartService('window', {
                            dllPath: "./VideoPluginConnect.dll"
                        })
                        .then(()=>{
                            // 服务启动成功
                            // 设置消息回调
                            _that.oWebControl.JS_SetWindowControlCallback({ 
                                cbIntegrationCallBack: function(oData) {
                                    // console.log(oData)
                                }
                            });
                            //JS_CreateWnd 创建视频播放窗口，宽高可设定
                            _that.oWebControl.JS_CreateWnd("playWnd", w, h).then(function () {
                                _that.init(); // 创建播放实例成功后初始化
                                // console.log("JS_CreateWnd success");
                            });
                        }, (err)=>{
                            // console.log(err)
                            // 服务启动失败
                        })
                    },
                    // 创建 WebControl 实例失败
                    cbConnectError: function () {
                        _that.oWebControl = null;
                        $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
                        // 程序未启动时执行 error 函数，采用 wakeup 来启动程序
                        _that.WebControl.JS_WakeUp("VideoWebPlugin://");
                        _that.initCount ++;
                        if (_that.initCount < 3) { 
                            setTimeout(function () {
                                _that.initPlugin(w, h);
                            }, 3000)
                        } else {
                            $("#playWnd").html("插件启动失败，请检查插件是否安装！");
                        }
                    },
                    // 插件使用过程中发生的断开与插件服务连接的回调
                    // bNormalClose = false 时表示异常断开
                    // bNormalClose = true 时表示正常断开
                    cbConnectClose: function (bNormalClose) { 
                        _that.oWebControl = null;
                    }
                })
            },
            // 获取公钥
            getPubKey (callback) {
                let _that = this;
                this.oWebControl.JS_RequestInterface({
                    funcName: "getRSAPubKey",
                    argument: JSON.stringify({
                        keyLength: 1024
                    })
                }).then(function (oData) {
                    if (oData.responseMsg.data) {
                        _that.pubKey = oData.responseMsg.data
                        callback()
                    }
                })
            },
            setEncrypt (value) {
                var encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.pubKey);
                return encrypt.encrypt(value);
            },
            init() {
                let _that = this;
                // this.getPubKey(function() {
                    _that.oWebControl.JS_RequestInterface({
                        funcName: 'init',
                        argument: {
                            appkey: "afsgnhmj34567dgh", // API 网关提供的 appkey
                            secret: "vgkk3g0jaoj0igoigj", // API 网关提供的 secret
                            ip: "10.33.31.4", // API 网关 IP 地址
                            port: 9016, // API 网关端口
                            playMode: 0, //播放模式（决定显示预览还是回放界面），0-预览 1-录像播放
                            encryptedFields: "appkey,secret", //secret 和 appkey 已加密，对多个字段加密存在初始化耗时问题
                            // snapDir: "D:\SnapDir", // 抓图存储路径
                            layout: "1x1", // 初始化 1x1 布局
                            showToolbar: 1, // 显示工具栏
                            showIntelligent: 1, // 显示智能信息
                            buttonIDs: "0,16,256,517",  //工具栏按钮字符串
                        }
                    })
                    .then((res)=> {
                        _that.oWebControl.JS_RequestInterface({
                            funcName: "startPreview",
                            argument: {
                                cameraIndexCode: "afsgnhmj34567dgh", // 监控点编号
                                streamMode: 0, // 主子码流标识，0-主码流 1-子码流
                                transMode: 1, // 传输协议，0-UDP 1-TCP
                                gpuMode: 0 // 是否开启 GPU 硬解，不建议开启，0-不开启 1-开启
                            }
                        }).then(function (oData) {
                            // console.log(oData)
                            // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
                        });
                    })
                // })
            }
        },
        destroyed() {
            if (this.oWebControl != null){
                this.oWebControl.JS_HideWnd();  // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
                this.oWebControl.JS_Disconnect().then(function(){}, function() {});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-preView {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .video-tree {
            width: 300px;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            overflow: auto;
            .video-tree-input {
                display: flex;
            }
            .video-device {
                width: 100%;
                display: flex;
                align-items: center;
                border: 1px solid #e5e5e5;
                box-sizing: border-box;
                .video-sum-device {
                    padding: 0 12px;
                    box-sizing: border-box;
                }
                .video-device-list {
                    border-left: 1px solid #e5e5e5;
                    box-sizing: border-box;
                    padding: 6px 0 ;
                    &>div {
                        padding: 6px 12px;
                        box-sizing: border-box;
                    }
                }
            }
            ::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
                color: #409EFF;
            }
        }
        .video-play {
            width: calc(100% - 300px);
            overflow: auto;
            padding-left: 20px;
            .playWnd {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>