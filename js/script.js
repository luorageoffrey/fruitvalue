// 

// document.addEventListener("DOMContentLoaded", function(e) { 
//   // DOMContentLoaded event handler for DOMContentLoaded event  handlers  that are  attached to  

// })

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}


var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

document.addEventListener('DOMContentLoaded', function(){


})


function createNutritionSection(){

  let data = fetchData()


  
}

function drawChart(){
  google.charts.load('current')
  google.charts.setOnLoadCallback(drawVisualization)

  
}

async function fetchData(){
  return await fetch('https://fruityvice.com/api/fruit/all')
  .then((res)=>res.json())
  .then((res) =>res )
}