<template>
  <div>
    <el-form>
      <el-form-item label="SPU名称">{{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          rows="5"
          placeholder=""
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="sale in saleAttrList"
            :key="sale.id"
          >
            <el-select placeholder="请选择" v-model="sale.saleIdAndsaleValueId">
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          :data="spuImgList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label=""
            width="80px"
            type="selection"
          ></el-table-column>
          <el-table-column label="图片"
            ><template slot-scope="{ row }">
              <img
                :src="row.imgUrl"
                style="width: 150px; heigth: 200px" /></template
          ></el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button type="success" size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        ><el-button type="primary" @click="addSkuinfo">保存</el-button>
        <el-button @click="cancel">取消</el-button></el-form-item
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      // 存储图片的信息
      spuImgList: [],
      saleAttrList: [],
      attrInfoList: [],
      // 收集sku数据
      skuInfo: {
        // 第一类:父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类:需要数据双向绑定收集
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        // 第三类:需要书写代码
        // 默认图片
        skuDefaultImg: "string",
        // 平台属性
        skuAttrValueList: [
          /*   {
            attrId: 0,
            valueId: 0,
           
          }, */
        ],
        // 收集图片
        skuImageList: [
          /*  {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],
        // sku销售属性列表
        skuSaleAttrValueList: [
          /* {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0,
          }, */
        ],
      },
      spu: {},
      // 收集图片的字段
      imgList: [],
    };
  },
  methods: {
    // 获取SKUfrom数据
    async getData(Category1id, Category2id, spu) {
      // 收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片
      let img = await this.$API.sku.reqspuimgList(spu.id);
      if (img.code == 200) {
        // this.spuImgList = img.data;
        let list = img.data;
        list.forEach((element) => {
          element.isDefault = 0;
        });
        this.spuImgList = list;
      }
      // 获取销售属性的数据
      let saleAttr = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      if (saleAttr.code == 200) {
        this.saleAttrList = saleAttr.data;
      }
      // 获取商品基础属性

      let attrInfo = await this.$API.sku.reqAttrInfoList(
        Category1id,
        Category2id,
        spu.category3Id
      );
      if (attrInfo.code == 200) {
        this.attrInfoList = attrInfo.data;
      }
    },
    // table表格复选框按钮的事件
    handleSelectionChange(params) {
      // console.log(params);
      this.imgList = params;
    },
    // 排他
    changeDefault(row) {
      this.spuImgList.forEach((element) => {
        element.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集一下默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("change", 0);
      Object.assign(this._data, this.$options.data());
    },
    // 保存sku
    async addSkuinfo() {
      // 整理参数
      // 整理平台属性
      let arr = [];
      const { attrInfoList, skuInfo, saleAttrList, imgList } = this;
      // 把收集到的数据整理一下
      attrInfoList.forEach((element) => {
        // 当前平台属性用户进行选择
        if (element.attrIdAndValueId) {
          const [attrId, valueId] = element.attrIdAndValueId.split(":");
          let obj = { attrId, valueId };
          arr.push(obj);
        }
      });
      // 将整理好的数据赋值给 skuInfo.skuAttrValueList
      skuInfo.skuAttrValueList = arr;
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, element) => {
        if (element.saleIdAndsaleValueId) {
          const [saleAttrId, saleAttrValueId] =
            element.saleIdAndsaleValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      // 整理图片
      skuInfo.skuImageList = imgList.map((element) => {
        return {
          imgName: element.imgName,
          imgUrl: element.imgUrl,
          isDefault: element.isDefault,
          spuImgId: element.id,
        };
      });
      let result = await this.$API.sku.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message({
          message: "添加SKU保存成功",
          type: "success",
        });
        this.$emit("change", 0);
      }
    },
  },
};
</script>

<style>
</style>