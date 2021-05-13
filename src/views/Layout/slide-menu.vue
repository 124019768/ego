<template>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      :collapse="isCollapse"
      >
      <el-menu-item>
        <!-- <span slot="title">易购后台管理界面</span> -->
        <span slot="title">{{ $t ('message.ego') }}</span>
        
      </el-menu-item>
    
      <el-menu-item index="/product">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">商品设置</span> -->
        <span slot="title">{{ $t ('message.product') }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-tickets"></i>
        <!-- <span slot="title">规规参数</span> -->
        <span slot="title">{{ $t ('message.set') }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-s-marketing"></i>
        <!-- <span slot="title">广告分类</span> -->
          <span slot="title">{{ $t ('message.ad') }}</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <i class="el-icon-present"></i>
        <!-- <span slot="title">个人中心</span> -->
          <span slot="title">{{ $t ('message.nom') }}</span>

      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
           <i class="el-icon-menu"></i>
           <span> 我的工作台</span>
            </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

</template>

<script>
export default {
  // data(){
  //   return{
  //     // isCollapse:true,
  //   }
  // },
  props:{
    isCollapse:{
      type:Boolean,
      default:false,
    }

  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  .is-active {
    background: #1f2d3d !important;
  }
}
</style>