<template>
  <div>
      <v-head></v-head>
      <div class="main" id="artistdetail" :data="artist">
        <el-row>
          <el-col :span="4" :offset="4">
            <div>
              <img align=right style="float:left;margin-top:30px; border-radius:100%; width:200px; height: 200px; overflow:hidden;" :src=artist.image>
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
              <p v-if="artist.occupation" class="font_other" style="float: left; margin-right: 10px;">职业:{{artist.occupation}}</p>
            </div>
            <div style=" width: 900px; margin-top: 5px;">
              <p v-if="artist.representative != null && artist.representative != ''" class="font_rep" style="float: left; margin-right: 10px; margin-bottom: 20px;">代表作:{{artist.representative}}</p>
              <p v-if="artist.intro != null && artist.intro != ''" style="width: 100px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden; float: left;" class="font_des">简介:{{artist.intro}}</p>
              <el-popover v-if="artist.intro != null && artist.intro != ''" placement="left" title="歌手简介" trigger="click" style="float: left;">
                <p class="font_des" style="width: 600px">{{artist.intro}}</p>
                <el-button type="text" slot="reference" style="color: black; margin-left: 20px; padding-top: 8px" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
              </el-popover>
            </div>
            <div style="margin-top: 65px;">
              <el-button icon="el-icon-edit" v-on:click="clickOnEdit">编辑歌手</el-button>
              <el-button icon="el-icon-delete" v-on:click="deleteArtist">删除歌手</el-button>
            </div>
          </el-col>
        </el-row>
        <div style="width: 1000px;margin-left: 250px; margin-top:40px; margin-bottom: 10px">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large; display: inline; margin-right: 750px">专辑</p>
          <el-button icon="el-icon-plus" v-on:click="addDialogVisible=true" style="">添加专辑</el-button>
        </div>
        <el-row v-for="i in 1" :key="i" style="width:1100px; height: 20px; margin: auto; margin-left: 190px;">
          <ul id="albumlist" data="albumView">
            <li v-for="item in albumView" class="albumli" style="list-style: none;">
              <div class="album" style="float: left; margin-left: 20px; margin-right: 20px; height: 300px;">
                <router-link :to="{path:'/admin/albumdetail',query:{id:item.id}}">
                  <img class="albumImage" :src=item.image alt=""  @click="setAlbum(item)">
                  <p style="color: black; width: 200px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';" @click="setAlbum(item)">{{item.name}}</p>
                </router-link>
              </div>
            </li>
          </ul>          
        </el-row>
        <div style="clear: both;"></div>
         <el-pagination style="margin-top: 30px; margin-bottom: 30px" layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="albumPageCount" class = "pagination">
           </el-pagination>
      </div>
      <el-dialog title="编辑歌手信息" :visible.sync="editDialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="editArtist" ref="editArtist" label-width="100px" :rules="editRules">
          <el-form-item label="姓名：" prop="name" style="width: 325px">
            <el-input v-model="editArtist.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="图片：" prop="image">
            <img :src="editArtist.image" class="avatar" style=" width: 150px; height: 150px; margin-right: 20px;">
            <el-upload class="avatar-uploader" ref="upload1" :on-change="editImage"
            action="/hifive/upload/uploadArtistImage" :data={id:artist.id} :show-file-list="false" :on-success="upload1Success" :before-upload="beforeAvatarUpload" accept=".jpg, .jpeg, png" :auto-upload="false" >
            <el-button slot="trigger" size="small" type="primary" style="margin-top: 20px;" @click="ischanged=true">点击选择图片</el-button>
            <div style="margin-top: 10px;">
              <div>图片大小不超过2M</div>        
              <div>上传图片格式为:jpg/jpeg/png</div>
            </div>
          </el-upload>
          <div style="clear:both"></div>
          </el-form-item>
          <div style="height: 50px; margin-bottom: 20px;">
          	<el-form-item label="性别：" prop="gender" style="width: 325px; float: left; margin-right: 100px;">
            <el-radio-group v-model="editArtist.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="3">组合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="首字母：" prop="initial" style="width: 325px; float: left; margin-right: 100px;">
            <el-select v-model="editArtist.initial" placeholder="请选择歌手首字母" clearable >
              <el-option
                v-for="item in initialOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </div>
          <div style="height: 50px; margin-bottom: 20px;">
            <el-form-item label="生日：" prop="birthday" style="width: 325px; float: left; margin-right: 100px;">
              <el-date-picker v-model="editArtist.birthday" type="date" placeholder="请选择出生年月" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="出生地：" prop="birthplace" style="width: 325px; float: left; margin-right: 100px;">
            <el-input v-model="editArtist.birthplace" clearable></el-input>
          </el-form-item>
          </div>
          <div style="height: 50px; margin-bottom: 20px;">
            <el-form-item label="国家：" prop="country" style="width: 325px; float: left; margin-right: 100px;">
            <el-input v-model="editArtist.country" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属地区：" prop="region" style="float: left;">
            <el-select v-model="editArtist.region" placeholder="请选择歌手所属地区" clearable >
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </div>
          <div style="height: 50px; margin-bottom: 20px;">
            <el-form-item label="职业：" prop="occupation" style="width: 325px; float: left; margin-right: 100px;">
            <el-input v-model="editArtist.occupation" clearable></el-input>
          </el-form-item>
          <el-form-item label="代表作：" prop="representative" style="width: 325px; float: left;">
            <el-input v-model="editArtist.representative" clearable></el-input>
          </el-form-item>
          </div>
           <div>
            <el-form-item label="简介：" prop="intro" style="width: 750px">
            <el-input v-model="editArtist.intro" type="textarea" placeholder="请输入歌手简介" :autosize="{ minRows: 2, maxRows: 4}" ></el-input>
          </el-form-item>
          </div>
          <div>
            <el-form-item style="margin-left: 200px; margin-top: 50px">
            <el-button type="primary" @click="uploadForm">完成</el-button>
            <el-button @click="editDialogVisible=false">取消</el-button>
          </el-form-item>
          </div>
        </el-form>
      </el-dialog>
       <el-dialog title="添加专辑" :visible.sync="addDialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="addAlbum" ref="addAlbum" label-width="100px" :rules="addRules">
          <el-form-item label="名称：" prop="name" style="width: 325px">
            <el-input v-model="addAlbum.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="封面：" prop="image">
            <div style="width: 200px; float: left; ">
              <el-upload 
                class="avatar-uploader" 
                ref="upload2" 
                :on-change="addImage" 
                :data={id:addAlbum.id}
                action="/hifive/upload/uploadAlbumImage" 
                :show-file-list="false" 
                :on-success="upload2Success" 
                accept=".jpg, .jpeg, .png" 
                :auto-upload="false" >
              <img v-if="addAlbum.image!=''" :src="addAlbum.image" class="avatar" style=" width: 150px; height: 150px; margin-right: 20px;"><i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <!-- <el-button slot="trigger" size="small" type="primary" @click="isadded=true">点击选择图片</el-button> -->
              </el-upload>
            </div>
          <div style="margin-top: 10px; ">
              <div>图片大小不超过2M</div>        
              <div>上传图片格式为:jpg/jpeg/png</div>
            </div>
          <div style="clear:both"></div>
          </el-form-item>
          <div style="height: 50px; margin-bottom: 0;">
            <el-form-item label="歌手：" prop="artistName" style="width: 325px; float: left; margin-right: 100px;">
              <el-input v-model="artist.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属地区：" prop="region" style="width: 325px; float: left;">
              <el-select v-model="addAlbum.region" placeholder="请选择所属地区：" clearable >
                <el-option
                  v-for="item in regionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="height: 50px; margin-bottom: 0;">
          <el-form-item label="流派：" prop="style" style="width: 325px; float: left; margin-right: 100px;">
            <el-select v-model="addAlbum.style" placeholder="请选择专辑流派" clearable>
              <el-option
                v-for="item in styleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发行时间：" prop="releaseDate" style="width: 325px; float: left">
            <el-date-picker v-model="addAlbum.releaseDate" type="date" placeholder="请选择发行时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="简介：" prop="intro" style="width: 750px">
            <el-input v-model="addAlbum.intro" type="textarea" placeholder="请输入专辑简介" :autosize="{ minRows: 2, maxRows: 4}" ></el-input>
          </el-form-item>
          </div>
          <div>
            <el-form-item>
            <el-button type="primary" @click="submitForm1">完成</el-button>
            <el-button @click="addDialogVisible=false">取消</el-button>
          </el-form-item>
          </div>
        </el-form>
      </el-dialog>
      <v-foot></v-foot>
  </div>
</template>

<script>
  import vHead from '../admin/header.vue'
  import vFoot from '../user/common/footer.vue'
  import emptyImage from '../../assets/暂无图片.png'
  
  export default {
     components: {
      vHead,
      vFoot
    },
    data(){
      return{
        ischanged:false,
        isadded:false,
        editDialogVisible:false,
        addDialogVisible:false,
        albumPage:1,
        albumPageCount:0,
        genderMap:{1:'男', 2:'女', 3:'组合'},
        regionMap:{1:'内地', 2:'港台', 3:'欧美', 4:'日韩', 5:'其他'},
        editRules:{
          name: [
        { required: true, message: '请输入歌手姓名', trigger: 'blur' },
        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        style:[
        {required: true, message: '请选择专辑流派', trigger: 'blur'},
        ],
        region:[
        {required: true, message: '请选择歌手所属地区', trigger: 'blur'},
        ],
        country:[
        {required: true, message: '请选择歌手所属国家', trigger: 'blur'},
        ],
        gender:[
        {required:true, message:'请选择歌手性别', trigger:'blur'},
        ],
        initial:[
        {required:true, message:'请选择歌手姓名首字母', trigger:'blur'},
        ],
        birthplace:[
        {required:true, message:'请输入歌手出生地', trigger:'blur'},
        ],
        birthday:[
        {required: true, message: '请选择歌手生日', trigger: 'blur'},
        ],
        },
        addRules: {
        	name:[
        { required:true, message:'请输入专辑名称', trigger:'blur'},
        { min: 1, max: 50, message:'长度在1到50个字符', trigger:'blur'}],
        	region:[
        { required: true, message:'请输入专辑所属地区', trigger:'blur'},],
        	style:[
        { required: true, message:'请输入专辑风格', trigger:'blur'}],
          intro:[
        { min: 1, max: 680, message:'最多680个字符', trigger:'blur'}
          ]
        },
        artist:{},
        editArtist:{},
        albumView:[],
        addAlbum:{id:'',image:''},
        regionOptions: [{
          value: '内地',
          label: '内地',
        }, {
          value: '港台',
          label: '港台',
        }, {
          value: '欧美',
          label: '欧美',
        }, {
          value: '日韩',
          label: '日韩',
        }, {
          value: '其他',
          label: '其他',
        }],
        initialOptions: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'D',
          label: 'D'
        }, {
          value: 'E',
          label: 'E'
        }, {
          value: 'F',
          label: 'F'
        }, {
          value: 'G',
          label: 'G'
        }, {
          value: 'H',
          label: 'H'
        }, {
          value: 'I',
          label: 'I'
        }, {
          value: 'J',
          label: 'J'
        }, {
          value: 'K',
          label: 'K'
        }, {
          value: 'L',
          label: 'L'
        }, {
          value: 'M',
          label: 'M'
        }, {
          value: 'N',
          label: 'N'
        }, {
          value: 'O',
          label: 'O'
        }, {
          value: 'P',
          label: 'P'
        }, {
          value: 'Q',
          label: 'Q'
        }, {
          value: 'R',
          label: 'R'
        }, {
          value: 'S',
          label: 'S'
        }, {
          value: 'T',
          label: 'T'
        }, {
          value: 'U',
          label: 'U'
        }, {
          value: 'V',
          label: 'V'
        }, {
          value: 'W',
          label: 'W'
        }, {
          value: 'X',
          label: 'X'
        }, {
          value: 'Y',
          label: 'Y'
        }, {
          value: 'Z',
          label: 'Z'
        }],
        style: ['POP 流行', 'ELECTRONIC 电子','ROCK 摇滚' ,'CLASSIC 古典','FOLK 民谣', 'R&B', '其他'],
        styleOptions: [{
          value: 'POP 流行',
          label: 'POP 流行',
        }, {
          value: 'ELECTRONIC 电子',
          label: 'ELECTRONIC 电子',
        }, {
          value: 'ROCK 摇滚',
          label: 'ROCK 摇滚',
        }, {
          value: 'CLASSIC 古典',
          label: 'CLASSIC 古典',
        },{
          value: 'FOLK 民谣',
          label: 'FOLK 民谣',
        }, {
          value: 'R&B',
          label: 'R&B',
        }, {
          value: '其他',
          label: '其他',
        },],
      }
    },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      },
      state() {
        return this.$store.state;
      }
    },

    created() {
      this.artist.id = this.$route.query.id;
      window.scrollTo(0,0);
    },

    mounted(){
      this.getArtistInfo(this.artist.id);
    },
    
    methods:{
    setAlbum: function(item){
      this.$store.state.albums = item;
    },
    /* 专辑分页*/
    /* 每页2行，每行4张专辑*/
    A_pagination: function(_albums,_albumPage){
      this.albumPageCount = Math.ceil(parseFloat(_albums.length) / 8);
      if(_albumPage != this.albumPage){
        this.albumPage = _albumPage;
        this.albumView.splice(0,this.albumView.length);
        }
      for (var i = 0; i < 8; i++) {
        if(_albums[((this.albumPage - 1)*8)+i] != null){
          var album = _albums[((this.albumPage - 1)*8)+i];
          this.albumView.push(album);
        }
        if(this.albumView[0].id == 0){
          this.albumView.splice(0,this.albumView.length);
        }
      } 
    },
    /* 删除歌手*/
    deleteArtist: function(){
    	this.$confirm('确认删除？')
    	.then(_ => {
    	    this.axios.get(this.serverUrl+'/artist/removeArtist', {
        		params: {
          			id:this.artist.id,
        		}
      		})
      	.then(response => {
      		if(response){
      			this.$message({
      			showClose: true,
            	message:'删除成功！',
            	type:'success'
          	});
      		this.$router.go(-1);
      		}
      		else{
          		this.$message({
          		showClose: true,
            	message:'会话超时！',
            	type:'error'
         	});      			
      		}
    	})
    	.catch(function(err){
            console.log(err);
        });
      })
      .catch(_ => {});
    },
    /* 上传歌手图片*/
    uploadForm: function() {
      this.$refs["editArtist"].validate((valid) => {
        if(valid) {
          if(this.ischanged){
        	 this.$refs.upload1.submit();
           this.ischanged = false;
      		} else{
            this.submitForm();
        }
        // this.$router.go(0);
      }  else {
        this.$message({
          showClose: true,
          message: '格式不正确',
          type: 'error'
        });
      }
    });
  },
    /* 提交歌手编辑信息*/
    submitForm: function() {
        
      if(this.editArtist.region == '内地') {this.editArtist.region = '1';}
      else if(this.editArtist.region == '港台') {this.editArtist.region = '2';}
      else if(this.editArtist.region == '欧美') {this.editArtist.region = '3';}
      else if(this.editArtist.region == '日韩') {this.editArtist.region = '4';}
      else if(this.editArtist.region == '其他') {this.editArtist.region = '5';}


      this.axios.post(this.serverUrl+'/artist/modifyArtist',{
        id:this.editArtist.id,
        name:this.editArtist.name,
        image:this.editArtist.image,
        initial:this.editArtist.initial,
        region:this.editArtist.region,
        gender:this.editArtist.gender,
        country:this.editArtist.country,
        intro:this.editArtist.intro,
        birthplace:this.editArtist.birthplace,
        occupation:this.editArtist.occupation,
        birthday:this.editArtist.birthday,
        representative:this.editArtist.representative,
      })
      .then(response => {
        if(response) {
          this.albumView.splice(0,this.albumView.length);
          this.getArtistInfo(this.editArtist.id);
          this.editDialogVisible = false;
          this.$message({
            showClose:true,
            message:'歌手信息编辑成功',
            type:'success'
          });
        }
        else{
          this.$message({
            showClose:true,
            message:'会话超时',
            type:'error'
          });
        }
          // this.$router.go(0);
        })
        .catch(function(err){
          console.log(err);
        });
    },
    /* 提交专辑详细信息*/
    submitForm1: function() {
      this.$refs["addAlbum"].validate((valid) => {
        if(valid) {
        	this.addDialogVisible=false;

          if(this.addAlbum.region == '内地') this.addAlbum.region = '1';
        	else if(this.addAlbum.region == '港台') this.addAlbum.region = '2';
        	else if(this.addAlbum.region == '欧美') this.addAlbum.region = '3';
        	else if(this.addAlbum.region == '日韩') this.addAlbum.region = '4';
        	else if(this.addAlbum.region == '其他') this.addAlbum.region = '5';

        	if(this.addAlbum.style == 'POP 流行') this.addAlbum.style = 1;
        	else if(this.addAlbum.style == 'ELECTRONIC 电子') this.addAlbum.style = 2;
        	else if(this.addAlbum.style == 'ROCK 摇滚') this.addAlbum.style = 3;
        	else if(this.addAlbum.style == 'CLASSIC 古典') this.addAlbum.style = 4;
        	else if(this.addAlbum.style == 'FOLK 民谣') this.addAlbum.style = 5;
        	else if(this.addAlbum.style == 'R&B') this.addAlbum.style = 6;
        	else if(this.addAlbum.style == '其他') this.addAlbum.style = 7;
        		
          this.axios.post(this.serverUrl+'/album/addAlbum',{
            name:this.addAlbum.name,
  	        artistId:this.artist.id,
  	        region:this.addAlbum.region,
  	        style:this.addAlbum.style,
  	        releaseDate:this.addAlbum.releaseDate,
            intro:this.addAlbum.intro,
      })
      .then(response =>{
        if(response.data != -1) {
          this.addAlbum.id = response.data;
          this.$refs["addAlbum"].resetFields();
          if(this.isadded){
            this.$nextTick(() => {
            this.$refs.upload2.submit();
            this.isadded = false;
          });

          } else {
            this.getArtistInfo(this.artist.id);
          }
          
          this.albumView.splice(0,this.albumView.length);
          
          this.editDialogVisible=false;
          this.$message({
            showClose: true,
            message: '专辑添加成功',
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
        //this.$router.go(0);
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
      return false;
      }
      });
    },
    /* 修改歌手图片*/
    editImage:function(file,filelist){
      if(this.beforeAvatarUpload(file)){
        this.editArtist.image = file.url;
        if(filelist.length>1){
          filelist.splice(0,1);
        }
      } else {
        filelist.splice(filelist.length-1,1);
      }

    },
    /* 歌手图片上传成功事件*/
    upload1Success:function(){
      this.submitForm();
    },
    /* 添加专辑图片*/
    addImage: function(file,filelist) {
      if(this.beforeAvatarUpload(file))
      {
        this.isadded = true;
        this.addAlbum.image = file.url;
        if(filelist.length>1)
        {
          filelist.splice(0,1);
        }
      }
      else{
        filelist.splice(filelist.length-1,1);
      }
    },
    /* 判断图片格式及大小*/
    beforeAvatarUpload: function(file) {
      const isJPG = file.type === 'image/jpg'||'image/jpeg'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg/jpeg/png格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }

      return isJPG && isLt2M;
    },
    /* 专辑图片上传成功事件*/
    upload2Success: function() {
        this.addAlbum.image = '';
        this.$refs.upload2.clearFiles();
        this.getArtistInfo(this.artist.id);
        
    },
    /* 获取歌手信息*/
    getArtistInfo: function(artistId){
      this.axios.get(this.serverUrl+'/artist/getInfo',{
        params:{
          id: artistId
        }
      })
      .then(response => {
        this.artist = response.data;
          console.log(this.artist);
          if(this.artist.image == null){
            this.artist.image = emptyImage;
          } else {
            this.artist.image = this.serverUrl + this.artist.image;
          }
          this.artist.birthday = this.timestampToTime(this.artist.birthday);
          
          for (var i = 0; i < this.artist.albumList.length; i++) {
            if(this.artist.albumList[i].image == null){
              this.artist.albumList[i].image = emptyImage;
            } else {
              this.artist.albumList[i].image = this.serverUrl + this.artist.albumList[i].image;
            }
            }
            this.A_pagination(this.artist.albumList,this.albumPage);
          })
        .catch(function(err){
          console.log(err);
      });
    },
    /* 修改日期格式*/
    timestampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        if(D < 10)
          D = '0' + D;
        return Y+M+D;
      },
    /* 确认关闭事件*/
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
      done();
      })
      .catch(_ => {});
      },
    /* 处理页码变化*/
    handleCurrentChange: function(val){
        this.A_pagination(this.artist.albumList,val);
      },
    /* 点击编辑事件*/
    clickOnEdit: function(){
      this.editDialogVisible = true;
      var temp = {
        id:this.artist.id,
        name:this.artist.name,
        image:this.artist.image,
        initial:this.artist.initial,
        region:this.regionMap[this.artist.region],
        gender:(this.artist.gender).toString(),
        country:this.artist.country,
        intro:this.artist.intro,
        birthplace:this.artist.birthplace,
        occupation:this.artist.occupation,
        birthday:this.timestampToTime(this.artist.birthday),
        representative:this.artist.representative,
      }
      this.editArtist = temp;
    },
    }
    }
  </script>

  <style scoped>
  a {text-decoration: none;}

  .main {
      width: auto;
      height: auto;
      opacity: 0.95;
      position: relative;
      font-family: "Microsoft YaHei";
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
  .font_name{
      font-family: "Microsoft YaHei";
      font-size:smaller;
      color: #333333;
      cursor: pointer;
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
  .albumImage{
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
  .pagination {
    text-align: center;
    font-size: 20px;
    &:hover {
        cursor: pointer;
        color: #31c27c;
      }
    }
  .avatar {
    width: 140px;
    height: 140px;
    float: left;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin-right: 15px;
  }
  </style>