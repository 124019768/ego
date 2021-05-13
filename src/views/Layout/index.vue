<template>
  <div class="layout">
    <!-- 左边 -->
    <SlideMenu class="slideNav" :isCollapse="flag" />

    <!-- 顶部 -->
    <HeaderMenu class="header" @toggleMenu="toggleMenu" />
    <!-- 右侧内容 -->
    <Content class="main-content"  :class="{content:flag}"/>
  </div>
</template>

<script>
import SlideMenu from "./slide-menu";
import HeaderMenu from "./header-menu";
import Content from "./layout-menu";
export default {
  data() {
    return {
      flag: false,
    };
  },
  components: {
    SlideMenu,
    HeaderMenu,
    Content,
  },
  methods: {
    toggleMenu(val) {
      console.log(val);
      this.flag = val;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
      border-right: 0;
  }
}
.slideNav {
  height: 100%;
  // width: 200px;
  background: #1f2d3d;
  float: left;

}
.togglrMenu {
  width: 64px;
}
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.main-content{
  margin-left: 200px;
}
.content{
  margin-left: 64px;
}
</style>