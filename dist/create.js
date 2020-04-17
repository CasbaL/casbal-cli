"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('./util'),
    notExitFlod = _require.notExitFlod,
    prompt = _require.prompt,
    downloadTemplate = _require.downloadTemplate,
    updateJsonFile = _require.updateJsonFile;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projectName) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (projectName === undefined) {
              console.log(_logSymbols["default"].error, _chalk["default"].red('创建项目的时候，请输入项目名'));
            } else {
              notExitFlod(projectName).then(function () {
                // 询问用户
                prompt().then(function (answer) {
                  if (answer.frame === 'react') {
                    console.log(_logSymbols["default"].warning, _chalk["default"].yellow('react模板还没建设完....'));
                    process.exit(1);
                  } //  根据用户输入匹配下载模板
                  // 下载时添加一个进度条


                  var loading = (0, _ora["default"])('模板下载中...');
                  loading.start('模板下载着呢 ...');
                  var Api = '';

                  switch (answer.frame) {
                    case 'vue':
                      Api = 'direct:https://github.com/For-Article/vue-temlate.git';
                      break;

                    case 'react':
                      Api = 'direct:https://github.com/LuoYangYY/react-template.git';
                      break;

                    default:
                      break;
                  }

                  console.log(Api);
                  downloadTemplate(projectName, Api).then(function () {
                    loading.succeed('模板下载完成'); // 下载完成后更新配置文件

                    var fileName = "".concat(projectName, "/package.json");
                    answer.name = projectName;
                    updateJsonFile(fileName, answer).then(function () {
                      return _chalk["default"].green('配置文件更新完成！');
                    });
                  }, function () {
                    return loading.fail('模板下载失败！');
                  });
                });
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

module.exports = create;