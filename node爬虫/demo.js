var http = require('http')
var cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348'

function filterChapters(html) {
    var $ = cheerio.load(html)

    var chapters = $('div.chapter')

    var courseData = []

    chapters.each(function () {
        var chapter=$(this) // $(this)的用法可以让回调方法省略参数
        // var chapterTitle = chapter.find('strong').text().trim()
        var chapterTitle = chapter.find('strong').contents().filter(function() { return this.nodeType === 3; }).text().trim(); 
        var videos=chapter.find('ul').children()
        var chapterData = { // 定义一个json以接收数据
            chapterTitle : chapterTitle,
            videos:[]
        }

        videos.each(function () {
            var video=$(this).find('a')
            var temp=video.text().trim()
            // var temp=video.contents().filter(function() { return this.nodeType === 3; }).text().trim(); 
            var arr = temp.split('\n') // 多层标签的文本都拼到一起了，要拆开，取用需要的值
            var videoTitle = arr[0].trim() + ' ' +arr[1].trim()
            var id=video.attr('href').split('video/')[1].trim()

            chapterData.videos.push({ // 填写数据 
                title : videoTitle,
                id : id
            })
        })

        courseData.push(chapterData)
    })

    return courseData
}
// 输出函数 
function printCourseData(courseData) {
    courseData.forEach(function (item) {
        var chapterTitle = item.chapterTitle

        console.log(chapterTitle )

        item.videos.forEach(function (video) {
            console.log('---【'+video.id + '】 ' + video.title.trim() )
        })
    })
}
// 拿到源码，调用方法进行解析及输出
http.get(url, function(res){
    var html = ''

    res.on('data', function (data) {
        html+=data
    })

    res.on('end',function(){
        var courseData = filterChapters(html)
        printCourseData(courseData)
    })
}).on('error', function () {
    console.log('获取课程数据出错了')
})