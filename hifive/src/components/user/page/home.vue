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
                        <el-button icon="el-icon-caret-right" v-on:click="playAllSong">播放全部</el-button>
                        <el-tabs value="1" @tab-click="switchSong" style="width:240px;float:right;">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="欧美" name="3"></el-tab-pane>
                            <el-tab-pane label="日韩" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="350px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 3" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 3" :key="j" :offset="j > 1 ? 0 : 2" style="width:380px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;backgroundColor:transparent;">
                                    <div style="height:100%;width:100%;">
                                        <el-row>  
                                            <el-col style="width:90px;">
                                                <div style="width:90px;height:90px;border-style:none;overflow:hidden;">
                                                    <img :src="songList[9*(page-1)+3*(i-1)+j-1].image" class="songImage" @mouseenter="enterSongImage" @mouseleave="leaveSongImage" v-on:click="clickOnSongImage(9*(page-1)+3*(i-1)+j-1)">
                                                    <el-button class="songButton" icon="el-icon-caret-right" circle v-on:click="clickOnSongButton(9*(page-1)+3*(i-1)+j-1)"></el-button>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:220px">
                                                <div style="margin-top:25px;margin-left:10px;">
                                                    <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="font_name">{{songList[9*(page-1)+3*(i-1)+j-1].name}}</a>
                                                </div>
                                                <div style="margin-left:10px;">
                                                    <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="font_other">{{songList[9*(page-1)+3*(i-1)+j-1].artistName}}</a>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:70px;"><p class="font_time" style="color:#9C9C9C;margin-top:35px;">{{songList[9*(page-1)+3*(i-1)+j-1].duration}}</p>
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
                        <el-tabs value="1" @tab-click="switchAlbum" style="width:240px;z-index: 0px">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="欧美" name="3"></el-tab-pane>
                            <el-tab-pane label="日韩" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="500px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 2" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 5" :key="j" :offset="j > 1 ? 1 : 2" style="width:180px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;backgroundColor:transparent;">
                                    <div style="height:100%;width:100%;">  
                                        <el-row>  
                                            <div style="width:180px;height:180px;border-style:none;overflow:hidden;">
                                                <img :src="albumList[10*(page-1)+5*(i-1)+j-1].image" class="albumImage" @mouseenter="enterAlbumImage" @mouseleave="leaveAlbumImage" v-on:click="clickOnAlbumImage(10*(page-1)+5*(i-1)+j-1)">
                                                <el-button class="albumButton" icon="el-icon-caret-right" circle v-on:click="clickOnAlbumButton(10*(page-1)+5*(i-1)+j-1)"></el-button>
                                            </div>
                                        </el-row>
                                        <el-row>
                                            <div>
                                                <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="font_name">{{albumList[10*(page-1)+5*(i-1)+j-1].name}}</a>
                                            </div>
                                            <div>
                                                <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="font_other">{{albumList[10*(page-1)+5*(i-1)+j-1].artistName}}</a>
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
                <el-row style="height:550px;">
                    <el-col :offset="2" style="width:175px;">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list1" style="background:#D97C95;height:490px;" @mouseover="enterList('listButton1')" @mouseout="leaveList('listButton1')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(1)">新歌</p>
                                <div style="height:40px;">
                                    <el-button id="listButton1" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(1)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list1" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list2" style="background:#6B97B1;height:490px;" @mouseover="enterList('listButton2')" @mouseout="leaveList('listButton2')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(2)">热歌</p>
                                <div style="height:40px;">
                                    <el-button id="listButton2" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(2)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list2" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                             </div>  
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list3" style="background:#6CBDB4;height:490px;" @mouseover="enterList('listButton3')" @mouseout="leaveList('listButton3')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(3)">内地</p>
                                <div style="height:40px;">
                                    <el-button id="listButton3" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(3)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list3" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>   
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list4" style="background:#508D94;height:490px;" @mouseover="enterList('listButton4')" @mouseout="leaveList('listButton4')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(4)">港台</p>
                                <div style="height:40px;">
                                    <el-button id="listButton4" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(4)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list4" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list5" style="background:#F0A470;height:490px;" @mouseover="enterList('listButton5')" @mouseout="leaveList('listButton5')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(5)">欧美</p>
                                <div style="height:40px;">
                                    <el-button id="listButton5" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(5)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list5" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div> 
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list6" style="background:#C0C0C0;height:490px;" @mouseover="enterList('listButton6')" @mouseout="leaveList('listButton6')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(6)">日韩</p>
                                <div style="height:40px;">
                                    <el-button id="listButton6" class="listButton" icon="el-icon-caret-right" circle v-on:click="playList(6)"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list6" style="margin-left:10px;"><div style="margin-top:30px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
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
            emptySongList:[{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                duration:'',
                image:emptyImage,
            },],
            emptyAlbumList:[{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },{
                name:'暂无数据',
                artistName:'',
                image:emptyImage,
            },],
            songList:[],
        	albumList:[],
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            list5:[],
            list6:[]
        }

    },
    methods:{
        enterSongImage:function(event){
            event.target.style.transform='scale(1.2)';
            event.target.parentNode.children[1].style.transform='scale(1.2)';
            event.target.parentNode.children[1].style.opacity=1;
        },
        leaveSongImage:function(event){
            if(event.toElement==event.target.parentNode.children[1]){
                return false;
            }
            else{
                event.target.style.transform='scale(1)';
                event.target.parentNode.children[1].style.transform='scale(1)';
                event.target.parentNode.children[1].style.opacity=0;
            }
        },
        enterAlbumImage:function(event){
            event.target.style.transform='scale(1.5)';
            event.target.parentNode.children[1].style.transform='scale(1.5)';
            event.target.parentNode.children[1].style.opacity=1;
        },
        leaveAlbumImage:function(event){
            if(event.toElement==event.target.parentNode.children[1]){
                return false;
            }
            else{
                event.target.style.transform='scale(1)';
                event.target.parentNode.children[1].style.transform='scale(1)';
                event.target.parentNode.children[1].style.opacity=0;
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

        },
        switchSong(tab) {
            this.getSongList(tab.name);
        },
        clickOnSongButton:function(id){
            console.log("button");
            console.log(id);
            console.log(this.songList[id].id);
        },
        clickOnSongImage:function(id){
            console.log("image");
            console.log(id);
            console.log(this.songList[id].id);
        },
        switchAlbum(tab) {
            this.getAlbumList(tab.name);
        },
        clickOnAlbumButton:function(id){
            console.log("button");
            console.log(id);
            console.log(this.albumList[id].id);
        },
        clickOnAlbumImage:function(id){
            console.log("image");
            console.log(id);
            console.log(this.albumList[id].id);
        },
        toList:function(index){
            console.log(index);
            //传递index给rank.vue
        },
        playList:function(index){
            console.log(index);
            //
        },
        getSongList: function(index){
            this.songList=this.songList.concat(this.emptySongList);
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
                this.songList=this.songList.concat(this.emptySongList);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getAlbumList: function(index){
            this.albumList=this.albumList.concat(this.emptyAlbumList);
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
                this.albumList=this.albumList.concat(this.emptyAlbumList);
            })
            .catch(function(err){
                console.log(err);
            });
        },
        getRank: function(index){
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
                if(index == 1){
                    this.list1 = rank;
                } else if(index == 2){
                    this.list2 = rank;
                } else if(index == 3){
                    this.list3 = rank;
                } else if(index == 4){
                    this.list4 = rank;
                } else if(index == 5){
                    this.list5 = rank;
                } else if(index == 6){
                    this.list6 = rank;
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

<style>
 .font_Menu{
  font-family:"Microsoft YaHei";
  font-size:xx-large;
}
.font_name{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:#333333;
  cursor:pointer;
}
.font_time{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:#9C9C9C; 
}
.font_other{
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
    list-style-type:decimal;
}
.font_listTitle{
  font-family:"Hiragino Sans GB";
  color:white;
  font-size:large;
}
.font_listContent{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:white;
  cursor:pointer;
}
</style>