<template>
  <div class="headr">
    <span @click="changMenu">
      <i class="icon" :class="flag ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </span>
    <div class="right">
      <el-dropdown trigger="click" class="dropMenu" @command="clickDropDown">
        <span class="el-dropdown-link">
          选择语言<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="ja">日语</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Hello {{ userinfo.user }}</span>
      <span class="edixt" @click="loginOut">
        <i class="el-icon-switch-button"></i>
        {{ $t ('message.tui') }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false,
    };
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    changMenu() {
      this.flag = !this.flag;
      this.$emit("toggleMenu", this.flag);
    },
    loginOut() {
      this.setUser({
        user: "",
        token: "",
        inLogin: false,
      });
      localStorage.removeItem("userToken");
      this.$router.push("/login");
    },
     clickDropDown(command){
      console.log('123',command);
      this.$i18n.locale=command;
     }
  },
};
</script>

<style lang="less" scoped>
.headr {
  background: #1e78bf;
}
.icon {
  font-size: 29px;
  color: #fff;
  line-height: 51px;
}
.right {
  float: right;
  color: #fff;
  font-size: 17px;
  span {
    margin: 0 10px;
  }
  .dropMenu{
      color: #fff;
  }
}
</style>