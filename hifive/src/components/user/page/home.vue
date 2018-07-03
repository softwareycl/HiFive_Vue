<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-nav></v-nav>
        <div id="home">
            <div :data="songList" style="background: linear-gradient(#F2F2F2, #FFFFFF);">
                <el-row>
                    <p align=center class="font_Menu">新歌首发</p>
                </el-row>
                <el-row>
                    <el-col :offset="2" style="width:690px;">
                        <el-button icon="el-icon-caret-right" v-on:click="playAllSong" style="backgroundColor:transparent;">播放全部</el-button>
                        <el-tabs value="1" @tab-click="switchSong" style="width:240px;float:right;">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="欧美" name="3"></el-tab-pane>
                            <el-tab-pane label="日韩" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <div v-if="songList.length<36" v-loading="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background=transparent style="width:100%;height:350px;z-index:0;">
                </div>
                <el-carousel v-else :autoplay=false indicator-position="outside" arrow="hover" height="350px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 3" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 3" :key="j" :offset="j > 1 ? 0 : 2" style="width:380px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;backgroundColor:transparent;">
                                    <div v-if="songList[9*(page-1)+3*(i-1)+j-1]" style="height:100%;width:100%;">
                                        <el-row>  
                                            <el-col style="width:90px;">
                                                <div style="width:90px;height:90px;border-style:none;overflow:hidden;">
                                                    <router-link :to="{ path: '/user/songdetail', query: { id: songList[9*(page-1)+3*(i-1)+j-1].id }}">
                                                        <img :src="songList[9*(page-1)+3*(i-1)+j-1].image" class="songImage" @mouseenter="enterSongImage" @mouseleave="leaveSongImage">
                                                    </router-link>
                                                    <el-button class="songButton" icon="el-icon-caret-right" circle v-on:click="clickOnSongButton(9*(page-1)+3*(i-1)+j-1)"></el-button>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:220px">
                                                <div style="margin-top:25px;margin-left:10px;">
                                                    <router-link :to="{ path: '/user/songdetail', query: { id: songList[9*(page-1)+3*(i-1)+j-1].id }}">
                                                        <a onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="name">{{songList[9*(page-1)+3*(i-1)+j-1].name}}</a>
                                                    </router-link>
                                                </div>
                                                <div style="margin-left:10px;">
                                                    <router-link :to="{ path: '/user/artistdetail', query: { id: songList[9*(page-1)+3*(i-1)+j-1].artistId }}">
                                                        <a onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="artistName">{{songList[9*(page-1)+3*(i-1)+j-1].artistName}}</a>
                                                    </router-link>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:70px;"><p class="duration" style="color:#9C9C9C;margin-top:35px;">{{songList[9*(page-1)+3*(i-1)+j-1].duration}}</p>
                                            </el-col>  
                                        </el-row>   
                                    </div>   
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div :data="albumList" style="margin-top:30px;background: linear-gradient(#F2F2F2, #FFFFFF);">
                <el-row>
                    <p align=center class="font_Menu">新碟首发</p>
                </el-row>
                <el-row>
                    <el-col align=center>
                        <el-tabs value="1" @tab-click="switchAlbum" style="width:240px;z-index: 0;">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="欧美" name="3"></el-tab-pane>
                            <el-tab-pane label="日韩" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <div v-if="albumList.length<40" v-loading="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background=transparent style="width:100%;height:500px;z-index:0;">
                </div>
                <el-carousel v-else :autoplay=false indicator-position="outside" arrow="hover" height="500px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 2" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 5" :key="j" :offset="j > 1 ? 1 : 2" style="width:180px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;backgroundColor:transparent;">
                                    <div v-if="albumList[10*(page-1)+5*(i-1)+j-1]" style="height:100%;width:100%;">  
                                        <el-row>  
                                            <div style="width:180px;height:180px;border-style:none;overflow:hidden;">
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: albumList[10*(page-1)+5*(i-1)+j-1].id }}">
                                                    <img :src="albumList[10*(page-1)+5*(i-1)+j-1].image" class="albumImage" @mouseenter="enterAlbumImage" @mouseleave="leaveAlbumImage">
                                                </router-link>
                                                <el-button class="albumButton" icon="el-icon-caret-right" circle v-on:click="clickOnAlbumButton(10*(page-1)+5*(i-1)+j-1)"></el-button>
                                            </div>
                                        </el-row>
                                        <el-row>
                                            <div>
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: albumList[10*(page-1)+5*(i-1)+j-1].id }}">
                                                    <a onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="name">{{albumList[10*(page-1)+5*(i-1)+j-1].name}}</a>
                                                </router-link>
                                            </div>
                                            <div>
                                                <router-link :to="{ path: '/user/artistdetail', query: { id: albumList[10*(page-1)+5*(i-1)+j-1].artistId }}">
                                                    <a onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="artistName">{{albumList[10*(page-1)+5*(i-1)+j-1].artistName}}</a>
                                                </router-link>
                                            </div>
                                        </el-row> 
                                    </div>   
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div style="margin-top:30px;background: linear-gradient(#F2F2F2, #FFFFFF);">
                <el-row>
                    <p align=center class="font_Menu">排行榜</p>
                </el-row>
                <div v-if="list6.length<4" v-loading="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background=transparent style="width:100%;height:550px;z-index:0;">
                </div>
                <el-row v-else style="height:550px;">
                    <el-col :offset="2" style="width:175px;">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list1" style="background:#D97C95;height:470px;" @mouseover="enterList('listButton1')" @mouseout="leaveList('listButton1')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                 <router-link :to="{ path: '/user/rank', query: { rankType: 1 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(1)">新歌</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton1" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(1)"></el-button>
                                </div>
                                <ul class="list">
                                    <li v-for="(item,index) in list1" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list2" style="background:#6B97B1;height:470px;" @mouseover="enterList('listButton2')" @mouseout="leaveList('listButton2')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                <router-link :to="{ path: '/user/rank', query: { rankType: 2 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(2)">热歌</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton2" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(2)"></el-button>
                                </div>
                                <ul class="list">
                                     <li v-for="(item,index) in list2" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                             </div>  
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list3" style="background:#6CBDB4;height:470px;" @mouseover="enterList('listButton3')" @mouseout="leaveList('listButton3')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                <router-link :to="{ path: '/user/rank', query: { rankType: 3 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(3)">内地</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton3" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(3)"></el-button>
                                </div>
                                <ul class="list">
                                    <li v-for="(item,index) in list3" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>   
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list4" style="background:#508D94;height:470px;" @mouseover="enterList('listButton4')" @mouseout="leaveList('listButton4')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                <router-link :to="{ path: '/user/rank', query: { rankType: 4 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(4)">港台</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton4" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(4)"></el-button>
                                </div>
                                <ul class="list">
                                    <li v-for="(item,index) in list4" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list5" style="background:#F0A470;height:470px;" @mouseover="enterList('listButton5')" @mouseout="leaveList('listButton5')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                <router-link :to="{ path: '/user/rank', query: { rankType: 5 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(5)">欧美</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton5" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(5)"></el-button>
                                </div>
                                <ul class="list">
                                    <li v-for="(item,index) in list5" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div> 
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list6" style="background:#C0C0C0;height:470px;" @mouseover="enterList('listButton6')" @mouseout="leaveList('listButton6')">
                                <P align=center class="font_listTitle">巅峰榜</P>
                                <router-link :to="{ path: '/user/rank', query: { rankType: 6 }}">
                                    <p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(6)">日韩</p>
                                </router-link>
                                <div style="height:40px;">
                                    <el-button id="listButton6" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(6)"></el-button>
                                </div>
                                <ul class="list">
                                    <li v-for="(item,index) in list6" :key="item.id" style="margin-top:30px;">
                                        <div class="font_number">{{index+1}}</div>
                                        <div class="font_listContent">
                                        <router-link :to="{ path: '/user/songdetail', query: { id: item.id }}">
                                            <a style="color:white;cursor:pointer;">{{item.name}}</a><br/>
                                        </router-link>
                                        <router-link :to="{ path: '/user/artistdetail', query: { id: item.artistId }}">
                                            <a style="color:white;cursor:pointer;">{{item.artistName}}</a>
                                        </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from '../common/header.vue'
    import vNav from '../common/navigation.vue'
    import vFoot from '../common/footer.vue'
    import emptyImage from '../../../assets/暂无图片.png'
export default {
    components: {
        vHead,
        vNav,
        vFoot
    },
    data(){
        return{
            songList:[],
        	albumList:[],
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            list5:[],
            list6:[],
        }

    },
    methods:{
        enterSongImage:function(event){
            event.target.style.transform='scale(1.2)';
            event.target.parentNode.parentNode.children[1].style.transform='scale(1.2)';
            event.target.parentNode.parentNode.children[1].style.opacity=1;
        },
        leaveSongImage:function(event){
            if(event.toElement==event.target.parentNode.parentNode.children[1]){
                return false;
            }
            else{
                event.target.style.transform='scale(1)';
                event.target.parentNode.parentNode.children[1].style.transform='scale(1)';
                event.target.parentNode.parentNode.children[1].style.opacity=0;
            }
        },
        enterAlbumImage:function(event){
            event.target.style.transform='scale(1.3)';
            event.target.parentNode.parentNode.children[1].style.transform='scale(1.5)';
            event.target.parentNode.parentNode.children[1].style.opacity=1;
        },
        leaveAlbumImage:function(event){
            if(event.toElement==event.target.parentNode.parentNode.children[1]){
                return false;
            }
            else{
                event.target.style.transform='scale(1)';
                event.target.parentNode.parentNode.children[1].style.transform='scale(1)';
                event.target.parentNode.parentNode.children[1].style.opacity=0;
            }
        },
        enterList:function(button){  
            document.getElementById(button).style.transform='scale(1.4)';
            document.getElementById(button).style.opacity=1;
        },
        leaveList:function(button){
            document.getElementById(button).style.transform='scale(1)';
            document.getElementById(button).style.opacity=0;
        },
        playAllSong:function(){
            var songs = [];
            for(var i = 0; i < this.songList.length; i++){
                if(this.songList[i].id != "")
                    songs.push(this.songList[i]);
            }
            this.$store.dispatch("play", [songs, 0, false]);
        },
        switchSong(tab) {
            this.getSongList(tab.name);
        },
        clickOnSongButton:function(index){
            if(this.songList[index].id != ""){
                var songs = [];
                for(var i = 0; i < this.songList.length; i++){
                    if(this.songList[i].id != "")
                        songs.push(this.songList[i]);
                }
                this.$store.dispatch("play", [songs, index, false]);
            }
        },
        switchAlbum(tab) {
            this.getAlbumList(tab.name);
        },
        clickOnAlbumButton:function(index){
            if(this.albumList[index].id == "") return;

            var songs;
            this.axios.get(this.serverUrl + "/album/getSongsFromAlbum",{
                params:{
                  id: this.albumList[index].id,
                }
            })
            .then(response => {
                console.log(response.data);
                songs = response.data;
                for(var i = 0; i < songs.length; i++){
                    songs[i].image = this.serverUrl + songs[i].image;
                    songs[i].filePath = this.serverUrl + songs[i].filePath;
                    songs[i].lyricsPath = this.serverUrl + songs[i].lyricsPath;
                }
                this.$store.dispatch("play", [songs, 0, false]);
            })
            .catch(function(err){
                console.log(err);
            });
            
        },

        playList:function(index){
            var rank;
            if(index == 1) rank = this.list1;
            else if(index == 2) rank = this.list2;
            else if(index == 3) rank = this.list3;
            else if(index == 4) rank = this.list4;
            else if(index == 5) rank = this.list5;
            else if(index == 6) rank = this.list6;
            var songs = [];
            for(var i = 0; i < rank.length; i++){
                if(rank[i].id != "")
                    songs.push(rank[i]);
            }
            this.$store.dispatch("play", [songs, 0, false]);
        },
        getSongList: function(index){
            var song={id:'',name:'暂无数据',artistName:'',duration:'',image:emptyImage};
            this.songList=[];
            this.axios.get(this.serverUrl+'/song/getNewSongs',{
                params:{
                  region:index
                }
            })
            .then(response => {
                this.songList = response.data;
                for(var i = 0; i < this.songList.length; i++){
                    this.songList[i].image = this.serverUrl + this.songList[i].image;
                    this.songList[i].filePath = this.serverUrl + this.songList[i].filePath;
                    this.songList[i].lyricsPath = this.serverUrl + this.songList[i].lyricsPath;
                }
                for(var i=this.songList.length ; i < 36; i++)
                {
                    this.songList.push(song);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getAlbumList: function(index){
            var album={id:'',name:'暂无数据',artistName:'',image:emptyImage};
            this.albumList=[];
            this.axios.get(this.serverUrl+'/album/getNewAlbums',{
                params:{
                  region:index
                }
            })
            .then(response => {
                this.albumList = response.data;
                for(var i = 0; i < this.albumList.length; i++){
                    this.albumList[i].image = this.serverUrl + this.albumList[i].image;
                }
                for(var i=this.albumList.length ; i < 40; i++)
                {
                    this.albumList.push(album);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getRank: function(index){
            var song={id:'',name:'暂无数据',artistName:''};
            this.axios.get(this.serverUrl+'/song/rank',{
                params:{
                  type:index,
                  isAll: false
                }
              })
              .then(response => {
                var rank;
                rank = response.data;
                for(var i = 0; i < rank.length; i++){
                    rank[i].image = this.serverUrl + rank[i].image;
                    rank[i].filePath = this.serverUrl + rank[i].filePath;
                    rank[i].lyricsPath = this.serverUrl + rank[i].lyricsPath;
                }
                for(var i = rank.length; i < 4; i++){
                    rank.push(song);
                }
                if(index == 1){
                    this.list1=rank;
                } 
                else if(index == 2)
                {
                    this.list2=rank;
                } 
                else if(index == 3)
                {
                    this.list3=rank;
                } 
                else if(index == 4)
                {
                    this.list4=rank;
                } 
                else if(index == 5)
                {
                    this.list6=rank;
                } 
                else if(index == 6)
                {
                    this.list5=rank;
                }
              })
              .catch(function(err){
                console.log(err);
              });
        },
    },
    computed:{
        serverUrl(){
          return this.$store.state.serverUrl;
        }
    },
    mounted(){
        this.getSongList(1);
        this.getAlbumList(1);
        for(var i = 1; i <= 6; i++){
            this.getRank(i);
        }
    }
}

</script>

<style scoped>
 .font_Menu{
  font-family:"Microsoft YaHei";
  font-size:xx-large;
}
.name{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:#333333;
  cursor:pointer;
}
.duration{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:#9C9C9C; 
}
.artistName{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:#9C9C9C;
  cursor:pointer;
}
.albumImage{
    height:100%;
    width:100%;
    cursor:pointer;
    transition:all 0.5s;
}
.songImage{
    height:100%;
    width:100%;
    cursor:pointer;
    transition:all 0.5s;
}
.songButton{
    position:absolute;left:25px;top:25px;
    opacity:0;
    transition: all 0.5s;
}
.albumButton{
    position:absolute;left:70px;top:70px;
    opacity:0;
    transition: all 0.5s;
}
.listButton{
    margin-left: 65px;
    opacity:0;
    transition: all 0.5s;
}
.listCard{
    width:100%;
    height:450px;
    border-style:none;
    overflow:hidden;
}
.list{
    color:white;
    list-style-type:none;
    padding-left:20px;
}
.font_listTitle{
  font-family:"Hiragino Sans GB";
  color:white;
  font-size:large;
}
.font_listContent{
  font-family:"Hiragino Sans GB";
  font-size:small;
  margin-left:15px;
  width:100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.font_number{
  font-size:small;
  color:white;
  float:left;
}
a {
     text-decoration:none;
     out-line: none;
  }
</style>