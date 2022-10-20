<template>
  <div>
    <!-- inline代表的是行内表单,代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="Id">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          value=""
          v-model="Id.Category1id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          value=""
          v-model="Id.Category2id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            v-for="c2 in list2"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          value=""
          v-model="Id.Category3id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            v-for="c3 in list3"
            :key="c3.id"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      // 一级数据
      list1: [],
      list2: [],
      list3: [],
      Id: {
        Category1id: "",
        Category2id: "",
        Category3id: "",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      // 获取一级分类请求
      let result = await this.$API.attr.reqgetCategory1();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    async handler1() {
      this.list2 = [];
      this.list3 = [];
      this.Id.Category2id = "";
      this.Id.Category3id = "";
      const { Category1id } = this.Id;
      this.$emit("getCategoryId", { id: Category1id, level: 1 });
      let result = await this.$API.attr.reqgetCategory2(Category1id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    async handler2() {
      this.list3 = [];
      this.Id.Category3id = "";
      const { Category2id } = this.Id;
      this.$emit("getCategoryId", { id: Category2id, level: 2 });
      let result = await this.$API.attr.reqgetCategory3(Category2id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    async handler3() {
      const { Category3id } = this.Id;
      this.$emit("getCategoryId", { id: Category3id, level: 3 });
    },
  },
};
</script>

<style>
</style>