<template>
  <div>
    <el-pagination
     background
      layout="total,prev, pager, next,jumper" 
      :page-size="pageSize" 
      :total="total"
      @current-change="current">
    </el-pagination>
  </div>
</template>

<script setup>
export default{
    props:{
        total:{
            type:Number,
            default:10
        },
        pageSize:{
            type:Number,
            default:1
        }

    },
    methods:{
        current(val){
            this.$emit('currrntPage',val)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>