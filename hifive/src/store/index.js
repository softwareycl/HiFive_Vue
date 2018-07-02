import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './action'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  //constants,
  // getters,
  // actions,
})
export default store
/*export default new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increment:state => state.count ++,
    decrement:state => state.count --,
  }
})*/
