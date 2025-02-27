let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", ()=> {
    if(window.scrollY > 0){
        navbar.classList.add("scrolledNav")
    }else {
        navbar.classList.remove("scrolledNav")
    }
})

// CREATE INTERVAL
let productsNum = document.querySelector("#productsNum")
let brandsNum = document.querySelector("#brandsNum")
let reviewsNum = document.querySelector("#reviewsNum")

function createInterval(finalNumber, element, speed){
    let counter = 0
    let interval = setInterval(()=> {
        if(counter < finalNumber){
            counter++
            element.innerHTML = counter 
        } else {
            clearInterval(interval)
        }
    }, speed)
}

// INTERSECTION OBSERVER

let isStarted = false

const observer = new IntersectionObserver((entries)=> {
    entries.forEach ((el)=> {
        if(el.isIntersecting && isStarted == false){
            createInterval(1000, productsNum, 6)
            createInterval(200, brandsNum, 30)
            createInterval(500, reviewsNum, 15)
            isStarted = true
        }
    })
})

let elInterection = document.querySelector("#elInterection")
observer.observe(elInterection)
