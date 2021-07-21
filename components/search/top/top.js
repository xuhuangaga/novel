Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchValue:{
      type:String
    },
    clearShow:{
      type:Boolean,
      default:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入监听
    inputListener(e){
      if (e.detail.value.trim()) {
        this.triggerEvent("clearShow",true)
      } else {
        this.triggerEvent("clearShow",false)
      }
    },
    //点击清除按钮
    clearValue(){
      this.triggerEvent("clearShow",false)
    },
    //点击搜索
    confirm(e){
      //分发事件  父组件添加搜索记录到本地
      this.triggerEvent('saveHistory',e.detail.value)
    }
  }
})
