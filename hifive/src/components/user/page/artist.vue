<template>
  <div>
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="main">
      <div class="singer-nav">
        <table id="singer-nav-table">
          <div style="position: relative; margin: 0 auto;">
            <div style="background-color: rgb(251,251,253); width: 1170px; height: 160px; margin-left: 187px">
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
          </div>
        </table>
      </div>

      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>

      <ul id="singerlist">
        <li v-for="item in singers" class="singerli">
          <div class="singer">
            <router-link to="/user/artistdetail">
              <img :src="item.image" alt="" style="border-radius:100%; padding: 35px; ">
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
    <v-foot></v-foot>
  </div>
</template>

<script>
    import vHeader from "../common/header.vue";
    import vNav from "../common/navigation.vue";
    import vFoot from "../common/footer.vue"
    
    export default {
     data() {
       return{
         region: 0,
         initial: '@',
         gender: 0,
         page: 1,
         pageCount: 5,
         singers: [{}],
          items:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
       }
     },
    components: {
      vNav,
      vHeader,
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
          _page = this.page;
        } else if(_region != -1){
          _initial = this.initial;
          _gender = this.gender;
          this.region = _region;
          _page = this.page
        } else {
          _region = this.region;
          _initial = this.initial;
          this.gender = _gender;
          _page = this.page;
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
          this.singers = res.data
          console.log(res.data);
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
      }
    }
 }
</script>

<style lang="scss" scoped>
a {text-decoration: none; color: black}
.main {
  padding-top: 10px;
  height: 900px;
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
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 20;
    }
  }

</style>
