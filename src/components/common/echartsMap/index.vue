<template>
  <div id="map"></div>
</template>

<script>
import { mapOptions } from "./config";
export default {
  name: "EchartsMap",
  data() {
    return {
      mapOptions,
      myMap: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.myMap = this.$echarts.init(document.getElementById("map"));
      this.myMap.setOption(this.mapOptions);
    }
  }
};
</script>

<style lang="scss" scoped>
 #map {
   width: 100%;
   height: 100%;
 }
</style>