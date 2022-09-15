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

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener('DOMContentLoaded', function(){

  google.charts.load('current', {'packages':['corechart']});

  createNutritionSection()

})


function createNutritionSection(){

  let data = fetchData()

  console.log("some data")
  console.log(data)

  data.then((data) =>{

    console.log("some data")

    console.log(data);


    let res = data.result
    // data.forEach((element, index)=>{
    //   if(index===15){
    //     break;
    //   }

    // });

    for(let i=0; i<data.length; i++){
      if(i==9){
        break
      }

      buildFruitBox(data[i])   
     }

   
  })  
}



function buildFruitBox(fruit) {  

  let box_container = document.querySelector('.box-container');

  let box = document.createElement('div')
  box.setAttribute('class','box')

  let fruitName = document.createElement('h3')
  fruitName.innerHTML = fruit.name 

  let scientificName = document.createElement('h3')
  scientificName.innerHTML = fruit.family + " " + fruit.genus

  let chartDiv = document.createElement('div')
  chartDiv.setAttribute('id',`${fruit.name}`)


  let dataTable  = getDataTable(fruit) 

  box.appendChild(fruitName)
  box.appendChild(scientificName)
  box.appendChild(chartDiv)

  box_container.appendChild(box)

  console.log(" on load callback")
  
  google.charts.setOnLoadCallback(function(){
    let wrapper = new google.visualization.ChartWrapper({
      chartType: 'PieChart',
      dataTable: dataTable, 
      containerId: `${fruit.name}`,
      options: {
        legend: { position: 'top', alignment: 'start' },
        width: 350,
        height: 350,
        pieHole: 0.4,
        is3D:true,
        colors: ['#AAAEEF', '#E8AAEF', '#F0FF33', '#B647DD', '#47DD4B','#47DD84', '#07DDA5', ],
        title: `${fruit.name}`
    }
    })

    wrapper.draw()
  }) 



}

function getDataTable(fruit){

  let keys  = Object.keys(fruit.nutritions)  
  let values = Object.values(fruit.nutritions)

  let dataTable = []

  let dataVals = [] 

  for (let i = 0; i< keys.length + 1; i++) {
    for(let j = 0; j< 2; j++) {
        dataVals[i] = [];
    }
  }


  dataVals[0][0] = 'key'
  dataVals[0][1] = 'value'

  console.log("data vals", dataVals,)

  keys.forEach((key, index)=>{

    // dataVals.push(key)
    // dataVals.push(values[index])

    // dataTable.push(dataVals)
    console.log("index", index)
    
    let i = index + 1;
    dataVals[i][0] = key 
    dataVals[i][1] = values[index]


    // console.log(dataVals[index][0])
    // console.log(dataVals[index][1])
  })

  console.log("data vals")

  console.log(dataVals)

  return dataVals

}

function drawChart(){
  google.charts.load('current')
  google.charts.setOnLoadCallback(drawVisualization)
  
}

async function fetchData(){

  return await fetch("https://fruityvice.com/api/fruit/all",{
    headers:{
      'Access-Control-Allow-Origin': '*'
    }
 
  })
  .then((res)=>res.json()

  )
  .then((res)=>res)
}