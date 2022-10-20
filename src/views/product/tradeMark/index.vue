<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 数据表单 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        align="center"
        prop="tmName"
      ></el-table-column>
      <el-table-column label="品牌LOGO" align="center"
        ><template slot-scope="{ row }"
          ><img
            :src="row.logoUrl"
            style="width: 100px; heigth: 100px" /></template
      ></el-table-column>
      <el-table-column label="操作" align="center"
        ><template slot-scope="{ row }"
          ><el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="upDateTradeMark(row)"
            >修改</el-button
          ><el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          ></template
        ></el-table-column
      >
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="1"
      :total="total"
      :page-size="limit"
      :page-count="5"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getPageList"
      @size-change="changelimit"
    >
    </el-pagination>
    <!-- 对话框 
    :visible.sync:控制对话框显示与隐藏-->
    <el-dialog
      :title="tmFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- from表单 -->
      <el-form style="width: 80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input sautocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 这里收集数据不能使用V-model,因为不是表单元素
          action:设置图片上传的地址
          :on-success:图片上传成功,执行一次
          :before-upload:图片上传之前执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件,且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义校验规则
    var validatePass = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2~10位"));
      } else {
        callback();
      }
    };
    return {
      page: 1, //代表的分页器第几页
      limit: 3, //页数展示数据条数
      total: 0, //总共服务器数据条数
      list: [], //列表展示的数据
      dialogFormVisible: false, //对话框显示与隐藏
      // 收集品牌信息
      tmFrom: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        // 品牌名称的验证规则
        //
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { validator: validatePass, trigger: "change" },
        ],
        // 品牌LOGO的验证规则
        logoUrl: [{ required: true, message: "请上传品牌图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      let result = await this.$API.trademark.reqTrademark(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    changelimit(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res,"@@",file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.tmFrom.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加品牌按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清除img
      this.tmFrom = { tmName: "", logoUrl: "" };
    },
    // 确定按钮(添加或修改)
    addOrUpdateTradeMark() {
      this.dialogFormVisible = false;
      // 全部验证字段通过再去书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          let result = await this.$API.trademark.reqaddOrTradeMark(this.tmFrom);
          if (result.code == 200) {
            // 弹出信息
            this.$message({
              message: this.tmFrom.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            // 再次获取品牌列表
            this.getPageList(this.tmFrom.id ? this.page : 1);
          }
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    // 修改品牌
    upDateTradeMark(row) {
      // row:当前用户选择的品牌信息
      this.dialogFormVisible = true;
      this.tmFrom = { ...row };
    },
    // 删除品牌
    deleteTradeMark(row) {
      // 弹框
      this.$confirm(`你确定删除${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定按钮时触发
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
         
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList(this.list.length>1?this.page:this.page-1);
          }
        })
        .catch(() => {
          // 当用户点击取消按钮时触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>