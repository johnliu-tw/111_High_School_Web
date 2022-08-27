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