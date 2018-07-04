/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Parse simple path.
 */
// 解析a.b.c, 并返回找到的值
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

if (isA) {
  i = val.length;
  while (i--) { _traverse(val[i], seen); }
} else {
  keys = Object.keys(val);
  i = keys.length;
  while (i--) { _traverse(val[keys[i]], seen); }
}

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// try catch finally 语句

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/* istanbul ignore next */  // 如isNative(Function)
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

// Proxy的应用：
var hasProxy =
typeof Proxy !== 'undefined' && isNative(Proxy);

if (hasProxy) {
var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
config.keyCodes = new Proxy(config.keyCodes, {
  set: function set (target, key, value) {
    if (isBuiltInModifier(key)) {
      warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
      return false
    } else {
      target[key] = value;
      return true
    }
  }
});
}

