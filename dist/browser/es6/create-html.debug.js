const CreateHtml = (() => {
function createFragment(children, callback) {
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Argument "callback" is invalid.';
	}

	if (Array.isArray(children)) {
		const length = children.length;

		if (length === 1) {
			return createFragment(children[0], callback);
		}

		const fragment = document.createDocumentFragment();

		for (let index = 0; index < length; index++) {
			const child = createFragment(children[index]);
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
	if (!(attributes == null || typeof attributes === 'object')) {
		throw 'Argument "attributes" is invalid.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Argument "callback" is invalid.';
	}

	if (attributes != null) {
		for (const name in attributes) {
			const value = attributes[name];
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
	if (!(attributes == null || typeof attributes === 'object')) {
		throw 'Argument "attributes" is invalid.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Argument "callback" is invalid.';
	}

	const element = document.createElementNS(namespace, name);

	setAttributes(element, attributes);

	const fragment = createFragment(children);
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
	if (!(attributes == null || typeof attributes === 'object')) {
		throw 'Argument "attributes" is invalid.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Argument "callback" is invalid.';
	}

	return createElementNs('http://www.w3.org/1999/xhtml', name, attributes, children, callback);
}

function createStyleValue(properties, callback) {
	if (!(properties == null || typeof properties === 'object')) {
		throw 'Argument "properties" is invalid.';
	}
	if (!(callback == null || typeof callback === 'function')) {
		throw 'Argument "callback" is invalid.';
	}

	if (properties == null) {
		return null;
	}

	const styleValue = [];

	for (const name in properties) {
		const value = properties[name];
		if (value != null) {
			if (typeof value === 'object') {
				styleValue.push(`${name} { ${createStyleValue(value)} }`);
			} else {
				styleValue.push(`${name}: ${value};`);
			}
		}
	}

	if (callback != null) {
		callback(styleValue);
	}

	return styleValue.join(' ');
}

return {
	createFragment,
	setAttributes,
	createElementNs,
	createElement,
	createStyleValue
};
})();

/* exported CreateHtml */
