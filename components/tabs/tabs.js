// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array
    },
    activeIndex:{
      type:Number
    },
    //背景色
    bgc:{
      type:String,
      value:'#eee'
    },
    //下边框颜色
    borderB:{
      type:String,
      value:'none'
    },
    //评价总数
    total:{
      type:String,
      value:''
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
  //tabs组件点击顶部选项卡 分发事件
  active(e) {
    this.triggerEvent('active',e.currentTarget.dataset.index)
  },
  }
})
