import http from '../http/index'
let limit=10
export default {
  STATIC_HOST: 'https://statics.zhuishushenqi.com', //静态资源地址
  //关于书籍分类的接口
  classification:{
     //获取大分类
     getCats(){
       return http.get("/cats/lv2/statistics")
     },
     //获取小类
     getMinor(){
        return http.get('/cats/lv2')
     } ,
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    getCatsBooks (gender, type, major, minor, start) {
     if (minor) {
      return http.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
     } else {
       return http.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=${limit}`)
     }
   }
  },
  //关于书籍的接口
  books:{
     // 书籍详情
     bookInfo (book_id) { // @param book_id 书籍id
      return http.get('/book/' + book_id)
    },
    // 相关推荐
    relatedRecommendedBooks (book_id) { // @param book_id 书籍id
      return http.get(`/book/${book_id}/recommend`)
    },
    // 作者名下的书籍
    authorBooks (author) {   // @param author 作者名
      return http.get(`/book/accurate-search?author=${author}`)
    },
    // 书源  注意：第一个优质书源为收费源
    bookSources (book_id) {  // @param book_id 书籍id
      return http.get(`/atoc?view=summary&book=${book_id}`)
    },
    // 书籍章节 根据书源id
    bookChapters(id) {  // @param id 书源id
      return http.get(`/atoc/${id}?view=chapters`)
    },
    // 书籍章节 根据书id
    bookChaptersBookId: function (book_id) {
      return http.get(`/mix-atoc/${book_id}?view=chapters`)
    },
    // 章节内容
    chapterContent: function (link) {  // @param link 章节link
      return http.get(`/${encodeURIComponent(link)}`)
    },
    //搜索热词
    hotWord(){
      return http.get('/book/hot-word')
    },
    // 书籍搜索 (分类，书名，作者名)
    bookSearch (content,start) { //@param content 搜索内容
      return http.get(`/book/fuzzy-search?start=${start}&limit=${limit}&v=1&query=${content}`)
    },
  },
  //关于排名的接口
  rank:{
    // 排名分类
    rankCategory(){
      return http.get(`/ranking/gender`)
    },
    // 排名详情
    rankInfo(rank_id) { //@param rank_id 分类ID
      return http.get(`/ranking/${rank_id}`)
    }
  },
  //关于书籍评论的接口
  comment:{
    // 讨论
    discussions (book_id) {  // @param book_id 书籍id
      return http.get(`/post/by-book?book=${book_id}`)
    },
    // 短评
    shortReviews (book_id,start) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
      return http.get(`/post/short-review?book=${book_id}&total=true&sortType=newest&start=${start}&limit=${limit}`)
    },
    //长评
    bookReviews (book_id) {  // @param book_id 书籍id
      return http.get(`/post/review/by-book?book=${book_id}`)
    },
  },
  //关于书籍列表的接口
  bookList: {
    //列表
    lists(){
      return http.get(`/book-list`)
    },
    //详情
    detail (id) {  // @param id 书单id
      return http.get(`/book-list/${book_id}`)
    }
  }
}