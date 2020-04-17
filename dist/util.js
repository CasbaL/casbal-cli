"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var symbol = require('log-symbols');

var chalk = require('chalk');

var inquirer = require('inquirer');

var downloadGit = require('download-git-repo'); // 文件名是否存在


function notExitFlod(name) {
  return new Promise(function (resolve) {
    if (fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
    } else {
      resolve();
    }
  });
} // cli询问用户配置


var promptList = [{
  type: 'list',
  name: 'frame',
  message: '请选择项目模板: ',
  choices: ['vue', 'react']
}, {
  type: 'input',
  name: 'description',
  message: '请输入项目描述: '
}, {
  type: 'input',
  name: 'author',
  message: '请输入作者名: '
}]; // 用户输入交互

var prompt = function prompt() {
  return new Promise(function (resolve) {
    inquirer.prompt(promptList).then(function (answer) {
      resolve(answer);
    });
  });
}; // 模板下载方法


var downloadTemplate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projectName, api) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              downloadGit(api, projectName, {
                clone: true
              }, function (err) {
                if (err) reject(err);else resolve();
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadTemplate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // 更新json文件


var updateJsonFile = function updateJsonFile(filename, obj) {
  return new Promise(function (resolve) {
    if (fs.existsSync(filename)) {
      var data = fs.readFileSync(filename).toString();
      var json = JSON.parse(data);

      for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        json[key] = value;
      }

      fs.writeFileSync(filename, JSON.stringify(json, null, '\t'), 'utf-8');
      resolve();
    }
  });
};

module.exports = {
  notExitFlod: notExitFlod,
  prompt: prompt,
  downloadTemplate: downloadTemplate,
  updateJsonFile: updateJsonFile
};