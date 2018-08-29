"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchNaver = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var naverUrl, response, jsonResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        naverUrl = "https://www.naver.com";
                        _context.prev = 1;
                        _context.next = 4;
                        return fetch(naverUrl);

                    case 4:
                        response = _context.sent;

                        if (!response.ok) {
                            _context.next = 10;
                            break;
                        }

                        console.log(response);
                        jsonResponse = response.json();

                        console.log(jsonResponse);
                        return _context.abrupt("return", jsonResponse);

                    case 10:
                        _context.next = 15;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](1);

                        console.log(_context.t0);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 12]]);
    }));

    return function fetchNaver() {
        return _ref.apply(this, arguments);
    };
}();

$("document").ready(function () {
    $('#button').on('click', function () {
        alert('naver fetching...!');
        fetchNaver();
    });
});