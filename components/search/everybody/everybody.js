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
    //随机颜色数组
    randomBgc: [],
    //大家都在搜的数据
    list: [],
    //装所有数据的元素组
    arr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //生成随机颜色
    getRandomBgc() {
      let arr = []
      for (let i = 0; i < 7; i++) {
        let r = Math.ceil(Math.random() * 254)
        let g = Math.ceil(Math.random() * 254)
        let b = Math.ceil(Math.random() * 254)
        let color = `rgb(${r},${g},${b})`
        arr.push(color)
      }
      this.setData({
        randomBgc: arr
      })
    },
    //获取数据
    getData() {
      api.books.hotWord()
        .then(res => {
          // console.log(res)
          if (res.ok) {
            this.setData({
              arr: res.newHotWords
            })
            this.getRandomData()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //点击换一换
    change() {
      this.getRandomBgc()
      this.getRandomData()
    },
    //随机获取6项元素
    getRandomData() {
      //新数组（装6项数据的新数组）
      let newList = []
      for (let i = 0; i < 6; i++) {
        newList.push(Math.floor(Math.random() * (this.data.arr.length - 1)))
      }
      newList=Array.from(new Set(newList))
      this.setData({
        list: newList
      })
    },
    //点击热搜
    clickWord(item) {
      //添加搜索记录
      this.triggerEvent("saveHistory", item.currentTarget.dataset.item.word)
    }
  },
  lifetimes: {
    ready() {
      this.getRandomBgc()
      this.getData()
    }
  }
})
