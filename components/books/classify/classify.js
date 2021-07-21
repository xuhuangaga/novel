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
    obj: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取分类数据
    getData() {
      api.classification.getCats()
        .then(res => {
            // console.log(res)
          if (res.ok) {
            this.setData({
              obj: res
            })
          }
        }).catch(err => {
          console.log(err)
        })
    },
    //点击分类
    activeItem(item) {
      wx.navigateTo({
        url: `/pages/classify/classify?gender=${item.currentTarget.dataset.key}&major=${item.currentTarget.dataset.item.name}`,
      })
    },
  },
  lifetimes: {
    ready() {
      this.getData()
    }
  }
})
