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

/**
 * 深层克隆对象
 *
 * @param obj
 * @returns {*}
 * @example
 *
 * const a = { foo: 'bar', obj: { a: 1, b: 2 } };
 * const b = deepClone(a);
 * // => a !== b, a.obj !== b.obj
 */
export function deepClone(obj) {
  var clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    function (key) { return (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]); }
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
      ? Array.from(obj)
      : clone;
}

/**
 * 获取移动设备信息，如是否是iOS，android等
 *
 * @returns {{}}
 * @example
 *
 * getDevice();
 * // => {"androidChrome":false,"ipad":false,"iphone":true,"android":false,"ios":true,"os":"ios","osVersion":"9.1","webView":null}
 */
export function getDevice() {
  var device = {};
  var ua = navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
  // Android
  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }
  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
  return device;
}
