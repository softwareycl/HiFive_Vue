<template>
  <div>
    <v-head></v-head>
     <div class="main" >
        <div class="singer-nav">
          <div class="navTitle">
            <p>歌手快速检索</p>
          </div>
            <table id="singer-nav-table"  style="margin: 0 auto">
                <div style="background-color: rgb(251,251,253); width: 1150px; height: 160px;">
                <tr>
                <td><span class="cl long"></span></td>
                <td style="text-align: left;" >
                <ul class="singer-nav-tag" id="initial">
                    <li @click="initial_change_bg(0);singerDisplay(-1,'@',-1,0)" id="all" class="current long" style="width: 40px; padding-left: 3px; padding-right: 3px; margin-right: 5px; margin-top: 12px">热门</li>
                    <li v-for="item in items" @click="initial_change_bg(item.charCodeAt()-64);singerDisplay(-1,item,-1,0)" style="margin-top: 12px">{{item}}</li>
                </ul>
                </td>
            </tr>
            <tr>
                <td><span class="cl"></span></td>
                <td>
                <ul id ="region" class="singer-nav-tag" >
                    <li @click="region_change_bg(0);singerDisplay(0,'!',-1,0)" class="current">全部</li>
                    <li @click="region_change_bg(1);singerDisplay(1,'!',-1,0)">内地</li>
                    <li @click="region_change_bg(2);singerDisplay(2,'!',-1,0)">港台</li>
                    <li @click="region_change_bg(3);singerDisplay(3,'!',-1,0)">欧美</li>
                    <li @click="region_change_bg(4);singerDisplay(4,'!',-1,0)">日韩</li>
                    <li @click="region_change_bg(5);singerDisplay(5,'!',-1,0)">其他</li>
                </ul>
                </td>
            </tr>
            <tr>
                <td><span class="cl gender"></span></td>
                <td>
                <ul id ="gender" class="singer-nav-tag" >
                    <li @click="gender_change_bg(0);singerDisplay(-1,'!',0,0)" class="current">全部</li>
                    <li @click="gender_change_bg(1);singerDisplay(-1,'!',1,0)">男</li>
                    <li @click="gender_change_bg(2);singerDisplay(-1,'!',2,0)">女</li>
                    <li @click="gender_change_bg(3);singerDisplay(-1,'!',3,0)">组合</li>
                </ul>
                </td>
            </tr>
            </div>
            </table>
        </div>

        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
        </el-row>
        <div class="addArtist">
        <el-popover
        ref="" placement="top" width="820" trigger="click" v-model="popoverVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
            label-width="100px" label-position="right"
            class="demo-form-inline" :inline="true">
             <el-form-item>
               <div class="introTitle"><p>填写歌手信息</p></div>
             </el-form-item>
                <el-form-item label="歌手名称" prop="name" size="large">
                  <div class="bigIntro">
                    <el-input v-model="ruleForm.name" placeholder="30字以内"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="性别" prop="genders" v-model="ruleForm.genders">
                  <div class="intro">
                    <!--<el-radio v-model="ruleForm.genders" label="1">男</el-radio>
                    <el-radio v-model="ruleForm.genders" label="2">女</el-radio>
                    <el-radio v-model="ruleForm.genders" label="3">组合</el-radio>-->
                    <el-radio v-model="ruleForm.genders" label="1">男</el-radio>
                    <el-radio v-model="ruleForm.genders" label="2">女</el-radio>
                    <el-radio v-model="ruleForm.genders" label="3">组合</el-radio>
                  </div>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                  <div class="intro">
                    <el-date-picker
                    v-model="ruleForm.birthday"
                    type="date"
                    placeholder="选择出生日期"
                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                </el-form-item>               
                <el-form-item label="国籍" prop="country">
                  <div class="intro">
                    <el-input v-model="ruleForm.country" placeholder="15字以内"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="出生地" prop="birthplace">
                  <div class="intro">
                    <el-input v-model="ruleForm.birthplace" placeholder="30字以内"></el-input>
                  </div>
                </el-form-item>                
                <el-form-item label="首字母" prop="initials">
                  <div class="intro">
                    <el-select v-model="ruleForm.initials" placeholder="请选择">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                        <el-option label="D" value="D"></el-option>
                        <el-option label="E" value="E"></el-option>
                        <el-option label="F" value="F"></el-option>
                        <el-option label="G" value="G"></el-option>
                        <el-option label="H" value="H"></el-option>
                        <el-option label="I" value="I"></el-option>
                        <el-option label="J" value="J"></el-option>
                        <el-option label="K" value="K"></el-option>
                        <el-option label="L" value="L"></el-option>
                        <el-option label="M" value="M"></el-option>
                        <el-option label="N" value="N"></el-option>
                        <el-option label="O" value="O"></el-option>
                        <el-option label="P" value="P"></el-option>
                        <el-option label="Q" value="Q"></el-option>
                        <el-option label="R" value="R"></el-option>
                        <el-option label="S" value="S"></el-option>
                        <el-option label="T" value="T"></el-option>
                        <el-option label="U" value="U"></el-option>
                        <el-option label="V" value="V"></el-option>
                        <el-option label="W" value="W"></el-option>
                        <el-option label="X" value="X"></el-option>
                        <el-option label="Y" value="Y"></el-option>
                        <el-option label="Z" value="Z"></el-option>
                        <el-option label="其他" value="#"></el-option>               
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="歌手地区" prop="regions">
                  <div class="intro">
                      <el-select v-model="ruleForm.regions" placeholder="请选择">
                        <el-option label="内地" value="1"></el-option>
                        <el-option label="港台" value="2"></el-option>
                        <el-option label="欧美" value="3"></el-option>
                        <el-option label="日韩" value="4"></el-option>
                        <el-option label="其他" value="5"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="职业" prop="occupation">
                  <div class="intro">
                    <el-input v-model="ruleForm.occupation" placeholder="10字以内"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="代表作品" prop="representative">
                  <div class="intro">
                    <el-input v-model="ruleForm.representative" placeholder="30字以内"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="歌手简介" prop="intro">
                  <div class="bigIntro">
                    <el-input type="textarea" :rows="3" v-model="ruleForm.intro" placeholder="请输入歌手简介，680字以内"></el-input>               
                  </div>
                  </el-form-item>
                <el-form-item label="上传图片" prop="image">
                  <div class="bigIntro">
                    <el-upload
                    class="avatar-uploader"
                    ref="uploadImage"
                    :auto-upload="false"
                    action="http://192.168.20.99:8080/hifive/upload/uploadArtistImage"
                    :show-file-list="false"
                    :data={id:ruleForm.id} 
                    :on-change="addImage"  
                    :on-success="handleAvatarSuccess"                  
                    :before-upload="beforeAvatarUpload"
                    accept=".jpg, .jpeg, .png">
                    <!--<img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
                    <el-button type="primary" v-else class="el-icon-plus avatar-uploader-icon">点击上传</el-button>-->
                    <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div clss="imageTip">
                    <div>图片大小不超过2M</div>        
                    <div>上传图片格式为:jpg/jpeg/png</div>
                  </div>
                </el-form-item>
                <br>
                <el-form-item>
                  <div>
                    <el-button  class="formbtn" type="primary" @click="submitForm('ruleForm')">完成</el-button>
                    <el-button @click="cancelAdd" >取消</el-button>
                  </div>
                </el-form-item>
            </el-form>

            <el-button id="addbtn" slot="reference" @click="popoverVisible=true">
                <i class="el-icon-plus"></i>添加歌手</el-button>
        </el-popover>
        </div>
      

      <ul id="singerlist">
        <li v-for="item in singers" class="singerli">
          <div class="singer">
            <router-link :to="{path:'/admin/artistdetail',query:{id:item.id}}">
              <img :src="item.image" alt="" style="border-radius:100%; padding: 20px; ">
              <p>{{item.name}}</p>
            </router-link>
          </div>
        </li>
      </ul>
    
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="pageCount" class="pagination" >
      </el-pagination>

    </div> 
    <div class="footer">
    <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
  import vHead from '../admin/header.vue'
  import vFoot from '../user/common/footer.vue'
    
    export default {
     data() {
       return{
        region: 0,
        initial: '@',
        gender: 0,
        page: 1,
        pageCount: 5,
        singers: [],
        popoverVisible:false,
        imageUrl:'',
        hasChangeImage: false,
        items:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],      
        rules: {
            name: [
              { required: true, message: '请输入歌手名称', trigger: 'blur' },
              { min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' },
            ],
            genders: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            birthday: [
              //{ type: 'date', required: true, message: '请选择生日', trigger: 'change' }
              { type: 'string', required: true, message: '请选择生日', trigger: 'change' }
            ],
            birthplace: [
              { max: 30, message: '长度在 30 字以内', trigger: 'blur' },
              { required: true, message: '请选择出生地', trigger: 'change' }
            ],
            occupation: [
              { max: 10, message: '长度在 10 字以内', trigger: 'blur' },
            ],
            representative: [
              { max: 30, message: '长度在 30 字以内', trigger: 'blur' },
            ],
            country: [
              { min: 1,max: 15, message: '长度在 15 字以内', trigger: 'blur' },
              { required: true, message: '请选择国籍', trigger: 'change' }
            ],
            initials: [
              { required: true, message: '请选择名字首字母', trigger: 'change' }
            ],
            regions: [
              { required: true, message: '请选择地区', trigger: 'change' }
            ],
            intro: [
              { min: 1, max: 680, message: '长度在 680 字以内', trigger: 'blur' },
            ],
        },
        ruleForm: {
        id:'',
        name: '',
        genders:'',
        birthplace: '',
        occupation: '',
        birthday: '',
        representative: '',
        intro: '',
        country:'',
        image:'',
        regions:'',
        initials:'',
        },

        playlistList:[{
        id:'1',
        name:'1',
        count:'',
        },{
        id:'2',
        name:'2',
        count:'',
        },{
        id:'3',
        name:'3',
        count:'',
        }],
      }
    },
    components: {
      vHead,
      vFoot
    },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl
      }
    },

    mounted() {
      this.singerDisplay(0,'@',0,1);
    
    },
   
    methods: {
      handleCurrentChange: function(val){
        this.singerDisplay(0,'!',0,val);
      },
      timeStampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        if(D < 10)
          D = '0' + D;
        return Y+M+D;
      },
      singerDisplay: function(_region, _initial, _gender, _page){
        if(_page != 0){
          _region = this.region;
          _initial = this.initial;
          _gender = this.gender;
          this.page = _page;
        } else if(_initial != "!"){
          _region = this.region;
          _gender = this.gender;
          this.initial = _initial;
          _page = this.page = 1;
        } else if(_region != -1){
          _initial = this.initial;
          _gender = this.gender;
          this.region = _region;
          _page = this.page = 1;
        } else {
          _region = this.region;
          _initial = this.initial;
          this.gender = _gender;
          _page = this.page = 1;
        }
        this.axios.get(this.serverUrl + "/artist/filterArtist", {
          params: {
            region: _region,
            initial: _initial,
            gender: _gender,
            page: _page
          }
        })
        .then(res => {
          this.singers = res.data;
          console.log(this.singers);
          for(var i = 0; i < res.data.length; i++){
            this.singers[i].image = this.serverUrl + this.singers[i].image;
          }
          
          console.log(this.singers)

            this.axios.get(this.serverUrl + "/artist/filterArtistCount", {
              params: {
                region: _region,
                initial: _initial,
                gender: _gender,
              }
            })
            .then(res => {
              this.pageCount = Math.ceil(parseFloat(res.data) / 10);
              
              console.log(this.singers)
            })
            .catch(function (error) {
              console.log(error);
            });

        })
        .catch(function (error) {
          console.log(error);
        });
      },

      region_change_bg: function(obj){
        var a=document.getElementById("region").getElementsByTagName("li");
        a[1].className="current";
        for(var i=0;i<a.length;i++){
          if(i == obj){
            a[i].className="current";
          }
          else{
            a[i].className="";
          }
        }
      },

      initial_change_bg: function(obj){
        var a=document.getElementById("initial").getElementsByTagName("li");
        for(var i=0;i<a.length;i++){
          if(i == obj){
            a[i].className="current";
          }
          else{
            a[i].className="";
          }
        }
      },

      gender_change_bg: function(obj){
        var a=document.getElementById("gender").getElementsByTagName("li");
        for(var i=0;i<a.length;i++){
          if(i == obj){
            a[i].className="current";
          }
          else{
            a[i].className="";
          }
        }
      },
      //上传歌手图片
      addImage:function(file){
        this.hasChangeImage = true;
        this.ruleForm.image=file.url;
      },
      handleAvatarSuccess: function() {
        alert("上传成功");
        this.singerDisplay(0,'@',0,1);
      },
      beforeAvatarUpload(file) {
        const isType = file.type === 'image/jpg'||'image/jpeg'||'image/png';
        //image大小2M以内
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isType) {
          this.$message.error('上传图片只能是jpg/jpeg/png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isType && isLt2M);
      },

      addArtist: function(){
        //添加上传歌手信息 
      },
      submitForm:function(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.axios.post(this.serverUrl+'/artist/addArtist',{
              name:this.ruleForm.name,
              initial:this.ruleForm.initials,
              region:this.ruleForm.regions,
              gender:this.ruleForm.genders,
              birthplace:this.ruleForm.birthplace,
              occupation:this.ruleForm.occupation,
              birthday:this.ruleForm.birthday,
              representative:this.ruleForm.representative,
              intro:this.ruleForm.intro,
              country:this.ruleForm.country,
            })
            .then(response =>{
              if(response!=-1){
                this.ruleForm.id=response.data;
                if(this.hasChangeImage){
                  this.$nextTick(() => {
                    this.$refs.uploadImage.submit(); 
                  });
                }
                
                this.$refs.ruleForm.resetFields();          
                this.popoverVisible=false;                
                this.$message({
                  showClose: true,
                  message: '歌手添加成功',
                  type: 'success'
                });
                if(!hasChangeImage){
                  this.singerDisplay(0,'@',0,1);
                }
                
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
            return false;
          }
        });
      },
      cancelAdd: function(done){
        this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.ruleForm.resetFields();
          this.popoverVisible=false;
          done();
        })
        .catch(_ => {});
      }
    }  
 }
</script>

<style lang="scss" scoped>
a {text-decoration: none; color: black}
.main {
  padding-top: 10px;
  height: 800px;
  opacity: 0.95;
  position: relative;
  color: #333;
  font-family: "Microsoft YaHei";
  ul {
    margin: 0 auto;
    height: 100%;
    max-width: 1200px;
    list-style-type:none;
  }
  .singer-nav-table {
    width: 1200px;
    height: 80px;
    margin: 0 240px 50px;
    padding-bottom: 3px;
  }
  .singer-nav {
    .cl{
      font-weight:bold;
      margin-left: 50px;
      font-size: 15px;
      float: left;
      line-height: 35px;
    }

    .singer-nav-tag {
      display: inline;
      height: 50px;
      margin:0 auto;
      text-align: center;
      .current {
        color: #fff;
        background-color: #31c27c;
        &:hover {
          color: #fff;
        }
      }

      li {
        width: 30px;
        height: 30px;
        margin-top: 0px;
        font-size: 14px;
        float: left;
        line-height: 30px;
        &:hover {
          color: #31c27c;
          cursor: pointer;
        } 
      }
    }

    #initial li {
      width: 25px;
      padding-left: 5px;
      padding-right: 5px;
      margin-bottom: 18px;
    }
    #region li{
      width: 40px;
      padding-left: 3px;
      padding-right: 3px;
      margin-right: 7px;
      margin-bottom: 18px;
    }
    #gender li{
      width: 40px;
      padding-left: 3px;
      padding-right: 3px;
      margin-right: 3px;
    }
  }

  #singerlist{
    height: 620px;

    .singerli {
    text-align: top;
    float: left;
    width: 20%;
    height: 300px;
    .singer {
      background-color: rgb(251,251,253);
      margin-top: 0px;
      height: 250px;
      width: 210px;
      margin-left: 12px;
    }
    img {
      width: 210px;
      height: 210px;
      box-sizing: border-box;
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
    p {
      margin-left: 60px;
      margin-right: 60px;
      margin-top: 0px;
      font-size: 16px;
      text-align: center;
      &:hover {
        cursor: pointer;
        color: #31c27c;
      }
    }
  }
  }
  .pagination {
    text-align: center;
  }
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 20;
    }
  }
#addbtn{
    width:400px;
    height:37px;
    margin-left: 37%;
    margin-bottom: 20px;
}

.footer{
  margin-top: 250px;
}
.intro{
  width:225px;
}
.bigIntro{
  width:690px;
}
.introTitle{
  font-size:25px;
  text-align:center;
  margin-left:310px;
}
.formbtn{
  margin-left:300px;
}
.navTitle{
  font-size: 23px;
  text-align:center;
}
.avatar-uploader{
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float:left;
  margin-right: 15px;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.imageTip{
  float:right;
}
.demo-form-inline{
  height:600px;
  overflow: auto;
}
</style>
