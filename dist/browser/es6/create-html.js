const CreateHtml = (() => {
function createFragment(children) {
	if (Array.isArray(children)) {
		const fragment = document.createDocumentFragment();
		for (let index = 0, length = children.length; index < length; index++) {
			const child = createFragment(children[index]);
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
		for (const name in attributes) {
			const value = attributes[name];
			if (value != null) {
				element.setAttribute(name, value);
			}
		}
	}

	return element;
}

function createElementNs(namespace, name, attributes, children) {
	const element = document.createElementNS(namespace, name);

	setAttributes(element, attributes);

	const fragment = createFragment(children);
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
