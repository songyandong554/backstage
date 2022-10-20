<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "lineChart",
  mounted() {
    //   初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      tooltip: {},
      series: [
        {
          type: "line",
          data: [1, 19, 9, 22, 11, 39],
          smooth: true,

          //   拐点样式设置
          itemStyle: {
            opacity: 0,
          },
          //线条颜色
          lineStyle: {
            color: "purple",
          },
          //   区域填充样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },

                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
        },
      ],
      //
      grid: {
        left: 0,
        top: 0,
        rigth: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>