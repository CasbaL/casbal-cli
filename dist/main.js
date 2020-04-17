"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.flags");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var create = require('./create');

var dev = require('./dev');

var build = require('./build'); // 命令列表


var action_map = {
  // 创建项目
  create: {
    description: "创建一个项目",
    usages: ['casbal-cli create ProjectName', 'cc create ProjectName'],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: ['casbal-cli init', 'cc init'],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: ['casbal-cli dev', 'cc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },
  // 打包项目
  build: {
    description: '生产环境打包项目',
    usages: ['casbal-cli build', 'cc build'],
    options: [{
      flags: '-u --username <port>',
      description: 'github 用户名',
      defaultValue: ''
    }, {
      flags: '-t --token <port>',
      description: 'github 创建的token',
      defaultValue: ''
    }],
    alias: 'b'
  }
}; // 添加create/init/dev/build 命令

Object.keys(action_map).forEach(function (action) {
  if (action_map[action].options) {
    Object.keys(action_map[action].options).forEach(function (opt) {
      var obj = action_map[action].options[opt];

      _commander["default"].option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  _commander["default"].command(action).description(action_map[action].description).alias(action_map[action].alias).action(function () {
    switch (action) {
      case 'create':
        console.log(process.argv);
        create.apply(void 0, _toConsumableArray(process.argv.slice(3)));
        break;

      case 'init':
        console.log('init');
        break;

      case 'dev':
        console.log('dev', _commander["default"].port);
        dev(_commander["default"].port);
        break;

      case 'build':
        console.log('building...');
        build();
        break;

      default:
        break;
    }
  });
}); // 猜测: 必须 parse 进程参数才能出信息 bingo!!!

_commander["default"].version(require('../package.json').version, '-v --version').parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander["default"].outputHelp();
}