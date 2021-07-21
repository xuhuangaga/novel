import util from '../../utils/util';
import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //历史记录数组
    list: null,
    // 搜索框的值
    searchValue: '',
    //输入框右边图片是否显示
    clearShow: false,
    //书籍列表是否显示
    show: false,
    //书籍数组
    books: [],
    //图片前缀
    imgUrl: api.STATIC_HOST,
    //当前页码
    page: 0,
    //书籍总条数
    total: 0,
    noDataText: '加载中...'
  },
  //修改底部提示文字
  changeNoDataText() {
    if (this.data.books.length >= this.data.total) {
      this.setData({
        noDataText: '没有更多了'
      })
    }
  },
  //获取书籍列表
  getBooks() {
    api.books.bookSearch(this.data.searchValue, this.data.page)
      .then(res => {
        //  console.log(res)
        if (res.ok) {
          this.setData({
            books: this.data.books.concat(res.books),
            total: res.total
          })
          this.changeNoDataText()
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //获取历史记录数据
  getData() {
    this.setData({
      list: util.getHistory('search')
    })
  },
  //添加搜索记录
  saveHistory(val) {
    if (val.detail) {
      util.saveHistory({
        key: 'search',
        data: val.detail
      })
      this.setData({
        searchValue: val.detail,
        clearShow: true,
        show: true,
        books: []
      })
      //获取历史记录
      this.getData()
      //获取书籍列表
      this.getBooks()
    }
  },
  //清空历史记录
  clearHistory() {
    util.removeHistory('search', '')
    this.getData()
  },
  //top子组件监听输入框的值 分发事件
  clearShow(val) {
    this.setData({
      clearShow: val.detail
    })
    if (!val.detail) {
      this.setData({
        searchValue: "",
        show: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //获取历史记录
    this.getData()
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
    //如果还有数据 则加载更多
    if (this.data.total > this.data.books.length) {
      this.data.page++
      this.setData({
        page: this.data.page
      })
      this.getBooks()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})