import set from './set'

/**
 *
 * @desc 根据name删除cookie
 * @param {String} name
*/
function remove(name){
	// 设置已过期，系统会立刻删除cookie
	set(name, '1', -1);
}

export default remove