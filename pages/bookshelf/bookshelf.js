import util from '../../utils/util';
import api from '../../http/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    //图片前缀
    imgUrl: api.STATIC_HOST,
    //是否编辑
    isEdit: false
  },
  //跳转到详情
  goto(e){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //删除 
  clear(e){
    util.removeHistory('bookshelf',e.currentTarget.dataset.id,'_id')
    this.getData()
  },
  //点击刷新
  refresh(){
    this.getData()
  },
  //获取数据
  getData() {
    let arr = util.getHistory('bookshelf')
    this.setData({
      list:arr
    })
  },
  // 点击帮助
  help() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  //点击编辑
  edit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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