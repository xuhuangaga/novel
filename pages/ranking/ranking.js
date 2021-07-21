import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //排名id
    id: '',
    //书籍列表 数组
    books: [],
    //图片前缀
    imgUrl: api.STATIC_HOST,
    //选中的类别下标
    activeIndex: 0,
    arr: null
  },
  //获取数据
  getData() {
    api.rank.rankInfo(this.data.id)
      .then(res => {
        //  console.log(res)
        if (res.ok) {
          this.setData({
            books: res.ranking.books
          })
          //获取榜单分类
          if (res.ranking.id && res.ranking.monthRank && res.ranking.totalRank) {
            let list = [
              { name: '周榜', id: res.ranking.id},
              { name: '月榜', id: res.ranking.monthRank},
              { name: '总榜', id: res.ranking.totalRank}
            ]
            this.setData({
              arr:list
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //tabs组件点击顶部选项卡 分发事件
  active(val) {
    this.setData(
      {
        activeIndex: val.detail,
        id:this.data.arr[val.detail].id
      }
    )
    //重新获取数据
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
    //修改导航栏标题
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      id: options.id
    })
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})