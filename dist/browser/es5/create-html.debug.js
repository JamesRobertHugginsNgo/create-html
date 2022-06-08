"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var CreateHtml = function () {
  function createFragment(children, callback) {
    if (!(callback == null || typeof callback === 'function')) {
      throw 'Argument "callback" is invalid.';
    }

    if (Array.isArray(children)) {
      var length = children.length;

      if (length === 1) {
        return createFragment(children[0], callback);
      }

      var fragment = document.createDocumentFragment();

      for (var index = 0; index < length; index++) {
        var child = createFragment(children[index]);

        if (child != null) {
          fragment.append(child);
        }
      }

      return createFragment(fragment, callback);
    }

    if (callback != null) {
      callback(children);
    }

    return children;
  }

  function setAttributes(element, attributes, callback) {
    if (!(element instanceof Element)) {
      throw 'Argument "element" is invalid.';
    }

    if (!(attributes == null || _typeof(attributes) === 'object')) {
      throw 'Argument "attributes" is invalid.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Argument "callback" is invalid.';
    }

    if (attributes != null) {
      for (var name in attributes) {
        var value = attributes[name];

        if (value != null) {
          element.setAttribute(name, value);
        }
      }
    }

    if (callback != null) {
      callback(element);
    }

    return element;
  }

  function createElementNs(namespace, name, attributes, children, callback) {
    if (!(typeof namespace === 'string')) {
      throw 'Argument "namespace" is invalid.';
    }

    if (!(typeof name === 'string')) {
      throw 'Argument "name" is invalid.';
    }

    if (!(attributes == null || _typeof(attributes) === 'object')) {
      throw 'Argument "attributes" is invalid.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Argument "callback" is invalid.';
    }

    var element = document.createElementNS(namespace, name);
    setAttributes(element, attributes);
    var fragment = createFragment(children);

    if (fragment != null) {
      element.append(fragment);
    }

    if (callback != null) {
      callback(element);
    }

    return element;
  }

  function createElement(name, attributes, children, callback) {
    if (!(typeof name === 'string')) {
      throw 'Argument "name" is invalid.';
    }

    if (!(attributes == null || _typeof(attributes) === 'object')) {
      throw 'Argument "attributes" is invalid.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Argument "callback" is invalid.';
    }

    return createElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, callback);
  }

  function createStyleValue(properties, callback) {
    if (!(properties == null || _typeof(properties) === 'object')) {
      throw 'Argument "properties" is invalid.';
    }

    if (!(callback == null || typeof callback === 'function')) {
      throw 'Argument "callback" is invalid.';
    }

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

    if (callback != null) {
      callback(styleValue);
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