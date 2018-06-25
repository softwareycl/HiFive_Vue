<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-nav></v-nav>
        <div id="home">
            <div data="songList" style="background: linear-gradient(#F2F2F2, #FFFFFF);">
                <el-row>
                    <p align=center class="font_Menu">新歌首发</p>
                </el-row>
                <el-row>
                    <el-col :offset="2" style="width:690px;">
                        <el-button icon="el-icon-caret-right" v-on:click="playAllSong">播放全部</el-button>
                        <el-tabs value="1" @tab-click="switchSong" style="width:240px;float:right;">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="日韩" name="3"></el-tab-pane>
                            <el-tab-pane label="欧美" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="350px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 3" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 3" :key="j" :offset="j > 1 ? 0 : 2" style="width:380px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;">
                                    <div style="height:100%;width:100%;">
                                        <el-row>  
                                            <el-col style="width:90px;">
                                                <div style="width:90px;height:90px;border-style:none;overflow:hidden;">
                                                    <img src="../../../assets/icon.jpg" class="songImage" @mouseenter="enterSongImage" @mouseleave="leaveSongImage" v-on:click="clickOnSongImage(9*(page-1)+3*(i-1)+j-1)">
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
            <div data="albumList" style="margin-top:30px;background: linear-gradient(#F2F2F2, #FFFFFF);">
                <el-row>
                    <p align=center class="font_Menu">新碟首发</p>
                </el-row>
                <el-row>
                    <el-col align=center>
                        <el-tabs value="1" @tab-click="switchAlbum" style="width:240px;z-index: 0px">
                            <el-tab-pane label="内地" name="1"></el-tab-pane>
                            <el-tab-pane label="港台" name="2"></el-tab-pane>
                            <el-tab-pane label="日韩" name="3"></el-tab-pane>
                            <el-tab-pane label="欧美" name="4"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="500px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 2" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 5" :key="j" :offset="j > 1 ? 1 : 2" style="width:180px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;">
                                    <div style="height:100%;width:100%;">  
                                        <el-row>  
                                            <div style="width:180px;height:180px;border-style:none;overflow:hidden;">
                                                <img src="../../../assets/icon.jpg" class="albumImage" @mouseenter="enterAlbumImage" @mouseleave="leaveAlbumImage" v-on:click="clickOnAlbumImage(10*(page-1)+5*(i-1)+j-1)">
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
                            <div class="listCard" data="list1" style="background:#D97C95;" @mouseover="enterList('listButton1')" @mouseout="leaveList('listButton1')">
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
                            <div class="listCard" data="list2" style="background:#6B97B1" @mouseover="enterList('listButton2')" @mouseout="leaveList('listButton2')">
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
                            <div class="listCard" data="list3" style="background:#6CBDB4" @mouseover="enterList('listButton3')" @mouseout="leaveList('listButton3')">
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
                            <div class="listCard" data="list4" style="background:#508D94" @mouseover="enterList('listButton4')" @mouseout="leaveList('listButton4')">
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
                            <div class="listCard" data="list5" style="background:#F0A470" @mouseover="enterList('listButton5')" @mouseout="leaveList('listButton5')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(5)">日韩</p>
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
                            <div class="listCard" data="list6" style="background:#C0C0C0" @mouseover="enterList('listButton6')" @mouseout="leaveList('listButton6')">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;cursor:pointer;" v-on:click="toList(6)">欧美</p>
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
export default {
    components: {
        vHead,
        vNav,
        vFoot
    },
    data(){
        return{
        	songList: [{
        		id:'1',
        		name:'1',
        		artistId:'',
        		artistName:'容祖儿',
        		duration:'03:55',
        	},{
                id:'1',
                name:'2',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'3',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'4',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'5',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'6',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'7',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'8',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'9',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'10',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'11',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'12',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'13',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'14',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'15',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'16',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'17',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'18',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'19',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'20',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'21',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'22',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'23',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'24',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'25',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'26',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'27',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'28',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'29',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'30',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'31',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'32',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'33',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'34',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'35',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'36',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },],
        	albumList:[{
        		id:'001',
                name:'1',
                artistName:'容祖儿',
        	},{
        		id:'001',
                name:'2',
                artistName:'容祖儿',
        	},{
        		id:'001',
                name:'3',
                artistName:'容祖儿',
        	},{
                id:'001',
                name:'4',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'5',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'6',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'7',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'8',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'9',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'10',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'11',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'12',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'13',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'14',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'15',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'16',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'17',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'18',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'19',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'20',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'21',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'22',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'23',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'24',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'25',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'26',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'27',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'28',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'29',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'30',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'31',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'32',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'33',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'34',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'35',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'36',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'37',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'38',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'39',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'40',
                artistName:'容祖儿',
            },],
            list1:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },],
            list2:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },],
            list3:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },],
            list4:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },],
            list5:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },],
            list6:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistName:'容祖儿',
            },]
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
            console.log(tab.name);
            this.axios.get('',{
                params:{

                }
            })
            .then(response =>{

            })
            .catch(function(err){
                console.log(err);
            });
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
            console.log(tab.name);
            this.axios.get('',{
                params:{
                    
                }
            })
            .then(response =>{

            })
            .catch(function(err){
                console.log(err);
            });
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
    },
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
  font-size:medium;
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
  font-size:medium;
  color:white;
  cursor:pointer;
}
</style>