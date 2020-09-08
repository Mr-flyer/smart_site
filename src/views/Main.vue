<template>
  <el-container class="main-container">
    <el-aside :class="showMenu ? 'main-aside':'hide-main-aside'">
      <div class="main-logo">
        <!-- <img src="../assets/logo.png" /> -->
      </div>
      <el-menu
        background-color="#05101b"
        text-color="#C8CFDB"
        active-text-color="#FFF"
        router
        :default-active="$route.name"
      >
        <template v-for="(item, $index) in menuList">
          <el-menu-item
            class="no-item"
            v-if="item.menuItemList.length <= 0"
            :index="item.routerName"
            :route="{path: item.path}"
            :key="$index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index="$index.toString()" :key="$index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              :index="site.routerName"
              :route="{path: site.path}"
              v-for="(site, $index) in item.menuItemList"
              :key="$index"
            >
              <span class="icon-circle"></span>
              {{site.name}}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
          <span class="head-menu-user">
            <el-dropdown @command="personalCenter">
              <span class="head-menu">
                <img class="head-sculpture" v-if="userInfo.head_img" :src="userInfo.head_img" />
                <img class="head-sculpture" v-else src="../assets/head_img.png" />
                {{userInfo.username}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">修改密码</el-dropdown-item>
                <el-dropdown-item command="2">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-header>
      <el-main id="main">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
        <!-- <router-view/> -->
        <el-backtop target="#main">
          <i class="el-icon-caret-top"></i>
        </el-backtop>
      </el-main>
    </el-container>

    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="600px" @close="closeCallback">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
        v-loading="loading"
      >
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input
            type="password"
            maxlength="16"
            v-model="ruleForm.oldPwd"
            autocomplete="off"
            placeholder="请输入您的原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="password">
          <el-input
            type="password"
            maxlength="16"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入8-16位数字、英文新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="checkPass">
          <el-input
            type="password"
            maxlength="16"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="再次输入您的新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>
<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
        if(!this.common.checkPwd(value))  callback(new Error('请输入8-16位数字、英文密码'));
        else callback();
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.ruleForm.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			const menuList = [
			{
				name: "首页",
				icon: "el-icon-s-home",
				routerName: "home",
				path: "/home",
				menuItemList: []
			},
			{
				name: "系统管理",
				icon: "el-icon-s-tools",
				menuItemList: [
				{
					name: "首页设置",
					routerName: "HomeSet",
					path: "/System/HomeSet"
				},
				// {
				//   name: "管理员设置",
				//   routerName: "AdminList",
				//   path: "/System/AdminList"
				// },
				// {
				//   name: "角色管理",
				//   routerName: "RoleSet",
				//   path: "/System/RoleSet"
				// }
				]
			},
			{
				name: "安全管理",
				icon: "el-icon-menu",
				menuItemList: [
				{
					name: "视频监控",
					routerName: "VideoMonitoring",
					path: "/Security/VideoMonitoring"
				},
				{
					name: "人员管理",
					routerName: "PersonnelManagement",
					path: "/Security/PersonnelManagement"
				},
				{
					name: "扬尘管控",
					routerName: "DustControl",
					path: "/Security/DustControl"
				},
				{
					name: "车辆道闸",
					routerName: "VehicleBarrier",
					path: "/Security/VehicleBarrier"
				},
				{
					name: "安全教育",
				},
				{
					name: "危大工程监测预警",
				},
				{
					name: "现场安全隐患排查",
				},
				{
					name: "高处作业防护预警",
				},
				]
			},
			{
				name: "三维物联",
				icon: "el-icon-tickets",
				menuItemList: [
				{
					name: "三维实景物联",
					routerName: "TDRealScene",
					path: "/IOT/TDRealScene"
				},
				{
					name: "无人机巡航",
					routerName: "UAVCruise",
					path: "/IOT/UAVCruise"
				}
				]
			},
			{
				name: "生产管理",
				icon: "el-icon-s-grid",
				menuItemList: [
				{
					name: "三维进度",
					routerName: "Document3D",
					path: "/Production/Document3D"
				},
				{
					name: "施工验收",
				},
				{
					name: "协同会审",
				},
				{
					name: "云会议",
				},
				]
			},
			{
				name: "三维文档",
				icon: "el-icon-document",
				routerName: "TDDocument",
				path: "/TDDocument",
				menuItemList: []
			},
			{
				name: "用户中心",
				icon: "el-icon-user-solid",
				routerName: "UserCenter",
				path: "/UserCenter",
				menuItemList: []
			}
			];
			return {
				menuList,
				userInfo: "",
				loading: false,
				dialogVisible: false,
				ruleForm: {
					oldPwd: "",
					password: "",
					checkPass: ""
				},
				rules: {
					oldPwd: [
            {required: true, message: '请填写原密码', trigger: "blur"},
            { validator: validatePass, trigger: "blur" }
          ],
					password: [
            {required: true, message: '请填写新密码', trigger: "blur"},
            { validator: validatePass, trigger: "blur" }
          ],
					checkPass: [
            {required: true, message: '请确认密码', trigger: "blur"},
            { validator: validatePass2, trigger: "blur" }
          ]
				},
				showMenu: true,
				notificationCount: 0
			};
		},
		watch: {
			'$route': function(to, from) {
                if(to.path === '/Security/PersonnelManagement' && from.path !== '/Security/HistoryList') {
                    this.$store.commit('TabName', 'first');
                }
                this.$nextTick(() => {
                    var container = this.$el.querySelector("#main");
                    container.scrollTop = 0;
                });
            },
            '$store.state.userInfo': function() {
                this.$nextTick(() => {
                    this.userInfo = this.$store.state.userInfo;
                })
            },
            '$store.state.timeStamp': function() {
                this.$nextTick(() => {
                    var container = this.$el.querySelector("#main");
                    container.scrollTop = 0;
                });
            }
        },
        created() {
            this.$store.commit('TabName', 'first');
            if(localStorage.getItem('user_info')) {
                this.$store.state.userInfo = JSON.parse(localStorage.getItem('user_info'));
                this.userInfo = this.$store.state.userInfo;
            }
        },
		methods: {
			personalCenter(command) {
			// 退出登录
			if (command == 2) {
        localStorage.clear();
				this.$router.push("/");
				window.document.cookie = `userName=;path=/;expires=-1`;
				window.document.cookie = `userPwd=;path=/;expires=-1`;
			} else {
				this.dialogVisible = true;
			}
			},
			closeCallback() {
			this.loading = false;
			this.$nextTick(() => {
				this.$refs.ruleForm.resetFields();
			});
			},
			submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				this.loading = true;
				this.$http
					.post("api/v1/user/change_pwd", {
					raw_password: this.ruleForm.oldPwd,
					new_password: this.ruleForm.password,
					confirm_password: this.ruleForm.checkPass
					})
					.then(res => {
					this.loading = false;
					this.$message.success("密码修改成功");
					this.setCookie(this.ruleForm.checkPass, 7);
					this.$router.push("/");
					})
					.catch(() => {
					this.loading = false;
					});
				}
			});
			},
			// 设置cookie
			setCookie(c_pwd, exdays) {
			if (this.getCookie() === 1) {
				let exdate = new Date();
				exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
				window.document.cookie = `userPwd=${c_pwd};path=/;expires=${exdate.toGMTString()}`;
			}
			},
			// 读取cookie
			getCookie() {
			let temp = 0;
			if (document.cookie.length > 0) {
				let arr = document.cookie.split("; ");
				for (let i = 0; i < arr.length; i++) {
				let arr2 = arr[i].split("=");
				if (arr2[0] === "userPwd" && arr2[1]) {
					temp = 1;
				}
				}
			}
			return temp;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.main-container {
        width: 100%;
        height: 100%;
        background: #F0F2F5;
        .menu-open-icon {
            width: 18px;
            position: fixed;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
            transition: left .1s;
        }
        .menu-close-icon {
            width: 18px;
            position: fixed;
            left: 242px;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
            transition: left .1s;
        }
        .main-aside, .hide-main-aside {
            width: 260px !important;
            background: #081725;
            transition: width .1s;
            .main-logo {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 38px 0;
                &>img {
                    width: 224px;
                }
            }
        }
        .hide-main-aside {
            width: 0px !important;
            transition: width .1s;
        }
        ::v-deep .el-container.is-vertical {
          width: 100%;
        }
        ::v-deep .el-menu {
            border: none !important;
        }
        /* ::v-deep .is-opened .el-menu--inline .el-menu-item{
            background-color: #05101b !important;
        } */
        ::v-deep .el-submenu__title {
            background-color: #081725 !important;
        }
        ::v-deep .el-submenu__title:hover {
            background-color: #0868AC !important;
        }
        ::v-deep .el-menu-item:focus, .el-menu-item:hover {
            background-color: #0868AC !important;
        }
        ::v-deep .is-opened .el-submenu__title{
            color: #fff !important;
        }
        ::v-deep .is-opened .el-submenu__title i {
            color: #fff !important;
        }
        ::v-deep .no-item {
            background-color: #081725 !important;
        }
        ::v-deep .el-header {
            background-color: #fff !important;
            height: 80px !important;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        ::v-deep .el-menu .is-active {
            color: #fff !important;
        }
        ::v-deep .el-menu-item {
            display: flex;
            align-items: center;
            .icon-circle {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                border: 2px solid #C8CFDB;
                display: inline-block;
                margin-right: 10px;
            }
        }
        ::v-deep .el-menu .is-active {
            color: #fff !important;
            background-color: #0868AC !important;
        }
        ::v-deep .is-opened .is-active {
            color: #fff !important;
            .icon-circle {
                border: 2px solid #fff !important;
            }
        }
        .head-menu-item {
            margin-right: 24px;
            cursor: pointer;
        }
        .head-menu-user {
            cursor: pointer;
        }
        .head-menu {
            display: inline-flex;
            align-items: center;
            .head-sculpture {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
            }
            &> i {
                margin-right: 6px;
            }
        }
        .head-menu-user {
            .el-icon-caret-bottom {
                margin-left: 16px;
            }
        }
    }
</style>