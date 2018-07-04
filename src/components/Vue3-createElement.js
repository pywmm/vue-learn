/**
 * 《creatElement函数》
 * createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。
 * 它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。
 * 我们把这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。
 * “虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。[官方]
 */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

 // wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
	context,
	tag,
	data,
	children,
	normalizationType,
	alwaysNormalize
) {
	if (Array.isArray(data) || isPrimitive(data)) {
		normalizationType = children;
		children = data;
		data = undefined;
	}
	if (isTrue(alwaysNormalize)) {
		normalizationType = ALWAYS_NORMALIZE;
	}
	return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
	context,
	tag,
	data,
	children,
	normalizationType
) {
	if (isDef(data) && isDef((data).__ob__)) {
		"development" !== 'production' && warn(
			"Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
			'Always create fresh vnode data objects in each render!',
			context
		);
		return createEmptyVNode()
	}
	// object syntax in v-bind
	if (isDef(data) && isDef(data.is)) {
		tag = data.is;
	}
	if (!tag) {
		// in case of component :is set to falsy value
		return createEmptyVNode()
	}
	// warn against non-primitive key
	if ("development" !== 'production' &&
		isDef(data) && isDef(data.key) && !isPrimitive(data.key)
	) {
		{
			warn(
				'Avoid using non-primitive value as key, ' +
				'use string/number value instead.',
				context
			);
		}
	}
	// support single function children as default scoped slot
	if (Array.isArray(children) &&
		typeof children[0] === 'function'
	) {
		data = data || {};
		data.scopedSlots = { default: children[0] };
		children.length = 0;
	}
	if (normalizationType === ALWAYS_NORMALIZE) {
		children = normalizeChildren(children);
	} else if (normalizationType === SIMPLE_NORMALIZE) {
		children = simpleNormalizeChildren(children);
	}
	var vnode, ns;
	if (typeof tag === 'string') {
		var Ctor;
		ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
		if (config.isReservedTag(tag)) {
			// platform built-in elements
			vnode = new VNode(
				config.parsePlatformTagName(tag), data, children,
				undefined, undefined, context
			);
		} else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
			// component
			vnode = createComponent(Ctor, data, context, children, tag);
		} else {
			// unknown or unlisted namespaced elements
			// check at runtime because it may get assigned a namespace when its
			// parent normalizes children
			vnode = new VNode(
				tag, data, children,
				undefined, undefined, context
			);
		}
	} else {
		// direct component options / constructor
		vnode = createComponent(tag, data, context, children);
	}
	if (Array.isArray(vnode)) {
		return vnode
	} else if (isDef(vnode)) {
		if (isDef(ns)) { applyNS(vnode, ns); }
		if (isDef(data)) { registerDeepBindings(data); }
		return vnode
	} else {
		return createEmptyVNode()
	}
}