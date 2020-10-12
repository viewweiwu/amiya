'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var antd = require('antd');
var React = require('react');
var React__default = _interopDefault(React);
var BraftEditor = _interopDefault(require('braft-editor'));
require('braft-editor/dist/index.css');
var Select = _interopDefault(require('antd/lib/select'));
var moment = _interopDefault(require('moment'));
require('moment/locale/zh-cn');
var Alert = _interopDefault(require('antd/lib/alert'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function AyButton(props) {
  var params = _objectSpread2({}, props);

  delete params.confirm;
  delete params.onConfirm;
  delete params.confirmMsg;

  if (props.confirm) {
    return React__default.createElement(antd.Popconfirm, {
      title: props.confirmMsg,
      onConfirm: function onConfirm() {
        return props.onConfirm && props.onConfirm();
      }
    }, React__default.createElement(antd.Button, Object.assign({
      className: "ay-button"
    }, params)));
  }

  return React__default.createElement(antd.Button, Object.assign({
    className: "ay-button"
  }, params), props.children);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".ay-editor {\n  display: block;\n}\n.ay-editor::before {\n  display: none !important;\n}\n.ay-editor .bf-content {\n  height: 300px;\n  padding-bottom: 0;\n}\n.ay-editor .bf-controlbar .control-item.button,\n.ay-editor .bf-controlbar .control-item,\n.ay-editor .bf-controlbar .separator-line {\n  margin: 0 !important;\n}\n.ay-editor .bf-controlbar .separator-line {\n  margin-top: 5px !important;\n}\n";
styleInject(css);

/**
 * 判断内容是否是空数据
 * @param content 内容
 */

var isContentEmpty = function isContentEmpty(content) {
  return content.toHTML() === '<p></p>';
};

function AyEditor(props) {
  var value = props.value,
      onChange = props.onChange;

  var _useState = React.useState(BraftEditor.createEditorState(value || '')),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  React.useEffect(function () {
    // 如果 value 有值且 content 没有值，就重新设置一遍默认值
    if (value && isContentEmpty(content)) {
      setContent(BraftEditor.createEditorState(value));
    }
  }, [content, value]);
  var handleChange = React.useCallback(function (value) {
    if (onChange) {
      var html = value.toHTML(); // 如果只有一个空的 p 标签，等于没有值

      if (html === '<p></p>') {
        html = '';
      }

      onChange(html);
    }

    setContent(value);
  }, [onChange]);
  return React__default.createElement(BraftEditor, {
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
    className: "ant-input-affix-wrapper ay-editor",
    value: content,
    onChange: handleChange
  });
}

var getOptions = function getOptions(options) {
  if (!options) {
    return [];
  }

  return options.map(function (option) {
    return React__default.createElement(Select.Option, {
      value: option.value,
      key: option.value
    }, option.label);
  });
};

function AySelect(props) {
  var options = props.options;
  return React__default.createElement(Select, Object.assign({}, props), getOptions(options));
}

var css$1 = ".fr {\n  float: right;\n}\n.ml {\n  margin-left: 10px;\n}\n.mb {\n  margin-bottom: 10px;\n}\n.gap {\n  margin-left: 4px;\n}\n.ay-form {\n  padding-right: 20px;\n}\n.ay-form .max-width {\n  width: 100%;\n}\n.form-date-extra {\n  max-width: 100%;\n  display: flex;\n  padding: 4px 0;\n}\n.form-date-extra .ay-button {\n  color: unset;\n  flex: 1;\n  padding: 0;\n}\n.form-date-extra .ay-button:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.form-tip {\n  height: 32px;\n  padding-left: 10px;\n  color: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n}\n.form-header {\n  padding-bottom: 5px;\n  margin-bottom: 15px;\n  margin-left: 50px;\n  font-weight: normal;\n  position: relative;\n  border-bottom: 1px solid #f0f0f0;\n}\n.form-header::before {\n  content: '';\n  top: 50%;\n  right: calc(100% + 10px);\n  width: 5px;\n  height: 60%;\n  border-radius: 2px;\n  background-color: #4091f1;\n  position: absolute;\n  transform: translateY(-50%);\n}\n.dark .form-header {\n  border-bottom-color: #303030;\n}\n.dark .form-tip {\n  color: rgba(255, 255, 255, 0.65);\n}\n";
styleInject(css$1);

// ------------------------ table 默认配置 -----------------------
// --------------------------------------------------------------

/** 表格默认页数 */

var TABLE_PAGESIZE = 10;
/** 表格初始第 N 页开始 */

var TABLE_START_PAGE = 1;
/** 表格控制列的 key */

var TABLE_CTRL_KEY = 'ctrl';
// ------------------------ form 其它默认值 -----------------------
// --------------------------------------------------------------

/** 输入框默认字符长度 */

var INPUT_DEFAULT_MAXLENGTH = 30;
/** 多行文本框默认字符长度 */

var TEXTAREA_DEFAULT_MAXLENGTH = 200;
/** 数字框默认最小 */

var NUMBER_DEFAULT_MIN = 0;
/** 数字框默认最大*/

var NUMBER_DEFAULT_MAX = 99999999;
/** 百分比框默认最大*/

var PERCENT_DEFAULT_MAX = 100;
/** form 默认是否有清空按钮 */

var FORM_DEFAULT_ALLOW_CLEAR = true; // --------------------------------------------------------------
// ------------------------ form 表单类型 ------------------------
// --------------------------------------------------------------

/** 表单类型: 输入框 */

var FORM_TYPE_INPUT = 'input';
/** 表单类型: 数字 */

var FORM_TYPE_NUMBER = 'number';
/** 表单类型: 百分比 */

var FORM_TYPE_PERCENT = 'percent';
/** 表单类型: 密码框 */

var FORM_TYPE_PASSWORD = 'password';
/** 表单类型: 富文本框 */

var FORM_TYPE_EDITOR = 'editor';
/** 表单类型: 多行输入框 */

var FORM_TYPE_TEXTAREA = 'textarea';
/** 表单类型: 选择框 */

var FORM_TYPE_SELECT = 'select';
/** 表单类型: 开关 */

var FORM_TYPE_SWITCH = 'switch';
/** 表单类型: 多选框 */

var FORM_TYPE_CHECKBOX = 'checkbox';
/** 表单类型: 多选组 */

var FORM_TYPE_CHECKBOX_GROUP = 'checkbox-group';
/** 表单类型: 单选组 */

var FORM_TYPE_RADIO_GROUP = 'radio-group';
/** 表单类型: 日期 */

var FORM_TYPE_DATE = 'date';
/** 表单类型: 日期区间 */

var FORM_TYPE_DATE_RANGE = 'date-range';
/** 表单类型: 空白框 */

var FORM_TYPE_EMPTY = 'empty';
/** 表单类型: 自定义 */

var FORM_TYPE_CUSTOM = 'custom'; // --------------------------------------------------------------
// ------------------------ form 表单默认值 -----------------------
// --------------------------------------------------------------

/** 表单默认值: 输入框默认值 */

var FORM_DEFAULT_VALUE_INPUT = '';
/** 表单默认值: 数字框默认值 */

var FORM_DEFAULT_VALUE_NUMBER = null;
/** 表单默认值: 数字框默认值 */

var FORM_DEFAULT_VALUE_PERCENT = null;
/** 表单默认值: 密码框默认值 */

var FORM_DEFAULT_VALUE_PASSWORD = '';
/** 表单默认值: 富文本框默认值 */

var FORM_DEFAULT_VALUE_EDITOR = '';
/** 表单默认值: 多行输入框默认值 */

var FORM_DEFAULT_VALUE_TEXTAREA = '';
/** 表单默认值: 选择框默认值 */

var FORM_DEFAULT_VALUE_SELECT = undefined;
/** 表单默认值: 开关默认值 */

var FORM_DEFAULT_VALUE_SWITCH = false;
/** 表单默认值: 多选框默认值 */

var FORM_DEFAULT_VALUE_CHECKBOX = false;
/** 表单默认值: 多选组默认值 */

var FORM_DEFAULT_VALUE_CHECKBOX_GROUP = [];
/** 表单默认值: 单选组默认值 */

var FORM_DEFAULT_VALUE_RADIO_GROUP = null;
/** 表单默认值: 日期默认值 */

var FORM_DEFAULT_VALUE_DATE = undefined;
/** 表单默认值: 日期区间默认值 */

var FORM_DEFAULT_VALUE_DATE_RANGE = [];
/** 表单类型: 空白框 */

var FORM_DEFAULT_VALUE_EMPTY = '';

var _defaultValueMap;
moment.locale('zh-cn');
var defaultLayout = {
  labelCol: {
    flex: '120px'
  },
  wrapperCol: {
    flex: '1'
  }
}; // 默认值表

var defaultValueMap = (_defaultValueMap = {}, _defineProperty(_defaultValueMap, FORM_TYPE_INPUT, FORM_DEFAULT_VALUE_INPUT), _defineProperty(_defaultValueMap, FORM_TYPE_NUMBER, FORM_DEFAULT_VALUE_NUMBER), _defineProperty(_defaultValueMap, FORM_TYPE_PERCENT, FORM_DEFAULT_VALUE_PERCENT), _defineProperty(_defaultValueMap, FORM_TYPE_PASSWORD, FORM_DEFAULT_VALUE_PASSWORD), _defineProperty(_defaultValueMap, FORM_TYPE_EDITOR, FORM_DEFAULT_VALUE_EDITOR), _defineProperty(_defaultValueMap, FORM_TYPE_TEXTAREA, FORM_DEFAULT_VALUE_TEXTAREA), _defineProperty(_defaultValueMap, FORM_TYPE_SELECT, FORM_DEFAULT_VALUE_SELECT), _defineProperty(_defaultValueMap, FORM_TYPE_SWITCH, FORM_DEFAULT_VALUE_SWITCH), _defineProperty(_defaultValueMap, FORM_TYPE_CHECKBOX, FORM_DEFAULT_VALUE_CHECKBOX), _defineProperty(_defaultValueMap, FORM_TYPE_CHECKBOX_GROUP, FORM_DEFAULT_VALUE_CHECKBOX_GROUP), _defineProperty(_defaultValueMap, FORM_TYPE_RADIO_GROUP, FORM_DEFAULT_VALUE_RADIO_GROUP), _defineProperty(_defaultValueMap, FORM_TYPE_DATE, FORM_DEFAULT_VALUE_DATE), _defineProperty(_defaultValueMap, FORM_TYPE_DATE_RANGE, FORM_DEFAULT_VALUE_DATE_RANGE), _defineProperty(_defaultValueMap, FORM_TYPE_EMPTY, FORM_DEFAULT_VALUE_EMPTY), _defaultValueMap);
/**
 * 获取隐藏配置项
 * @param field 配置项
 */

var getNoVisibleField = function getNoVisibleField(field) {
  return _objectSpread2(_objectSpread2({}, field), {}, {
    title: '',
    type: 'empty'
  });
};
/**
 * 获得配置列表
 * @param fields 配置列表
 */


var getDefaultValue = function getDefaultValue(fields) {
  var form = {};
  fields.forEach(function (field) {
    // 如果配置项里存在默认值，直接返回默认值，否则从默认值表里获取
    if (field.hasOwnProperty('defaultValue')) {
      // 日期类型的需要通过 moment 转一遍
      if (field.type === FORM_TYPE_DATE && field.defaultValue) {
        form[field.key] = moment(field.defaultValue);
      } else {
        form[field.key] = field.defaultValue;
      }
    } else if (field.type) {
      form[field.key] = defaultValueMap[field.type];
    }
  });
  return form;
};
/**
 * 生成 placeholder
 * @param field 配置项
 */

var getPlaceholder = function getPlaceholder(field) {
  var defaultProps = field.props;

  if (defaultProps && defaultProps.placeholder) {
    return defaultProps.placeholder;
  }

  if (!field.type) {
    return "\u8BF7\u8F93\u5165".concat(field.title);
  }

  if ([FORM_TYPE_INPUT, FORM_TYPE_NUMBER, FORM_TYPE_PERCENT, FORM_TYPE_PASSWORD, FORM_TYPE_TEXTAREA].includes(field.type)) {
    return "\u8BF7\u8F93\u5165".concat(field.title);
  } else if ([FORM_TYPE_SELECT, FORM_TYPE_DATE].includes(field.type)) {
    return "\u8BF7\u9009\u62E9".concat(field.title);
  }

  return field.title || '';
};
/**
 * 根据配置项生成 props
 * @param field 配置项
 */


var getTagProps = function getTagProps(field, setFieldsValue, readonly) {
  var type = field.type || FORM_TYPE_INPUT;
  var props = {
    disabled: readonly,
    placeholder: getPlaceholder(field) // 生成 placeholder

  };

  if (!type) {
    return props;
  }

  switch (type) {
    case FORM_TYPE_INPUT:
    case FORM_TYPE_PASSWORD:
      // 字符最大长度 输入框、密码框
      props.maxLength = INPUT_DEFAULT_MAXLENGTH;
      break;

    case FORM_TYPE_TEXTAREA:
      // 字符最大长度 多行文本框
      props.maxLength = TEXTAREA_DEFAULT_MAXLENGTH;
      break;

    case FORM_TYPE_NUMBER:
      // 填充数字框的最大最小
      props.min = NUMBER_DEFAULT_MIN;
      props.max = NUMBER_DEFAULT_MAX;
      break;

    case FORM_TYPE_PERCENT:
      // 填充数字框的最大最小
      props.min = NUMBER_DEFAULT_MIN;
      props.max = PERCENT_DEFAULT_MAX;

      props.formatter = function (value) {
        return value !== '' ? "".concat(value, "%") : '';
      };

      props.parser = function (value) {
        return value.replace('%', '');
      };

      break;

    case FORM_TYPE_DATE:
      // 填充日期的快捷选项
      props.renderExtraFooter = function (mode) {
        /**
         * 填充日期
         * @param value 日期
         */
        var setValue = function setValue(value) {
          setFieldsValue(_defineProperty({}, field.key, value));
        };

        return React__default.createElement(React__default.Fragment, null, React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().startOf('day'));
          }
        }, "\u4ECA\u5929\u51CC\u6668"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().endOf('day'));
          }
        }, "\u4ECA\u5929\u665A\u4E0A"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().subtract(1, 'day').startOf('day'));
          }
        }, "\u6628\u5929\u51CC\u6668"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().subtract(1, 'day').endOf('day'));
          }
        }, "\u6628\u5929\u665A\u4E0A"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().startOf('week'));
          }
        }, "\u5468\u4E00"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().endOf('week'));
          }
        }, "\u5468\u672B"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().startOf('month'));
          }
        }, "\u6708\u521D"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().endOf('month'));
          }
        }, "\u6708\u5E95"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().subtract(1, 'month').startOf('month'));
          }
        }, "\u4E0A\u6708\u521D"), React__default.createElement("a", {
          className: "ant-picker-now-btn mr",
          onClick: function onClick() {
            return setValue(moment().subtract(1, 'month').endOf('month'));
          }
        }, "\u4E0A\u6708\u5E95"));
      };

      break;

    case FORM_TYPE_DATE_RANGE:
      // 填充日期的快捷选项
      props.ranges = {
        今天: [moment().startOf('day'), moment().endOf('day')],
        昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day').endOf('day')],
        本周: [moment().startOf('week'), moment().endOf('day')],
        上周: [moment().startOf('week').subtract(7, 'day'), moment().endOf('week').subtract(7, 'day')],
        本月: [moment().startOf('month'), moment().endOf('day')],
        上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      };
      break;

    case FORM_TYPE_CHECKBOX_GROUP:
    case FORM_TYPE_RADIO_GROUP:
      // 填充选项 选择框、多选组、单选组
      props.options = field.options;
      break;
  } // 是否带清空按钮 选择框、输入框


  if ([FORM_TYPE_SELECT, FORM_TYPE_INPUT, FORM_TYPE_PASSWORD].includes(type)) {
    props.allowClear = FORM_DEFAULT_ALLOW_CLEAR;
  } // 填充选项 选择框、多选组、单选组


  if ([FORM_TYPE_SELECT, FORM_TYPE_CHECKBOX_GROUP, FORM_TYPE_RADIO_GROUP].includes(type)) {
    props.options = field.options;
  }

  props = _objectSpread2(_objectSpread2({}, props), field.props);
  return props;
};
/**
 * 根据不同的 type 生成不同种类的标签 Tag
 * @param field 配置项
 */


var getTag = function getTag(field, fields, setFieldsValue, readonly) {
  var type = field.type;
  var tag = null;
  var tagProps = getTagProps(field, setFieldsValue, readonly);

  switch (type) {
    default:
    case FORM_TYPE_INPUT:
      tag = React__default.createElement(antd.Input, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_NUMBER:
    case FORM_TYPE_PERCENT:
      tag = React__default.createElement(antd.InputNumber, Object.assign({
        className: "max-width"
      }, tagProps));
      break;

    case FORM_TYPE_PASSWORD:
      tag = React__default.createElement(antd.Input.Password, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_TEXTAREA:
      tag = React__default.createElement(antd.Input.TextArea, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_EDITOR:
      tag = React__default.createElement(AyEditor, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_SELECT:
      tag = React__default.createElement(AySelect, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_SWITCH:
      tag = React__default.createElement(antd.Switch, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_CHECKBOX:
      tag = React__default.createElement(antd.Checkbox, Object.assign({}, tagProps), field.checkboxChildren);
      break;

    case FORM_TYPE_CHECKBOX_GROUP:
      tag = React__default.createElement(antd.Checkbox.Group, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_RADIO_GROUP:
      tag = React__default.createElement(antd.Radio.Group, Object.assign({}, tagProps));
      break;

    case FORM_TYPE_DATE:
      tag = React__default.createElement(antd.DatePicker, Object.assign({
        className: "max-width"
      }, tagProps));
      break;

    case FORM_TYPE_DATE_RANGE:
      tag = React__default.createElement(antd.DatePicker.RangePicker, Object.assign({
        className: "max-width"
      }, tagProps));
      break;

    case FORM_TYPE_EMPTY:
      tag = React__default.createElement("input", {
        hidden: true,
        type: "text"
      });
      break;

    case FORM_TYPE_CUSTOM:
      if (typeof field.renderContent === 'function') {
        tag = field.renderContent(field, field._values || getDefaultValue(fields));
      }

      break;
  }

  return tag;
};
/**
 * 通过配置列表转 Form.Item
 * @step 1、判断是否隐藏、保留占位 (visible)
 * @step 2、判断是否隐藏、不保留占位 (hidden)
 * @step 3、计算 Form.Item props 的默认基础属性
 * @step 4、设置特殊标签特殊属性
 * @step 5、设置隐藏占位 (hidden)
 * @step 6、填充 rules 属性
 * @step 7、使用 required 填充 rules
 * @param fields 配置列表
 * @param span Col 占位 0 ～ 24
 */


var getFormItem = function getFormItem(fields, setFieldsValue, span, readonly) {
  return fields.map(function (field) {
    var visible = true; // 隐藏该项目，保留占位，但是保留值

    if (field.visible !== undefined) {
      visible = typeof field.visible === 'function' ? field.visible() : field.visible;
    }

    var hidden = false; // 隐藏该项目，不保留占位，但是保留值

    if (field.hidden !== undefined) {
      hidden = typeof field.hidden === 'function' ? field.hidden() : field.hidden;
    } // 隐藏该项，只显示占位，保留 form 值


    if (!visible || hidden) {
      field = getNoVisibleField(field);
    } // 设置 Form.Item 的属性


    var props = _objectSpread2(_objectSpread2({}, field.formItemProps), {}, {
      label: field.title,
      name: field.key,
      extra: field.help
    }); // 设定 开关、多选框 的值类型 （这是 ant design form 的限制）


    if (field.type && [FORM_TYPE_SWITCH, FORM_TYPE_CHECKBOX].includes(field.type)) {
      props.valuePropNaye = 'checked';
    } // 设置每个【表单项】的占位


    var colProps = {
      span: field.span !== 0 ? field.span || span || 12 : span || 12,
      offset: field.offset,
      key: field.key
    }; // 不保留占位

    if (hidden) {
      colProps.span = 0;
    } // 填充 rules 属性


    if (field.rules) {
      props.rules = _toConsumableArray(field.rules);
    } // 填充快捷 required 属性


    if (field.required) {
      var rule = {
        required: true,
        message: getPlaceholder(field)
      };

      if (props.rules) {
        props.rules.push(rule);
      } else {
        props.rules = [rule];
      }
    }

    var tag = getTag(field, fields, setFieldsValue, readonly);
    return React__default.createElement(antd.Col, Object.assign({}, colProps), field.render ? field.render(field, field._values || getDefaultValue(fields)) : React__default.createElement(antd.Form.Item, Object.assign({}, props), tag));
  });
};
/**
 * 格式化 日期
 * @param values 格式化的数据
 * @param fields 配置项
 */


var formatValues = function formatValues(values, fields) {
  var result = {};

  var _loop = function _loop(key) {
    var value = values[key];
    var field = fields.find(function (field) {
      return field.key === key;
    });

    if (value && field) {
      if (value.length && field.type === FORM_TYPE_DATE_RANGE) {
        // 区间类型取 startKey 与 endKey
        result[field.startKey || 'startKey'] = value[0].format('YYYY-MM-DD HH:mm:ss');
        result[field.endKey || 'endKey'] = value[0].format('YYYY-MM-DD HH:mm:ss');
      } else if (field.type === FORM_TYPE_DATE) {
        // 单值类型直接转
        result[key] = value.format('YYYY-MM-DD HH:mm:ss');
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  };

  for (var key in values) {
    _loop(key);
  }

  return result;
};
/**
 * 提交表单，如果有 onConfirm 事件传入，则触发一次
 * @param values 表单值
 * @param onConfirm 提交表单事件
 */


var handleConfirm = function handleConfirm(values, fields, onConfirm) {
  if (onConfirm) {
    onConfirm(formatValues(values, fields));
  }
};
/**
 * 支持表单改变事件监听
 * @param changedValues 改变的值
 * @param allValues 表单所有的值
 * @param fields 所有的饿配置项
 * @param setFieldsValue 设置表单值的方法
 */


var handleChange = function handleChange(changedValues, allValues, fields, setFieldsValue, setRefresh) {
  var _loop2 = function _loop2(key) {
    var field = fields.find(function (field) {
      return field.key === key;
    });

    if (field) {
      var value = changedValues[key];

      if (field.onChange) {
        field.onChange(value, allValues, setFieldsValue);
      }
    }
  };

  for (var key in changedValues) {
    _loop2(key);
  }
};
/**
 * ant form 原生支持的方法尽数暴露出去
 */


var funcs = ['getFieldValue', 'getFieldsValue', 'getFieldError', 'getFieldsError', 'isFieldTouched', 'isFieldsTouched', 'isFieldValidating', 'resetFields', 'scrollToField', 'setFields', 'setFieldsValue', 'submit', 'validateFields'];
var AyForm = React.forwardRef(function AyForm(props, ref) {
  var fields = props.fields,
      onConfirm = props.onConfirm,
      span = props.span,
      children = props.children,
      defaultProps = props.props,
      readonly = props.readonly,
      layout = props.layout;

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      setRefresh = _useState2[1];
  /** 控制 any form 的实例 */


  var formRef = React.useRef();
  /** 暴露出去的 form 的实例，允许父组件通过 ref 调用方法 */

  var formInstans = {};
  /** 填充方法 */

  funcs.forEach(function (func) {
    formInstans[func] = function () {
      var _formRef$current;

      return (_formRef$current = formRef.current)[func].apply(_formRef$current, arguments);
    };
  });

  formInstans.setFieldsValue = function (values) {
    fields.forEach(function (field) {
      if (field.type === FORM_TYPE_DATE) {
        if (values[field.key]) {
          values[field.key] = moment(values[field.key]);
        }
      }
    });
    formRef.current.setFieldsValue(values);
  };

  formInstans.setRefresh = setRefresh;
  /** 暴露方法 */

  React.useImperativeHandle(ref, function () {
    return formInstans;
  });
  return React__default.createElement("div", {
    className: "ay-form"
  }, React__default.createElement(antd.Form, Object.assign({
    ref: formRef
  }, defaultLayout, layout, {
    name: props.name || 'ay-form',
    initialValues: getDefaultValue(fields),
    onFinish: function onFinish(values) {
      return handleConfirm(values, fields, onConfirm);
    },
    onValuesChange: function onValuesChange(changedValues, allValues) {
      return handleChange(changedValues, allValues, fields, formInstans.setFieldsValue);
    }
  }, defaultProps), React__default.createElement(antd.Row, null, getFormItem(fields, formInstans.setFieldsValue, span, readonly), children)));
});

var css$2 = ".fr {\n  float: right;\n}\n.ml {\n  margin-left: 10px;\n}\n.mb {\n  margin-bottom: 10px;\n}\n.gap {\n  margin-left: 4px;\n}\n.ant-card.am-search {\n  padding: 20px;\n  padding-bottom: 0;\n  margin-bottom: 10px;\n}\n.ant-card.am-search .ant-card-body {\n  padding: 0;\n}\n";
styleInject(css$2);

var _require = require('@ant-design/icons'),
    SearchOutlined = _require.SearchOutlined,
    ReloadOutlined = _require.ReloadOutlined,
    DownOutlined = _require.DownOutlined,
    UpOutlined = _require.UpOutlined;
/**
 * 获取 field 当前的位置，默认位置是 1，越往前越靠前
 * @param field form 配置项
 */


var getOrder = function getOrder(field) {
  // 把 '开始时间', '结束时间' 放到最前面
  if (field.title && ['开始时间', '结束时间'].includes(field.title)) {
    return 0;
  }

  return field.order === undefined ? 1 : field.order;
};
/**
 * 将查询的 field 转成 form 的field
 * @param fields 查询配置项
 * @param mini 是否缩小
 */


var getSearchFields = function getSearchFields(fields, mini) {
  var newFields = fields.map(function (field, i) {
    var newField = _objectSpread2(_objectSpread2({
      key: field.key
    }, field), {}, {
      // 生成 order
      order: getOrder(field)
    }); // 获取展开缩小时的 field


    if (mini) {
      newField.hidden = i > 4;
    }

    return newField;
  }); // 排序

  newFields.sort(function (a, b) {
    return a.order - b.order;
  });
  return newFields;
};

var getMiniLabel = function getMiniLabel(mini) {
  return mini ? '收缩' : '展开';
};
/**
 * ant form 原生支持的方法尽数暴露出去
 */


var funcs$1 = ['getFieldValue', 'getFieldsValue', 'getFieldError', 'getFieldsError', 'isFieldTouched', 'isFieldsTouched', 'isFieldValidating', 'resetFields', 'scrollToField', 'setFields', 'setFieldsValue', 'submit', 'validateFields'];
var AySearch = React.forwardRef(function AySearch(props, ref) {
  var fields = props.fields,
      onConfirm = props.onConfirm;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mini = _useState2[0],
      setMini = _useState2[1];

  var searchFields = getSearchFields(fields, mini);
  /** 控制 any form 的实例 */

  var formRef = React.useRef();
  /** 暴露出去的 form 的实例，允许父组件通过 ref 调用方法 */

  var formInstans = {};
  /** 填充方法 */

  funcs$1.forEach(function (func) {
    formInstans[func] = function () {
      var _formRef$current;

      return (_formRef$current = formRef.current)[func].apply(_formRef$current, arguments);
    };
  });
  React.useImperativeHandle(ref, function () {
    return formInstans;
  });

  var toggleMini = function toggleMini() {
    setMini(!mini);
  };
  /**
   * 重置
   */


  var handleReset = function handleReset() {
    formRef.current.resetFields();
    formRef.current.submit();
  };
  /**
   * 提交查询
   * @param values 返回参数
   */


  var handleConfirm = function handleConfirm(values) {
    if (onConfirm) {
      onConfirm(values);
    }
  };
  /**
   * 展开缩小切换
   */


  var ToogleBtn = React__default.createElement(AyButton, {
    type: "link",
    onClick: toggleMini
  }, getMiniLabel(mini), mini ? React__default.createElement(UpOutlined, null) : React__default.createElement(DownOutlined, null));
  return React__default.createElement(antd.Card, {
    className: "ay-search"
  }, React__default.createElement(AyForm, {
    ref: formRef,
    fields: searchFields,
    span: 8,
    onConfirm: handleConfirm
  }, React__default.createElement(antd.Col, {
    span: 8
  }, React__default.createElement(antd.Form.Item, {
    wrapperCol: {
      offset: 4
    }
  }, React__default.createElement(antd.Space, null, React__default.createElement(AyButton, {
    htmlType: "submit",
    type: "primary",
    icon: React__default.createElement(SearchOutlined, null)
  }, "\u67E5\u8BE2"), React__default.createElement(AyButton, {
    icon: React__default.createElement(ReloadOutlined, null),
    onClick: handleReset
  }, "\u91CD\u7F6E"), fields.length > 5 && ToogleBtn)))));
});

/**
 * 拷贝对象
 * @param obj
 */
/**
 * 是否是对象
 * @param obj 判断对象
 */

var isObj = function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * 清空对象的 undefined 和 null
 * @param params 要清空的对象
 */

var clearEmpty = function clearEmpty(params) {
  var result = {};

  for (var key in params) {
    if (params[key] !== 0 && params[key]) {
      result[key] = params[key];
    }
  }

  return result;
}; // 向右移位

var css$3 = ".fr {\n  float: right;\n}\n.ml {\n  margin-left: 10px;\n}\n.mb {\n  margin-bottom: 10px;\n}\n.gap {\n  margin-left: 4px;\n}\n.ay-table .ant-card-body {\n  padding: 0;\n}\n.ay-table-header {\n  margin: 15px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.ay-table-title {\n  line-height: 1;\n  margin: 0;\n  font-size: 20px;\n  display: inline-block;\n}\n.table-analysis-item {\n  display: flex;\n  align-items: center;\n}\n";
styleInject(css$3);

var _require$1 = require('@ant-design/icons'),
    DownloadOutlined = _require$1.DownloadOutlined;

var defaultSearchFilter = function defaultSearchFilter(params) {
  return params;
};

var defaultDataFilter = function defaultDataFilter(params) {
  return params;
};

var setDefaultSearchFilter = function setDefaultSearchFilter(cb) {
  defaultSearchFilter = cb;
};
var setDefaultDataFilter = function setDefaultDataFilter(cb) {
  defaultDataFilter = cb;
};
/**
 * 重新过滤配置项
 *
 * 1、先过滤隐藏项目
 * 2、过滤成 antd Table 需要的 columns
 *
 * @param fields 配置项目
 */

var getAyTableField = function getAyTableField(fields, ctrl) {
  var tableFields = fields.filter(function (field) {
    return field.hidden !== true;
  }).map(function (field) {
    var tableField = _objectSpread2({
      key: field.key,
      dataIndex: field.key
    }, field);

    if (field.render) {
      tableField.render = field.render;
    }

    if (field.options && !field.render) {
      tableField.render = function (text) {
        var row = field.options.find(function (option) {
          return option.value === text;
        });

        if (row) {
          if (field.renderType === 'tag') {
            return React__default.createElement(antd.Tag, {
              color: row.color
            }, row ? row.label : text);
          } else if (row.color) {
            return React__default.createElement("span", null, React__default.createElement("span", {
              className: "circle ".concat(row.color)
            }), row ? row.label : text);
          }
        }

        return row ? row.label : text;
      };
    }

    return tableField;
  });

  if (ctrl && ctrl.render && tableFields.every(function (field) {
    return field.key !== 'ctrl';
  })) {
    ctrl.key = TABLE_CTRL_KEY;
    ctrl.title = ctrl.title || '操作';
    tableFields.push(ctrl);
  }

  return tableFields;
};

var AyTable = React.forwardRef(function AyTable(props, ref) {
  var className = props.className,
      fields = props.fields,
      header = props.header,
      api = props.api,
      data = props.data,
      children = props.children,
      meta = props.meta,
      rowSelection = props.rowSelection,
      ctrl = props.ctrl,
      onLoad = props.onLoad,
      rowKey = props.rowKey,
      scrollX = props.scrollX,
      filterData = props.filterData,
      beforeSearch = props.beforeSearch,
      onExpand = props.onExpand,
      pagination = props.pagination,
      tableExtend = props.tableExtend,
      defaultSearchValue = props.defaultSearchValue,
      btnBefore = props.btnBefore,
      dataAnalysis = props.dataAnalysis,
      exportVisible = props.exportVisible;
  /** 表格配置 */

  var ayTableFields = getAyTableField(fields, ctrl);
  /** 表格数据 */

  var _useState = React.useState(data || []),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];
  /** 是否正在加载 */


  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
  /** 总共多少条 */


  var _useState5 = React.useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      total = _useState6[0],
      setTotal = _useState6[1];
  /** 表格查询的数据 */


  var _useState7 = React.useState({
    pagination: {
      size: TABLE_PAGESIZE,
      current: TABLE_START_PAGE
    },
    search: clearEmpty(defaultSearchValue || {})
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      loadParams = _useState8[0],
      setLoadParams = _useState8[1];
  /**
   * 获得查询前的参数
   */


  var getParams = function getParams() {
    var searchParams = _objectSpread2({
      currentPage: loadParams.pagination.current,
      pageSize: loadParams.pagination.size
    }, loadParams.search);

    if (beforeSearch) {
      searchParams = beforeSearch(searchParams);
    }

    return searchParams;
  };
  /**
   * 加载数据
   * @step 1、获得 params
   * @step 2、开始 loading
   * @step 3、加载数据
   * @step 4、设置表格数据
   * @step 5、关闭 loading
   */


  var loadData = React.useCallback(function () {
    if (api) {
      var searchParams = getParams();

      if (defaultSearchFilter) {
        searchParams = defaultSearchFilter(searchParams);
      }

      console.log('列表查询数据', searchParams);
      setLoading(true);
      api(searchParams).then(function (data) {
        data = defaultDataFilter(data);
        var content = data.content;

        if (filterData) {
          content = filterData(data);
        }

        setTableData(content);
        setTotal(data.totalCount);

        if (onLoad) {
          onLoad(content, data);
        }
      }).finally(function () {
        setLoading(false);
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [api, loadParams]);
  /**
   * 改变表格查询数据
   * @param pageSize 每页多少条
   * @param current 当前第几页
   * @param search 查询数据
   */

  var updateLoadParams = React.useCallback(function (_ref) {
    var pageSize = _ref.pageSize,
        current = _ref.current,
        search = _ref.search;

    var newLoadParams = _objectSpread2({}, loadParams);

    if (pageSize !== undefined) {
      newLoadParams.pagination.size = pageSize;
    }

    if (current !== undefined) {
      newLoadParams.pagination.current = current;
    }

    if (search !== undefined) {
      newLoadParams.search = clearEmpty(search);
    }

    setLoadParams(newLoadParams);
  }, [loadParams]);
  /**
   * 监听分页改变事件，设置当前页 或 设置每页页数
   * @param current 当前第几页
   * @param pageSize 每页多少条
   */

  var onPageChange = function onPageChange(current, pageSize) {
    updateLoadParams({
      current: current,
      pageSize: pageSize
    });
  };

  var handleDownLoad = function handleDownLoad() {
    if (api) {
      var downloadParams = getParams();
      downloadParams._download = true;
      downloadParams._downloadTitle = meta ? meta.title : '';
      api(downloadParams);
    }
  };

  React.useImperativeHandle(ref, function () {
    return {
      /**
       * 刷新页面
       */
      refresh: function refresh() {
        loadData();
      },

      /**
       * 回到第一页，刷新页面
       */
      reset: function reset(search) {
        updateLoadParams({
          search: search,
          current: TABLE_START_PAGE
        });
      }
    };
  });
  React.useEffect(function () {
    loadData();
  }, [loadData]);
  React.useEffect(function () {
    setTableData(data || []);
  }, [data]);
  return React__default.createElement(antd.Card, {
    className: "ay-table ".concat(className)
  }, meta || btnBefore || children ? React__default.createElement("header", {
    className: "ay-table-header"
  }, React__default.createElement("div", {
    className: "ay-table-header-left"
  }, React__default.createElement(antd.Space, {
    size: "large"
  }, meta && React__default.createElement("h2", {
    className: "ay-table-title"
  }, meta.title))), React__default.createElement("div", {
    className: "ay-table-header-right"
  }, React__default.createElement(antd.Space, null, btnBefore, dataAnalysis ? dataAnalysis.map(function (option) {
    return React__default.createElement("span", {
      className: "table-analysis-item",
      key: option.label
    }, React__default.createElement("span", null, option.label, "\uFF1A"), React__default.createElement(antd.Tag, {
      color: "cyan"
    }, option.value.toLocaleString()));
  }) : null, total ? React__default.createElement("span", {
    className: "table-analysis-item"
  }, React__default.createElement("span", null, "\u6570\u91CF\uFF1A"), React__default.createElement(antd.Tag, {
    color: "cyan"
  }, total, " \u6761")) : null, exportVisible && api && React__default.createElement(AyButton, {
    icon: React__default.createElement(DownloadOutlined, null),
    onClick: handleDownLoad
  }, "\u5BFC\u51FA"), children))) : '', header, React__default.createElement(antd.Table, Object.assign({
    bordered: true,
    onExpand: onExpand,
    columns: ayTableFields,
    dataSource: tableData,
    loading: loading,
    rowSelection: rowSelection,
    pagination: pagination !== undefined ? pagination : {
      total: total,
      current: loadParams.pagination.current,
      onChange: onPageChange,
      showTotal: function showTotal(total) {
        return "\u5171 ".concat(total, " \u6761");
      }
    },
    rowKey: rowKey || 'id',
    scroll: {
      x: scrollX
    }
  }, tableExtend)));
});

var _require$2 = require('@ant-design/icons'),
    ExclayationCircleOutlined = _require$2.ExclayationCircleOutlined;

function AyDialog(props) {
  var title = props.title,
      children = props.children,
      setVisible = props.setVisible,
      onConfirm = props.onConfirm,
      loading = props.loading,
      footer = props.footer,
      width = props.width;

  var handleCancel = function handleCancel() {
    setVisible(false);
  };

  var handleConfirm = function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
  };

  return React__default.createElement(antd.Modal, Object.assign({
    width: width,
    title: title,
    onOk: handleConfirm,
    onCancel: handleCancel,
    confirmLoading: loading,
    footer: footer
  }, props), children);
}

/** 新增模式 */

var MODE_ADD = 'add';
/** 修改模式 */

var MODE_UPDATE = 'update';
/** 详情模式 */

var MODE_VIEW = 'view';
/** 自定义模式 */

var MODE_CUSTOM = 'custom';
/**
 * 过滤获得 form 的配置项
 * @param fields 配置项 (dialog-form)
 */

var getAyFormFields = function getAyFormFields(fields, mode, initParams) {
  return fields.filter(function (field) {
    if (field.dialog && Array.isArray(field.dialog.hiddenMode) && mode) {
      return !field.dialog.hiddenMode.includes(mode);
    }

    return field.dialog;
  }).map(function (field) {
    var dialog = field.dialog;

    var formField = _objectSpread2(_objectSpread2(_objectSpread2({
      key: ''
    }, field), dialog), {}, {
      _values: initParams
    });

    if (typeof formField.reSetting === 'function') {
      formField = formField.reSetting(formField, mode);
    }

    formField._field = field;
    return formField;
  });
};

var getTitle = function getTitle(mode, title) {
  var _map;

  if (title) {
    return title;
  }

  var map = (_map = {}, _defineProperty(_map, MODE_ADD, '新增'), _defineProperty(_map, MODE_UPDATE, '编辑'), _defineProperty(_map, MODE_VIEW, '详情'), _defineProperty(_map, MODE_CUSTOM, '自定义'), _map);
  return map[mode];
};

var dialogResolve;
var AyDialogForm = React.forwardRef(function AyDialogForm(props, ref) {
  var fields = props.fields,
      title = props.title,
      addApi = props.addApi,
      updateApi = props.updateApi,
      span = props.span,
      width = props.width,
      name = props.name,
      beforeSubmit = props.beforeSubmit;
  /** 弹窗是否可见 */

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];
  /** 当前所处于的模式 */


  var _useState3 = React.useState(MODE_ADD),
      _useState4 = _slicedToArray(_useState3, 2),
      mode = _useState4[0],
      setMode = _useState4[1];
  /** 是否正在保存中 */


  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];
  /** 默认参数 */


  var _useState7 = React.useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      initParams = _useState8[0],
      setInitParams = _useState8[1];
  /** form 需要的 fields */


  var _useState9 = React.useState(getAyFormFields(fields, mode, initParams)),
      _useState10 = _slicedToArray(_useState9, 2),
      formFields = _useState10[0],
      setFormFields = _useState10[1];
  /** form 控制 (需要主动调用里面的事件) */


  var formRef = React.useRef();
  /** 默认弹窗标题 */

  var _useState11 = React.useState(title),
      _useState12 = _slicedToArray(_useState11, 2),
      dialogTitle = _useState12[0],
      setDialogTitle = _useState12[1];
  /** 打开弹窗的配置 */


  var _useState13 = React.useState({}),
      _useState14 = _slicedToArray(_useState13, 2),
      config = _useState14[0],
      setConfig = _useState14[1];
  /**
   * 初始化弹窗
   * @step 1、打开弹窗
   * @step 2、如果有值，清空表单值
   * @step 3、如果有默认参数、设置默认参数
   * @param params 默认值
   */


  var initDialog = function initDialog(params, config) {
    setConfig(config || {});

    if (config && config.fields) {
      formFields = getAyFormFields(config.fields, mode, initParams);
      setFormFields(formFields);
    } else {
      formFields = getAyFormFields(props.fields, mode, initParams);
      setFormFields(formFields);
    } // 打开弹窗


    setVisible(true); // 第二次之后清空数据

    if (formRef.current) {
      formRef.current.resetFields();
    } // 设置默认值


    if (params) {
      setInitParams(params);
      setTimeout(function () {
        formRef.current.setFieldsValue(params);
      });
    } else {
      setInitParams({});
    } // 设置标题


    if (config && config.title) {
      setDialogTitle(config.title);
    }
  }; // 控制暴露出去的方法


  React.useImperativeHandle(ref, function () {
    return {
      /**
       * 新增表单
       * @param params 默认值
       */
      add: function add(params, config) {
        return new Promise(function (resolve) {
          dialogResolve = resolve;
          setMode(MODE_ADD);
          initDialog(params, config);
        });
      },

      /**
       * 修改表单
       * @param params 默认值
       */
      update: function update(params, config) {
        return new Promise(function (resolve) {
          dialogResolve = resolve;
          setMode(MODE_UPDATE);
          initDialog(params, config);
        });
      },

      /**
       * 查看表单
       * @param params 默认值
       * @param config
       */
      view: function view(params, config) {
        setMode(MODE_VIEW);
        initDialog(params, config);
      },

      /**
       * 自定义表单，打开表单
       * @param params 默认值
       */
      open: function open(params, config) {
        setMode(MODE_CUSTOM);
        initDialog(params, config);
      }
    };
  });
  /**
   * 弹窗确定触发表单提交
   */

  var onConfirm = React.useCallback(function () {
    formRef.current.submit();
  }, []);
  /**
   * 表单提交
   * @step 1、根据不同模式获取不同的 API 接口
   * @step 2、开始 loading
   * @step 3、成功后 reolsve、关闭弹窗
   * @step 4、关闭 loading
   * @param values 提交参数
   */

  var handleSubmit = React.useCallback(function (values) {
    var _apiMap;

    var apiMap = (_apiMap = {}, _defineProperty(_apiMap, MODE_ADD, addApi), _defineProperty(_apiMap, MODE_UPDATE, updateApi), _defineProperty(_apiMap, MODE_CUSTOM, config.api), _apiMap);
    var api = apiMap[mode];

    if (api) {
      var params = _objectSpread2(_objectSpread2({}, initParams), values);

      if (typeof beforeSubmit === 'function') {
        var result = beforeSubmit(params, mode);

        if (result !== false) {
          params = result;
        } else {
          return;
        }
      }

      setLoading(true);
      api(params).then(function (data) {
        if (dialogResolve) {
          dialogResolve(data);
        }

        setVisible(false);
      }, function () {}).finally(function () {
        setLoading(false);
      });
    }
  }, [addApi, beforeSubmit, initParams, mode, updateApi]);
  return React__default.createElement(AyDialog, Object.assign({
    width: width,
    title: getTitle(mode, dialogTitle),
    visible: visible,
    setVisible: setVisible,
    onConfirm: onConfirm,
    loading: loading,
    footer: mode === MODE_VIEW || config.readonly === true ? React__default.createElement(AyButton, {
      onClick: function onClick() {
        return setVisible(false);
      }
    }, "\u5173\u95ED") : undefined
  }, props), React__default.createElement(AyForm, {
    name: name,
    readonly: mode === MODE_VIEW,
    ref: formRef,
    fields: formFields,
    span: span || 22,
    onConfirm: handleSubmit
  }));
});

function useSelection(_props) {
  var rowKey = _props.rowKey,
      selectionType = _props.selectionType,
      onSelectionChange = _props.onSelectionChange,
      selectShowKey = _props.selectShowKey;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectionKeys = _useState2[0],
      setSelectionKeys = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selection = _useState4[0],
      setSelection = _useState4[1];

  var rowSelection;

  if (selectionType) {
    rowSelection = {
      type: selectionType,
      selectedRowKeys: selectionKeys,
      onSelect: function onSelect(record, selected) {
        selected ? addSelection(record) : removeSelection(null, record);
      },
      onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {
        selected ? addSelectionArray(selectedRows) : removeSelectionArray(changeRows);
      }
    };
  }
  /**
   * 清空所有选项
   */


  var clearSelection = function clearSelection() {
    setSelectionKeys([]);
    setSelection([]);
  };
  /**
   * 添加选项（单个）
   * @param row 某一条选项
   */


  var addSelection = function addSelection(row) {
    var newKeys = _toConsumableArray(selectionKeys);

    var newSelection = _toConsumableArray(selection);

    newKeys.push(row[rowKey]);
    newSelection.push(row);
    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };
  /**
   * 添加选项（数组）
   * @param rows 项目列表
   */


  var addSelectionArray = function addSelectionArray(rows) {
    var newKeys = _toConsumableArray(selectionKeys);

    var newSelection = _toConsumableArray(selection);

    rows.forEach(function (row) {
      if (!row) {
        return;
      }

      var key = row[rowKey];

      if (!newKeys.includes(key)) {
        newKeys.push(key);
        newSelection.push(row);
      }
    });
    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };
  /**
   * 移除某个选项
   * @param i 移除选项的 index
   */


  var removeSelection = function removeSelection(i, record) {
    var newKeys = _toConsumableArray(selectionKeys);

    var newSelection = _toConsumableArray(selection);

    if (i === null && record) {
      i = newKeys.findIndex(function (key) {
        return key === record[rowKey];
      });
    }

    if (typeof i === 'number') {
      newKeys.splice(i, 1);
      newSelection.splice(i, 1);
    }

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };
  /**
   * 移除一组选项
   * @param rows 移除选项
   */


  var removeSelectionArray = function removeSelectionArray(rows) {
    var newKeys = _toConsumableArray(selectionKeys);

    var newSelection = _toConsumableArray(selection);

    rows.forEach(function (row) {
      var index = newKeys.findIndex(function (item) {
        return item === row[rowKey];
      });

      if (index >= 0) {
        newKeys.splice(index, 1);
        newSelection.splice(index, 1);
      }
    });
    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };
  /** Popover 弹窗的提示 */


  var popContent = React__default.createElement("div", {
    className: "am-search-poper"
  }, selection.map(function (row, i) {
    return React__default.createElement(antd.Tag, {
      key: row[rowKey || 'id'],
      closable: true,
      className: "mb",
      onClose: function onClose() {
        return removeSelection(i);
      }
    }, row[selectShowKey || 'name']);
  }));
  /** 头部已选中的提示 */

  var header = selectionKeys.length ? React__default.createElement(Alert, {
    className: "am-search-table-alert",
    message: React__default.createElement("div", null, React__default.createElement("span", null, "\u5DF2\u9009\u62E9\uFF1A", React__default.createElement(antd.Popover, {
      title: "\u5DF2\u7ECF\u9009\u4E2D\u7684\u9009\u9879",
      content: popContent
    }, React__default.createElement("a", null, selection.length)), ' ', "\u6761"), React__default.createElement(AyButton, {
      className: "ml",
      type: "link",
      size: "small",
      onClick: clearSelection
    }, "\u6E05\u7A7A")),
    showIcon: true
  }) : '';
  React.useEffect(function () {
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
  }, [onSelectionChange, selection]);
  return {
    header: header,
    rowSelection: rowSelection,
    selection: selection,
    clearSelection: clearSelection
  };
}

var css$4 = ".fr {\n  float: right;\n}\n.ml {\n  margin-left: 10px;\n}\n.mb {\n  margin-bottom: 10px;\n}\n.gap {\n  margin-left: 4px;\n}\n.ay-search-table {\n  padding: 0 20px 20px;\n}\n.ay-search-table .ant-pagination {\n  margin-right: 10px !important;\n}\n.ay-search-table .ant-table {\n  margin: 0 -1px;\n}\n.ay-search-table .ant-btn-link {\n  padding: 0 !important;\n}\n.ay-search-table > .ant-card + .ant-card {\n  margin-top: 10px;\n}\n.ay-search-table .ant-alert {\n  margin: 10px;\n}\n.ay-search-table-alert {\n  margin: 0 20px 20px !important;\n}\n.ay-search-table-alert .ant-alert-icon {\n  transform: translateY(1px);\n}\n.ay-search-poper {\n  width: 300px;\n  max-height: 180px;\n  overflow: auto;\n}\n";
styleInject(css$4);

var AySearchTableContext = React.createContext({});
/**
 * 转化并过滤成 ay-search 能用的 fields
 * @param fields 查询表格的 fields
 */

var getSearchFields$1 = function getSearchFields(fields) {
  return fields.filter(function (field) {
    return isObj(field.search);
  }).map(function (field) {
    var search = field.search;

    if (!search) {
      return {
        title: '配置有误',
        key: 'xxx',
        type: 'input'
      };
    }

    var searchField = _objectSpread2({
      title: field.title,
      key: search.key || field.key || '',
      type: field.type || 'input',
      options: field.options || []
    }, search);

    return searchField;
  });
};
/**
 * 过滤获得配置项
 *
 * 1、生成基础 table 需要的 fields
 * 2、添加 options (如果有的话)
 *
 * @param fields 配置项
 */


var getTableFields = function getTableFields(fields) {
  return fields.map(function (field) {
    var table = field.table;

    var tableField = _objectSpread2({
      title: field.title,
      key: field.key
    }, table);

    if (field.options) {
      tableField.options = field.options;
    }

    return tableField;
  });
};

var AySearchTable = React.forwardRef(function AySearchTable(props, ref) {
  var fields = props.fields,
      api = props.api,
      deleteApi = props.deleteApi,
      children = props.children,
      data = props.data,
      meta = props.meta,
      ctrl = props.ctrl,
      selectionType = props.selectionType,
      onSelectionChange = props.onSelectionChange,
      rowKey = props.rowKey,
      dialogFormExtend = props.dialogFormExtend,
      scrollX = props.scrollX,
      filterData = props.filterData,
      beforeSearch = props.beforeSearch,
      selectShowKey = props.selectShowKey,
      onExpand = props.onExpand,
      center = props.center,
      onLoad = props.onLoad,
      searchVisible = props.searchVisible,
      tableExtend = props.tableExtend,
      pagination = props.pagination,
      btnBefore = props.btnBefore,
      dataAnalysis = props.dataAnalysis,
      exportVisible = props.exportVisible;
  /** form 控制 */

  var formRef = React.useRef();
  /** table 控制 */

  var tableRef = React.useRef();
  /** search 控制 */

  var searchRef = React.useRef();
  /** 查询项 */

  var searchFields = getSearchFields$1(fields);
  /** 列表项 */

  var tableFields = getTableFields(fields);
  /** 使用勾选 */

  var _useSelection = useSelection({
    rowKey: rowKey || 'id',
    selectionType: selectionType,
    onSelectionChange: onSelectionChange,
    selectShowKey: selectShowKey
  }),
      header = _useSelection.header,
      rowSelection = _useSelection.rowSelection,
      selection = _useSelection.selection,
      _clearSelection = _useSelection.clearSelection;
  /** 使用指令操作 */
  // const [newChildren, newCtrl] = useDirective({
  //   children,
  //   tableRef,
  //   formRef,
  //   selection,
  //   ctrl,
  //   deleteApi,
  //   clearSelection,
  //   rowKey,
  //   onFinish
  // })

  /** 查询完成，刷新列表 */


  var onConfirm = function onConfirm(values) {
    tableRef.current.reset(values);
  };
  /** 暴露方法 */


  React.useImperativeHandle(ref, function () {
    return {
      /**
       * 刷新页面
       */
      refresh: function refresh() {
        tableRef.current.refresh();
      },

      /**
       * 回到第一页，刷新页面
       */
      reset: function reset(search) {
        tableRef.current.reset({
          search: search
        });
      },

      /**
       * 清空选项
       */
      clearSelection: function clearSelection() {
        _clearSelection();
      },

      /**
       * 获取 search 对象
       */
      getSearchRef: function getSearchRef() {
        return searchRef.current;
      },

      /**
       * 获取已经选中的对象
       */
      getSelection: function getSelection() {
        return selection;
      }
    };
  });
  var tableProps = {
    ref: tableRef,
    rowSelection: rowSelection,
    api: api,
    data: data,
    meta: meta,
    ctrl: ctrl,
    rowKey: rowKey,
    scrollX: scrollX,
    filterData: filterData,
    beforeSearch: beforeSearch,
    onExpand: onExpand,
    onLoad: onLoad,
    tableExtend: tableExtend,
    pagination: pagination,
    defaultSearchValue: getDefaultValue(searchFields),
    btnBefore: btnBefore,
    dataAnalysis: dataAnalysis,
    exportVisible: exportVisible
  };
  return React__default.createElement("div", {
    className: "ay-search-table"
  }, React__default.createElement(AySearchTableContext.Provider, {
    value: {
      formRef: formRef,
      tableRef: tableRef,
      selection: selection,
      deleteApi: deleteApi,
      rowKey: rowKey,
      clearSelection: _clearSelection
    }
  }, searchVisible !== false ? React__default.createElement(AySearch, {
    ref: searchRef,
    fields: searchFields,
    onConfirm: onConfirm
  }) : null, center, React__default.createElement(AyTable, Object.assign({}, tableProps, {
    fields: tableFields,
    header: header
  }), dialogFormExtend ? React__default.createElement(AyDialogForm, Object.assign({
    ref: formRef
  }, dialogFormExtend)) : null, children)));
});

var success = function success(msg, duration) {
  return antd.message.success(msg, duration);
};
var error = function error(msg) {
  return antd.message.error(msg);
};
var info = function info(msg) {
  return antd.message.info(msg);
};
var AyMessage = {
  success: success,
  error: error,
  info: info
};

var _require$3 = require('@ant-design/icons'),
    PlusOutlined = _require$3.PlusOutlined,
    DeleteOutlined = _require$3.DeleteOutlined,
    ExclamationCircleOutlined = _require$3.ExclamationCircleOutlined;

var actionMap = {};
/**
 * 注册一个 action
 */

function registerAction(actionName, action) {
  actionMap[actionName] = action;
}
/**
 * 注册【新增】事件
 */

registerAction('add', function (props, record, searchTable) {
  return _objectSpread2({
    type: 'primary',
    icon: React__default.createElement(PlusOutlined, null),
    onClick: function onClick() {
      var _searchTable$formRef, _searchTable$formRef$;

      (_searchTable$formRef = searchTable.formRef) === null || _searchTable$formRef === void 0 ? void 0 : (_searchTable$formRef$ = _searchTable$formRef.current) === null || _searchTable$formRef$ === void 0 ? void 0 : _searchTable$formRef$.add().then(function () {
        success(props.children + '成功');
        searchTable.tableRef.current.refresh();
      });
    }
  }, props);
});
/**
 * 注册【修改】事件
 */

registerAction('update', function (props, record, searchTable) {
  return _objectSpread2({
    onClick: function onClick() {
      var _searchTable$formRef2, _searchTable$formRef3;

      (_searchTable$formRef2 = searchTable.formRef) === null || _searchTable$formRef2 === void 0 ? void 0 : (_searchTable$formRef3 = _searchTable$formRef2.current) === null || _searchTable$formRef3 === void 0 ? void 0 : _searchTable$formRef3.update(record).then(function () {
        success(props.children + '成功');
        searchTable.tableRef.current.refresh();
      });
    }
  }, props);
});
/**
 * 注册【详情】事件
 */

registerAction('view', function (props, record, searchTable) {
  return _objectSpread2({
    onClick: function onClick() {
      var _searchTable$formRef4, _searchTable$formRef5;

      (_searchTable$formRef4 = searchTable.formRef) === null || _searchTable$formRef4 === void 0 ? void 0 : (_searchTable$formRef5 = _searchTable$formRef4.current) === null || _searchTable$formRef5 === void 0 ? void 0 : _searchTable$formRef5.view(record);
    }
  }, props);
});
/**
 * 注册【删除】事件
 */

registerAction('delete', function (props, record, searchTable) {
  return _objectSpread2({
    confirm: true,
    confirmMsg: '你确定要删除此行吗？',
    onConfirm: function onConfirm() {
      if ((searchTable === null || searchTable === void 0 ? void 0 : searchTable.deleteApi) && record) {
        var params = _defineProperty({}, (searchTable === null || searchTable === void 0 ? void 0 : searchTable.rowKey) || 'id', record[(searchTable === null || searchTable === void 0 ? void 0 : searchTable.rowKey) || 'id']);

        searchTable === null || searchTable === void 0 ? void 0 : searchTable.deleteApi(params).then(function (data) {
          success('删除成功');
          searchTable === null || searchTable === void 0 ? void 0 : searchTable.tableRef.current.refresh();
        });
      }
    }
  }, props);
});
/**
 * 注册【批量删除】事件
 */

registerAction('batch-delete', function (props, record, searchTable) {
  return _objectSpread2({
    icon: React__default.createElement(DeleteOutlined, null),
    onClick: function onClick() {
      var selection = (searchTable === null || searchTable === void 0 ? void 0 : searchTable.selection) || [];

      if (!selection.length) {
        info('请先选择一条数据');
        return;
      }

      if (searchTable === null || searchTable === void 0 ? void 0 : searchTable.deleteApi) {
        antd.Modal.confirm({
          title: '确定',
          content: "\u60A8\u52FE\u9009\u4E86 ".concat(selection.length, " \u4E2A\uFF0C\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F"),
          icon: React__default.createElement(ExclamationCircleOutlined, null),
          onOk: function onOk() {
            var params = _defineProperty({}, (searchTable === null || searchTable === void 0 ? void 0 : searchTable.rowKey) || 'id', selection.map(function (row) {
              return row[(searchTable === null || searchTable === void 0 ? void 0 : searchTable.rowKey) || 'id'];
            }));

            searchTable === null || searchTable === void 0 ? void 0 : searchTable.deleteApi(params).then(function (data) {
              success('批量删除成功');
              searchTable === null || searchTable === void 0 ? void 0 : searchTable.clearSelection();
              searchTable === null || searchTable === void 0 ? void 0 : searchTable.tableRef.current.refresh();
            });
          }
        });
      }
    }
  }, props);
});
function AyAction(props) {
  var searchTable = React.useContext(AySearchTableContext);
  var action = props.action,
      record = props.record;
  var targetAction = actionMap[action || ''];

  if (targetAction) {
    var actionProps = targetAction(props, record, searchTable);
    return React__default.createElement(AyButton, Object.assign({}, actionProps));
  }

  return React__default.createElement(AyButton, Object.assign({}, props));
}

/**
 * 返回一个控制项
 * @param node 节点
 * @param key key
 */

var getCtrlItem = function getCtrlItem(node, key) {
  var props = _objectSpread2({}, node.props);

  return React__default.createElement(AyAction, Object.assign({
    key: key,
    type: "link"
  }, props));
};
/**
 * 将子节点转化成 AyAction 按钮
 * @param children 子节点
 */


var getCtrlList = function getCtrlList(children) {
  var ctrlList = [];

  if (!children) {
    return [];
  }

  if (Array.isArray(children) && children.length === 0) {
    // 没有节点存在
    return [];
  } else if (!Array.isArray(children)) {
    // 如果节点只有一个元素
    return [getCtrlItem(children, children)];
  }

  children.forEach(function (node, i) {
    if (!node) {
      return node;
    }

    var CtrlItem; // 正常节点

    CtrlItem = getCtrlItem(node, i); // 添加这个节点

    ctrlList.push(CtrlItem); // 添加一个分割线

    ctrlList.push(React__default.createElement(antd.Divider, {
      key: 'divider' + i,
      type: "vertical"
    }));
  }); // 删除最后一个分割线

  ctrlList.splice(ctrlList.length - 1, 1);
  return ctrlList;
};

function AmCtrl(props) {
  var children = props.children;
  var ctrlList = getCtrlList(children);
  return React__default.createElement("div", {
    className: "ay-ctrl"
  }, ctrlList);
}

var index = {
  AyAction: AyAction,
  registerAction: registerAction,
  AyButton: AyButton,
  AyCtrl: AmCtrl,
  AyDialog: AyDialog,
  AyDialogForm: AyDialogForm,
  AyEditor: AyEditor,
  AyForm: AyForm,
  AyMessage: AyMessage,
  AySearch: AySearch,
  AySearchTable: AySearchTable,
  AySelect: AySelect,
  AyTable: AyTable,
  setDefaultDataFilter: setDefaultDataFilter,
  setDefaultSearchFilter: setDefaultSearchFilter
};

module.exports = index;
