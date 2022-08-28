new WOW({animateClass: 'animate__animated' }).init();

var likeMap = {
  1: true,
  2: true,
  3: true
}

function ilike(newsNumber){
  if(likeMap[newsNumber]){
    $(`#uplike${newsNumber}`).removeClass('glyphicon glyphicon-heart-empty')
                             .addClass('glyphicon glyphicon-heart')
                             .addClass('animate__animated animate__rubberBand')
                             .bind('animationend', function(){
                               $(this).removeClass('animate__animated animate__rubberBand')
                             })
    var num = parseInt($(`#i-like${newsNumber}`).text())
    num = num + 1;
  }
  else{
    $(`#uplike${newsNumber}`).removeClass('glyphicon glyphicon-heart')
                             .addClass('glyphicon glyphicon-heart-empty')
    var num = parseInt($(`#i-like${newsNumber}`).text())
    num = num -1;
  }

  $(`#i-like${newsNumber}`).html(num)

  likeMap[newsNumber] = !likeMap[newsNumber]; // true <=> false
}

$('.carousel').carousel({
  pause: 'false'
})

Chart.defaults.font.size = 18;
var myChart = new Chart(document.getElementById("myChart"), {
  type: 'polarArea',
  data: {
    labels: ["柴燒黑糖", "馬告胡椒", "四川麻辣", "木瓜牛奶", "雙倍起司", "經典原味"],
    datasets: [
      {
        backgroundColor: ['rgba(255, 92, 51, 0.5)', "rgba(255, 92, 0, 0.5)","rgba(255, 0, 50, 0.5)",
                          "rgba(28, 190, 161, 0.5)","rgba(28, 190, 0, 0.5)", "rgba(28, 72, 161, 0.5)"],
        borderColor: ["rgba(255, 92, 51, 1)", "rgba(255, 92, 0, 1)","rgba(255, 0, 50, 1)",
                      "rgba(28, 190, 161, 1)","rgba(28, 190, 0, 1)", "rgba(28, 72, 161, 1)"],
        borderWidth: 3,
        data: [20,20,20,30,40,15]
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

function chat(){
  var cname = $('#cname').val()
  var cemail = $('#cemail').val()
  var ctext = $('#ctext').val()
  if(cemail.indexOf('@') > 0){
    var data = `${cname}&&${cemail}&&${ctext}`
    var chatData = localStorage.chatData
    if(cname != '' && ctext != ''){
      if(chatData == null){ // 是否為第一則留言
        chatData = data
      } else {
        chatData = `${chatData}||${data}`
      }
      
      $('#cname').val('')
      $('#cemail').val('')
      $('#ctext').val('')
      localStorage.chatData = chatData
      alert('資料已送入後台紀錄')
      showReport()
    }
  }
}

showReport()
function showReport(){
   var chatData = localStorage.chatData
   if(chatData != null){
    var messages = chatData.split('||')
    $('#chat_to').html('')
    for (var index = 0; index < messages.length; index++) {
      var message = messages[index].split('&&');
      if(messages[index] != ''){
        var messageHtml = `
        <li class="chat-box">
            <b class="chat-tit">
                <span>${message[0]}</span>
                <span>${message[1].substr(0, 5)}*********</span>
            </b>
            <box>${message[2]}</box>
        </li>
        `

        $('#chat_to').append(messageHtml)
      }
    }
    $('#chat_c').html(messages.length)
   }
}


$('a').on('click', function(){
  var target = $(this).attr('href') // #board
  var scrollTo = $(target).offset().top
  $('html, body').animate({
    scrollTop: scrollTo
  }, 500)
})

$('.o_img').hover(function(){
  $(this).addClass('animate__animated animate__flip').bind('animationend', function(){
    $(this).removeClass('animate__animated animate__flip')
  })
})

$('.shop_min').on('click', function(){
  $(this).addClass('animate__animated animate__rubberBand').bind('animationend', function(){
    $(this).removeClass('animate__animated animate__rubberBand')
  })

  var $numElement = $(this).next()
  var newNumber = parseInt($numElement.val()) - 1
  if(newNumber <= 0){
    newNumber = 0
  }
  $numElement.val(newNumber)
})

$('.shop_add').on('click', function(){
  $(this).addClass('animate__animated animate__rubberBand').bind('animationend', function(){
    $(this).removeClass('animate__animated animate__rubberBand')
  })

  var $numElement = $(this).prev()
  var newNumber = parseInt($numElement.val()) + 1
  $numElement.val(newNumber)
})