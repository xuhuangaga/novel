import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //性别排行
    gender: '',
    //大类
    major: '',
    //小类 数组
    minro: null,
    //排序 数组
    typeList: [
      {
        name: '热门',
        id: 'hot'
      }, {
        name: '新书',
        id: 'new'
      }, {
        name: '好评',
        id: 'reputation'
      }, {
        name: '完结',
        id: 'over'
      }, {
        name: 'VIP',
        id: 'monthly'
      },
    ],
    //书籍数据 数组
    books: [],
    //选中的排序下标
    activeTypeIndex: 0,
    //选中的小分类下标
    activeMinroIndex: 0,
    //当前页码
    page: 1,
    //图片前缀
    imgUrl: api.STATIC_HOST,
    //标签背景色
    tagBgc: ['#ff8c00', '#00ced1', '#ff4500'],
    //数据总条数
    total:0,
    noDataText:'加载中...'
  },
  //获取小类
  getMinor() {
    let classifyAll = wx.getStorageSync('classifyAll')
    // console.log(classifyAll)
    if (classifyAll) {
      //获取传入性别下的所有分类
      let classfiy = classifyAll[this.data.gender]
      //获取传入的大类下的小类
      let minroArr = classfiy.filter(item => {
        return this.data.major === item.major
      })[0].mins
      if (minroArr.length > 0) {
        minroArr.unshift('全部')
        this.setData({
          minro: minroArr
        })
      }
    } else {
      api.classification.getMinor()
        .then(res => {
          // console.log(res)
          if (res.ok) {
            //存储小类到本地
            wx.setStorageSync('classifyAll', res)
          }
        })
    }
  },
  //修改底部提示文字length
  changeNoDataText(){
    if(this.data.books.length >= this.data.total) {
      this.setData({
        noDataText:'没有更多了'
      })
    }
  },
  //获取数据
  getData() {
    api.classification.getCatsBooks(
      this.data.gender,
      this.data.typeList[this.data.activeTypeIndex].id,
      this.data.major,
      this.data.activeMinroIndex===0?'':this.data.minro[this.data.activeMinroIndex],
      this.data.page
      )
      .then(res => {
        // console.log(res)
        if (res.ok) {
          this.setData({
            books: this.data.books.concat(res.books),
            total:res.total
          })
          this.changeNoDataText()
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //点击排序
  activeType(e) {
    this.setData({
      activeTypeIndex: e.currentTarget.dataset.index,
      books:[]
    })
    this.getData()
  },
  //点击小类
  activeMinro(e) {
    this.setData({
      activeMinroIndex: e.currentTarget.dataset.index,
      books:[]
    })
    this.getData()
  },
  //跳转到详情
  goto(e){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.major,
    })
    this.setData({
      gender: options.gender,
      major: options.major
    })
    //获取小类
    this.getMinor()
    //获取数据
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.changeNoDataText()
    //只有books数组长度<总长度时才请求输入  否则表示已经加载完
    if (this.data.total > this.data.books.length) {
      //当前页码累加
      this.data.page++
      this.setData({
        page:this.data.page
      })
      //获取下一页数据
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})