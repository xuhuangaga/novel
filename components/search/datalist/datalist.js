// components/search/datalist/datalist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books: {
      type: Array
    },
    imgUrl: {
      type: String
    },
    noDataText:{
      type:String
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
    //跳转到详情
    goto(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
    },
  }
})
