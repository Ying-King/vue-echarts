/**
 *
 * @desc 根据name读取cookie
 * @param {String} name
 * @return {String}
*/
function get(name){
	const arr = document.cookie.replace(/\s/g, '').split(';');

	for(let i = 0, len = arr.length; i < len; i++){
		let tempArr = arr[i].split('=');

		if(tempArr[0] === name) return decodeURIComponent(tempArr[1]);
	}

	return '';
}

export default get