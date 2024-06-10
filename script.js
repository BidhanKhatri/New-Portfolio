let bannerEl = document.querySelector('.banner');
let canvas = document.getElementById('canvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx  = canvas.getContext('2d');

let counterEl = document.querySelectorAll('#counter');
// const secEl = document.querySelector('.second-sec');
const navEl = document.querySelector('.navbar');
const preloaderEl = document.getElementById('preloader-wrapper');

//code for preloading screen
// window.addEventListener("load",function(){
//     preloaderEl.style.display = "none";
// })

setTimeout(()=>{
    preloaderEl.style.display = "none"; 
},2000)

var dots = [];
var colors = ["#FFC0CB", "#98FB98", "#ADD8E6", "#D3D3D3", "#FFD700"];

for(let i = 0; i < 50; i++){

   dots.push( 
    {
        x: Math.floor( Math.random() * canvas.width),
        y: Math.floor( Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        colors: colors[Math.floor(Math.random() * 5)]
    } )
}

const drawDots = () => {

    dots.forEach( dot=>{

        ctx.fillStyle = dot.colors;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

    } )
}
drawDots();

bannerEl.addEventListener('mousemove',(e)=>{

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    let mouse = {
        x: e.pageX - bannerEl.getBoundingClientRect().left,
        y: e.pageY - bannerEl.getBoundingClientRect().top
    }

    dots.forEach(dot=>{

        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 300){
            ctx.strokeStyle = dot.colors;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})

bannerEl.addEventListener('mouseout',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
})

console.log(dots);

//code for dynamic text

const textEl = document.getElementById('change-text');

const knowledge = ["FrontEnd Developer", "React Developer", "Student", "Learner"];

let knowledgeIndex = 0;
let characterIndex = 0;



updateText();

function updateText(){

    characterIndex++;

    textEl.innerHTML = `<h4>I am a ${knowledge[knowledgeIndex].slice(0,characterIndex)}| </h4>`;

    if(characterIndex === knowledge[knowledgeIndex].length ){
        knowledgeIndex++;
        characterIndex = 0;
    }

    if(knowledgeIndex === knowledge.length){
        knowledgeIndex=0;
    }

    setTimeout(updateText,200);

}

//code for increase the show-details inside content

// counterEl.forEach(getNum =>{
//     getNum.innerText = "0";

//     secEl.addEventListener('mouseenter',()=>{
//         updateNumber();
//     });

//     function updateNumber(){
//         let currentNum = +getNum.innerText;
//         console.log(currentNum);
//         const dataCeil = getNum.getAttribute("data-ceil");

//        const increment = dataCeil / 120;
//        currentNum = Math.ceil(currentNum + increment);
       
        
//        if(currentNum < dataCeil){
//         getNum.innerText = currentNum;
//            setTimeout(updateNumber, 50);
//        }else{
//         getNum.innerText = dataCeil;
//        }
    
//     }
// })

//code for navbar for hiding and showing

let previousY = window.scrollY;

window.addEventListener('scroll',()=>{

    let currentY = window.scrollY;

    if(previousY < currentY){
       navEl.style.marginTop = -100 +'px';
       navEl.style.transition = 'margin-top .4s ease-out';
    }else if(previousY > currentY){
        navEl.style.marginTop = 0 + 'px';
    }
    previousY = currentY;

})

//code for navbar for changing the nav color

window.addEventListener('scroll',()=>{

    if(window.scrollY > 80){
        // navEl.style.backgroundColor = 'rgba(0,0,0,.9)';
        navEl.style.backdropFilter = 'blur(10px)';
    }
    else{
        navEl.style.backdropFilter = 'blur(0px)';
    }

})
