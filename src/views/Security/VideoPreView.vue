<template>
    <div>
        <div id="playWnd" class="playWnd"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                oWebControl: null,
                initCount: 0,
                pubKey: '',
            }
        },
        created() {
            this.initPlugin();
        },
        methods: {
            initPlugin() {
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
                                    console.log(oData)
                                }
                            });
                            //JS_CreateWnd 创建视频播放窗口，宽高可设定
                            _that.oWebControl.JS_CreateWnd("playWnd", 1000, 600).then(function () {
                                _that.init(); // 创建播放实例成功后初始化
                                console.log("JS_CreateWnd success");
                            });
                        }, (err)=>{
                            console.log(err)
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
                                _that.initPlugin();
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
                            console.log(oData)
                            // showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
                        });
                    })
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playWnd {
        width: 500px;
        height: 500px;
    }
</style>