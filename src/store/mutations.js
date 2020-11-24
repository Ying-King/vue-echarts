import * as types from './mutation-types'

const mutations = {
	[types.SET_VIDEO](state, video){
		state.video = video
	},
	[types.SET_IMG_LIST](state, imgList){
		state.imgList = imgList
	},
}

export default mutations
