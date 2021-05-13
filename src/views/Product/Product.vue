<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary" @click="innerVisible = true"
          >选择类目</el-button
        >
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="innerVisibleImage = true"
          >上传图片</el-button
        >
        <img
          :src="ruleForm.image"
          alt=""
          style="width: 140px; vertical-align: top; margin-left: 20px"
        />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <Wang ref="wangEditor" @wangData="wangData" />
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
    <!-- 1.内弹框--- 类目选择 -->

    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <Tree @changeTree="changeTree" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 2.内弹框---上传图片 ----->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="innerVisibleImage"
      append-to-body
    >
      <Upload @uploadImage="uploadImage" />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisibleImage = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import Tree from "./Tree";
import Upload from "./Upload";
import Wang from "./Wang";

export default {
  components: {
    Tree,
    Upload,
    Wang,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      innerVisibleImage: false,
      ruleForm: {
        title: "",
        price: "",
        cid: "",
        num: "",
        sellPoint: "",
        category: "",
        image: "",
        desc: "",
        id:''
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        sellPoint: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: {
      type: String,
      default: "标题",
    },
  },
  watch: {
    rowData(val) {
      console.log("监听", val);
      this.$nextTick(() => {
        this.ruleForm = val;
        this.ruleForm.desc = val.descs;
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
    },
  },
  methods: {
    changeTree(val) {
      console.log(val);
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },
    uploadImage(val) {
      console.log(val);
      this.ruleForm.image = val;
    },
    wangData(val) {
      console.log(val);
      this.ruleForm.desc = val;
    },
   submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          //请求--商品添加接口
          //title cid  category sellPoint price num desc paramsInfo image
          let {
            title,
            image,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            id,
          } = this.ruleForm;

          if (this.title == "添加商品") {
            this.$api
              .insertTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                
                  this.$message({
                    message: "恭喜你，添加商品成功",
                    type: "success",
                  });
                  this.$parent.http(1);
                  this.resetForm(formName);
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑商品");
            this.$api
              .updateTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
                id,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  this.$message({
                    message: "恭喜你，修改商品成功",
                    type: "success",
                  });
                  //3.更新列表 --
                  this.$parent.http(1);
                  //清空表单 隐藏弹框
                  this.resetForm(formName);
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //1.隐藏弹框
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
      this.$refs.wangEditor.editor.txt.clear();
    },
    handleClose(done) {
      console.log("------");
      this.resetForm("ruleForm");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>