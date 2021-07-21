Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array
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
    //点击清空历史记录
    clearHistory(){
      let that=this
      wx.showModal({
        content: '确定清空所有历史记录?',
        success(res){
          // console.log(res)
          if (res.confirm) {
            that.triggerEvent('clearHistory')
          }
        }
      })
      
    },
    //点击历史记录
    activeItem(val){
      this.triggerEvent("saveHistory",val.currentTarget.dataset.item)
    }
  }
})
