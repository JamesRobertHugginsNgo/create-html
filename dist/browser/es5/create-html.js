"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var CreateHtml = function () {
  function createFragment(children) {
    if (Array.isArray(children)) {
      var fragment = document.createDocumentFragment();

      for (var index = 0, length = children.length; index < length; index++) {
        var child = createFragment(children[index]);

        if (child != null) {
          fragment.append(child);
        }
      }

      return fragment;
    } else {
      return children;
    }
  }

  function setAttributes(element, attributes) {
    if (attributes != null) {
      for (var name in attributes) {
        var value = attributes[name];

        if (value != null) {
          element.setAttribute(name, value);
        }
      }
    }

    return element;
  }

  function createElementNs(namespace, name, attributes, children) {
    var element = document.createElementNS(namespace, name);
    setAttributes(element, attributes);
    var fragment = createFragment(children);

    if (fragment != null) {
      element.append(fragment);
    }

    return element;
  }

  function createElement(name, attributes, children) {
    return createElementNs('http://www.w3.org/1999/xhtml', name, attributes, children);
  }

  function createStyleValue(properties) {
    if (properties == null) {
      return null;
    }

    var styleValue = [];

    for (var name in properties) {
      var value = properties[name];

      if (value != null) {
        if (_typeof(value) === 'object') {
          styleValue.push("".concat(name, " { ").concat(createStyleValue(value), " }"));
        } else {
          styleValue.push("".concat(name, ": ").concat(value, ";"));
        }
      }
    }

    return styleValue.join(' ');
  }

  return {
    createFragment: createFragment,
    setAttributes: setAttributes,
    createElementNs: createElementNs,
    createElement: createElement,
    createStyleValue: createStyleValue
  };
}();
/* exported CreateHtml */