<template>
    <div class="login">
        <!-- <div class="login-logo">
            <div class="logo-main"><img class="logo-icon" src="../assets/logo.png"/></div>
        </div> -->
        <div class="login-box">
            <div class="login-title">欢迎登录</div>
            <div class="login-content">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                    <el-form-item prop="userName">
                        <el-input
                            v-model="ruleForm.userName" 
                            placeholder="请输入手机号或昵称" 
                            autocomplete="off">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="userPwd">
                        <el-input 
                            type="password" 
                            v-model="ruleForm.userPwd" 
                            placeholder="请输入密码" 
                            autocomplete="off">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item prop="code">
                        <el-input
                            v-model="ruleForm.code" 
                            maxlength="4"
                            placeholder="请输入图片中文字" 
                            autocomplete="off">
                            <template slot="append">
                                <div class="code-img" v-loading="loading">
                                    <div @click="codeImgFun">
                                        <img :src="codeImg" v-if="codeImg"/>
                                        <div class="fail-text" v-else>点击重新获取</div>
                                    </div>
                                </div>
                            </template>
                        </el-input>
                    </el-form-item> -->
                    <el-form-item>
                      <el-button size="medium" type="primary" :loading="loginLoading" class="login-submit" @click="submitForm('ruleForm')">{{loginLoading?'登录中...':'登录'}}</el-button>
                    </el-form-item>
                </el-form>
                <div class="remember-pwd">
                    <div><el-checkbox v-model="rememberPwd">记住密码</el-checkbox></div>
                    <!-- <div @click="forgetPwd" class="forget-pwd">忘记密码</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            ruleForm: {
                userName:'',
                userPwd:'',
                // code: ''
            },
            codeImg: '',
            rememberPwd: false,
            rules: {
                userName: [
                    { required: true, message: '请输入手机号或昵称', trigger: 'blur' },
                ],
                userPwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                // code: [
                //     { required: true, message: '请输入验证码', trigger: 'blur' },
                //     { min: 4, max: 4, message: '请输入验证码', trigger: 'blur' }
                // ]
            },
            dialogVisible: false,
            loading: false,
            loginLoading: false
        }
    },
    created() {
        // this.codeImgFun();
        this.getCookie();
    },
    methods: {
        // 获取图形验证码
        codeImgFun() {
            this.loading = true;
            this.$http.get(`/api/v1/user/code?id=${Date.parse(new Date())}`)
            .then((res)=> {
                this.codeImg = 'data:image/jpeg;base64,'+res.data;
                this.loading = false;
            })
            .catch(()=> {
                this.loading = false;
            })
        },
        submitForm(formName) {
            let _that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginLoading = true;
                    this.$http.post('api/v1/user/login', {
                        username: this.ruleForm.userName,
                        password: this.ruleForm.userPwd,
                        // code: this.ruleForm.code
                    })
                    .then((res)=> {
                        if(this.rememberPwd) {      //记住密码
                            this.setCookie(this.ruleForm.userName, this.ruleForm.userPwd, 7);
                        }
                        this.loginLoading = false;
                        localStorage.setItem('user_info', JSON.stringify(res.data));
                        localStorage.setItem('token', res.token);
                        this.$store.state.userInfo = res.data;
                        this.$router.push({ path: '/System/HomeSet'});
                    })
                    .catch(()=> {
                        this.loginLoading = false;
                    })
                }
            });
        },
        // 忘记密码
        forgetPwd() {
            this.dialogVisible = true;
        },
        // 设置cookie
        setCookie(c_name, c_pwd, exdays) {
            let exdate = new Date();
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
            window.document.cookie = `userName=${c_name};path=/;expires=${exdate.toGMTString()}`;
            window.document.cookie = `userPwd=${c_pwd};path=/;expires=${exdate.toGMTString()}`;
        },
        // 读取cookie
        getCookie() {
            if(document.cookie.length >0) {
                let arr = document.cookie.split('; ');
                for(let i=0;i<arr.length;i++) {
                    let arr2 = arr[i].split('=');
                    if(arr2[0] === 'userName') {
                        this.ruleForm.userName = arr2[1];
                    }else if(arr2[0] === 'userPwd') {
                        this.ruleForm.userPwd = arr2[1];
                    }
                }
            }
        },
        // 清除cookie
        clearCookie() {
            this.setCookie('', '', -1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .login {
        width: 100%;
        height: 100%;
        background: url('../assets/BJ.png') no-repeat center/cover;
        overflow: hidden;
        .login-logo {
            width: 100%;
            background: #081725;
            height: 80px;
            .logo-main {
                width: 1200px;
                height: 80px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                .logo-icon {
                    width: 224px;
                    height: 20px;
                }
            }
        }
        .login-box {
            width: 380px;
            height: auto;
            background: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            border-radius: 5px;
            .login-title {
                width: 100%;
                height: 60px;
                text-indent: 20px;
                line-height: 60px;
                border-bottom: 1px solid #e7e7e7;
                font-size: 16px;
            }
            .login-content {
                width: 100%;
                height: 100%;
                padding: 40px 32px 80px 32px;
                box-sizing: border-box;
                ::v-deep .el-input-group__append {
                    width: 100px;
                    padding: 0;
                }
                .login-submit {
                    width: 100%;
                }
                .remember-pwd {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .forget-pwd {
                        cursor: pointer;
                    }
                }
                .code-img {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    .fail-text {
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
