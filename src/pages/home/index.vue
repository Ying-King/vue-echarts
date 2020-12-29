<template>
  <div class="homeWrap">
    <!-- <echarts classify="oneCircle" :dataArray="oneCircleEchart"></echarts>
    <echarts classify="barHeng" :dataArray="oneCircleEchart"></echarts> -->

    <!-- 地图 -->
    <echartsMap/>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      oneCircleEchart: [
        {
          name: "Web 秀",
          value: 10000
        },
        {
          name: "Macys",
          value: 6181
        }
      ]
    };
  },
  mounted() {
    console.log("首页-------");
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>