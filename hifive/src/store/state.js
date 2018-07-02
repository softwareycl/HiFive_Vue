const state = {
  isLogin: false,
  user: {},
  likeSongs: [],
  likeAlbums: [],
  playlistList: [],
  
  song: {},
  album: {},
  artist: {},

  serverUrl: "http://192.168.20.99:8080/hifive",

  search: {
    name: ""
  },

  rankType:1,
  
  currentIndex: 0,
  currentSong: {},
  songList: [],
}

export default state
