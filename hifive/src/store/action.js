import state from './state'
import player from '../components/user/page/player.vue'
export default{

	//params第一个参数为song(s)：需要播放的歌曲，第二个参数为index：需要播放的歌曲在songs中的下标
	//      第三个参数为isSingle：song(s)是一首歌(不清空播放列表)或者歌曲列表(清空播放列表)
	async play({
		commit
	}, params) {
		var isSingle = params[2];
		if(!isSingle){
			var songs = params[0];
			var startIndex = params[1];
			if(state.currentSong.id == songs[startIndex].id){
				var audio = player.methods.getAudio();
				audio.play();
			}
		    state.currentSong = {};
	        state.songList = [];
	        for(var i = 0; i < songs.length; i++){
	            state.songList.push(songs[i]);
	        }
	        state.currentSong = state.songList[startIndex];
	        state.currentIndex = startIndex;
		} else {
			var song = params[0];
			state.songList.insert(song);
			++state.currentIndex;
			state.currentSong = state.songList[startIndex];
		}

	},

	//params第一个参数为songs：需要添加的歌曲列表
	async addToSongList({
		commit
	}, songs) {
	    if(state.songList.length == 0){
            state.songList = [];
            for(var i = 0; i < songs.length; i++){
                state.songList.push(songs[i]);
            }
            state.currentSong = state.songList[0];
            state.currentIndex = 0;
        } else {
            for(var m = 0; m < songs.length; m++){
                var song = songs[m];
                var songId = song.id;
                if(state.currentSong.id != songId){
                    for(var i = 0; i < state.songList.length; i++){
                        if(state.songList[i].id == songId){
                            state.songList.splice(i, 1);
                            if(i < state.currentIndex)
                                state.currentIndex=state.currentIndex-1;
                            break;
                        }
                    }
                    state.songList.push(song);
                }
            }
        }

	},
}