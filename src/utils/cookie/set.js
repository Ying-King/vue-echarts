/**
 *
 * @desc 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
*/
function set(name, value, outTime){
	const date = new Date();

	date.setTime(outTime * 1000);
    document.cookie = `${name}=${value};expires=${date}`;
}

export default set