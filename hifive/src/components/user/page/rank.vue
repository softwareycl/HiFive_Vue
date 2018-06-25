<template>
<div>
    <div>
    <v-header></v-header>
    <v-nav></v-nav>
    </div>
    <el-row>
    <div class="rank">
        <el-col :span="6">
            <div class="navMenu">
                <div class="rankTitle">
                    <h2>排行榜</h2>
                </div>
                <el-menu
                id="rankType"
                default-active="2"
                class="rankMenu"
                mode="vertical">
                    <el-menu-item index="1">
                        <el-button 
                        class="menubtn current" 
                        type="text" 
                        @click="rankChange(0);rankDisplay(1,1)">新歌榜</el-button>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-button 
                        class="menubtn" 
                        type="text" 
                        @click="rankChange(1);rankDisplay(2,1)">热歌榜</el-button>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-button 
                        class="menubtn" 
                        type="text" 
                        @click="rankChange(2);rankDisplay(3,1)">内地榜</el-button>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-button 
                        class="menubtn" 
                        type="text" 
                        @click="rankChange(3);rankDisplay(4,1)">港台榜</el-button>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <el-button 
                        class="menubtn" 
                        type="text" 
                        @click="rankChange(4);rankDisplay(5,1)">日韩榜</el-button>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <el-button 
                        class="menubtn" 
                        type="text" 
                        @click="rankChange(5);rankDisplay(6,1)">欧美榜</el-button>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-col>
        <el-col :gutter="2" :span="16">
            <div class="display">
                <div class="displayTitle">
                    <h1>榜</h1>
                </div>
                <el-button type="primary" 
                icon="el-icon-caret-right" 
                style="background-color:#31C27C" 
                onmouseover="this.style.backgroundColor='#2CAF6F';" 
                onmouseout="this.style.backgroundColor='#31C27C';" 
                v-on:click="playAllSong">播放全部</el-button>
                <el-dropdown trigger="click" id="dropdown" @command="handleAlbumCommand">
                <el-button icon="el-icon-plus" v-on:click="getPlaylistList" >添加到<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" :data="playlistList">
                    <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                    <div v-if="state">
                    <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                    <el-dropdown-item v-for="playlist in playlistList" :key="playlist.ID" :command='{type:"playlist",params:playlist.ID}'>{{playlist.name}}</el-dropdown-item>
                    <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                    </div>
                    <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>

                <el-table
                :data="songs"
                style="width: 100%"
                max-height="1000"
                @cell-mouse-enter="handleMouseEnter" 
                @cell-mouse-leave="handleMouseOut">
                    <el-table-column type="index" width="50"></el-table-column>
                    <!--<el-table-column prop="image" width="150">
                        <router-link to="/user/songdetail">
                            <template slot-scope="scope">
                                    <img class="songImg" v-for="item in scope.row" v-bind:src="item.image" alt="歌曲图片" @click="setSong(item)">
                                    <img class="songImg" :src="scope.row.image" alt="歌曲图片" @click="setSong(item)">                             
                            </template>
                        </router-link>
                    </el-table-column>--> 
                    <el-table-column prop="name" label="歌曲" width="300">
                        <template slot-scope="scope">
                            <router-link to="/user/songdetail">
                                <a style="color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>
                            </router-link>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label=" " width="230">
      						<template slot-scope="scope">
      							<span v-if="scope.row.Flag">
      								<el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.row)"></el-button>
      							</span>
      						<span v-if="scope.row.Flag"> 
                    			<el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                     				<el-button icon="el-icon-plus" circle></el-button>
                     				<el-dropdown-menu slot="dropdown" :data="playlistList">
                        			<el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                        			<div v-if="state">
                          				<el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                          				<el-dropdown-item v-for="playlist in playlistList" :key="playlist.ID" :command='{type:"playlist",param1:playlist.ID,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                          				<el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                        			</div>
                        			<el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                      				</el-dropdown-menu>
                   			    	</el-dropdown>
                  				</span>
                  				<el-dialog title="创建歌单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                    				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      					<el-form-item label="歌单名称" prop="name">
                        					<el-input v-model="ruleForm.name" placeholder="请输入歌单名称"></el-input>
                      					</el-form-item>
                      					<el-form-item label="歌单简介" prop="des">
                        					<el-input type="textarea" v-model="ruleForm.des" placeholder="请输入歌单简介"></el-input>
                      					</el-form-item>
                      					<el-form-item>
                        					<el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                        					<el-button @click="dialogVisible=false">取消</el-button>
                      					</el-form-item>
                    				</el-form>
                 				</el-dialog>
                 		 		<span v-if="scope.row.Flag"> 
                                    <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> 
                                </span>
                		</template>
                    </el-table-column>

                    <el-table-column prop="artist" label="歌手" width="200">
                        <template slot-scope="scope">            
                            <router-link to="/user/artistdetail">
                                <a style="color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';" @click="setArtist(item)">{{scope.row.artist}}</a>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="duration" label="时长" width="100">
                    </el-table-column>  
                </el-table>
                <el-pagination class="pagination" :page-count="5" layout="prev, pager, next" @Current-Change="handleChange"></el-pagination>
            </div>
        </el-col>
    </div>
    </el-row>
    <el-row>
        <v-foot></v-foot>
    </el-row>
</div>
</template>
<script>
import vHeader from "../common/header.vue";
import vNav from "../common/navigation.vue";
import vFoot from "../common/footer.vue";
import a from "@/../static/images/1.jpg"

export default{
    data(){
        return {
            page:1,
            rankType:1,
            songs:[
                {
                ID:'1',
    			name:'不爱我就拉倒',
    			album:'不爱我就拉倒',
                artist:'周杰伦',
    			duration:'04:05',
    			Flag:false,
    			isopen:false,
                //image:'../../../static/images/1.jpg',
                image:a,
                rankType:'1'
                },
                {
                ID:'2',
    			name:'那是你离开了北京的生活',
    			album:'那是你离开了北京的生活',
                artist:'薛之谦',
    			duration:'04:28',
    			Flag:false,
                isopen:false,
                image:'../../../static/images/2.jpg',
                rankType:'2'
                },
                {
                ID:'3',
    			name:'戒烟',
    			album:'戒烟',
                artist:'李荣浩',
    			duration:'04:54',
    			Flag:false,
                isopen:false,
                image:'http://img.jf258.com/uploads/2014-08-04/040713289.jpg',
                rankType:'3'
                },
                {
                ID:'4',
    			name:'走马',
    			album:'走马',
                artist:'陈粒',
    			duration:'04:05',
    			Flag:false,
                isopen:false,
                image:'http://pic0.qqmofasi.com/2014/10/15/2_YyVQDRAQapaJVRjo72qo_square.jpg',
                rankType:'4'
                },
                {
                ID:'5',
    			name:'Dance To This',
    			album:'Dance To This',
                artist:'Troye Sivan',
    			duration:'03:51',
    			Flag:false,
                isopen:false,
                image:'http://pic4.qqmofasi.com/2014/10/15/2_ueHSmY3mYiAVESBvCYhS_square.jpg',
                rankType:'5'
                },
                {
                ID:'6',
    			name:'如约而至',
    			album:'如约而至',
                artist:'许嵩',
    			duration:'04:15',
    			Flag:false,
                isopen:false,
                image:'http://p.kengdie.com/touxiang/1611/12/171634923.jpg',
                rankType:'1'
                },
                {
                ID:'7',
    			name:'体面',
    			album:'体面',
                artist:'于文文',
    			duration:'04:42',
    			Flag:false,
                isopen:false,
                image:'http://image.woshipm.com/wp-files/2015/04/e9bfbb7dd8506836ca7f2d7b3842c461.jpg',
                rankType:'1'
                },
                {
                ID:'8',
    			name:'That Girl',
    			album:'That Girl',
                artist:'Olly Murs',
    			duration:'02:56',
    			Flag:false,
                isopen:false,
                image:'http://img.jf258.com/uploads/2014-07-30/073515540.jpg',
                rankType:'1'
                },           
            ],
            dialogVisible:false,
    		ruleForm: {
    			name: '',
    			des: ''
    		},
    		rules: {
    			name: [
    			{required: true, message: '请输入歌单名称', trigger: 'blur'},
    			{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
    			],
    			des: [
    			{min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
    			]
    		},
    		userID:'',
    		state:true,
            artist:{
    			ID:'001',
    			name:'周杰伦',
    			image:'',
    			country:'中国',
    			birthplace:'台湾省新北市',
    			occupation:'音乐人、制作人、导演、企业家等',
    			birthday:'1979-01-18',
    			representative:'《龙卷风》、《菊花台》、《青花瓷》、《晴天》',
    			intro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。	2000年被吴宗宪发掘，发行首张个人专辑《Jay》。	2001年发行专辑《范特西》。2002年在中国、新加坡、马来西亚、美国等地举办首场个人世界巡回演唱会。	2003年登上美国《时代周刊》亚洲版封面人物。周杰伦的音乐融合中西方元素，风格多变，四次获得世界音乐大奖最畅销亚洲艺人。凭借专辑《Jay》、《范特西》、《叶惠美》及《跨时代》四次获得金曲奖"最佳国语专辑"奖，并凭借《魔杰座》、《跨时代》获得第20届和第22届金曲奖“最佳国语男歌手”奖； 						2014年获QQ音乐年度盛典“港台最受欢迎男歌手”及压轴大奖“最佳全能艺人”。	2005年开始涉足影视，以电影《头文字D》获第42届台湾电影金马奖及第25届香港电影金像奖“最佳新人”奖。	2006年起连续三年获得世界音乐大奖中国区最畅销艺人奖。	2007年自立门户，成立JVR（杰威尔）有限公司，自编自导自演的电影《不能说的秘密》获得第44届台湾电影金马奖“年度台湾杰出电影”奖。	2008年凭借歌曲《青花瓷》获得第19届金曲奖最佳作曲人奖。	2009年入选美国CNN亚洲极具影响力人物；同年凭借专辑《魔杰座》获得第20届金曲奖最佳国语男歌手奖。2010年入选美国《Fast Company》评出的“全球百大创意人物”。2011年凭借专辑《跨时代》再度获得金曲奖最佳国语男歌手奖，并且第4次获得金曲奖最佳国语专辑奖；同年主演好莱坞电影《青蜂侠》。																					2012年登福布斯中国名人榜榜首。										2013年自编自导自演第二部电影《天台爱情》取得了不俗的票房与口碑。	2014年加盟好莱坞电影《惊天魔盗团2》；同年发行华语乐坛首张数字音乐专辑《哎呦，不错哦》。	娱乐圈外，周杰伦在2011年跨界担任华硕（ASUS）笔电外观设计师并入股香港文化传信集团。2012在中国内地开设真爱范特西连锁KTV。	除了力拼自己的事业，周杰伦还热心公益慈善活动，多次向内地灾区捐款并与众多艺人募款新建希望小学。			2015年担任《中国好声音 第四季》导师。			2016年发行演唱会专辑《周杰伦魔天伦世界巡回演唱会》；同年推出专辑《周杰伦的床边故事》。	2017年，确认加盟原创专业音乐节目《中国新歌声第二季》。',
    			isCollected:false
    		},
    		playlistList:[{
    			ID:'1',
    			name:'1'
    	      },
        	  {
          		ID:'2',
          		name:'2'
        	  },
        	  {
          		ID:'3',
          		name:'3'
    		}],
        }
    },
    components: {
        vNav,
        vHeader,
        vFoot,
    },
    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      }
    },
    mounted() {
      this.rankDisplay(1,1);
      this.getArtistInfo(this.artist.ID);
      this.getPlaylistList(this.userID);
    },
    methods:{
        rankChange: function(obj){
        var a=document.getElementById("rankType").getElementsByTagName("el-button");
        //a[0].className="current";
            for(var i=0;i<a.length;i++){
            if(i == obj){
                a[i].className="current";
            }
            else{
                a[i].className="";
            }
            }
        },
        setSong: function(item){
            this.songs.name = item
        },
        setArtist: function(item){
            this.songs.artist = item
        },
        handleChange: function(val){
            this.rankDisplay(0,val);
        },
        rankDisplay: function(_rankType, _page){
            if(_page != this.page){
            _rankType = this.rankType;
            this.page = _page;
            } 
            else {
            this.rankType = _rankType;
            _page = this.page
            }
            //get排行榜展示内容数据
            this.axios.get(this.serverUrl + "/song/", {
            params: {
                rankType: _rankType,
                page: _page
            }
            })
            .then(res => {
            this.songs = res.data;
            console.log(res.data);
            for(var i = 0; i < res.data.length; i++){
                this.songs[i].image = this.serverUrl + this.songs[i].image;
                this.songs[i].name = this.serverUrl + this.songs[i].name;
                this.songs[i].artist = this.serverUrl + this.songs[i].artist;
                this.songs[i].duration = this.serverUrl + this.songs[i].duration;
            }
            
            console.log(this.songs)
                //get歌曲分页数据
                this.axios.get(this.serverUrl + "/rank/", {
                params: {
                    rankType: _rankType,
                }
                })
                .then(res => {
                this.pageCount = Math.ceil(parseFloat(res.data) / 20);
                
                console.log(this.songs)
                })
                .catch(function (error) {
                console.log(error);
                });

            })
            .catch(function (error) {
            console.log(error);
            });
        },
        playSong:function(row){
		//传递歌曲ID给player.vue
	    },
        submitForm:function(formname){
		//提交playlist对象，包括歌单名称和简介，返回-1用户会话超时
			this.$refs[formname].validate((valid) => {
  				if (valid) {
    				alert('submit!');
    				this.dialogVisible=false;
    				this.$refs[formname].resetFields();
  				} else {
    				alert('error submit!!');
    			return false;
  				}
		    });
	    },
        downloadSong:function(row){
		//提交歌曲ID，无返回
		},
        handleSongCommand:function(command){
  			if(command=="login"){
    			window.location.href='/';
  			}
  			else if(command=="newplaylist"){
    			this.dialogVisible=true;
  			}
  				else if(command=="playqueue"){
		//传递歌曲ID给player.vue
		    }
			else{
		//提交歌曲ID和歌单ID，返回false则用户会话超时
			console.log(command.param1);
			console.log(command.param2.ID)
		    }
	    },
        playAllSong:function(){
		//传递所有歌曲ID给player.vue
		},
            	handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
        },
        handleMouseEnter:function(row, column, cell, event){
        row.Flag=true;
        },
        handleMouseOut:function(row, column, cell, event){
        if(!row.isopen){
          row.Flag=false;}
          else{
            return false;
          }
        },
        handle:function(row,event){
          row.Flag=event;
          row.isopen=event;
        },
        getArtistInfo:function(artistID){
		//提交歌手ID，获得其信息
		},
		getPlaylistList:function(){
		//无提交，返回歌单列表
        },
        handleAlbumCommand:function(command){
        if(command=="login"){
            window.location.href='/';
        }
        if(command=="newplaylist"){
            this.dialogVisible=true;
        }
        else if(command=="playqueue"){
        //传递所有歌曲ID给player.vue
        }
        else{
        //提交专辑ID和歌单ID，返回false则用户会话超时
        console.log(command.params);
        }
        },
	},
    
}
</script>
<style>
.navMenu{
    margin-left:100px;
    margin-top:50px;
    margin-bottom:30px;
    height:80%;
    text-align:center;
}
.rankTitle{
    margin-left:8px;
}
.rankMenu{
    margin:0 auto;
}
.menubtn{
    color:#31c27c;
}
.pagination{
    color:#31c27c;
    text-align: center;
    font-size: 20px;
}
.display{
    margin-left:50px;
}
.pagination {
text-align: center;
font-size: 20px;
margin:0 auto;
}
.displayTitle{
    margin-left:20px;
}
.songImg{
  width:30px;
  height:30px;
}
#dropdown{
    margin-left:20px;
}
</style>