const state = {
  isLogin0: false,
  isLogin: false,
  user: {},
  likeSongs: [],
  likeAlbums: [],
  playlistList: [],
  
  song: {},
  album: {},
  artist: {},

  serverUrl: "/hifive",

  search: {
    name: ""
  },

  rankType:1,
  
  currentIndex: -1,
  currentSong: {},
  songList: [],
}

export default state
