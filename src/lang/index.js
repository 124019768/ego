import Vue from 'vue'
import iView from 'vue-i18n'

Vue.use(iView, {
  i18n: function(path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})



const messages = {
  en: {
    message: {
      hello: 'hello world',
      product:'merchandise',
      set:'parameter',
      ad:'advertising',
      nom:'personal center',
      ego:'Happy shopping',
      tui:'exit'
    }
  },
  zh:{
    message:{
      hello: '你好、世界',
      product:'商品管理',
      set:'规格参数',
      ad:'广告分类',
      nom:'个人中心',
      ego:'易购后台管理界面',
      tui:'退出'

      
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
      product:'しょうひんかんり',
      set:'仕様パラメータ',
      ad:'ぶんるいこうこく',
      nom:'個人中心',
      ego:'楽しいショッピング',
      tui:'たいしゅつ'
    }
  },
}

const i18n = new iView({
    locale: 'en', 
    messages
  })
  
//导出 i18n 

export default i18n;