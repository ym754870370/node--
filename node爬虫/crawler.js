var http = require('http')
var cheerio = require('cheerio')//类似于jquery的一个库，让node更有效的操作获取到的html元素
var url = 'http://www.imooc.com/learn/348'



function filterChapters(html){
  var $ = cheerio.load(html)//用cheerio的load方法加载html
  var chapters = $('.chapter')

  // [{ //  目标要得到的数据结构
  //   chapterTitle: '',
  //   videos: [
  //     title: '',
  //     id: ''
  //   ]
  // }]


  var courseData = []

  chapters.each(function(item){
    var chapter = $(this)
    var chapterTitle = chapter.find('strong').text()
    var videos = chapter.find('.video').children('li')
    var charpterData = {
      chapterTitle: chapterTitle,
      videos: []
    }

    videos.each(function(item){
      var video = $(this).find('a')
      var videoTitle = video.text()
      var id = video.attr('hred').split('video/')[1]//split会以括号中第一个元素作为分段，然后返回一个数组。

      charpterData.videos.push({
        title: videoTitle,
        id: id
      })

    })
    courseData.push(charpterData)
  })
  return courseData
}


function printCourseInfo(courseData){
  courseData.forEach(function(items){
    var chapterTitle = items.chapterTitle

    console.log(chapterTitle + '\n')

    items.videos.forEach(function(video){
      console.log('   ［' + video.id + ']   ' +  video.title + '\n')
    })
  })
}




http.get(url, function(response){
  var html = ''

  response.on('data', function(data){
    html += data 
  })

  response.on('end', function() {
    // console.log(html)
    var courseData = filterChapters(html)

    printCourseInfo(courseData)
  })
}).on('error', function(){
  console.log('ERROR!!!!!')
})
