"use strict";

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

var pull = require('pull-stream');

module.exports = function (source) {
  return _wrapAsyncGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _read, sink, _ref2, end, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sink = function sink(read) {
              _read = function _read() {
                return new Promise(function (resolve, reject) {
                  read(null, function (end, data) {
                    if (end === true) return resolve({
                      end: end
                    });
                    if (end) return reject(end);
                    resolve({
                      data: data
                    });
                  });
                });
              };
            };

            pull(source, sink);

          case 2:
            if (!true) {
              _context.next = 14;
              break;
            }

            _context.next = 5;
            return _awaitAsyncGenerator(_read());

          case 5:
            _ref2 = _context.sent;
            end = _ref2.end;
            data = _ref2.data;

            if (!end) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("break", 14);

          case 10:
            _context.next = 12;
            return data;

          case 12:
            _context.next = 2;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))();
};
