疑问点：
initProxy(vm);  // 这里为什么要用proxy?
initInjections(vm);
////////////////////////////////////////////
function Vue (options) {
  this._init(options);
}
var uid$3 = 0;
Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    vm.$options = mergeOptions( // 猜测是， 对实例的options(components、props、method等等一系列...)参数进行标准，然后将实列的参数与Vue.options进行merge
      resolveConstructorOptions(vm.constructor), // Vue构造函数Vue.super为true时有实际作用，否则返回vm.constructor.options，即Vue.options
      options || {},
      vm
    );
    /* istanbul ignore else */
    {
      initProxy(vm);
      // 根据$options里是否有render，给vm包不同的Proxy hander（has or get）
      // 并且将上诉这个proxy挂载到vm上（如果是has Proxy hander, 当你用‘test’ in vm._renderProxy去测试vm上是否有此test属性时就会触发Proxy中的has，产生没有属性时的提示效果）
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm); // 初始化一些生命周期相关的属性如vm._isMounted = false
    initEvents(vm); //vm._events = Object.create(null); vm._hasHookEvent = false;
    initRender(vm); // vm 添加_vnode, _staticTrees, $slots, $scopedSlots, _c, $createElement, 给$attrs, $listeners属性defineReactive
    callHook(vm, 'beforeCreate');
    initInjections(vm); //  ? resolve injections before data/props ?
    initState(vm);      // 详细展开如下文
    initProvide(vm); // ? resolve provide after data/props ?
    callHook(vm, 'created');

    /* istanbul ignore if */
    
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); } // initProps, 检查props合法性，proxy(vm, "_props", key), defineReative props ?
    if (opts.methods) { initMethods(vm, opts.methods); } // method创建的一些合法校验， 以及bind(methods[key], vm)
    if (opts.data) {
      initData(vm);  // 检测data属性是不是跟method、props重名， proxy(vm, "_data", key), observe(data, true);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

