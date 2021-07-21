import api from '../../../http/api';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //数据
    obj: null,
    //图片前缀
    imgUrl:api.STATIC_HOST
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据
    getData() {
      api.rank.rankCategory()
        .then(res => {
          //  console.log(res)
          if (res.ok) {
            this.setData({
              obj:res
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    //点击排名
    activeItem(e){
      wx.navigateTo({
        url: `/pages/ranking/ranking?title=${e.currentTarget.dataset.title}&id=${e.currentTarget.dataset.id}`,
      })
    }
  },
  lifetimes: {
    ready() {
      this.getData()
    }
  }
})
