<template>
  <div class="product">
    <!-- 搜索框 -->
    <!-- 1. 搜索框 ------>
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="changeInput"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addProduct">添加</el-button>
    </div>
    <!-- 彈框 -->
    <Product ref="myDialog" :rowData='rowData' :title='title' />

    <!-- 表格数据列表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="myTable"
      @selection-change="selectionchange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="category" label="规格类目" width="100">
      </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="del()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!-- 分頁 -->
    <div class="fen">
      <Pagin :pageSize="pageSize" :total="total" @currrntPage="currrntPage" />
    </div>
  </div>
</template>


<script>
import Pagin from "../../components/Pagin";
import Product from ".//Product.vue";
export default {
  components: {
    Pagin,
    Product,
  },
  data() {
    return {
      tableData: [],
      pageSize: 1, //頁
      total: 10, //條數
      input: "",
      rowData: {},
      idArr: [],
      title:'添加商品'
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$refs.myDialog.dialogVisible = true;
      console.log('row--------',row);
      this.rowData = {...row};
      this.title='编辑商品'
    },

    //删除
    handleDelete(index, rowData) {
      console.log(index, rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteItemById({
              id: rowData.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新
                this.http(1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //取消
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.myTable.clearSelection();
      }
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .batchDelete({
              idArr: this.idArr,
            })
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新
                this.http(1);
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除选择
    selectionchange(selection) {
      let arr = [];
      selection.forEach((ele) => {
        arr.push(ele.id);
      });
      this.idArr = arr;
      console.log(this.idArr);
    },
    currrntPage(val) {
      console.log(val);
      this.http(val);
    },
    changeInput(val) {
      if (val) {
        this.$api
          .search({
            search: val,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              console.log(res.result);
              this.tableData = res.result;
              this.pageSize = 8;
              this.total = res.result.length;
            } else {
              console.log("沒有");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 1;
            }
          });
      } else {
        this.http(1);
      }
    },
    addProduct() {
      console.log("添加劑啊");
      this.$refs.myDialog.dialogVisible = true;
      this.title='添加商品'
    },
    http(page) {
      this.$api.productList({ page }).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          //console.log(res.data);
          this.tableData = res.data;
          this.pageSize = res.pageSize;
          this.total = res.total;
        }
      });
    },
  },

  created() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.fen {
  text-align: center;
  margin-top: 10px;
}
.header {
  display: flex;
  padding: 20px;
  button {
    padding: 10px;
  }
}
</style>