import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
// 系统设置
import System from "../views/System/index.vue";
import AdminList from "../views/System/AdminList.vue";
import HomeSet from "../views/System/HomeSet.vue";
import RoleSet from "../views/System/RoleSet.vue";
// 安全设置
import Security from "../views/Security/index.vue";
import DustControl from "../views/Security/DustControl/DustControl.vue";
import DustControlHistoryList from "../views/Security/DustControl/HistoryList.vue";
import PersonnelManagement from "../views/Security/PersonnelManage/PersonnelManagement.vue";
import HistoryList from "../views/Security/PersonnelManage/HistoryList.vue";
import VehicleBarrier from "../views/Security/VehicleBarrier.vue";
import VideoMonitoring from "../views/Security/VideoMonitoring.vue";
// 三维物联
import IOT from "../views/IOT/index.vue";
import TDRealScene from "../views/IOT/TDRealScene.vue";
import UAVCruise from "../views/IOT/UAVCruise.vue";
// 三维文档
import TDDocument from "../views/TDDocument/TDDocument.vue";
// 生产管理
import Production from '../views/Production/Production.vue';
import Document3D from '../views/Production/Document3D.vue';
// 个人中心
import UserCenter from "../views/UserCenter/UserCenter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/System",
        name: "System",
        component: System,
        children: [
          {
            path: "/System/AdminList",
            name: "AdminList",
            component: AdminList,
          },
          {
            path: "/System/HomeSet",
            name: "HomeSet",
            component: HomeSet,
          },
          {
            path: "/System/RoleSet",
            name: "RoleSet",
            component: RoleSet,
          },
        ],
      },
      {
        path: "/Security",
        name: "Security",
        component: Security,
        children: [
          {
            path: "/Security/VideoMonitoring",
            name: "VideoMonitoring",
            component: VideoMonitoring,
          },
          {
            path: "/Security/PersonnelManagement",
            name: "PersonnelManagement",
            component: PersonnelManagement,
          },
          {
            path: "/Security/HistoryList",
            name: "PersonnelManagement",
            component: HistoryList,
          },
          {
            path: "/Security/DustControl",
            name: "DustControl",
            component: DustControl,
          },
          {
            path: "/Security/DustControlHistoryList",
            name: "DustControl",
            component: DustControlHistoryList,
          },
          {
            path: "/Security/VehicleBarrier",
            name: "VehicleBarrier",
            component: VehicleBarrier,
          },
        ],
      },
      {
        path: "/IOT",
        name: "IOT",
        component: IOT,
        children: [
          {
            path: "/IOT/UAVCruise",
            name: "UAVCruise",
            component: UAVCruise,
          },
          {
            path: "/IOT/TDRealScene",
            name: "TDRealScene",
            component: TDRealScene,
          }
        ],
      },
      {
        path: "/TDDocument",
        name: "TDDocument",
        component: TDDocument
      },
      {
        path: "/Production",
        name: "Production",
        component: Production,
        children: [
          {
            path: "/Production/Document3D",
            name: "Document3D",
            component: Document3D,
          },
        ],
      },
      {
        path: "/UserCenter",
        name: "UserCenter",
        component: UserCenter
      }
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
