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
    labels: ["柴燒黑糖口味", "Asia", "Europe", "Latin America", "North America", "柴燒黑糖口味"],
    datasets: [
      {
        backgroundColor: ['rgba(255, 92, 51, 0.5)', "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd"],
        borderColor: ["rgba(255, 92, 51, 1)", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd"],
        borderWidth: 3,
        data: [20,20,20,30,40, 15]
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