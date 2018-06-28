<template>
  <div class="wrapper">
    <v-head></v-head>
    <div id="albumdetail" :data="album">
      <el-row :gutter="50">
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
            <el-button icon="el-icon-edit" v-on:click="editDialogVisible=true">编辑专辑</el-button>
            <el-button icon="el-icon-plus" v-on:click="addDialogVisible=true">添加歌曲</el-button>
            <el-button icon="el-icon-delete" v-on:click="deleteAlbum">删除专辑</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="编辑专辑" :visible.sync="editDialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="album" ref="album" label-width="100px">
          <el-form-item label="专辑名称" prop="name">
            <el-input v-model="album.name"></el-input>
          </el-form-item>
          <el-form-item label="专辑封面" prop="image">
            <img src="../../assets/周杰伦.jpg">
          </el-form-item>
          <el-form-item label="歌手" prop="artistName">
            <el-input disabled v-model="album.artistName"></el-input>
          </el-form-item>
          <el-form-item label="流派" prop="style">
            <el-select v-model="album.style" placeholder="请选择专辑流派">
              <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="发行时间" prop="releaseDate">
            <el-date-picker v-model="album.releaseDate" type="date" placeholder="请选择发行时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('album')">完成</el-button>
            <el-button @click="editDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="添加歌曲" :visible.sync="addDialogVisible" width="60%" :before-close="handleClose">
        <el-form :model="song" ref="song" label-width="100px">
          <el-form-item label="歌曲名称" prop="name">
            <el-input v-model="song.name"></el-input>
          </el-form-item>
          <el-form-item label="歌曲图片" prop="image">
            <img src="../../assets/周杰伦.jpg">
          </el-form-item>
          <el-form-item label="歌手" prop="artistName">
            <el-input disabled v-model="album.artistName"></el-input>
          </el-form-item>
          <el-form-item label="所属专辑" prop="albumName">
            <el-input disabled v-model="album.name"></el-input>
          </el-form-item>
          <el-form-item label="语种" prop="language">
            <el-select v-model="song.style" placeholder="请选择歌曲语种">
              <el-option
              v-for="item in languageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="流派" prop="style">
            <el-select v-model="song.style" placeholder="请选择歌曲流派">
              <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="发行时间" prop="releaseDate">
            <el-date-picker v-model="song.releaseDate" type="date" placeholder="请选择发行时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('album')">完成</el-button>
            <el-button @click="editDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-row>
        <el-col :span="16" :offset="2">
          <div>
            <el-table :data="songList" :stripe=true style="height:600px;width:95%;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
              <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
              <el-table-column label="歌曲" width=400>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/admin/songdetail', query: { id: scope.row.id }}">
                    <p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</p>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="歌手" width=200>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/admin/artistdetail', query: { id: scope.row.artistId }}">
                    <p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</p>
                </router-link>
                </template>
              </el-table-column>
              <el-table-column label="时长">
                <template slot-scope="scope">
                  <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteSong(scope.row)"></el-button></span>
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
        album:{
          id:'111',
          name:'111',
          artistName:'111',
          image:'',
          style:'111',
          releaseDate:'2018-6-27',
        },
        song:{
          name:'',
          image:'',
          artistName:'',
          albumName:'',
          language:'',
          style:'',
          releaseDate:'',
        },
        songList: [{}],
        editDialogVisible:false,
        addDialogVisible:false,
        style: ['', 'POP 流行', 'ROCK 摇滚', 'FOLK 民谣', 'ELECTRONIC 电子', 'LIGHT 轻音乐', 'RAP RAP', 'COUNTRY 乡村','DANCE 舞曲', '其他'],
        styleOptions: [{
          value: '',
          label: ''
        }, {
          value: 'POP 流行',
          label: 'POP 流行',
        }, {
          value: 'ROCK 摇滚',
          label: 'ROCK 摇滚',
        }, {
          value: 'FOLK 民谣',
          label: 'FOLK 民谣',
        }, {
          value: 'ELECTRONIC 电子',
          label: 'ELECTRONIC 电子',
        }, {
          value: 'LIGHT 轻音乐',
          label: 'LIGHT 轻音乐',
        },{
          value: 'RAP RAP',
          label: 'RAP RAP',
        }, {
          value: 'COUNTRY 乡村',
          label: 'COUNTRY 乡村',
        }, {
          value: 'DANCE 舞曲',
          label: 'DANCE 舞曲',
        }, {
          value: '其他',
          label: '其他',
        },],
        languageOptions:[{
          value: '',
          label: ''
        }, {
          value: 'POP 流行',
          label: 'POP 流行',
        }, {
          value: 'ROCK 摇滚',
          label: 'ROCK 摇滚',
        }, {
          value: 'FOLK 民谣',
          label: 'FOLK 民谣',
        }, {
          value: 'ELECTRONIC 电子',
          label: 'ELECTRONIC 电子',
        }, {
          value: 'LIGHT 轻音乐',
          label: 'LIGHT 轻音乐',
        },{
          value: 'RAP RAP',
          label: 'RAP RAP',
        }, {
          value: 'COUNTRY 乡村',
          label: 'COUNTRY 乡村',
        }, {
          value: 'DANCE 舞曲',
          label: 'DANCE 舞曲',
        }, {
          value: '其他',
          label: '其他',
        },]
      }
    },
    methods: {
      indexMethod(index) {
        return index+1;
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
      deleteAlbum:function(){

      },
      deleteSong:function(row){

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
          console.log(response.data);
          this.album = response.data;
          this.album.image = this.serverUrl + this.album.image;
          this.album.releaseDate = this.timestampToTime(this.album.releaseDate);
          this.album.style = this.style[this.album.style];
          this.songList = this.album.songList; 
          for(var i = 0; i < this.songList.length; i++){
            this.$set(this.songList[i],'Flag',false);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      },
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
    }
}
</script>
<style>
#albumdetail{
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
a {
     text-decoration:none;
     out-line: none;
  }
</style>
