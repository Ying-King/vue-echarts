import echarts from "echarts";

// 绘制中国地图
import china from "echarts/map/json/china.json";

var convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};

const outData = [
  { name: "南海诸岛", value: 0 },
  { name: "天津", value: 13 },
  { name: "上海", value: 140 },
  { name: "重庆", value: 75 },
  { name: "河北", value: 13 },
  { name: "河南", value: 83 },
  { name: "云南", value: 11 },
  { name: "辽宁", value: 19 },
  { name: "黑龙江", value: 15 },
  { name: "湖南", value: 69 },
  { name: "安徽", value: 260 },
  { name: "山东", value: 39 },
  { name: "新疆", value: 4 },
  { name: "江苏", value: 31 },
  { name: "浙江", value: 104 },
  { name: "江西", value: 36 },
  { name: "湖北", value: 1052 },
  { name: "广西", value: 33 },
  { name: "甘肃", value: 347 },
  { name: "山西", value: 9 },
  { name: "内蒙古", value: 157 },
  { name: "陕西", value: 22 },
  { name: "吉林", value: 4 },
  { name: "福建", value: 18 },
  { name: "贵州", value: 5 },
  { name: "广东", value: 2398 },
  { name: "青海", value: 41 },
  { name: "西藏", value: 0 },
  { name: "四川", value: 484 },
  { name: "宁夏", value: 404 },
  { name: "海南", value: 22 },
  { name: "台湾", value: 3 },
  { name: "香港", value: 5 },
  { name: "澳门", value: 225 },
];

// 标注
const markData = [{ name: "北京", value: 300 }];

// 绘制中国地图
echarts.registerMap("china", china);
var geoCoordMap = {};
/*获取地图数据*/
var mapFeatures = echarts.getMap("china").geoJson.features;
// console.log(mapFeatures);
mapFeatures.forEach(function(v) {
  // 地区名称
  var name = v.properties.name;
  // 地区经纬度
  geoCoordMap[name] = v.properties.cp;
});

export const mapOptions = {
  backgroundColor: "#0F1C3C",
  tooltip: { // 提示框
    show: true,
    formatter: function(params) {
      if (params.value.length > 1) {
        return (
          "&nbsp;&nbsp;" + params.name + "&nbsp;&nbsp;&nbsp;" + params.value[2] + "人&nbsp;&nbsp;"
        );
      } else {
        return (
          "&nbsp;&nbsp;" + params.name + "&nbsp;&nbsp;&nbsp;" + params.value + "人&nbsp;&nbsp;"
        );
      }
    },
  },
  geo: { // 坐标系
    map: "china",
    show: true,
    roam: false,
    label: {
      emphasis: {
        show: false,
      },
    },
    layoutSize: "100%",
    itemStyle: {
      normal: {
        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
        borderColor: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [{  offset: 0, color: "#00F6FF", },  // 0% 处的颜色
           {  offset: 1, color: "#53D9FF", }], // 100% 处的颜色
          false
        ),
        borderWidth: 3,
        shadowColor: "rgba(10,76,139,1)",
        shadowOffsetY: 0,
        shadowBlur: 60,
      },
    },
  },
  series: [
    {
      symbolSize: 1,
      label: {
        normal: {
          formatter: function(para) {
            return "{name|" + para.data.name + "}";
          },
          rich: {
            cnNum: {
              fontSize: 14,
              color: "#D4EEFF",
              align: "center",
            },
            name: {
              fontSize: 12,
              color: "#D4EEFF",
              align: "center",
              lineHeight: 20,
            },
          },
          color: "#D4EEFF",
          show: true,
        },
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        normal: {
          color: "#D4EEFF",
        },
      },
      name: "light",
      type: "scatter",
      coordinateSystem: "geo",
      data: convertData(outData),
    },
    {
      type: "map",
      map: "china",
      aspectScale: 0.75,
      //zoom:1.1,
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: {
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#073684", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#061E3D", // 100% 处的颜色
              },
            ],
          },
          borderColor: "#215495",
          borderWidth: 1,
        },
        emphasis: {
          areaColor: {
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#073684", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#061E3D", // 100% 处的颜色
              },
            ],
          },
        },
      },
      data: outData,
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
      label: {
        normal: {
          show: false,
          color: "#fff",
          fontWeight: "bold",
          formatter: function(para) {
            return "{cnNum|" + para.data.value[2] + "}";
          },
          rich: {
            cnNum: {
              fontSize: 13,
              color: "#D4EEFF",
              left: "center",
            },
          },
        },
      },
      symbol:
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC60lEQVRYR8WVS2gTURSG/zPJnbZaF1UDtslEu9BMKG6UbroSQbRaUSgiFB+4seBCRBARhCouXBRdCSoKoqgoiJQWQbpw0UUXCgpCycSFlUwSlagVX2nnZuZIqilNTTvJpDazm3vP+f/vnnMfhBp/VGN/VAXAgAKACLC9LqQqACPo35o31lO5Z7UBCIsbDHA0IY8uOQADwgiLj9MVSMiA1zZ4bkEs7Osi+IbyAIptd21I2U+8VMEzgKGJeyDq+WPKd/WEPLhkAOPrUD/liAmA6v8CTNYpsqn1HSYrhfBUgbim7mfCgyIz296np+xHSwJgaOoACHtmmzHjcdS0uv87wFgAjUqD+EIgUQQAlk5WrmzL4EclEDMtiGui3WFe7pqsKFsI6CsVR47T5wAjbhoK0c+IKV/k42YA3jQj6gg1f5Ra3QSqnB9XpLVrw3vEigDyP8ZqrECD+hCEzipNSqczBpG1Duif8L0QUPIUGCH/KRBdBJFvUUCYbTCf0ZO5/rl68x7DWIu/g3w0AKJAVRDMGbZ5bzSdGy25bxYSHw9gzVS9GARRuzcIHq3Lyu7WDD7Ml+96ETHgj2uiH0QnKoFg5ku6KU+7PVKuAAXTmCaGiWhbORDMGI6a1vZyYssCGANURRMTRLSsHFFm/uWYsqkNsNziywKIh3w7WfFV9tw6TqeezD1dFABDE9dA1OsmVjTPfFU35TG3nLIqEAuraQKa/xFjvj49VgqOkdZNK1g1QP6NYKLnc1aXAfOhQomNkH8HiO7MvTN8Od68Pi1fLgThWgFDUy+AcHZGhDHEjnUkmsLn2cKxIFaRot4CYXdhnIHz0YR1rkoA8RpEGwH+RsDxSELeXkgwHhaHHcYVImpk8KtoQm7yDGBoaAGpKWYeUVj2RJJIufU0P/+2GWstIe4D1AG2grqJtKebMBYWvWBu1M3cZQK4HPNZ5VcMzX9SYfoaScqbngDMEBq0JLKVGM+NddNw3YTVmJeTW3OA36BMBTBHLcIWAAAAAElFTkSuQmCC",
      symbolSize: [30, 30],
      z: 999,
      data: convertData(markData),
    },
  ],
};
