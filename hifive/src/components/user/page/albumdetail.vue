<template>
  <div id="album" :data="album">
    <el-row :gutter="50">
      <el-col :span="4" :offset="4">
        <div class="grid-content bg-purple">
          <img align=right src='../../../assets/logo.png'>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p class="font_albumName">{{album.name}}</p>
          <i class="el-icon-service"></i>
          <span class="font_albumArtist">{{album.artist}}</span>
          <div>
            <p class="font_other">流派:{{album.style}}</p>
            <p class="font_other">发行时间:{{album.time}}</p>
          </div>
          <el-button type="primary" icon="el-icon-caret-right">播放全部</el-button>
          <el-button v-if="album.isCollected" icon="el-icon-star-on" v-on:click="cancelCollect">已收藏</el-button>
          <el-button v-else icon="el-icon-star-off" v-on:click="collect">收藏</el-button>
          <el-dropdown trigger="click">
            <el-button icon="el-icon-plus">添加到<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" :data="playlistList">
              <el-dropdown-item>播放队列</el-dropdown-item>
              <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
              <el-dropdown-item v-for="playlist in playlistList">{{playlist.name}}
              </el-dropdown-item>
              <el-dropdown-item divided>添加到新歌单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="11" :offset="5">
        <div class="grid-content bg-purple">
          <el-table :data="songList" style="width: 100%" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
            <el-table-column type="index" label=" " :index="indexMethod">
            </el-table-column>
            <el-table-column
              prop="name"
              label="歌曲"
              width="100">
            </el-table-column>
            <el-table-column
              label=" "
              width="210">
              <template slot-scope="scope">
                <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle>
                </el-button> </span>
                <span v-if="scope.row.Flag"> 
                  <el-dropdown trigger="click" placement="bottom-start">
                    <el-button icon="el-icon-plus" circle>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" :data="playlistList">
                      <el-dropdown-item>播放队列</el-dropdown-item>
                      <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                      <el-dropdown-item v-for="playlist in playlistList">{{playlist.name}}
                      </el-dropdown-item>
                      <el-dropdown-item divided>添加到新歌单</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle>
                </el-button> </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="artist"
              label="歌手"
              width="150">
            </el-table-column>
            <el-table-column
              prop="time"
              label="时长"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="4"> 
        <div class="grid-content bg-purple">
          <p class="font_albumDes">简介</p>
          <p style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;" class="font_other">{{album.des}}</p>
          <el-popover
            placement="left"
            title="专辑简介"
            trigger="click"
            >
            <p class="font_other">{{album.des}}</p>
            <el-button type="text" slot="reference">[更多]</el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      album:{
        name:'心之科学',
        artist:'容祖儿',
        style:'Pop流行',
        time:'2018-06-16',
        des:'容祖儿《心之科学》 情伤毋须科学深究 理性分析无助爱意挽留 爱的久了，似乎就会开始计算，计算「他」满足「我」多少条件，计算谁爱谁多一点，谁付出得多一点。爱到最后，分开了，又会计算，是不是「我」哪里做得不够，「他」欠「我」的什么时候还？似乎遇上失恋，我们每每机械式地自怨自艾，就在自己痛得肝肠寸断，心胆俱裂之际，好想为这份痛找个因由，当作心灵救治，让自己输得明明白白，继而重新振作开展另一段感情。虽则，好可能又是另一趟循环的开始。容祖儿的全新广东歌《心之科学》，由Howie Yung、林家谦作曲，黄金柏档黄伟文填词。这是一首疗愈系情歌，特别要留给遇上情伤的你。歌词没有如陪你疗伤的死党一样，尽数对方的不是，力赞你的可人处，而是将这段感情事提升到跟宇宙神明一样诡祕，一样难以捉摸的事情，提醒你别太理性，硬要在感情事上寻找一个分手理由。歌名中「科学」二字，代表精密计算，有肯定有对错。但我们的心，真的可以直接推算吗？或者科学可以解释爱情现象，却不可解决爱情的问题，既没有定理，也无迹可寻，就如歌词一句︰「神也摸不透的 问你怎么与它 斗气」去执著谁对谁错，还重要么？去到副歌部分︰「情人不爱你 还不爱你 凭什么否定你」，跟过去的失恋自强作品一样，就是要你别轻易被打沉，自我价值从不因一段感情可以议价，只有对自己肯定才不致软弱到任人伤害。歌中最点题一句︰「无人生哲理 能急救你 唯独这歌 赠你」很多人失恋时，都急想要一句半句振奋说话让自己坚强起来，祖儿这首歌便肩负起这个责任。幸福既然随机，别心死、别泄气，安抚了受伤的你，就得重新做回自己。',
        isCollected:false
      },
      songList: [{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false,
        
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      },{
        name:'心之科学',
        artist:'容祖儿',
        time:'03:55',
        Flag:false
      }],
      playlistList:[{
        name:'1'
      },
      {
        name:'2'
      },{
        name:'3'
      }]
    }
  },
  methods: {
    indexMethod(index) {
      return index+1;
    },
    handleMouseEnter:function(row, column, cell, event){
      row.Flag=true;
    },
    handleMouseOut:function(row, column, cell, event){
      row.Flag=false;
    },
    collect:function(event){
      this.album.isCollected=true;
    },
    cancelCollect:function(event){
      this.album.isCollected=false;
    },
  }
}
</script>
<style>
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
.font_albumArtist{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_albumDes{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_other{
  font-family:"Hiragino Sans GB";
  font-size:Medium;
}
</style>
