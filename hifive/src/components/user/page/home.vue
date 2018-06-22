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
                    <el-col offset="3" style="width:44%;">
                        <el-button icon="el-icon-caret-right"  v-on:click="playAllSong">播放全部</el-button>
                        <el-tabs @tab-click="switch1" style="width:240px;float:right;">
                            <el-tab-pane label="内地" name="first"></el-tab-pane>
                            <el-tab-pane label="港台" name="second"></el-tab-pane>
                            <el-tab-pane label="日韩" name="third"></el-tab-pane>
                            <el-tab-pane label="欧美" name="fourth"></el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="300px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row :gutter="20" v-for="(i, index) in 3" :key="i" style="margin-top:20px;">
                            <el-col v-for="(j, index) in 3" :key="j" :offset="index > 0 ? 0 : 3" style="width:26%;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%">
                                    <div style="height:100%;width:100%">
                                        <el-row>  
                                            <el-col style="width:20%;">
                                                <div style="width:100%;border-style:none;overflow:hidden;">
                                                    <img src="../../../assets/icon.jpg" class="songImage" onmouseover="this.parentNode.children[1].style.display='block';this.style.transform='scale(1.4)';this.parentNode.children[1].style.transform='scale(1.3)';" @mouseout="handleMouseOut">
                                                    <el-button class="songButton" icon="el-icon-caret-right" circle></el-button>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:60%">
                                                <div style="margin-top:10%;margin-left:3%;">
                                                    <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="font_name">{{songList[9*(page-1)+3*i+j].name}}</a>
                                                </div>
                                                <div style="margin-left:3%;>
                                                    <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="font_other">{{songList[9*(page-1)+3*i+j].artist}}</a>
                                                </div>
                                            </el-col>  
                                            <el-col style="width:20%;"><p class="font_time" style="color:#9C9C9C;margin-top:40%;">{{songList[9*(page-1)+3*i+j].time}}</p>
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
                <el-carousel :autoplay=false indicator-position="outside" arrow="hover" height="480px" trigger="click" style="z-index: 0">
                    <el-carousel-item v-for="page in 4" :key="page">
                        <el-row :gutter="80" v-for="(i, index) in 2" :key="i" style="margin-top:20px;">
                            <el-col v-for="(j, index) in 5" :key="j" :offset="index > 0 ? 0 : 3" style="width:15%;">
                                <el-card :body-style="{ padding: '0px'}" shadow="never" style="border-style:none;width:100%;">
                                    <div style="height:100%;width:100%">  
                                        <el-row>  
                                            <div style="width:100%;border-style:none;overflow:hidden;">
                                                <img src="../../../assets/icon.jpg" class="albumImage" onmouseover="this.parentNode.children[1].style.display='block';this.style.transform='scale(1.4)';this.parentNode.children[1].style.transform='scale(1.7)';" @mouseout="handleMouseOut">
                                                <el-button class="albumButton" icon="el-icon-caret-right" circle></el-button>
                                            </div>
                                        </el-row>
                                        <el-row>
                                            <div>
                                                <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#333333';" class="font_name">{{albumList[10*(page-1)+5*i+j].name}}</a>
                                            </div>
                                            <div>
                                                <a herf="" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#9C9C9C';" class="font_other">{{albumList[10*(page-1)+5*i+j].artist}}</a>
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
                <el-row style="height:600px;">
                    <el-col offset="3" style="width:12%;">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div data="list1" style="width:100%;height:500px;border-style:none;overflow:hidden;background:url(../../../assets/icon.jpg) no-repeat;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">新歌</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list1" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:12%;margin-left:0.5%">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div data="list2" style="width:100%;height:500px;border-style:none;overflow:hidden;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">热歌</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list2" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
                                </ol>
                             </div>  
                        </el-card>
                    </el-col>
                    <el-col style="width:12%;margin-left:0.5%">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div data="list3" style="width:100%;height:500px;border-style:none;overflow:hidden;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">内地</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list3" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
                                </ol>
                            </div>   
                        </el-card>
                    </el-col>
                    <el-col style="width:12%;margin-left:0.5%">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;"> 
                            <div data="list4" style="width:100%;height:500px;border-style:none;overflow:hidden;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">港台</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list4" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
                                </ol>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col style="width:12%;margin-left:0.5%">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div data="list5" style="width:100%;height:500px;border-style:none;overflow:hidden;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">日韩</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list5" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
                                </ol>
                            </div> 
                        </el-card>
                    </el-col>
                    <el-col style="width:12%;margin-left:0.5%">
                        <el-card :body-style="{ padding: '0px'}" shadow="never" style="width:100%;">
                            <div data="list6" style="width:100%;height:500px;border-style:none;overflow:hidden;">
                                <el-row><P align=center>巅峰榜</P><p align=center style="font-size:large;">欧美</p></el-row>
                                <el-row><P align=center>———</P></el-row>
                                <ol>
                                    <li v-for="song in list6" style="margin-left:10%;"><div style="margin-top:25%;"><a herf="" class="font_other">{{song.name}}</a></div><div><a herf="" class="font_other">{{song.artist}}</a></div></li>
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
        		ID:'1',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'2',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'3',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'4',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'5',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'6',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'7',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'8',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'9',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'10',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'11',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'12',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'13',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'14',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'15',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'1',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'2',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'3',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'4',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'5',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'6',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'7',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'8',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'9',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'10',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'11',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'12',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'13',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'14',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'15',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'1',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'2',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'3',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'4',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'5',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'6',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'7',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'8',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'9',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'10',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'11',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'12',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'13',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'14',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	},{
        		ID:'15',
        		name:'心之科学',
        		artistID:'',
        		artist:'容祖儿',
        		time:'03:55',
        		Flag:false,
        		isopen:false
        	}],
        	albumList:[{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},{
        		ID:'001',
                name:'心之科学',
                artist:'容祖儿',
        	},],
            list1:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },],
            list2:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },],
            list3:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },],
            list4:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },],
            list5:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },],
            list6:[{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
            },{
                name:'心之科学',
                artist:'容祖儿',
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
    position:absolute;left:30px;top:30px;
    display:none;
}
.albumButton{
    position:absolute;left:90px;top:90px;
    display:none;
}
</style>