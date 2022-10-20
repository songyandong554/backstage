<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowtable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowtable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!Category3id"
          >添加属性</el-button
        >
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="list">
          <el-table-column
            type="index"
            label="序号"
            width="50px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="200px"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrVal in row.attrValueList"
                :key="attrVal.id"
                style="margin: 0px 10px"
                >{{ attrVal.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="upDataAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
              ></el-button></template
          ></el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowtable">
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button type="" @click="as">取消</el-button>
        <el-table
          border
          style="width: 100%; margin: 20px 0px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- span与input进行来回切换 -->
              <el-input
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdataAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="as">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需应用lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Arrt",
  data() {
    return {
      list: [],
      Category1id: "",
      Category2id: "",
      Category3id: "",
      isShowtable: true,

      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值,可以有多个,所以用数组,每一个属性值都是一个对象
          {
            /*  attrId: 0, //属性名的id
            valueName: "", */
          },
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //   自定义事件的回调
    getCategoryId({ id, level }) {
      if (level == 1) {
        this.Category1id = id;
        this.Category2id = "";
        this.Category3id = "";
      } else if (level == 2) {
        this.Category2id = id;
        this.Category3id = "";
      } else {
        this.Category3id = id;
        // 发请求
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { Category1id, Category2id, Category3id } = this;
      let result = await this.$API.attr.reqattrInfoList(
        Category1id,
        Category2id,
        Category3id
      );
      if (result.code == 200) {
        this.list = result.data;
      }
    },
    // 添加属性的回调
    addAttr() {
      this.isShowtable = false;
      // 清除数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.Category3id,
        categoryLevel: 3,
      };
    },
    // 修改某个属性
    upDataAttr(row) {
      this.isShowtable = false;
      // 由于数据结构中存在对象里面套数组,数组里面套对象因此需要深拷贝
      this.attrInfo = cloneDeep(row);
      // 在修改某一属性的时候,将相应的属性值元素添加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    as() {
      this.isShowtable = true;
    },
    // 添加属性值
    addAttrValue() {
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        // 获取相应的input表单元素实现聚焦
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 失去焦点的回调__切换为查看模式.展示span
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("值不合法");
        return;
      }
      // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message("有重复值");
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      // 获取input焦点
      // 注意:点击span的时候,切换为input变为编辑模式,但对于浏览器而言,页面的重绘与重拍是耗时间的
      // 点击span的时候的重绘一个input是需要耗时间的,因此我们不可能一点击span就立马获取到input
      // $nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        // 获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    // 气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮进行添加属性或者修改属性的操作
    async addOrUpdataAttr() {
      // 整理参数
      // 1.用户添加的空值不应该提交给服务器
      // 2.提交给服务器数据中不应该出现flag字段
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤掉属性值为空
          if (item.valueName != "") {
            // 删除flag
            delete item.flag;
            return true;
          }
        }
      );
      // 发请求
      try {
        await this.$API.attr.reqAddorUpdataAttr(this.attrInfo);
        this.isShowtable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message.error("保存失败");
      }
    },
    async deleteAttr(row) {
      // console.log(row.id);
      let result = await this.$API.attr.reqdeleAttr(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getAttrList();
      } else {
        this.$message.error("保存失败");
      }
    },
  },
};
</script>

<style>
</style>