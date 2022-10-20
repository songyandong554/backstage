<template>
  <div>
    <!-- 表格 -->
    <el-table border :data="skuInfo">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片"
        ><template slot-scope="{ row }"
          ><img
            :src="row.skuDefaultImg"
            style="width: 150px; heigth: 200px" /></template
      ></el-table-column>
      <el-table-column label="重量(KG)" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 1"
            @click="cancel(row)"
          ></el-button>
          <el-button
            v-else
            type="warning"
            icon="el-icon-top"
            @click="Onsale(row)"
            size="mini"
          >
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-s-claim"
            size="mini"
            @click="getSkudata(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuData.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16"> {{ skuData.skuDesc }}} </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16"> {{ skuData.price }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16"
          ><el-tag
            v-for="tag in skuData.skuSaleAttrValueList"
            :key="tag.id"
            type="success"
            style="margin: 0px 10px"
            >{{ tag.saleAttrValueName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="500px">
            <el-carousel-item
              v-for="item in skuData.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" class="small" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 分页器 -->
    <!-- 
      @size-change="handleSizeChange" -->
    <el-pagination
      style="text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      current-change="1"
      layout="prev, pager, jumper, next,total,sizes"
      :page-sizes="[3, 5, 7]"
      @current-change="getSkuInfo"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      total: 0,
      page: 1, //当前第几页
      limit: 5, //当前页显示数据的条数
      skuInfo: [],
      skuData: {}, //存储sku详细信息
      drawer: false,
    };
  },
  mounted() {
    // 获取sku列表数据
    this.getSkuInfo();
  },
  methods: {
    // 发请求
    async getSkuInfo(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuInfo(page, limit);
      if (result.code == 200) {
        this.skuInfo = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuInfo();
    },
    // 上架
    async Onsale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "上架成功" });
        this.getSkuInfo(this.page);
      }
    },
    // 下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
        this.getSkuInfo(this.page);
      }
    },
    // edit
    edit() {
      this.$message({ message: "正在开发中" });
    },
    // 获取sku详情
    async getSkudata(row) {
      // 展示抽屉
      this.drawer = true;
      let result = await this.$API.sku.reqskudata(row.id);
      if (result.code == 200) {
        this.skuData = result.data;
      }
    },
  },
};
</script>

<style>
.el-row .el-col-5 {
  font-size: 20px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>