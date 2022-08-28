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
  calculateSum()
})

$('.shop_add').on('click', function(){
  $(this).addClass('animate__animated animate__rubberBand').bind('animationend', function(){
    $(this).removeClass('animate__animated animate__rubberBand')
  })

  var $numElement = $(this).prev()
  var newNumber = parseInt($numElement.val()) + 1
  $numElement.val(newNumber)
  calculateSum()
})

$('.shop_num').on('change', function(){
  calculateSum()
})

function calculateSum(){
  var nowM = 0;
  for (var index = 0; index < 4; index++) {
    nowM = nowM + parseInt($('.shop_num').eq(index).val()) * 150
  }

  nowM = nowM + parseInt($('.shop_num').eq(4).val()) * 120
  nowM = nowM + parseInt($('.shop_num').eq(5).val()) * 100

  $('#cart_sum').text(nowM)
  $('#cart_all').text(nowM + 60)

  $('#cart_sum, #cart_all').addClass('animate__animated animate__rubberBand')
  .bind('animationend', function(){
    $(this).removeClass('animate__animated animate__rubberBand')
  })

  for (let index = 0; index < 6; index++) {
    var productNumber = $('.shop_num').eq(index).val()*1
    $('.shop_no').eq(index).text(productNumber)
    if(productNumber > 0){
      $('.shop_item h5').eq(index).show()
    } else{
      $('.shop_item h5').eq(index).hide()
    }
  }
}

$('#shop_close').on('click', function(){
  for(var i = 0; i< 6; i++){
    var currentNumber = myChart.data.datasets[0].data[i]
    var newNumber = parseInt($('.shop_num').eq(i).val())
    myChart.data.datasets[0].data[i] = currentNumber + newNumber
  }

  var position = $('#report').offset().top
  $('html, body').animate(
    { scrollTop: position }, 
    500,
    function(){
      // 滑完以後執行
      myChart.update()
    }
  )

  $('.shop_no').text(0)
  $('.shop_num').val(0)
  $('#cart_sum').text(0)
  $('#cart_all').text(0)
  $('.shop_item h5').hide()
})

// $('.r_body').delay(5000).fadeOut('slow');
$('#robot').click(function(){
    sleep();
});

var robotClose = true;
function sleep(){
    if(robotClose){
      $('.r_body').css({opacity:1,height:350});
      $('#robot').addClass('animate__animated animate__rubberBand').bind('animationend',function(){
        $(this).removeClass('animate__animated animate__rubberBand');
      });
      $('#robot').removeClass('robot_pic')
                .addClass('glyphicon glyphicon-remove');
      $('.r_body').show('slow')
    }
    else{
      $('#robot').addClass('animate__animated animate__rubberBand').bind('animationend',function(){
        $(this).removeClass('animate__animated animate__rubberBand');
      });
      $('#robot').removeClass('glyphicon glyphicon-remove')
                .addClass('robot_pic');
      $('.r_body').hide('slow')
    }
    robotClose=!robotClose;
};