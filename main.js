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


// ULTIMI ARTICOLI

const products = [
    {"name": "Lavabo marmo", "category": "Bagno", "prezzo": 560},
    {"name": "Libreria", "category": "Living", "prezzo": 5809},
    {"name": "Poltrona", "category": "Living", "prezzo": 780},
    {"name": "Tavolo in marmo", "category": "Cucina", "prezzo": 2400},
    {"name": "Letto fluttuante", "category": "Camera da Letto", "prezzo": 1550},
    {"name": "Specchiera", "category": "Bagno", "prezzo": 990},
]

let cardWrapper = document.querySelector("#cardWrapper")

products.forEach((product, i)=> {
    if( i >= products.length -3){
        let div = document.createElement("div")
        div.classList.add("col-12", "col-md-4", "col-lg-3", "mx-lg-1", "my-1")
        div.innerHTML = `
                        <div class="card-custom">
                        <div class="img-card-container overflow-hidden">
                            <img class="imgCardArt" src="https://picsum.photos/200${i}" alt="">
                            <i class="bi bi-heart color-a icon-card-custom fs-4"></i>
                        </div>
                        <h5 class="cormorant text-center text-uppercase mt-5 fw-bold color-p">${product.name}</h5>
                        <p class="color-t fw-semibold">Categoria: ${product.category}</p>
                        <p class="color-t fw-semibold">Prezzo: <span class="color-t">${product.prezzo}$</span></p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btnIndexCustom">Compra</button>
                        </div>
                        </div>
                        `
        cardWrapper.appendChild(div)

        
    }
    
})

let favouriteBtns = document.querySelectorAll(".icon-card-custom")
favouriteBtns.forEach((btn)=> {
    btn.addEventListener("click", ()=> {
        btn.classList.toggle("bi-heart-fill")
        btn.classList.toggle("bi-heart")

    })
})