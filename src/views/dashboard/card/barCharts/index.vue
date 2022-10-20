<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barCharts",
  mounted() {
    let bar = echarts.init(this.$refs.charts);
    bar.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [1, 19, 9, 22, 11, 39, 3, 2, 54, 32, 34, 43],
        },
      ],
      //
      grid: {
        left: 0,
        top: 0,
        rigth: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style>
</style>