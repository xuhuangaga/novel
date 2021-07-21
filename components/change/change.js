Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:'大家都在搜'
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
    //点击换一换 分发事件
    change(){
      this.triggerEvent('change')
    }
  }
})
