const state = {
  isLogin: false,
  userId: "",
  
  song: {},
  album: {},
  playlist: {},
  artist: {},

  serverUrl: "http://192.168.20.95:8080/hifive",

  search: {
    name: "00"
  },

  rankType:1,
  
  currentIndex: 0,
  currentSong: {},
  songList: [],
}

export default state
