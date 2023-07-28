/**
 * 扩展方法类判类
 */
/**
 * @description is判断类
 */
import * as dayjs from "dayjs";

// 对象定义方便统一暴露出去
/**
 * @description 判断类型
 */
const UtilExtIs = {
  isArray: function (obj): boolean {
    return Array.isArray(obj);
  },
  isObject: function (obj): boolean {
    return typeof obj === "object";
  },
  isFunc: function (obj): boolean {
    return typeof obj === "function";
  },
  isBoolean: function (obj): boolean {
    return typeof obj === "boolean";
  },
  isDate: function (obj): boolean {
    return obj instanceof Date;
  },
  isNumber: function (obj): boolean {
    return typeof obj === "number";
  },
  isString: function (obj): boolean {
    return typeof obj === "string";
  },
  isEmpty: function (obj) {
    return !_.isHasValue(obj);
  },
  // 判断对象、数组、字符串是都有值
  isHasValue: function (obj): boolean {
    if (obj) {
      if (_.isArray(obj)) {
        return obj?.length > 0;
      } else if (_.isObject(obj)) {
        return Object.keys(obj).length > 0;
      } else {
        return !!obj;
      }
    } else {
      return false;
    }
  },
};

/**
 * 数组和对象混合类
 * @callback 回调函数
 * @param {Object} current
 * @param {string} keyindex
 * @param {Object} original
 */
const UtilExtObject = {
  // 对象克隆
  clone: function (object, isDeep): object {
    if (isDeep) {
      return JSON.parse(JSON.stringify(Object));
    }
    return { ...object };
  },
  // 数组、对象遍历
  each: function (object, iteratee): void {
    if (!_.isEmpty(object) && iteratee) {
      if (_.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
          if (iteratee(object[i], i, object) === false) {
            break;
          }
        }
      } else {
        for (let key in object) {
          if (iteratee(object[key], key, object) === false) {
            break;
          }
        }
      }
    }
  },
  // 查找符合条件的第一条数据
  find: function (object, iteratee): any {
    let result = null;
    _.each(object, (current, keyindex, original) => {
      if (iteratee(current, keyindex, original)) {
        result = current;
        return false;
      } else {
        return true;
      }
    });
    return result;
  },
  // 查找符合条件的所以数据
  filter: function (object, iteratee): any {
    let isArray = _.isArray(object);
    let result = isArray ? [] : {};
    _.each(object, (current, keyindex, original) => {
      if (iteratee(current, keyindex, original)) {
        if (isArray) {
          (result as Array<any>).push(current);
        } else {
          result[keyindex] = current;
        }
      }
    });
    return result;
  },
  map: function (object, iteratee) {
    let isArray = _.isArray(object);
    let result = isArray ? [] : {};
    _.each(object, (current, keyindex, original) => {
      if (isArray) {
        (result as Array<any>).push(iteratee(current, keyindex, original));
      } else {
        result[keyindex] = iteratee(current, keyindex, original);
      }
    });
    return result;
  },
};

/**
 * @description 数组处理类
 */
const UtilExtArray = {
  // 数组去重，根据普通数据 | 根据对象的某个key进行去重
  uniq: function <T = any>(array: T[] = [], key?: keyof T): T[] {
    let result: T[] = [], temp: any[] = []
    for (let item of array) {
      if (key) {
        if (item[key] && temp.indexOf(item[key]) == -1) {
          result.push(item)
          temp.push(item[key])
        }
      } else {
        if (result.indexOf(item) == -1) {
          result.push(item)
        }
      }
    }
    return result
  },
  // 数组取合集(顺序以第一个数组为准)
  union: function <T = any>(...array: T[][]): T[] {
    let result: T[] = []
    for (let i of array) {
      result.push(...i)
    }
    return _.uniq(result)
  },
  // 数组取交集(顺序以第一个数组为准)
  intersection: function <T = any>(...array: T[][]): T[] {
    let result: any[] = [];
    // 先取出最短的
    let min = array.sort((a, b) => {
      return a.length - b.length
    })[0]
    // 和其他数组比较
    for (let i of min) {
      let isUse = true;
      for (let arr of array) {
        if (arr.indexOf(i) == -1) {
          isUse = false;
          break;
        }
      }
      isUse && result.push(i);
    }
    result.sort((a, b) => {
      return array[0].indexOf(a) - array[0].indexOf(b);
    });
    return result;
  },

};

/**
 * @description 字符串处理类
 * 看不太懂---学习枕着后来看
 */

const UtilExtString = {
  /**
   * @desc 将 Date/String 转化为指定格式的String
   * @summary
   * 季度(q)、月(M) 、日(d) 、周(E=二,EE=周二,EEE=星期二)、时(h=12小时,H=24小时) 、分(m) 、秒(s) 、毫秒(S)
   * tips:可以用 1 - 2 个占位符 * 年(y)可以用 1 - 4 个占位符，毫秒(S)只能用 1 个占位符(是 1 - 3 位的数字)
   * @param {(String|Date)} object 需要格式化的对象
   * @param {((Array|Object)|String)} ...args 格式化规则
   * @returns {string} 格式化后的时间字符串
   * @example
   * Date:
   * 1.(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
   * 2.(new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
   * 3.(new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
   * 4.(new Date()).format() ==> 2006-7-2 08:10  默认格式： "yyyy-M-d HH:mm"
   * String:
   * 1."{0} hello {1}".format("tony","world") => "tony hello world"
   * 2."{name} hello {value}".format({name: "tony",value: "world"}) => "tony hello world"
   */
  format: function (object, ...args) {
    // 分别处理string和Date两种场景
    if (typeof object === 'string' && args.length > 0) {
      if (args.length == 1 && typeof args[0] === 'object') {
        for (let key in args[0]) {
          object = object.replace(
            new RegExp('({' + key + '})', 'g'),
            args[0][key] || ''
          );
        }
      } else {
        for (let i = 0; i < args.length; i++) {
          object = object.replace(
            new RegExp('({[' + i + ']})', 'g'),
            args[i] || ''
          );
        }
      }
      return object;
    } else if (object instanceof Date) {
      let fmtstr = args[0] || 'yyyy-MM-dd';
      let week = {
        0: '\u65e5',
        1: '\u4e00',
        2: '\u4e8c',
        3: '\u4e09',
        4: '\u56db',
        5: '\u4e94',
        6: '\u516d',
      };
      let o = {
        'M+': object.getMonth() + 1, // 月份
        'd+': object.getDate(), // 日
        'h+': object.getHours() % 12 == 0 ? 12 : object.getHours() % 12, // 小时
        'H+': object.getHours(), // 小时
        'm+': object.getMinutes(), // 分
        's+': object.getSeconds(), // 秒
        'q+': Math.floor((object.getMonth() + 3) / 3), // 季度
        S: object.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmtstr)) {
        fmtstr = fmtstr.replace(
          RegExp.$1,
          (object.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      if (/(E+)/.test(fmtstr)) {
        fmtstr = fmtstr.replace(
          RegExp.$1,
          (RegExp.$1.length > 1
            ? RegExp.$1.length > 2
              ? '\u661f\u671f'
              : '\u5468'
            : '') + week[object.getDay() + '']
        );
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmtstr)) {
          fmtstr = fmtstr.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
      return fmtstr;
    } else {
      return object;
    }
  },
  // 字符串转日期对象
  parseDate: function (str) {
    // 和dayjs版本不匹配
    return dayjs(str.replace(/-/g, '/')).toDate();
  },
  // 字符串转化为JSON
  parseJson: function (str) {
    // eslint-disable-next-line no-eval
    return str ? eval('(' + str + ')') : {};
  },
  // 手机号前端掩码
  safeTel(telNumber = '') {
    let tel = new String(telNumber);
    if (tel.length >= 11) {
      let r = tel.length - 4;
      let head = tel.substring(0, r - 4);
      let tail = tel.substring(r);
      return `${head}****${tail}`;
    } else if (tel.length >= 5 && tel.length < 11) {
      let r = tel.length - 2;
      let head = tel.substring(0, r - 3);
      let tail = tel.substring(r);
      return `${head}***${tail}`;
    } else {
      return tel.toString();
    }
  },
  // 手机号码格式化-334
  telFormat(telNumber = '', type = '334') {
    let tel = new String(telNumber);
    if (type == '334') {
      let head = tel.substring(0, 3);
      let body = tel.substring(3, 7);
      let tail = tel.substring(7);
      return `${head}${body ? ' ' + body : ''}${tail ? ' ' + tail : ''}`;
    }
    return telNumber.toString();
  },
  // 自动化测试TestID生成
  setTestID(testID = '', uri = '') {
    const uriValue = uri.split('_')[0] || Math.random(); //
    return `${testID}_${uriValue}`;
  },
}
/**
 * @description 时间处理类
 * 看不太懂---学习枕着后来看
 */
const UtilExtDate = {
  /**
   * @desc  Date时间增加操作
   * @param {Date} [dateTime] 原始时间
   * @param {Object} json 需要添加的数量，可为负数
   * @param {int} json.month 月
   * @param {int} json.day 日
   * @param {int} json.hour 时
   * @param {int} json.minute 分
   * @param {int} json.second 秒
   * @returns {Date} 操作后的时间
   */
  timeAdd: function (dateTime, { month, day, hour, minute, second }) {
    let newDT = new Date(dateTime);
    month && newDT.setMonth(dateTime.getMonth() + month);
    day && newDT.setDate(dateTime.getDate() + day);
    hour && newDT.setHours(dateTime.getHours() + hour);
    minute && newDT.setMinutes(dateTime.getMinutes() + minute);
    second && newDT.setSeconds(dateTime.getSeconds() + second);
    return newDT;
  },
  /**
   * @desc 分钟向下取整
   * @param {Date} [dateTime|string] 原始时间
   * @param {int} [minute=10] 取整的分钟数
   * @returns {Date} 操作后的时间
   */
  timeFloor: function (dateTime, minute = 10) {
    let newDT = UtilExtIs.isString(dateTime)
      ? UtilExtString.parseDate(dateTime)
      : new Date(dateTime);
    newDT.setMinutes(Math.floor(newDT.getMinutes() / minute) * minute);
    return newDT;
  },
  /**
   * @desc 分钟向上取整
   * @param {Date} [dateTime|string] 原始时间
   * @param {int} [minute=10] 取整的分钟数
   * @returns {Date} 操作后的时间
   */
  timeCeil: function (dateTime, minute = 10) {
    let newDT = UtilExtIs.isString(dateTime)
      ? UtilExtString.parseDate(dateTime)
      : new Date(dateTime);
    newDT.setMinutes(Math.ceil(newDT.getMinutes() / minute) * minute);
    return newDT;
  },
  /**
   * @desc 只区间内的时间
   * @param {Date} [value] 原始时间
   * @param {Date} [max] 最大值
   * @param {Date} [min] 最大值
   */
  timeInRange: function (value, maxValue, minValue) {
    let v = value.getTime(),
      max = maxValue.getTime(),
      min = minValue.getTime();
    return new Date(UtilExtNumber.numberInRange(v, max, min));
  },
};

/**
 * @description 数字处理类
 */
const UtilExtNumber = {
  /**
 * @desc 数值滤波---数值限制到区间范围内
 * @param {number} [value] 原始数值
 * @param {number} [min] 最小值
 * @param {number} [max] 最大值
 */
  numberInRange: function (value: number, min: number, max: number): number {
    return Math.min(Math.max(min, value), max)
  },
  /**
 * @desc 区间内的随机整数
 * @param {number} [min] 最小值（包含）
 * @param {number} [max] 最大值（不包含）
 */
  numberInRandom: function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
  },
  // 生成uuid
  uuid: (len?: number): string => {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    if (len) {
      return uuid.slice(0, len);
    }
    return uuid;
  },
}

/**
 * @description 函数处理类
 */
const UtilExtFunction = {
  // 只执行一次
  throttleFn: function (fn: (...args: any[]) => void, wait: number = 300) {
    let lastCallTime = 0,
      now,
      timeSinceLastCall = 0, // 距离上次调用
      timer: number;
    return function (...args) {
      // 额外配置的回调，每次事件触发都执行
      if (args[0]?.persist && typeof args[0]?.persist === 'function') {
        args[0].persist();
      }
      now = new Date().getTime();

      // first time
      if (!lastCallTime && !timer) {
        lastCallTime = now;
        fn(...args);
        return;
      }

      timeSinceLastCall = now - lastCallTime;
      // 超时后点击触发--两次
      if (timeSinceLastCall >= wait) {
        lastCallTime = now;
        fn(...args);
      } else {
        clearTimeout(timer);
        // 取消上一次计时，重新触发一次
        timer = window.setTimeout(() => {
          lastCallTime = now;
          fn(...args);
        }, wait);
      }
    };
  },
  debounceFn: function (fn: (...args: any[]) => void, time: number = 300, { trailing = true }) {
    let leadingFlag: boolean = true;
    let trailingFlag: number;

    return function (...args) {
      // 必定触发的回调
      if (args[0]?.persist && typeof args[0]?.persist === 'function') {
        args[0].persist();
      }
      // 正常的防抖：每次都取消上一次的定时器
      if (trailing) {
        clearTimeout(trailingFlag);
        trailingFlag = window.setTimeout(() => {
          fn(...args);
        }, time);
      } else {
        // 用锁实现: 定时器回调内只能执行一次
        if (leadingFlag) {
          leadingFlag = false;
          window.setTimeout(() => {
            leadingFlag = true;
            fn(...args);
          }, time);
        }
      }
    };
  },
}



const _ = {
  ...UtilExtIs,
  ...UtilExtObject,
  ...UtilExtArray,
  ...UtilExtString,
  ...UtilExtDate,
  ...UtilExtNumber,
  ...UtilExtFunction
};

export { UtilExtIs, UtilExtObject, UtilExtArray, UtilExtString, UtilExtDate, UtilExtNumber, UtilExtFunction };

export default _;
