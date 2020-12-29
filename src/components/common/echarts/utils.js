"use strict";
import echarts from "echarts";

// 调色盘颜色列表
const colorList = [
  "#6481F1",
  "#4CDA99",
  "#F0CA00",
  "#FF7362",
  "#A689EC",
  "#12BCE4",
];

// 转换单位：万
const formatterVal = (value, label) => {
  let a = "";
  let _amount = parseFloat(value);
  if (!_amount) {
    a = 0;
  } else if (_amount > 1000) {
    a = +(_amount / 10000).toFixed(1) + label;
  } else {
    a = _amount;
  }
  return a;
};

/**
 * args: el , Options-type, Options-args
 */
export default (el, classify, ...arg) => {
  const instance = echarts.init(el);
  instance.setOption(allOptions[`${classify}Options`](...arg));
  return instance;
};

const allOptions = {
  // 饼图
  oneCircleOptions: (dataArray, type, unit, innerText) => {
    return {
      color: colorList,
      series: [
        {
          type: "pie",
          radius: ["50", "70"],
          center: ["50%", "50%"],
          avoidLabelOverlap: true,
          data: dataArray,
          startAngle: 120,
          label: {
            // 文本标签
            formatter: (params) => params.data.name + params.data.value,
            fontSize: 12,
          },
        },
      ],
      graphic: {
        type: "text",
        left: "center",
        top: "center",
        z: 2,
        style: {
          text: innerText,
          fill: "#fff",
          textAlign: "center",
          font: "2rem",
        },
      },
    };
  },
  // 横向柱状图
  barHengOptions: (dataArray, type, unit) => {
    const arrayX = [];
    const arrayY = [];
    const barBorderRadius = new Array(4).fill(100);
    return {
      xAxis: {
        // x轴
        type: "value",
        show: false,
        data: [],
        axisLabel: { show: false }, // 坐标轴刻度标签
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show: false }, // 分割线
      },
      yAxis: {
        // y轴
        type: "category",
        show: true,
        data: dataArray.map((n) =>
          n.name.length > 3 ? n.name.slice(0, 3) + ".." : n.name
        ), // 省略字
        axisLabel: {
          // 坐标轴刻度标签
          show: true,
          textStyle: { color: "#83A6CE", fontSize: 14 },
        },
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show: false }, // 分割线
      },
      grid: {
        // 布局
        left: 0,
        right: 0,
        top: "2%",
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          // 阴影柱形
          name: '背景',
          type: "bar",
          barWidth: 20,
          itemStyle: {
            color: "rgba(24,31,68,1)",
            barBorderRadius,
          },
          barGap: "-100%",
          data: new Array(dataArray.length).fill(
            dataArray.reduce((res, { name, value }) => {
              arrayX.push(name);
              arrayY.push(value);
              return Math.max(res, value);
            }, 0) * 1.2 || 1
          ), // 拿到最大值来渲染阴影柱形, *1.2是为了不要到顶部,
          animation: false,
        },
        {
          name: '值',
          zlevel: 1,
          type: "bar",
          barWidth: 20,
          label: {
            show: true,
            position: "right",
            formatter: (params) => {
              return formatterVal(params.value, "万");
            },
            color: ["#1CD8A8", "#DAE519"],
            fontSize: 14,
            distance: 10,
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgb(57,89,255,1)",
              },
              {
                offset: 1,
                color: "rgb(46,200,207,1)",
              },
            ]),
            barBorderRadius,
          },
          data: arrayY,
        },
      ],
    };
  },
};
