/**
 * 扩展方法类判类
 */
/**
 * @description is判断类
 */
import * as dayjs from "dayjs";

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

const UtilExtArray = {};

const _ = {
  ...UtilExtIs,
  ...UtilExtObject,
};

export { UtilExtIs, UtilExtObject };

export default _;
