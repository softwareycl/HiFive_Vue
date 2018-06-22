<template>
	<div>
      <v-head></v-head>
      <v-nav></v-nav>
      <div class="main" id="artistdetail" :data="artist">
      	<el-row :gutter="50">
      		<el-col :span="4" :offset="4">
      			<div>
      				<img align=right style="float: left;margin-top:30px; border-radius:70%; height: 230px; overflow:hidden;" src=''>
      			</div>
      		</el-col>
      		<el-col :span="8">
      			<div style="width: 300px;">
      				<p class="font_artistName">{{artist.name}}</p>
      			</div>
      			<div style=" width: 800px; height: 5px;">
      				<p class="font_other" style="float: left; margin-right: 10px;">国籍:{{artist.country}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">出生地:{{artist.birthplace}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">生日:{{artist.birthday}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">职业:{{artist.occupation}}</p>
      			</div>
      			<div style=" width: 900px; margin-top: 5px;">
      				<p class="font_rep" style="float: left; margin-right: 10px; margin-bottom: 20px;">代表作:{{artist.representative}}</p>
      				<p style="width: 100px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden; float: left;" class="font_des">简介:{{artist.intro}}</p>
      				<el-popover placement="left" title="歌手简介" trigger="click" style="float: left;">
      					<p class="font_des">{{artist.intro}}</p>
      					<el-button type="text" slot="reference" style="color: black; margin-left: 20px; padding-top: 8px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
      				</el-popover>
      			</div>
      			<el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
      		</el-col>
      	</el-row>
      	<el-row :gutter="50">
      		<el-col :span="12" :offset="4">
      			<div style="width: 1000px; margin-top: 50px">
      				<p style="font-family:'Microsoft YaHei'; font-size:x-large">热门歌曲</p>
      				<el-table :data="songList" style="width: 100%" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
      					<el-table-column type="index" label= " " :index="indexMethod"></el-table-column>
      					<el-table-column label="歌曲">
      						<template slot-scope="scope">
      							<a href="" style="color: black; cursor:  pointer; text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>      
      						</template>
      					</el-table-column>
      					<el-table-column label=" ">
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
                 		 		<span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> </span>
                		</template>
              </el-table-column>
       					<el-table-column label="专辑">
      						<template slot-scope="scope">
      							<a href="" style="color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.album}}</a>
      						</template>
      					</el-table-column>
      					<el-table-column prop="time" label="时长"></el-table-column>
      				</el-table>
      			</div>
      		</el-col>
      	</el-row>
      	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page
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
    		songList: [{
    			ID:'1',
    			name:'不爱我就拉倒',
    			album:'不爱我就拉倒',
    			time:'04:05',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'2',
    			name:'告白气球',
    			album:'周杰伦的床边故事',
    			time:'03:35',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'3',
    			name:'等你下课（with 杨瑞代）',
    			album:'等你下课',
    			time:'04:30',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'4',
    			name:'稻香',
    			album:'魔杰座',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'5',
    			name:'晴天',
    			album:'叶惠美',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'6',
    			name:'青花瓷',
    			album:'我很忙',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'7',
    			name:'退后',
    			album:'依然范特西',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'8',
    			name:'七里香',
    			album:'七里香',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'9',
    			name:'简单爱',
    			album:'范特西',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		},{
    			ID:'10',
    			name:'给我一首歌的时间',
    			album:'魔杰座',
    			time:'03:43',
    			Flag:false,
    			isopen:false
    		}],
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
    		}]
    	}
    },
    methods: {
    	indexMethod(index) {
    		return index+1;
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
        playAllSong:function(){
		//传递所有歌曲ID给player.vue
		},
		collect:function(albumID){
  			this.album.isCollected=true;
		//提交专辑id，返回true/false
		},
		cancelCollect:function(albumID){ 
  			this.album.isCollected=false;
		//提交专辑id，返回true/false
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
		playSong:function(row){
		//传递歌曲ID给player.vue
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
		getAlbumInfo:function(albumID){
		//提交专辑ID，获得专辑信息和歌曲列表
		},
		getPlaylistList:function(){
		//无提交，返回歌单列表
		},
	},
		mounted:function(){
  			this.getAlbumInfo(this.album.ID);
  			this.getPlaylistList(this.userID);
	}
}
</script>

<style>
	.main {
   		height: 1500px;
    	opacity: 0.95;
    	position: relative;
    	color: #333;
  	}
	.el-popover{
		width:550px;
  		height:400px;
  		word-wrap: break-word; 
        word-break: normal; 
        overflow-x:hidden;
        overflow-y:scroll;
	}
	.font_artistName{
        font-family:"Microsoft YaHei";
        font-size:xx-large;
        margin-top: 50px;
        margin-bottom: 5px;
	}
	.font_other{
        font-family:"Microsoft YaHei";
        font-size:Medium;
    }
   	.font_des{
        font-family:"Microsoft YaHei";
        font-size:Medium;
        margin-top: 5px;
    }
    .font_rep{
    	font-family:"Microsoft YaHei";
    	font-size:Medium;
    	margin-top: 5px;
    }
</style>