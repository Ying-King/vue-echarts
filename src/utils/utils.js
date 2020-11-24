/**
 * @desc 补零
 */
export const padding = (num, step = 2) => {
  num += "";
  while (num.length < step) {
    num = `0${num}`;
  }
  return num;
};

/**
 * @desc 将数字转换为字母
 */
export const charCode = (step, start = "A") =>
  String.fromCharCode(start.charCodeAt() + step);

/**
 * @desc 求和
 */
export const sum = (a, b) => a + b;

/**
 * @desc 无阻塞加载javascript
 * @param {String} url js文件地址
 * @param {Function} callback 加载完毕后的回调函数
 */
export function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    // IE
    script.onreadystatechange = function() {
      var readyState = this.readyState;

      if (readyState === "loaded" || readyState === "complete") {
        script.onreadystatechange = null; // 防止事件触发两遍
        callback && callback();
      }
    };
  } else {
    // 其他浏览器
    script.onload = function() {
      callback && callback();
    };
  }

  script.src = url;
  document.head.appendChild(script);
}

/**
 * @desc 重载页面
 */
export function reload() {
  let { origin, pathname } = location;

  location.href = `${origin}${pathname}#/answer`;
  location.reload();
}

// 时间
export function formatDateFilter(value, type) {
  let time = new Date(value);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let seconds = time.getSeconds();

  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (type === 1) {
    return year + "年" + month + "月" + date + "日";
  } else if (type === 2) {
    return year + "-" + month + "-" + date;
  } else if (type === 3) {
    return hour + ":" + minute + ":" + seconds;
  } else if (type === 4) {
    return year + "." + month + "." + date;
  } else if (type === 5) {
    return year + "." + month;
  } else if (type === 6) {
    return year + "-" + month;
  } else if (type === 7) {
    return year + "/" + month + "/" + date + " " + hour + ":" + minute;
  }
}

export function datedifference(sDate1, sDate2) {
  //sDate1和sDate2是2006-12-18格式
  var dateSpan, tempDate, iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  console.log(iDays, "iDays");
  return iDays;
}

// 元素失去焦点隐藏iphone的软键盘
export function objBlur(id, time) {
  var obj = document.getElementById(id),
    time = time || 300,
    docTouchend = function(event) {
      if (event.target != obj) {
        setTimeout(function() {
          console.log(11111);
          obj.blur();
          document.removeEventListener("touchend", docTouchend, false);
        }, time);
      }
    };
  if (obj) {
    obj.addEventListener(
      "focus",
      function() {
        document.addEventListener("touchend", docTouchend, false);
      },
      false
    );
  } else {
    throw new Error("objBlur()没有找到元素");
  }
}
