// components/books/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //评论数据
    comment: {
      type: Array
    },
    //图片前缀
    imgUrl: {
      type: String
    },
    //当前页码
    page:{
      type:Number
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
    //下拉触底
    scrolltolower(e){
      //加载更多 分发事件
      this.triggerEvent("loadMore")
    },
    //滚动事件
    dragging(){
      console.log(11)
    }
  },
})
