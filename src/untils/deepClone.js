export const deepClone = function (origin, target) { //深度克隆
	var target1 = target || {}, //设置target的默认值，不传值默认为空对象
		toStr = Object.prototype.toString, //原型链方法：判断数值类型
		arrStr = '[object Array]';

	for (var prop in origin) {
		if (origin.hasOwnProperty(prop)) { //判断对象下面是否有属性，没有属性的即为原始值

			if (origin[prop] !== 'null' && typeof (origin[prop]) === 'object') { //判断需要被克隆的对象的属性是否为原始值
				target1[prop] = toStr.call(origin[prop]) === arrStr ? [] : {}; //不是原始值，将其转为数组或对象
				deepClone(origin[prop], target1[prop]); //如果不是原始值，继续调用自身，判断该属性的子属性是否为原始值
			} else {
				target1[prop] = origin[prop]; //如果是原始值的话，将其复制给克隆对象
			}
		}
	}
	return target1
}