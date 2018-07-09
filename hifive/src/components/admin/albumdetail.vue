<template>
  <div class="wrapper">
    <v-head></v-head>
    <div id="albumdetail" :data="album">
      <el-row :gutter="50" style="background: linear-gradient(#F2F2F2, #FFFFFF);">
        <el-col :span="4" :offset="3">
          <div>
            <img align=right style="width:230px;height:230px;margin-top:20px" :src=album.image>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="font_albumName" style="margin-bottom:0px">{{album.name}}</p>
            <i class="el-icon-service"></i>
            <router-link :to="{ path: '/admin/artistdetail', query: { id: album.artistId }}">
              <span class="font_albumArtistName"  style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{album.artistName}}</span>
            </router-link>
            <div>
              <p class="font_other">流派 : {{album.style}}</p>
              <p class="font_other">发行时间 : {{album.releaseDate}}</p>
            </div>
            <el-button icon="el-icon-edit" v-on:click="clickOnEdit">编辑专辑</el-button>
            <el-button icon="el-icon-plus" v-on:click="addDialogVisible=true;">添加歌曲</el-button>
            <el-button icon="el-icon-delete" v-on:click="deleteAlbum">删除专辑</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="编辑专辑" :visible.sync="editDialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="editAlbum" :rules="editRules" ref="editAlbum" label-width="100px">
          <el-form-item label="专辑名称" prop="name">
            <el-input v-model="editAlbum.name" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="专辑封面" prop="image">
            <el-upload ref="upload1" :auto-upload="false" action="http://192.168.20.99:8080/hifive/upload/uploadAlbumImage" :data={id:album.id} :show-file-list="false" :on-change="editImage" :before-upload="beforeAvatarUpload" :on-success="upload1Success" :on-error="handleError1">
              <img :src="editAlbum.image" class="img">
            </el-upload>
          </el-form-item>
          <el-form-item label="歌手" prop="artistName" style="float:left">
            <el-input disabled v-model="editAlbum.artistName" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="流派" prop="style">
            <el-select v-model="editAlbum.style">
              <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-select v-model="editAlbum.region">
              <el-option
              v-for="item in regionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="发行时间" prop="releaseDate">
            <el-date-picker v-model="editAlbum.releaseDate" type="date" placeholder="请选择发行时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="editAlbum.intro" type="textarea" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:80%;"></el-input>
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:25%;">
            <el-button type="primary" @click="uploadForm1">完成</el-button>
            <el-button @click="editDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="添加歌曲" :visible.sync="addDialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="addSong" :rules="addRules" ref="addSong" label-width="100px">
          <el-form-item label="歌曲名称" prop="name" placeholder="请输入歌曲名称">
            <el-input v-model="addSong.name" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="歌曲图片" prop="image">
            <el-upload ref="upload2" :auto-upload="false" action="http://192.168.20.99:8080/hifive/upload/uploadSongImage" :data={id:addSong.id} :show-file-list="false" :on-change="addImage" :before-upload="beforeAvatarUpload" :on-success="upload2Success" :on-error="handleError2">
              <img :src="addSong.image" class="img">
            </el-upload>
            <el-upload ref="upload3" :auto-upload="false" action="http://192.168.20.99:8080/hifive/upload/uploadSongFile" :data={id:addSong.id} :on-change="addFilePath" :on-success="upload3Success" :on-error="handleError3" style="height:90px;">
              <el-button slot="trigger">选取歌曲文件</el-button>
            </el-upload>
            <el-upload ref="upload4" :auto-upload="false" action="http://192.168.20.99:8080/hifive/upload/uploadLyrics" :data={id:addSong.id} :on-change="addLyricsPath" :on-success="upload4Success" :on-error="handleError4" style="height:90px;">
              <el-button slot="trigger">选取歌词文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="歌手" prop="artistName" style="float:left;">
            <el-input disabled v-model="album.artistName" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-select v-model="addSong.region">
              <el-option
              v-for="item in regionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属专辑" prop="albumName" style="float:left;">
            <el-input disabled v-model="album.name" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="流派" prop="style">
            <el-select v-model="addSong.style" placeholder="请选择歌曲流派">
              <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="语种" prop="language">
            <el-input v-model="addSong.language" placeholder="请输入歌曲语种" style="width:35%;"></el-input>
          </el-form-item>
          <el-form-item label="发行时间" prop="releaseDate">
            <el-date-picker v-model="addSong.releaseDate" type="date" placeholder="请选择发行时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:25%;">
            <el-button type="primary" @click="submitForm2">完成</el-button>
            <el-button @click="addDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-row>
        <el-col :span="16" :offset="2">
          <div>
            <el-table :data="songList" :stripe=true style="width:95%;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
              <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
              <el-table-column label="歌曲" width=400>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/admin/songdetail', query: { id: scope.row.id }}">
                    <span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="歌手" width=200>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/admin/artistdetail', query: { id: scope.row.artistId }}">
                    <span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                </router-link>
                </template>
              </el-table-column>
              <el-table-column label="时长">
                <template slot-scope="scope">
                  <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteSong(scope.row,scope.$index)"></el-button></span>
                  <span v-else class="font_other">{{scope.row.duration}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <p class="font_albumIntro">简介</p>
            <p id="albumIntro" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;" class="font_other">{{album.intro}}</p>
            <el-popover v-if="isOverflow" placement="left" title="专辑简介" trigger="click" width=500>
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
  import vHead from '../admin/header.vue'
  import vFoot from '../user/common/footer.vue'
  
  export default {
     components: {
      vHead,
      vFoot
    },
    data(){
      return{
        isOverflow:'',
        isImgChange:false,
        editRules: {
        name: [
        { required: true, message: '请输入专辑名称', trigger: 'blur' },
        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        style:[
        {required: true, message: '请选择专辑流派', trigger: 'blur'},
        ],
        region:[
        {required: true, message: '请选择专辑地区', trigger: 'blur'},
        ],
        releaseDate:[
        {required: true, message: '请选择专辑发行时间', trigger: 'blur'},
        ],
        intro: [
        { min: 1, max: 680, message: '长度在 680 个字符以内', trigger: 'blur' }
        ]
        },
        addRules: {
        name: [
        { required: true, message: '请输入歌曲名称', trigger: 'blur' },
        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        language:[
        {required: true, message: '请输入歌曲语种', trigger: 'blur'},
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        style:[
        {required: true, message: '请选择歌曲流派', trigger: 'blur'},
        ],
        region:[
        {required: true, message: '请选择歌曲地区', trigger: 'blur'},
        ],
        releaseDate:[
        {required: true, message: '请选择歌曲发行时间', trigger: 'blur'},
        ],
        },
        album:{
          id:'',
          name:'',
          artistId:'',
          artistName:'',
          image:'',
          style:'',
          releaseDate:'',
          region:'',
          count:'',
          intro:'',
        },
        editAlbum:{
        },
        addSong:{
          id:'',
          name:'',
          image:require('../../assets/点击添加图片.png'),
          artistId:'',
          artistName:'',
          albumName:'',
          language:'',
          style:'',
          lyricsPath:'',
          filePath:'',
          region:'',
          releaseDate:'',
        },
        songList: [],
        editDialogVisible:false,
        addDialogVisible:false,
        style: ['', 'POP 流行', 'ELECTRONIC 电子','ROCK 摇滚' ,'CLASSIC 古典','FOLK 民谣', 'R&B', '其他'],
        region:['', '内地', '港台', '欧美', '日韩', '其他'],
        styleOptions: [{
          value: 0,
          label: '全部',
        },{
          value: 1,
          label: 'POP 流行',
        }, {
          value: 2,
          label: 'ELECTRONIC 电子',
        }, {
          value: 3,
          label: 'ROCK 摇滚',
        }, {
          value: 4,
          label: 'CLASSIC 古典',
        }, {
          value: 5,
          label: 'FOLK 民谣',
        },{
          value: 6,
          label: 'R&B',
        }, {
          value: 7,
          label: '其他',
        },],
        regionOptions: [{
          value: 0,
          label: '全部',
        },{
          value: 1,
          label: '内地',
        }, {
          value: 2,
          label: '港台',
        }, {
          value: 3,
          label: '欧美',
        }, {
          value: 4,
          label: '日韩',
        }, {
          value: 5,
          label: '其他',
        },],
      }
    },
    methods: {
      indexMethod(index) {
        return index+1;
      },
      handleOverflow:function(){
        var offsetHeight = document.getElementById("albumIntro").offsetHeight;  
        var scrollHeight = document.getElementById("albumIntro").scrollHeight;
        if (offsetHeight < scrollHeight) {
          this.isOverflow=true;
        }
        else{
          this.isOverflow=false;
        }
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
         row.Flag=false;
      },
      clickOnEdit:function(){
        this.editDialogVisible=true;
        var temp={
          id:this.album.id,
          name:this.album.name,
          artistId:this.album.artistId,
          artistName:this.album.artistName,
          image:this.album.image,
          style:this.getStyleNumber(this.album.style),
          releaseDate:this.album.releaseDate,
          region:this.getRegionNumber(this.album.region),
          count:this.album.count,
          intro:this.album.intro,}
        this.editAlbum=temp;
      },
      editImage:function(file,filelist){
        this.isImgChange=true;
        this.editAlbum.image=file.url;
        if(filelist.length>1){
          filelist.splice(0,1);
        }
      },
      addImage:function(file,filelist){
        this.addSong.image=file.url;
        if(filelist.length>1){
          filelist.splice(0,1);
        }
      },
      addFilePath:function(file,filelist){
        this.addSong.filePath=file.url;
        if(filelist.length>1){
          filelist.splice(0,1);
        }
      },
      addLyricsPath:function(file,filelist){
        this.addSong.lyricsPath=file.url;
        if(filelist.length>1){
          filelist.splice(0,1);
        }
      },
      handleError1:function(){
        this.$message({
          showClose: true,
          message: '专辑图片上传失败',
          type: 'error'
        });
      },
      handleError2:function(){
        this.$message({
          showClose: true,
          message: '歌曲图片上传失败',
          type: 'error'
        });
        this.$refs.upload2.clearFiles();
      },
      handleError3:function(){
        this.$message({
          showClose: true,
          message: '歌曲文件上传失败',
          type: 'error'
        });
        this.$refs.upload3.clearFiles();
      },
      handleError4:function(){
        this.$message({
          showClose: true,
          message: '歌词文件上传失败',
          type: 'error'
        });
        this.$refs.upload4.clearFiles();
      },
      uploadForm1:function(){
        this.$refs["editAlbum"].validate((valid) => {
          if (valid) {
            if(this.isImgChange){
              this.$refs.upload1.submit();
              this.isImgChange=false;
            }
            this.submitForm1();
          }
          else {
            this.$message({
              showClose: true,
              message: '格式不正确',
              type: 'error'
            });
          }
        });
      },
      upload1Success:function(){
        this.submitForm1();
      },
      submitForm1:function(){
        this.axios.post(this.serverUrl+'/album/modifyAlbum',{
          id:this.editAlbum.id,
          name:this.editAlbum.name,
          intro:this.editAlbum.intro,
          region:this.editAlbum.region,
          style:this.editAlbum.style,
          releaseDate:this.editAlbum.releaseDate,
        })
        .then(response =>{
          if(response){
            this.getAlbumInfo();
            this.editDialogVisible=false;
            this.$message({
              showClose: true,
              message: '专辑编辑成功',
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
          console.log(err);
        });
      },
      upload2Success:function(){
          this.$refs.upload2.clearFiles();
      },
      upload3Success:function(){
          this.$refs.upload3.clearFiles();
      },
      upload4Success:function(){
          this.$refs.upload4.clearFiles();
      },
      submitForm2:function(){
        this.$refs["addSong"].validate((valid) => {
          if (valid) {
            this.axios.post(this.serverUrl+'/song/addSong',{
              name:this.addSong.name,
              albumId:this.album.id,
              language:this.addSong.language,
              style:this.addSong.style,
              releaseDate:this.addSong.releaseDate,
            })
            .then(response =>{
              if(response.data!=-1){
                this.addDialogVisible=false;
                this.addSong.id=response.data;
                this.$nextTick(()=>{
                  this.$refs.upload2.submit();
                  this.$refs.upload3.submit();
                  this.$refs.upload4.submit();
                });
                this.$refs["addSong"].resetFields();
                this.getAlbumInfo();
                this.$message({
                  showClose: true,
                  message: '歌曲添加成功',
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
              console.log(err);
            });
          }
          else {
            this.$message({
              showClose: true,
              message: '格式不正确',
              type: 'error'
            });
          }
        });
      },
      deleteAlbum:function(){
        this.$confirm('确认删除？')
        .then(_ => {
          this.axios.get(this.serverUrl+'/album/removeAlbum',{
            params:{
              id:this.album.id,
            }
            })
            .then(response =>{
              if(response){
                this.$message({
                  showClose: true,
                  message: '专辑删除成功',
                  type: 'success'
                });
                this.$router.go(-1);
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
              console.log(err);
            });
        })
        .catch(_ => {});
      },
      deleteSong:function(row,index){
        this.$confirm('确认删除？')
        .then(_ => {
          this.axios.get(this.serverUrl+'/song/removeSong',{
            params:{
              songId:row.id,
            }
            })
            .then(response =>{
              if(response){
                this.songList.splice(index,1);
                this.$message({
                  showClose: true,
                  message: '歌曲删除成功',
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
              console.log(err);
            });
        })
        .catch(_ => {});
      },
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpg'||'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isType) {
          this.$message.error('上传头像图片只能是jpg/jpeg/png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isType && isLt2M;
      },
      timestampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        if(D < 10) D = '0' + D;
        return Y+M+D;
      },
      getAlbumInfo:function(){
        this.axios.get(this.serverUrl+'/album/getInfo',{
          params:{
            id:this.album.id
          }
        })
        .then(response => {
          this.album = response.data;
          if(this.album.image==null){
            this.album.image=require('../../assets/暂无图片.png');
          }
          else{
            this.album.image = this.serverUrl + this.album.image;
          }
          this.album.releaseDate = this.timestampToTime(this.album.releaseDate);
          this.album.style = this.style[this.album.style];
          this.album.region=this.region[this.album.region];
          this.songList = this.album.songList; 
          for(var i = 0; i < this.songList.length; i++){
            this.$set(this.songList[i],'Flag',false);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },
      getStyleNumber:function(style){
        var number=-1;
        for(var i=0;i<this.style.length;i++){
           if(style==this.style[i]){
            number=i;
           }
        }
        return number;
      },
      getRegionNumber:function(region){
        var number=-1;
        for(var i=0;i<this.region.length;i++){
          if(region==this.region[i]){
            number=i;
           }
        }
        return number;
      },
    },
    created(){
      this.album.id=this.$route.query.id;
      window.scrollTo(0,0);
    },
    computed:{
      serverUrl(){
        return this.$store.state.serverUrl;
      },
      state(){
        return this.$store.state;
      }
    },
    mounted(){
      this.getAlbumInfo();
    },
    updated:function(){
      this.handleOverflow();
    }
}
</script>
<style>
#albumdetail{
  padding: 0px 30px;
}
.img {
    width: 178px;
    height: 178px;
    display: block;
  }
.spHeight td{
  height:70px;
}
.el-popover{
  width:550px;
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
a {
     text-decoration:none;
     out-line: none;
  }
</style>
