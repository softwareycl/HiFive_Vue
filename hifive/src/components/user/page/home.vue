<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-nav></v-nav>
        <div id="home">
            <div data="songList">
                <el-row>
                    <p align=center class="font_Menu">新歌首发</p>
                </el-row>
                <el-row>
                    <el-col offset="3" style="width:600px;">
                        <el-button icon="el-icon-caret-right"  v-on:click="playAllSong">播放全部</el-button>
                        <el-tabs @tab-click="switch1" style="width:240px;float:right;">
                            <el-tab-pane label="内地" name="first"></el-tab-pane>
                            <el-tab-pane label="港台" name="second"></el-tab-pane>
                            <el-tab-pane label="日韩" name="third"></el-tab-pane>
                            <el-tab-pane label="欧美" name="fourth"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="350px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 3" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 3" :key="j" :offset="j > 1 ? 0 : 3" style="width:380px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;">
                                    <div style="height:100%;width:100%">
                                        <el-row>  
                                            <el-col style="width:90px;">
                                                <div style="width:90px;height:90px;border-style:none;overflow:hidden;">
                                                    <img src="../../../assets/icon.jpg" class="songImage" onmouseover="this.parentNode.children[1].style.display='block';this.style.transform='scale(1.4)';" @mouseout="handleMouseOut" v-on:click="clickOnSongImage(songList[9*(page-1)+3*(i-1)+j-1].id)">
                                                    <el-button class="songButton" icon="el-icon-caret-right" circle v-on:click="clickOnSongButton(songList[9*(page-1)+3*(i-1)+j-1].id)"></el-button>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:220px">
                                                <div style="margin-top:25px;margin-left:10px;">
                                                    <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="font_name">{{songList[9*(page-1)+3*(i-1)+j-1].name}}</a>
                                                </div>
                                                <div style="margin-left:10px;>
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
            <div data="albumList" style="margin-top:30px;">
                <el-row>
                    <p align=center class="font_Menu">新碟首发</p>
                </el-row>
                <el-row>
                    <el-col align=center>
                        <el-tabs @tab-click="switch2" style="width:240px;z-index: 0px">
                            <el-tab-pane label="内地" name="first"></el-tab-pane>
                            <el-tab-pane label="港台" name="second"></el-tab-pane>
                            <el-tab-pane label="日韩" name="third"></el-tab-pane>
                            <el-tab-pane label="欧美" name="fourth"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="550px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row v-for="i in 2" :key="i" style="margin-top:20px;">
                            <el-col v-for="j in 5" :key="j" :offset="j > 1 ? 1 : 2" style="width:180px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;borderRadius:0px;">
                                    <div style="height:100%;width:100%">  
                                        <el-row>  
                                            <div style="width:180px;height:180px;border-style:none;overflow:hidden;">
                                                <img src="../../../assets/icon.jpg" class="albumImage" onmouseover="this.parentNode.children[1].style.display='block';this.style.transform='scale(1.4)';this.parentNode.children[1].style.transform='scale(1.4)';" @mouseout="handleMouseOut" v-on:click="clickOnAlbumImage(albumList[10*(page-1)+5*(i-1)+j-1].id)">
                                                <el-button class="albumButton" icon="el-icon-caret-right" circle v-on:click="clickOnAlbumButton(albumList[10*(page-1)+5*(i-1)+j-1].id)"></el-button>
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
            <div style="margin-top:30px;">
                <el-row>
                    <p align=center class="font_Menu">排行榜</p>
                </el-row>
                <el-row style="height:550px;">
                    <el-col offset="2" style="width:175px;">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list1" style="background:#D97C95;">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">新歌</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList1"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list1" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list2" style="background:#6B97B1">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">热歌</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList2"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list2" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                             </div>  
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list3" style="background:#6CBDB4">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">内地</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList3"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list3" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>   
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div class="listCard" data="list4" style="background:#508D94">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">港台</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList4"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list4" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list5" style="background:#F0A470">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">日韩</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList5"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list5" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
                                </ol>
                            </div> 
                        </el-card>
                    </el-col>
                    <el-col style="width:175px;margin-left:10px">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div class="listCard" data="list6" style="background:#C0C0C0">
                                <P align=center class="font_listTitle">巅峰榜</P><p align=center class="font_listTitle" style="font-size:x-large;">欧美</p>
                                <div style="height:70px;" onmouseover="this.children[0].style.display='block';" onmouseout="this.children[0].style.display='none';">
                                    <el-button class="listButton" icon="el-icon-caret-right" circle v-on:click="playList6"></el-button>
                                </div>
                                <ol class="list">
                                    <li v-for="song in list6" style="margin-left:10px;"><div style="margin-top:20px;"><a herf="" class="font_listContent">{{song.name}}</a></div><div><a herf="" class="font_listContent">{{song.artistName}}</a></div></li>
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
            },{
                id:'1',
                name:'37',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'38',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'39',
                artistId:'',
                artistName:'容祖儿',
                duration:'03:55',
            },{
                id:'1',
                name:'40',
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
            },{
                id:'001',
                name:'41',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'42',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'43',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'44',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'45',
                artistName:'容祖儿',
            },{
                id:'001',
                name:'46',
                artistName:'容祖儿',
            },],
            list1:[{
                name:'心之科学',
                artistName:'容祖儿',
            },{
                name:'心之科学',
                artistNmae:'容祖儿',
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
                artistNmae:'容祖儿',
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
                artistNmae:'容祖儿',
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
                artistNmae:'容祖儿',
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
                artistNmae:'容祖儿',
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
                artistNmae:'容祖儿',
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
        switch1(tab, event) {
            console.log(tab, event);
        },
        switch2(tab, event) {
            console.log(tab, event);
        },
        handleMouseOut:function(event) {
            if(event.toElement==event.target.parentNode.children[1]){
                return false;
            }
            else{
                event.target.style.transform='scale(1)';
                event.target.parentNode.children[1].style.transform='scale(1)';
                event.target.parentNode.children[1].style.display='none';
            }
        },
        clickOnSongImage:function(id){
            console.log(id);
        },
        clickOnAlbumButton:function(id){
            console.log(id);
        },
        clickOnAlbumImage:function(id){
            console.log(id);
        },
        clickOnAlbumButton:function(id){
            console.log(id);
        },
        playList1:function(){

        },
        playList2:function(){

        },
        playList3:function(){

        },
        playList4:function(){

        },
        playList5:function(){

        },
        playList6:function(){

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
    display:none;
}
.albumButton{
    position:absolute;left:70px;top:70px;
    display:none;
}
.listButton{
    margin-left: 70px;
    display:none;
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
}
.font_listContent{
  font-family:"Hiragino Sans GB";
  font-size:small;
  color:white;
  cursor:pointer;
}
</style>