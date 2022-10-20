<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressCharts",
  mounted() {
    let bar = echarts.init(this.$refs.charts);
    bar.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          //   柱状图宽度
          color: "cyan",
          barWidth: 10,
          //   背景颜色
          showBackground: true,
          label: {
            show: true,
            formatter: "|",
            position: "right",
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
</style>