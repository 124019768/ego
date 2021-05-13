<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="actionUrl"
    :file-list="fileList"
    :auto-upload="false"
    :on-success='uploadSuccess'
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/base';
export default {
  data() {
    return {
      fileList: [],
      actionUrl:base.baseUrl+base.upload
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
   
    uploadSuccess(response){
        console.log(response);
        let imgUrl=base.baseUrl+'/'+response.url.slice(7);
        this.$emit('uploadImage',imgUrl)
        this.fileList=[];
    }
  },
};
</script>

<style lang="less" scoped>
</style>