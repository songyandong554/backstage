<template>
  <div>
    <el-card class="box-card" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs class="tad" v-model="atname">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </div>
      </div>
      <el-row>
        <el-col :span="18">
          <!-- 容器 -->
          <div class="mycharts" ref="mycharts"></div>
        </el-col>
        <el-col :span="6">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
            <li>
              <span class="eindex">1</span>
              <span class="cname">ws</span>
              <span class="rvalue">1223</span>
            </li>
          </ul>
        </el-col>
      </el-row></el-card
    >
  </div>
</template>
     

 <script>
//  引入echarts
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      atname: "sale",
      charts: null,
      // 收集日历数据
      date: [],
    };
  },
  mounted() {
    // 初始化echarts实例
    this.charts = echarts.init(this.$refs.mycharts);
    // 配置数据
    this.charts.setOption({
      title: {
        text: this.title,
      },
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 45],
          type: "bar",
          barWidth: 45,
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });
  },
  computed: {
    // 计算标题
    title() {
      return this.atname == "sale" ? "销售额" : "访问量";
    },
  },
  // 监听属性
  watch: {
    title() {
      // 重新修改图表的配置数据
      this.charts.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
  methods: {
    setDay() {
      let day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      let sweek = dayjs().day(1).format("YYYY-MM-DD");
      let eweek = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [sweek, eweek];
    },
    setMonth() {
      let sMonth = dayjs().startOf("month").format("YYYY-MM-DD");
      let eMonth = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [sMonth, eMonth];
    },
    setYear() {
      let sYear = dayjs().startOf("year").format("YYYY-MM-DD");
      let eYear = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [sYear, eYear];
    },
  },
};
</script>

<style >
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tad {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.right span {
  margin: 0px 20px;
}

.mycharts {
  width: 100%;
  height: 400px;
}
ul {
  list-style: none;
  width: 100%;
  height: 400px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}

.eindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
.cname {
  padding: 30px;
}
</style>