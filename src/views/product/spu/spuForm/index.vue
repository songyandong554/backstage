<template>
  <div>
    <el-form label-width="80px" :model="spu" ref="form">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMark"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="描述"
          v-model="spu.description"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- action图片上传地址
             list-type文件列表类型
            :on-preview:图片预览的时候会触发
            :on-remove：当删除图片会触发
            file-list：照片墙需要展示的数据【数组：数组里面的元素必要有name url属性
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImgList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectAttr.length}未选择`"
          v-model="attrIdAndName"
        >
          <el-option
            :label="unSelectm.name"
            :value="`${unSelectm.id}:${unSelectm.name}`"
            v-for="unSelectm in unSelectAttr"
            :key="unSelectm.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <!--  @close="handleClose(tag)" -->
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--  @keyup.enter.native="handleInputConfirm"
               
                 @click="showInput"-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                :ref="$index"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row, $index)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{}">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrupdataSpu">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      attrIdAndName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      tradeMark: [], //存储品牌信息
      spuImgList: [], //spu图片信息
      baseSaleAttrList: [], //销售属性
      //存储spu信息
      spu: {
        // 三级分类的Id
        category3Id: "",
        // 描述
        description: "",
        // spu的名称
        spuName: "",
        // 品牌id
        tmId: "",
        // 收集SPU图片信息
        spuImageList: [
          /* {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          }, */
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          /*  {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          }, */
        ],
      },
    };
  },
  methods: {
    // 取消按钮
    cancle() {
      this.$emit("changScene", { scene: 0, flag: "" });
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 保存按钮的回调
    async addOrupdataSpu() {
      // 整理参数:需要整理照片墙的数据  imgName: "string",    imgUrl: "string",
      //map()方法 回一个新数组，数组中的元素为原始数组调用函数处理后的值，并且按照原始数组元素调用函数处理后的值
      this.spu.spuImageList = this.spuImgList.map((element) => {
        return {
          imgName: element.name,
          imgUrl: (element.response && element.response.data) || element.url,
        };
      });
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdataSpu(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      } else {
        this.$message({ message: "保存失败" });
      }
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // input失去焦点的事件
    handleInputConfirm(row) {
      // 解构数据
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        row.inputVisible = false;
        return;
      }
      let result = row.spuSaleAttrValueList.every(
        (element) => element.saleAttrValueName != inputValue
      );
      if (!result) return this.$message("属性值不能重复");

      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    // 添加按钮的回调
    addSaleAttrValue(row, $index) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        // 获取相应的input表单元素实现聚焦
        this.$refs[$index].focus();
      });
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 将收集到数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      // 向spu.spuSaleAttrList属性添加新的销售属性
      let newSeleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSeleAttr);
      // 清空数据
      this.attrIdAndName = "";
    },
    // 照片墙上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // 收集图片信息
      this.spuImgList = fileList;
    },
    // 照片墙删除图片时回调
    handleRemove(file, fileList) {
      // file ：代表的是删除的那个照片
      // fileList：照片墙删除某一张图片后，剩余的其他图片
      // 收集照片墙数据
      // 对于已有的图片【照片墙中显示的图片，有name，url字段的】，因为照片墙显示数据务必要有这两个属性
      // 对于服务器是不需要的
      this.spuImgList = fileList;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    // 初始化SpuFrom的数据
    async inisSpuData(spu) {
      // 获取SPU数据
      let spuData = await this.$API.spu.reqSpuData(spu.id);
      if (spuData.code == 200) {
        this.spu = spuData.data;
      }
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqbaseTrademark();
      if (tradeMarkResult.code == 200) {
        this.tradeMark = tradeMarkResult.data;
      }
      // 获取Spu图片
      let spuImg = await this.$API.spu.reqSpuimg(spu.id);
      if (spuImg.code == 200) {
        // this.spuImgList = spuImg.data;\
        // 由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        // 需要把服务器返回的数据进行修改
        let listArr = spuImg.data;
        listArr.forEach((element) => {
          element.name = element.imgName;
          element.url = element.imgUrl;
        });
        this.spuImgList = listArr;
      }
      // 获取销售属性
      let baseSaleAttr = await this.$API.spu.reqbaseSaleAttrList();
      if (baseSaleAttr.code == 200) {
        this.baseSaleAttrList = baseSaleAttr.data;
      }
    },
    // 点击添加SPU按钮的时候,发请求的函数
    async addSpuData(Category3id) {
      this.spu.category3Id = Category3id;
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqbaseTrademark();
      if (tradeMarkResult.code == 200) {
        this.tradeMark = tradeMarkResult.data;
      }
      // 获取销售属性
      let baseSaleAttr = await this.$API.spu.reqbaseSaleAttrList();
      if (baseSaleAttr.code == 200) {
        this.baseSaleAttrList = baseSaleAttr.data;
      }
    },
  },
  computed: {
    // 计算出还未选择的销售属性 baseSaleAttrList spu.spuSaleAttrList
    unSelectAttr() {
      // filter()创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
      let newList = this.baseSaleAttrList.filter((element) => {
        // every()方法会遍历数组的每一项,如果有有一项不满足条件,则表达式返回false,剩余的项将不会再执行检测;如果遍历完数组后,每一项都符合条,则返回true。
        return this.spu.spuSaleAttrList.every((element2) => {
          return element.name != element2.saleAttrName;
        });
      });
      return newList;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>