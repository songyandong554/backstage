<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!Category3id"
          @click="addSpu2"
          >添加SPU</el-button
        >
        <el-table border :data="recorda">
          <el-table-column
            label="序号"
            align="center"
            width="100"
            type="index"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            width="200"
            prop="spuName"
          ></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <Hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></Hint-button>
              <Hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="addSpu(row)"
              ></Hint-button>
              <Hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handler(row)"
              ></Hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <Hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></Hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          current-change="1"
          layout="prev, pager, jumper, next,total,sizes"
          :page-sizes="[3, 5, 7]"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changScene="changScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @change="change"></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的SKU列表`"
      :visible.sync="dialogTableVisible"
      :before-close="closed"
    >
      <el-table
        :data="skuList"
        border
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          label="名称"
          width="200"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          property="name"
          label="价格"
          prop="price"
        ></el-table-column>
        <el-table-column
          property="address"
          label="重量"
          prop="weight"
        ></el-table-column>
        <el-table-column property="address" label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 150px; heigth: 200px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./spuForm";
import SkuForm from "./skuForm";
import { done } from "nprogress";
export default {
  name: "spu",
  data() {
    return {
      // 控制三级分类可使用?
      Category1id: "",
      Category2id: "",
      Category3id: "",
      page: 1, //分页器当前第几页
      limit: 3, //每页展示几条数据
      recorda: [], //spu列表数据
      total: 0, //分页器一共需要展示数据条数
      scene: 0, //0代表展示SPU列表数据 1添加SPU\修改SPU 2添加SKU
      skuList: [],
      dialogTableVisible: false,
      spu: {},
      loading: true,
    };
  },
  components: { SpuForm, SkuForm },
  methods: {
    // 分页器的回调
    /*  handleCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    }, */
    // 添加sku
    addSku(row) {
      this.scene = 2;
      // 父组件调用子组件的方法,让子组件发请求----三个请求
      this.$refs.sku.getData(this.Category1id, this.Category2id, row);
    },
    async getSpuList(Pages = 1) {
      this.page = Pages;
      const { page, limit, Category3id } = this;
      // 发请求获取spu 携带三个参数
      let result = await this.$API.spu.reqSpuList(page, limit, Category3id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.recorda = result.data.records;
      }
    },
    getCategoryId({ id, level }) {
      // id,获取一级二级三级分类ID level:为了区分是几级ID
      if (level == 1) {
        this.Category1id = id;
        // 清除二级三级分类ID
        this.Category2id = "";
        this.Category3id = "";
      } else if (level == 2) {
        this.Category2id = id;
        // 清除三级id
        this.Category3id = "";
      } else {
        this.Category3id = id;
        this.getSpuList();
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加Spu的回调
    addSpu(row) {
      this.scene = 1;
      // 获取子组件spuFrom子组件的
      this.$refs.spu.inisSpuData(row);
    },
    addSpu2() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.Category3id);
    },
    // 自定义事件的回调 spuFrom
    changScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 删除SPU的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqdeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.recorda.length > 1 ? this.page : this.page - 1);
      }
    },
    change(scene) {
      this.scene = scene;
    },
    // 查看sku列表
    async handler(row) {
      this.dialogTableVisible = true;
      this.spu = row;
      let result = await this.$API.sku.reqSkuList(row.id);
      if (result.code == 200) {
        this.skuList = result.data;
        // loading 隐藏
        this.loading = false;
      }
    },
    // 关闭对话框的回调
    closed(done) {
      // 清除sku列表的数据
      this.skuList = [];
      // 设置loading
      this.loading = true;
      // 关闭对话框
      
      done();
    },
  },
};
</script>

<style>
</style>