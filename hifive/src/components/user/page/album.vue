<template>
  <div>
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="main">
      <div class="album-nav">
        <table id="album-nav-table">
          <tr>
            <td>
              <td><span class="cl">地区</span></td>
              <ul id ="region" class="album-nav-tag" >
                <li @click="region_change_bg(0);albumDisplay(1,-1,1)" class="current">内地</li>
                <li @click="region_change_bg(1);albumDisplay(2,-1,1)">港台</li>
                <li @click="region_change_bg(2);albumDisplay(3,-1,1)">欧美</li>
                <li @click="region_change_bg(3);albumDisplay(4,-1,1)">日韩</li>
                <li @click="region_change_bg(4);albumDisplay(5,-1,1)">其他</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <td><span class="cl">流派</span></td>
              <ul class="album-nav-tag" id="style">
                <li @click="style_change_bg(0);albumDisplay(0,0,1)" class="current">全部</li>
                <li @click="style_change_bg(1);albumDisplay(0,1,1)">流行</li>
                <li @click="style_change_bg(2);albumDisplay(0,2,1)">电子</li>
                <li @click="style_change_bg(3);albumDisplay(0,3,1)">摇滚</li>
                <li @click="style_change_bg(4);albumDisplay(0,4,1)">古典</li>
                <li @click="style_change_bg(5);albumDisplay(0,5,1)">民谣</li>
                <li @click="style_change_bg(6);albumDisplay(0,6,1)">R&B</li>
                <li @click="style_change_bg(7);albumDisplay(0,7,1)">其他</li>
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <ul id="albumlist">
        <li v-for="item in albums" class="albumli">
          <div class="album" style="margin-bottom: 20px">
            <router-link :to="{path:'/user/albumdetail',query:{id:item.id}}">
              <img :src="item.image" alt=""  @click="setAlbum(item)">
              <p @click="setAlbum(item)">{{item.name}}</p>
            </router-link>
            <router-link :to="{path:'/user/artistdetail',query:{id:item.id}}">
              <p>{{item.artistName}}</p>
            </router-link>
            <p style="color: #cccccc">{{item.releaseDate}}</p>
          </div>
        </li>
      </ul>

      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="pageCount" class="pagination">
      </el-pagination>

    </div>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import vHeader from "../common/header.vue";
  import vNav from "../common/navigation.vue";
  import vFoot from "../common/footer.vue";
  import emptyImage from '../../../assets/暂无图片.png'

  export default {
   components: {
      vNav,
      vHeader,
      vFoot
    },

    data() {
      return{
        region: 1,
        style: 0,
        page: 1,
        pageCount: 5,
        albums: []
      }
    },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      }
    },

    mounted() {
      this.albumDisplay(1,0,1);
    },

    methods: {
      /*绑定album*/
      setAlbum: function(item){
        this.$store.state.album = item
      },
      /* 处理页码变化*/
      handleCurrentChange: function(val){
        this.albumDisplay(0,-1,val);
      },
      /* 修改日期格式*/
      timestampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        return Y+M+D;
      },
      /* 专辑导航栏分类*/
      albumDisplay: function(_region, _style, _page){
        if(_page != this.page){
          _region = this.region;
          _style = this.style;
          this.page = _page;
        } else if(_style != -1){
          _region = this.region;
          this.style = _style;
          _page = this.page;
        } else {
          _style = this.style;
          this.region = _region;
          _page = this.page
        }
        this.axios.get(this.serverUrl + "/album/filterAlbum", {
          params: {
            region: _region,
            style: _style,
            page: _page
          }
        })
        .then(res => {
          this.albums = res.data;
          console.log(res.data);
          for(var i = 0; i < res.data.length; i++){
            if(this.albums[i].image == null){
              this.albums[i].image = emptyImage;
            } else {
              this.albums[i].image = this.serverUrl + this.albums[i].image;
            }
            this.albums[i].releaseDate = this.timestampToTime(this.albums[i].releaseDate);
          }
          
          console.log(this.albums)

            this.axios.get(this.serverUrl + "/album/filterAlbumCount", {
              params: {
                region: _region,
                style: _style,
              }
            })
            .then(res => {
              this.pageCount = Math.ceil(parseFloat(res.data) / 10);
              
              console.log(this.albums)
            })
            .catch(function (error) {
              console.log(error);
            });

        })
        .catch(function (error) {
          console.log(error);
        });
      },
      /* 更改导航栏中当前地区*/
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
      /* 更改导航栏中当前风格*/
      style_change_bg: function(obj){
        var a=document.getElementById("style").getElementsByTagName("li");
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
.router{color: #cccccc}
.main {
  padding-top: 30px;
  height: 900px;
  opacity: 0.95;
  position: relative;
  font-family: "Microsoft YaHei";
  color: #333;
  ul {
    margin: 0 auto;
    height: 100%;
    max-width: 1200px;
    list-style-type:none;
  }
  .album-nav {
    max-width: 1200px;
    height: 80px;
    margin: 0 240px 50px;
    padding: 0px 0;

    .cl{
      width: 40px;
      height: 28px;
      padding-left: 10px;
      margin-bottom: 15px;
      color: #fff;
      font-size: 15px;
      float: left;
      line-height: 30px;
      background-color: #31c27c;
    }

    .album-nav-tag {
      display: inline;
      height: 50px;
      margin-left: 20px;
      text-align: center;
      .current {
        color: #fff;
        background-color: #31c27c;
        &:hover {
          color: #fff;
        }
      }

      li {
        width: 50px;
        height: 30px;
        margin-left: 20px;
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
  }

  #albumlist{
    height: 680px;

    .albumli {
      text-align: top;
      float: left;
      width: 20%;
      height: 300px;
      margin-bottom: 30px;
    .album {
      background-color: #f6f6f6;
      height: 210px;
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
      margin-top: 1px;
      margin-bottom: 5px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        color: #31c27c;
      }
    }
  }
  }
  .pagination {
    text-align: center;
    font-size: 20px;
  }
}
</style>
