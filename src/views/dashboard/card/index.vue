<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card
          ><Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span
                >周同比&nbsp;56.67% &nbsp;<svg
                  t="1650508766257"
                  class="icon"
                  viewBox="0 0 1394 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3363"
                  width="16"
                  height="16"
                >
                  <path
                    d="M808.676766 55.862468l557.622468 743.685447c46.363234 61.83217 34.03166 149.700085-27.539064 196.259404A139.176851 139.176851 0 0 1 1254.813957 1024H139.569021C62.485787 1024 0 961.252766 0 883.842723a140.52766 140.52766 0 0 1 28.061957-84.316595L585.684426 55.884255a139.176851 139.176851 0 0 1 222.99234 0z"
                    p-id="3364"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span>日同比&nbsp; 23.09%</span></template
            >
            <template slot="footer">
              <span>日销售额￥12345</span>
            </template>
          </Detail></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="访问量" count="88460">
            <template slot="charts"><LineChart></LineChart> </template>
            <template slot="footer">
              <span>日访问量12345</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>转换率:37%</span>
            </template></Detail
          ></el-card
        ></el-col
      >
      <el-col :span="6"
        ><el-card
          ><Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;56.67% &nbsp;<svg
                  t="1650508766257"
                  class="icon"
                  viewBox="0 0 1394 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3363"
                  width="16"
                  height="16"
                >
                  <path
                    d="M808.676766 55.862468l557.622468 743.685447c46.363234 61.83217 34.03166 149.700085-27.539064 196.259404A139.176851 139.176851 0 0 1 1254.813957 1024H139.569021C62.485787 1024 0 961.252766 0 883.842723a140.52766 140.52766 0 0 1 28.061957-84.316595L585.684426 55.884255a139.176851 139.176851 0 0 1 222.99234 0z"
                    p-id="3364"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span>日同比&nbsp; 23.09%</span>
            </template></Detail
          ></el-card
        ></el-col
      >
    </el-row>
  </div>
</template>

<script>
import Detail from "./detail";
import LineChart from "./lineChart";
import barCharts from './barCharts'
import progressCharts from'./progressCharts'
export default {
  name: "card",
  components: {
    Detail,
    LineChart,
    barCharts,
    progressCharts
  },
};
</script>

<style>
</style>