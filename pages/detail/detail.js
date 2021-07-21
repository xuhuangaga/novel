import api from '../../http/api';
import util from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //书籍id
    id: '',
    //图片前缀
    imgUrl: api.STATIC_HOST,
    //书籍详情
    info: null,
    // tab数组
    arr: [
      { name: "详情" },
      { name: "评价" }
    ],
    //tabs选中的下标
    activeIndex: 0,
    //加入书架 已加入书架
    text: '',
    //评论数据
    comment: [],
    //评价总数
    total: 0,
    //高亮显示的星星数量
    starShow: 0,
    //低亮显示的星星数量
    starHide: 0,
    //星星总数量
    starTotal: 5,
    //大图是否显示
    bigImgShow: false,
    //总目录
    catalogue: 0,
    //评论当前页码
    page: 1,
    //评论总条数
    total: 0,
    commentTotal:0,
    noDataText:'加载中...'
  },
  //获取数据
  getData() {
    api.books.bookInfo(this.data.id)
      .then(res => {
        // console.log(res)
        let temp = Math.ceil(res.rating.score) - this.data.starTotal
        this.setData({
          info: res,
          starShow: temp === 0 ? this.data.starTotal : temp,
          starHide: temp < 0 ? this.data.starTotal : this.data.starTotal - temp,
          catalogue: res.chaptersCount
        })
        //判断该书是否被加入书架  设置加入书架 已加入书架文字信息
        this.changeText()
      })
      .catch(err => {
        console.log(err)
      })
  },
  //tabs组件点击顶部选项卡 分发事件
  active(val) {
    this.setData(
      {
        activeIndex: val.detail
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    //获取数据
    this.getData()
    //获取评论
    this.getComment()
  },
  //点击开始阅读
  readgo() {
    wx.navigateTo({
      url: `/pages/read/read?title=${this.data.info.title}`,
    })
  },
  //加入书架
  add() {
    // ('bookshelf', this.data.info,"_id"
    util.saveHistory({
      key: 'bookshelf',
      data: this.data.info,
      item: "_id"
    })
    this.setData({
      text: "已加入书架"
    })
  },
  //判断该书是否被加入书架  设置加入书架 已加入书架文字信息
  changeText() {
    //获取书架列表
    let list = util.getHistory('bookshelf')
    let context = '加入书架'
    if (list) {
      //判断该书籍是否已加入书架
      list.filter(item => {
        if (item._id === this.data.info._id) {
          context = '已加入书架'
          return
        }
      })
    }
    this.setData({
      text: context
    })
  },
  //修改底部提示文字
  changeNoDataText(){
    if(this.data.comment.length >= this.data.commentTotal) {
      this.setData({
        noDataText:'没有更多了'
      })
    }
  },
  //获取评论
  getComment() {
    api.comment.shortReviews(this.data.id, this.data.page)
      .then(res => {
        // console.log(res)
        if (res.ok) {
          this.setData({
            total: `(${res.total})`,
            commentTotal:res.total,
            comment: this.data.comment.concat(res.docs)
          })
          this.changeNoDataText()
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //点击小图  大图显示
  //点击大图  详情显示
  changeBigImg() {
    this.setData({
      bigImgShow: !this.data.bigImgShow
    })
  },
  //长按保存图片
  saveImg() {
    let that = this
    wx.showActionSheet({
      itemList: ['保存到本地'],
      itemColor: '#07c160',
      success(res) {
        if (res.tapIndex===0) {
          //下载图片
          wx.downloadFile({
            url: `${that.data.imgUrl}${that.data.info.cover}`,
            success(res) {
              //保存到本地
              //res.tempFilePath 临时路径
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success() {
                  wx.showToast({
                    title: '保存成功',
                    icon: "none"
                  })
                },
                fail(er) {
                  wx.showToast({
                    title: `保存失败`,
                    icon: "none"
                  })
                }
              })
              setTimeout(() => {
                wx.hideToast()
              }, 1000)
            }
          })
          // console.log(11)
        }
      }
    })
  },
  //加载更多
  loadMore() {
    this.changeNoDataText()
    //如果还有数据 则加载更多
    if (this.data.commentTotal > this.data.comment.length) {
      this.data.page++
      this.setData({
        page: this.data.page
      })
      this.getComment()
    }
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