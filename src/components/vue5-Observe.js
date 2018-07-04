/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      var augment = hasProto // '__proto__' in {}
        ? protoAugment 
        // Augment an target Object or Array by intercepting the prototype chain using __proto__
        // value.__proto__ = arrayMethods
        : copyAugment;
      augment(value, arrayMethods, arrayKeys); 
      // 本来value的__proto__应该指向Array.prototype;经过上面操作后,指向了arrayMethods，即Object.create(Array.prototype)
      // Vue 不能检测数组的变化，于是作者在数组增强方法中对 Array 的 ‘push’, ‘pop’, ‘shift’, ‘unshift’, ‘splice’, ‘sort’, ‘reverse’ 方法做了增强实现
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };
  
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