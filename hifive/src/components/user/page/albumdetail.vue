<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-nav></v-nav>
    <div id="albumdetail" :data="album">
      <el-row :gutter="50">
        <el-col :span="4" :offset="4">
          <div>
            <img align=right style="margin-top:30px" src='album.image'>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="font_albumName">{{album.name}}</p>
            <i class="el-icon-service"></i>
            <a herf="" class="font_albumArtistName"  style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{album.artistName}}</a>
            <div>
              <p class="font_other">流派 : {{album.style}}</p>
              <p class="font_other">发行时间 : {{album.releaseDate}}</p>
            </div>
            <el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
            <el-button v-if="album.isCollected" icon="el-icon-star-on" v-on:click="cancelCollect">已收藏</el-button>
            <el-button v-else icon="el-icon-star-off" v-on:click="collect">收藏</el-button>
            <el-dropdown trigger="click" @command="handleAlbumCommand">
              <el-button icon="el-icon-plus" v-on:click="getPlaylistList">添加到<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" :data="playlistList">
                <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                <div v-if="isLogin">
                  <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                  <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                  <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                </div>
                <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col :span="13" :offset="3">
          <div>
            <el-table :data="songList" style="height:600px;width: 100%" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
              <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
              <el-table-column label="歌曲">
                <template slot-scope="scope">
                  <a herf="" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column label=" ">
                <template slot-scope="scope">
                  <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.row)"></el-button> </span>
                  <span v-if="scope.row.Flag"> 
                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                      <el-button icon="el-icon-plus" circle></el-button>
                      <el-dropdown-menu slot="dropdown" :data="playlistList">
                        <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                        <div v-if="isLogin">
                          <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                          <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
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
                      <el-form-item label="歌单简介" prop="intro">
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
              <el-table-column label="歌手">
                <template slot-scope="scope">
                  <a herf="" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="duration" label="时长">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <p class="font_albumIntro">简介</p>
            <p id="albumIntro" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;" class="font_other">{{album.intro}}</p>
            <el-popover v-if="isOverflow" placement="left" title="专辑简介" trigger="click">
              <p class="font_other">{{album.intro}}</p>
              <el-button type="text" slot="reference" style="color:black" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
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
          intro: ''
        },
        rules: {
          name: [
          { required: true, message: '请输入歌单名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          intro: [
          { min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
          ]
        },
        isOverflow:'',
        isLogin:true,
        album:{
          id:'001',
          name:'心之科学',
          artistId:'',
          artistName:'容祖儿',
          region:'',
          style:'Pop流行',
          releaseDate:'2018-06-16',
          intro:'容祖儿《心之科学》情伤毋须科学深究理性分析无助爱意挽留爱的久了，似乎就会开始计算，计算「他」满足「我」多少条件，计算谁爱谁多一点，谁付出得多一点。爱到最后，分开了，又会计算，是不是「我」哪里做得不够，「他」欠「我」的什么时候还？似乎遇上失恋，我们每每机械式地自怨自艾，就在自己痛得肝肠寸断，心胆俱裂之际，好想为这份痛找个因由，当作心灵救治，让自己输得明明白白，继而重新振作开展另一段感情。虽则，好可能又是另一趟循环的开始。容祖儿的全新广东歌《心之科学》，由Howie Yung、林家谦作曲，黄金柏档黄伟文填词。这是一首疗愈系情歌，特别要留给遇上情伤的你。歌词没有如陪你疗伤的死党一样，尽数对方的不是，力赞你的可人处，而是将这段感情事提升到跟宇宙神明一样诡祕，一样难以捉摸的事情，提醒你别太理性，硬要在感情事上寻找一个分手理由。歌名中「科学」二字，代表精密计算，有肯定有对错。但我们的心，真的可以直接推算吗？或者科学可以解释爱情现象，却不可解决爱情的问题，既没有定理，也无迹可寻，就如歌词一句︰「神也摸不透的 问你怎么与它 斗气」去执著谁对谁错，还重要么？去到副歌部分︰「情人不爱你 还不爱你 凭什么否定你」，跟过去的失恋自强作品一样，就是要你别轻易被打沉，自我价值从不因一段感情可以议价，只有对自己肯定才不致软弱到任人伤害。歌中最点题一句︰「无人生哲理 能急救你 唯独这歌 赠你」很多人失恋时，都急想要一句半句振奋说话让自己坚强起来，祖儿这首歌便肩负起这个责任。幸福既然随机，别心死、别泄气，安抚了受伤的你，就得重新做回自己。',
          image:'',
          isCollected:false
        },
        songList: [{
          id:'1',
          name:'心之科学',
          duration:'03:55',
          albumId:'',
          albumName:'',
          artistId:'',
          artistName:'容祖儿',
          filePath:'',
          image:'',
          lyricsPath:'',
          Flag:false,
          isopen:false,
        },{
          id:'2',
          name:'心之科学',
          duration:'03:55',
          albumId:'',
          albumName:'',
          artistId:'',
          artistName:'容祖儿',
          filePath:'',
          image:'',
          lyricsPath:'',
          Flag:false,
          isopen:false,
        }],
        playlistList:[{
          id:'1',
          name:'1',
          count:'',
        },
        {
          id:'2',
          name:'2',
          count:'',
        },
        {
          id:'3',
          name:'3',
          count:'',
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
        collect:function(){
          this.album.isCollected=true;
          this.$axios.get('',{
            params:{
              id:this.album.id
            }
          })
          .then(function(response){
            if(response){
              this.$message({
                showClose: true,
                message: '收藏专辑成功',
                type: 'success'
              });
            }
            else{
              this.$message({
                showClose: true,
                message: '会话超时',
                type: 'error'
              });
            }
          })
          .catch(function(err){
            console.log(err)
          });
        },
        cancelCollect:function(albumId){ 
          this.album.isCollected=false;
          this.$axios.get('',{
            params:{
              id:this.album.id
            }
          })
          .then(function(response){
            if(response){
              this.$message({
                showClose: true,
                message: '取消收藏成功',
                type: 'success'
              });
            }
            else{
              this.$message({
                showClose: true,
                message: '会话超时',
                type: 'error'
              });
            }
          })
          .catch(function(err){
            console.log(err)
          });
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
            this.$axios.get('',{
              params:{
                id:this.album.id,
                playlistId:command.params
              }
            })
            .then(function(response){
              if(response){
                this.$message({
                  showClose: true,
                  message: '已成功添加到歌单',
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: '会话超时',
                  type: 'error'
                });
              }
            })
            .catch(function(err){
              console.log(err)
            });
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
            this.$axios.get('',{
              params:{
                id:command.param2.id,
                playlistId:command.param1
              }
            })
            .then(function(response){
              if(response){
                this.$message({
                  showClose: true,
                  message: '已成功添加到歌单',
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: '会话超时',
                  type: 'error'
                });
              }
            })
            .catch(function(err){
              console.log(err)
            });
          }
        },
        submitForm:function(formname){
          //提交playlist对象，包括歌单名称和简介，返回-1用户会话超时
          this.$refs[formname].validate((valid) => {
            if (valid) {
              this.$axios.get('',{
                params:{
                  
                }
              })
              .then(function(response){
                if(response){
                  this.$message({
                    showClose: true,
                    message: '已成功添加到新歌单',
                    type: 'success'
                  });
                }
                else{
                  this.$message({
                    showClose: true,
                    message: '会话超时',
                    type: 'error'
                  });
                }
              })
              .catch(function(err){
                console.log(err)
              });
              this.dialogVisible=false;
              this.$refs[formname].resetFields();
            } 
            else {
              this.$message({
                    showClose: true,
                    message: '格式不正确',
                    type: 'error'
              });
              return false;
            }
          });
        },
        downloadSong:function(row){
          this.$axios.get('',{
                params:{
                  id:row.id
                }
              })
              .then(function(response){
                if(response){
                  this.$message({
                    showClose: true,
                    message: '下载成功',
                    type: 'success'
                  });
                }
                else{
                  this.$message({
                    showClose: true,
                    message: '下载失败',
                    type: 'error'
                  });
                }
              })
              .catch(function(err){
                console.log(err)
              });
        },
        getAlbumInfo:function(albumId){
          this.$axios.get(this.serverUrl+'/getInfo',{
                params:{
                  id:this.album.id
                }
              })
              .then(function(response){
                this.album = response.data;
                this.songList = this.album.songList;
              })
              .catch(function(err){
                console.log(err)
              });
        },
        getPlaylistList:function(){
          this.$axios.get('',{
                params:{
                  id:this.album.id
                }
              })
              .then(function(response){
                
              })
              .catch(function(err){
                console.log(err)
              });
        },
handleOverflow:function(){
  var offsetWidth = document.getElementById("albumIntro").offsetHeight;  
  var scrollWidth = document.getElementById("albumIntro").scrollHeight;
  if (offsetWidth < scrollWidth) {
    this.isOverflow=true;
  }
  else{
    this.isOverflow=false;
  }
}
},
computed:{
  serverUrl(){
    return this.$store.state.serverUrl;
  }
},
mounted:function(){
  this.album=this.$store.state.album
  this.getAlbumInfo(this.album.id);
  this.handleOverflow();
  this.getPlaylistList();
}
}
</script>
<style>
#app{
  padding: 30px;
}
.spHeight td{
  height:65px;
}
.el-popover{
  width:550px;
  height:400px;
  word-wrap: break-word; 
  word-break: normal; 
  overflow-x:hidden;
  overflow-y:scroll;
}
.font_albumName{
  font-family:"Microsoft YaHei";
  font-size:xx-large;
}
.font_albumArtistName{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_albumIntro{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_other{
  font-family:"Hiragino Sans GB";
  font-size:Medium;
}
</style>
