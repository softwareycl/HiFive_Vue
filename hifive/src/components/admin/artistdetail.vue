<template>
	<div>
      <v-head></v-head>
      <div class="main" id="artistdetail" :data="artist">
        <el-row :gutter="100">
          <el-col :span="4" :offset="4">
            <div>
              <img align=right style="float:left;margin-top:30px; border-radius:100%; width:230px; height: 230px; overflow:hidden;" src=../../assets/周杰伦.jpg>
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
            <el-button icon="el-icon-edit" v-on:click="editDialogVisible=true">编辑歌手</el-button>
            <el-button icon="el-icon-plus" v-on:click="addDialogVisible=true">添加专辑</el-button>
            <el-button icon="el-icon-delete" v-on:click="deleteArtist">删除歌手</el-button>
          </el-col>
        </el-row>
        <el-dialog title="编辑歌手" :visible.sync="editDialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="artist" ref="album" label-width="100px">
          <el-form-item label="歌手姓名" prop="name">
            <el-input v-model="artist.name"></el-input>
          </el-form-item>
 <!--          <el-form-item label="歌手图片" prop="image">
            <img src="../../assets/周杰伦.jpg">
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="artist.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
              <el-radio label="3">组合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="首字母" prop="initial">
            <el-input v-model="artist.initial"></el-input>
          </el-form-item>
          <el-form-item label="国家" prop="country">
            <el-input v-model="artist.country"></el-input>
          </el-form-item>
          <el-form-item label="所属地区" prop="region">
            <el-select v-model="artist.region" placeholder="请选择歌手所属地区">
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="artist.birthday" type="date" placeholder="请选择出生年月" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('artist')">完成</el-button>
            <el-button @click="editDialogVisible=false">取消</el-button>
          </el-form-item> -->
        </el-form>
      </el-dialog>
        <div style="width:900px; margin: auto;">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large;">专辑</p>
        </div>
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
        editDialogVisible:false,
        addDialogVisible:false,
        dialogVisible:false,
        artist:{
          id:'',
          name:'周杰伦',
          image:'../../assets/icon.jpg',
          initial:'Z',
          region:'港台',
          gender:'男',
          country:'中国',
          intro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，中国台湾流行乐男歌手、音乐人、演员、导演、编剧、监制、商人。',
          birthplace:'台湾省新北市',
          occupation:'歌手',
          birthday:'1979-01-18',
          representative:'安静',
        },
        region: ['', '内地', '港台', '欧美', '日韩', '其他'],
        regionOptions: [{
          value: '',
          label: ''
        }, {
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
      }
    },
    created(){
      this.album.id=this.$route.query.id;
    },
    computed:{
      serverUrl(){
        return this.$store.state.serverUrl;
      }
    },
    mounted(){
      this.getAlbumInfo();
      this.handleOverflow();
    },
    getArtistInfo:function(artistId){
      this.axios.get(this.serverUrl+'/artist/getInfo',{
        params:{
          id:this.artist.id
        }
      })
      .then(response => {
        this.artist = response.data;
          console.log(this.artist);
          this.artist.image = this.serverUrl + this.artist.image;
          this.artist.birthday = this.timestampToTime(this.artist.birthday);
          for (var i = 0; i < this.artist.albumList.length; i++) {
            this.artist.albumList[i].image = this.serverUrl + this.artist.albumList[i].image;
            }
            this.artist.albumList = response.data.albumList;
            this.A_pagination(this.artist.albumList,this.albumPage);
          })
        .catch(function(err){
          console.log(err);
      });
    },
    timestampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        if(D < 10)
          D = '0' + D;
        return Y+M+D;
      },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
      done();
      })
      .catch(_ => {});
      },
    }
  </script>

  <style>
  a {text-decoration: none;}

  .main {
      width: 1450px;
      height: 1500px;
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
  </style>