const state = {
  isLogin: false,
  userId: "",
  likeSongs: [],
  likeAlbums: [],
  playlist: [],
  
  song: {},
  album: {},
  artist: {},

  serverUrl: "http://192.168.20.95:8080/hifive",

  search: {
    name: ""
  },

  rankType:1,
  
  currentIndex: 0,
  currentSong: {},
  songList: [],
}

export default state
