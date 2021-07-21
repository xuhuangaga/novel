import api from '../../../http/api';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    booksId: {
      type: String
    },
    detail: {
      type: String
    },
    //目录章节
    catalogue: {
      type: Number
    },
    //图片前缀
    imgUrl: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ranDomArr: [],
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击换一换
    change() {
      this.getRandomBooks()
    },
    //跳转到详情
    goto(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
    },
    //随机获取三个相关书籍
    getRandomBooks() {
      //随机获取三个不重复的书籍
      let random =Math.floor(Math.random() * (this.data.list.length-3))
      let temp =  this.data.list
      this.setData({
        ranDomArr:temp.slice(random,random+3)
      })
    },
    //获取数据
    getData() {
      api.books.relatedRecommendedBooks(this.properties.booksId)
        .then(res => {
          if (res.ok) {
            // console.log(res)
            this.setData({
              list: res.books
            })
            this.getRandomBooks()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  lifetimes: {
    ready() {
      this.getData()
    }
  }
})
