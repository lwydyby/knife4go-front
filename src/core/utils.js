/* eslint no-useless-escape:0 */
import md5 from 'js-md5'
import JSON5 from './json5'

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
const binaryContentType = {
  "application/octet-stream": true,
  "application/x-001": true,
  "text/h323": true,
  "drawing/907": true,
  "audio/x-mei-aac": true,
  "audio/aiff": true,
  "text/asa": true,
  "text/asp": true,
  "audio/basic": true,
  "application/vnd.adobe.workflow": true,
  "application/x-bmp": true,
  "application/x-c4t": true,
  "application/x-cals": true,
  "application/x-netcdf": true,
  "application/x-cel": true,
  "application/x-g4": true,
  "application/x-cit": true,
  "text/xml": true,
  "application/x-cmx": true,
  "application/pkix-crl": true,
  "application/x-csi": true,
  "application/x-cut": true,
  "application/x-dbm": true,
  "application/x-x509-ca-cert": true,
  "application/x-dib": true,
  "application/msword": true,
  "application/x-drw": true,
  "Model/vnd.dwf": true,
  "application/x-dwg": true,
  "application/x-dxf": true,
  "application/x-emf": true,
  "application/x-ps": true,
  "application/x-ebx": true,
  "image/fax": true,
  "application/fractals": true,
  "application/x-frm": true,
  "application/x-gbr": true,
  "image/gif": true,
  "application/x-gp4": true,
  "application/x-hmr": true,
  "application/x-hpl": true,
  "application/x-hrf": true,
  "text/x-component": true,
  "text/html": true,
  "image/x-icon": true,
  "application/x-iff": true,
  "application/x-igs": true,
  "application/x-img": true,
  "application/x-internet-signup": true,
  "java/*": true,
  "image/jpeg": true,
  "application/x-jpg": true,
  "application/x-laplayer-reg": true,
  "audio/x-liquid-secure": true,
  "audio/x-la-lms": true,
  "application/x-ltr": true,
  "video/x-mpeg": true,
  "video/mpeg4": true,
  "application/x-troff-man": true,
  "application/msaccess": true,
  "application/x-shockwave-flash": true,
  "message/rfc822": true,
  "audio/mid": true,
  "application/x-mil": true,
  "audio/x-musicnet-download": true,
  "application/x-javascript": true,
  "audio/mp1": true,
  "video/mpeg": true,
  "application/vnd.ms-project": true,
  "video/mpg": true,
  "audio/rn-mpeg": true,
  "image/pnetvue": true,
  "application/x-out": true,
  "application/x-pkcs12": true,
  "application/pkcs7-mime": true,
  "application/x-pkcs7-certreqresp": true,
  "application/x-pc5": true,
  "application/x-pcl": true,
  "application/pdf": true,
  "application/vnd.adobe.pdx": true,
  "application/x-pgl": true,
  "application/vnd.ms-pki.pko": true,
  "application/x-plt": true,
  "application/x-png": true,
  "application/vnd.ms-powerpoint": true,
  "application/x-ppt": true,
  "application/pics-rules": true,
  "application/x-prt": true,
  "application/postscript": true,
  "audio/vnd.rn-realaudio": true,
  "application/x-ras": true,
  "application/x-red": true,
  "application/vnd.rn-realsystem-rjs": true,
  "application/x-rlc": true,
  "application/vnd.rn-realmedia": true,
  "audio/x-pn-realaudio": true,
  "application/vnd.rn-realmedia-secure": true,
  "application/vnd.rn-realsystem-rmx": true,
  "image/vnd.rn-realpix": true,
  "application/vnd.rn-rsml": true,
  "video/vnd.rn-realvideo": true,
  "application/x-sat": true,
  "application/x-sdw": true,
  "application/x-slb": true,
  "drawing/x-slk": true,
  "application/smil": true,
  "text/plain": true,
  "application/futuresplash": true,
  "application/streamingmedia": true,
  "application/vnd.ms-pki.stl": true,
  "application/x-sty": true,
  "application/x-tg4": true,
  "image/tiff": true,
  "image/png": true,
  "drawing/x-top": true,
  "application/x-icq": true,
  "text/x-vcard": true,
  "application/vnd.visio": true,
  "application/x-vpeg005": true,
  "application/x-vsd": true,
  "audio/wav": true,
  "application/x-wb1": true,
  "application/x-wb3": true,
  "application/x-wk4": true,
  "application/x-wks": true,
  "audio/x-ms-wma": true,
  "application/x-wmf": true,
  "video/x-ms-wmv": true,
  "application/x-ms-wmz": true,
  "application/x-wpd": true,
  "application/vnd.ms-wpl": true,
  "application/x-wr1": true,
  "application/x-wrk": true,
  "application/x-ws": true,
  "application/vnd.adobe.xdp": true,
  "application/vnd.adobe.xfd": true,
  "application/x-xls": true,
  "application/x-xwd": true,
  "application/vnd.symbian.install": true,
  "application/x-x_t": true,
  "application/vnd.android.package-archive": true
}

function isUrl(path) {
  return reg.test(path);
}

const utils = {
  filterIgnoreParameters(inType, name, ignoreParameters) {
    //是否过滤参数
    if (ignoreParameters == null) {
      return true;
    }
    var tmpKeys = Object.keys(ignoreParameters || {});
    var ignoreParameterAllKeys = [];
    var reg = new RegExp("\\[0\\]", "gm");
    if (tmpKeys != null && tmpKeys.length > 0) {
      tmpKeys.forEach(tk => {
        ignoreParameterAllKeys.push(tk);
        if (tk.indexOf("[0]") > -1) {
          ignoreParameterAllKeys.push(tk.replace(reg, ""));
        }
      });
    }
    if (name.indexOf("[0]") > -1) {
      //存在数组的情况
      if (ignoreParameterAllKeys.length > 0) {
        var containtsKey = ignoreParameterAllKeys.filter(ignoreName => name.startsWith(ignoreName));
        if (containtsKey.length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      if (inType == 'query') {
        return !ignoreParameterAllKeys.some(key =>
          new RegExp(`^(${key}$|${key}[.[])`).test(name));
      } else {
        return !ignoreParameterAllKeys.includes(name);
      }
    }
  },
  binaryContentType(produces, contentType) {
    var binary = false;
    var binaryType = "";
    if (produces != null && produces != undefined) {
      produces.forEach(function (p) {
        if (binaryContentType[p]) {
          binaryType = p;
          binary = true;
        }
      })
    }
    if (contentType != null) {
      if (!binary && binaryContentType[contentType]) {
        binary = true;
        binaryType = contentType;
      }
    }
    var bobj = {
      binary: binary,
      binaryType: binaryType
    };
    return bobj;
  },
  copyOneObject(source) {
    var target = {};
    for (var k in source) {
      target[k] = source[k];
    }
    return target;
  },
  randomMd5() {
    //生成一个随机MD5码
    return md5(new Date().getTime().toString() +
      Math.floor(Math.random() * 100000).toString());
  },
  randomMd5Str(str) {
    //生成一个随机MD5码
    return md5(new Date().getTime().toString() +
      Math.floor(Math.random() * 10000).toString() + str);
  },
  formatter: function (data, parentPath = "/", parentAuthority) {
    return data.map(item => {
      let {
        path
      } = item;
      if (!isUrl(path)) {
        path = parentPath + item.path;
      }
      const result = {
        ...item,
        path,
        authority: item.authority || parentAuthority
      };
      if (item.children) {
        result.children = this.formatter(
          item.children,
          `${parentPath}${item.path}/`,
          item.authority
        );
      }
      return result;
    });
  },
  md5Id: function (obj) {
    var md5Id = "";
    try {
      if (obj != null && obj != undefined) {
        var str = JSON.stringify(obj);
        if (str != "") {
          var strArr = str.split("");
          strArr.sort();
          var newStr = strArr.join("");
          md5Id = md5(newStr);
        }

      }
    } catch (err) {}
    return md5Id;

  },
  checkParamArrsExists: function (arr, param) {
    return (arr || []).some(row => row.name == param.name)
    // var flag = false;
    // if (arr != null && arr.length > 0) {
    //   arr.forEach(function (a) {
    //     if (a.name == param.name) {
    //       flag = true;
    //     }
    //   })
    // }
    // return flag;
  },
  isChinese: function (keyword) {
    //判断是否包含中文
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(keyword);
  },
  json5stringify: function (rtext) {
    var ret = null;
    try {
      ret = JSON5.stringify(rtext, null, 2);
    } catch (err) {
      //console(err)
      ret = JSON.stringify(rtext, null, 2);
    }
    return ret;
  },
  json5parse: function (rtext) {
    var ret = null;
    try {
      ret = JSON5.parse(rtext)
    } catch (err) {
      //console(err)
      ret = JSON.parse(rtext);
    }
    return ret;
  },
  filterJsonObject: function (prefix, originalJson, filterObject) {
    var _tmpValue = null;
    try {
      _tmpValue = utils.filterObject(prefix, originalJson, filterObject);
    } catch (err) {
      _tmpValue = originalJson;
    }
    return _tmpValue;
  },
  filterObject: function (preName, originalJsonObject, filterObject) {
    var newObj = {};
    if (filterObject != undefined && filterObject != null) {
      for (var x in originalJsonObject) {
        var _tmp = originalJsonObject[x];
        var filterName = preName + "." + x;
        if (!filterObject.hasOwnProperty(filterName)) {
          newObj[x] = _tmp;
        }
        var _type = utils.genericType(_tmp);
        if (_type == "object") {
          newObj[x] = utils.filterObject(filterName, _tmp, filterObject);
        } else if (_type == "array") {
          var _t1 = _tmp[0];
          var _na = new Array();
          _na.push(utils.filterObject(filterName, _t1, filterObject));
          newObj[x] = _na;
        }

      }
    } else {
      newObj = originalJsonObject;
    }

    return newObj;
  },
  genericType: function (value) {
    var _tmp = Object.prototype.toString.call(value);
    var _tmpType = "";
    if (_tmp != null && _tmp != undefined) {
      if (_tmp.indexOf("Array") != -1) {
        _tmpType = "array";
      } else if (_tmp.indexOf("Object") != -1) {
        _tmpType = "object";
      }
    }
    return _tmpType;
  },
  getJsonKeyLength: function (json) {
    var size = 0;
    if (json != null) {
      for (key in json) {
        if (json.hasOwnProperty(key)) size++;
      }
    }
    return size;
  },
  regexMatchStr: function (regex, str) {
    var flag = false;
    if (regex != null && regex != undefined && str != null && str != undefined) {
      var matchResult = str.match(regex);
      if (matchResult != null) {
        flag = true;
      }
    }
    return flag;
  },
  searchMatch(regex, str) {
    var flag = false;
    if (regex != null && regex != undefined && str != null && str != undefined) {
      /* var matchResult = str.match(regex);
      if (matchResult != null) {
        flag = true;
      } */
      flag = new RegExp(regex, "ig").test(str);
    }
    return flag;
  },
  checkUndefined: function (obj) {
    var flag = false;
    if (obj != undefined && obj != null && typeof (obj) != "undefined") {
      flag = true;
    }
    return flag;
  },
  arrNotEmpty(arr) {
    //集合非空
    var flag = false;
    if (arr != undefined && arr != null && arr.length > 0) {
      flag = true;
    }
    return flag;
  },
  strNotBlank(str) {
    var flag = false;
    if (
      str != undefined &&
      str != null &&
      str != ""
    ) {
      flag = true;
    }
    return flag;
  },
  propValue: function (key, obj, defaultValue) {
    var t = defaultValue;
    if (obj.hasOwnProperty(key)) {
      t = obj[key];
    }
    return t;
  },
  checkIsBasicType: function (type) {
    var basicTypes = ["string", "integer", "number", "object", "boolean", "int32", "int64", "float", "double"];
    var flag = false;
    if (type != null) {
      if (basicTypes.indexOf(type) > -1) {
        flag = true;
      }
    }
    return flag;
  },
  getBasicTypeValue: function (type) {
    var propValue = "";
    //是否是基本类型
    if (type == "integer") {
      propValue = 0;
    }
    if (type == "boolean") {
      propValue = true;
    }
    if (type == "object") {
      propValue = {};
    }
    if (type == "number") {
      propValue = parseFloat(0);
    }
    return propValue;
  },
  getValue: function (obj, key, defaultValue, checkEmpty) {
    var val = defaultValue;
    if (obj != null && obj != undefined) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key];
        if (checkEmpty) {
          if (val == null || val == "") {
            val = defaultValue;
          }
        }
      }
    }
    return val;
  },
  getClassName: function (item) {
    var regex = new RegExp("#/components/schemas/(.*)$", "ig");
    if (regex.test(item)) {
      var ptype = RegExp.$1;
      return ptype;
    }
    return null;
  },
  trim(text) {
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");
    return text == null ? "" : (text + "").replace(rtrim, "");
  },
  getStringValue: function (obj) {
    var str = "";
    if (obj != undefined && typeof (obj) != 'undefined' && obj != null) {
      str = obj.toString();
    }
    return str;
  },
  toString(obj, defutStr) {
    var str = defutStr;
    if (obj != undefined && typeof (obj) != 'undefined' && obj != null) {
      str = obj.toString();
    }
    return str;
  },
  randomNumber: function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  },
  htmlEncode: function (html) {
    if (html !== null) {
      return html.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
      return '';
    }
  },
  jsString: function (s) {
    s = JSON.stringify(s).slice(1, -1);
    return utils.htmlEncode(s);
  },
  replaceMultipLineStr: function (str) {
    if (str != null && str != undefined && str != "") {
      var newLinePattern = /(\r\n|\n\r|\r|\n)/g;
      if (newLinePattern.test(str)) {
        var newDes = str.replace(newLinePattern, '\\n');
        return newDes;
      }
      return str;
    }
    return "";
  },
  generUUID: function () {
    return (utils.randomNumber() + utils.randomNumber() + "-" + utils.randomNumber() + "-" + utils.randomNumber() + "-" + utils.randomNumber() + "-" + utils.randomNumber() + utils.randomNumber() + utils.randomNumber());
  },
  base64Encode: function (str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "",
      i = 0,
      len = str.length,
      c1, c2, c3;
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += CHARS.charAt(c1 >> 2);
      out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
  },
  binToBase64: function (bitString) {
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""); //索引表
    var result = "";
    var tail = bitString.length % 6;
    var bitStringTemp1 = bitString.substr(0, bitString.length - tail);
    var bitStringTemp2 = bitString.substr(bitString.length - tail, tail);
    for (var i = 0; i < bitStringTemp1.length; i += 6) {
      var index = parseInt(bitStringTemp1.substr(i, 6), 2);
      result += code[index];
    }
    bitStringTemp2 += new Array(7 - tail).join("0");
    if (tail) {
      result += code[parseInt(bitStringTemp2, 2)];
      result += new Array((6 - tail) / 2 + 1).join("=");
    }
    return result;
  }
}


export default utils;
