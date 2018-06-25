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
  currentSong: {
    id:'s2',
    name:'Song2',
    duration:'02:00',
    albumId:'al2',
    albumName:'Album2',
    artistId:'ar2',
    artistName:'Artist2',
    filePath:'http://65.ierge.cn/12/186/372266.mp3',
    image:'http://img.jf258.com/uploads/2014-09-08/052009179.jpg',
    lyricsPath:''
  },
  songList: [
    {
      id:'s1',
      name:'Song1',
      duration:'01:00',
      albumId:'al1',
      albumName:'Album1',
      artistId:'ar1',
      artistName:'Artist1',
      filePath:'http://other.web.ra01.sycdn.kuwo.cn/resource/n3/128/17/55/3616442357.mp3',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
    {
      id:'s2',
      name:'Song2',
      duration:'02:00',
      albumId:'al2',
      albumName:'Album2',
      artistId:'ar2',
      artistName:'Artist2',
      filePath:'http://65.ierge.cn/12/186/372266.mp3',
      image:'http://img.jf258.com/uploads/2014-09-08/052009179.jpg',
      lyricsPath:''
    },
    {
      id:'s3',
      name:'Song3',
      duration:'03:00',
      albumId:'al3',
      albumName:'Album3',
      artistId:'ar3',
      artistName:'Artist3',
      filePath:'http://other.web.ra01.sycdn.kuwo.cn/resource/n3/128/17/55/3616442357.mp3',
      image:'http://img.jf258.com/uploads/2013-07-13/171053918.jpg',
      lyricsPath:''
    },
    {
      id:'s4',
      name:'Song4',
      duration:'04:39',
      albumId:'al4',
      albumName:'Album4',
      artistId:'a4',
      artistName:'Artist4',
      filePath:'',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
    {
      id:'s5',
      name:'Song5',
      duration:'04:39',
      albumId:'al5',
      albumName:'Album5',
      artistId:'ar5',
      artistName:'Artist5',
      filePath:'',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
    {
      id:'s6',
      name:'Song6',
      duration:'04:39',
      albumId:'al6',
      albumName:'Album6',
      artistId:'ar6',
      artistName:'Artist6',
      filePath:'',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
    {
      id:'s7',
      name:'Song7',
      duration:'04:39',
      albumId:'al7',
      albumName:'Album7',
      artistId:'ar7',
      artistName:'Artist7',
      filePath:'',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
    {
      id:'s8',
      name:'Song8',
      duration:'04:39',
      albumId:'al8',
      albumName:'Album8',
      artistId:'ar8',
      artistName:'Artist8',
      filePath:'',
      image:'https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1',
      lyricsPath:''
    },
  ],
}

export default state
