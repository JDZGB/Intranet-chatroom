const eventEmitter = require("events");
const myEmitter = new eventEmitter();

myEmitter.on('event',() => {
    console.log('触发事件1');
})


myEmitter.on('event',() => {
    console.log('触发事件2');
})


/////////////////////////////////////////////////////////////////

document.querySelector('.volumeIcon').click();//静音处理

document.getElementsByClassName('speedTab15')[0].click();//1.5倍速播放

setInterval(function(){//每3秒执行一次

//判断播放进度是否到达100%

    if(document.getElementsByClassName('passTime')[0].style.width == '100%'){
        setTimeout(function(){
            //用js执行“下一集”按钮的点击事件，延迟1s执行

            document.getElementById('nextBtn').click();

        },1000);

        setTimeout(function () {
        //延迟4秒执行调节播放速率

            document.querySelector('.volumeIcon').click();

            document.getElementsByClassName('speedTab15')[0].click();//先设置一下播放速率为1.5倍速

        },4000)

    }

    if(document.getElementsByClassName('bigPlayButton pointer')[0].style.display=='block'){//用于检测答题弹窗是否出现，并将其关闭

        document.getElementsByClassName('topic-item')[0].click()//只选A，弹窗题目不影响成绩，就不纠结选的对不对了

        document.getElementsByClassName('el-dialog__footer')[5].click()

        document.getElementsByClassName('el-dialog__headerbtn')[5].click()//点击按钮关闭

        document.getElementsByClassName('playButton')[0].click()//点击播放继续

    }

},3000);

var ti = $("body");

var video = $(".catalogue_ul1 li[id*=video-]");

var i = 1;

var v = 1;

video.css("color", "blue");

console.log("已选取" + video.length + "个小节,并已用蓝色标明,请检查是否有遗漏,如有遗漏,概不负责");

setTimeout(function () {
    $('.speedTab15').click();

    $('.volumeIcon').click();

    console.log("已进行静音和1.5倍加速");

}, 3000);

ti.on("DOMNodeInserted", function (e) {
if (e.target.textContent == "关闭") {
    console.log("检测到第" + i + "个弹题窗口");

    window.setTimeout(function () {
        document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName("answerOption")[0].getElementsByTagName("input")[0].click();

        $(".popbtn_cancel").click();

        console.log("已关闭");

    }, 3000);

    i++;

} else if (e.target.textContent == "本节视频,累计观看时间『100%』") {
    console.log("检测到视频观看完成，准备跳到下一节");

    $('.next_lesson_bg').find('a').trigger('click');

    console.log("已跳转");

    setTimeout(function () {
        $('.volumeIcon').click();

        $('.speedTab15').click();

        console.log("已进行静音和1.5倍加速");

    }, 6000);

    v++;

    console.log("目前播放了" + v + "个视频");

}

});