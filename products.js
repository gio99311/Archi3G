// NAVBAR

let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", ()=> {
    if(window.scrollY > 0){
        navbar.classList.add("scrolledNav")
    }else {
        navbar.classList.remove("scrolledNav")
    }
})

// FETCH
fetch("./prodotti.json").then( (response) => response.json() ).then( (data)=> {
    console.log(data)

    // CREAZIONE CARDS

    let cardsWrapper = document.querySelector("#cardsWrapper")

    function createCards(array) {
        
        cardsWrapper.innerHTML = ""

        array.forEach( (product, i)=> {
            
            let div = document.createElement("div")
            div.classList.add("col-12", "col-md-4", "col-lg-3", "mx-lg-1", "my-1")
            div.innerHTML = `
                            <div class="card-custom">
                            <div class="img-card-container overflow-hidden">
                                <img class="imgCardArt" src="https://picsum.photos/200${i}" alt="">
                                <i class="bi bi-heart color-a icon-card-custom fs-4"></i>
                            </div>
                            <h5 class="cormorant text-center text-uppercase mt-5 fw-bold color-p">${product.name}</h5>
                            <p class="color-t fw-semibold">Categoria: <span class="fw-normal">${product.category}</span> </p>
                            <p class="color-t fw-semibold">Prezzo: <span class="color-p fw-normal">${product.prezzo}$</span></p>
                            <div class="d-flex justify-content-center">
                                <button class="btn btnIndexCustom">Compra</button>
                            </div>
                            </div>
                            `
            cardsWrapper.appendChild(div)
                
        } )

        let favouriteBtns = document.querySelectorAll(".icon-card-custom")
        favouriteBtns.forEach((btn)=> {
            btn.addEventListener("click", ()=> {
            btn.classList.toggle("bi-heart-fill")
            btn.classList.toggle("bi-heart")
    
            })
        })
    }
    
    createCards(data)


    // RADIO BUTTON CHECK CATEGORIA

    let btnCategories = document.querySelector("#btnCategories") 

    let dataCategories = data.map( (product) => product.category )
    let uniqueCategories = Array.from(new Set(dataCategories) )

    uniqueCategories.sort().forEach( (category) => {
        let div = document.createElement("div")
        div.classList.add("form-check")
        div.innerHTML = `
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id=${category}>
                        <label class="form-check-label" for=${category}>
                          ${category}
                        </label>
                        `
        
        btnCategories.appendChild(div)
    })

    // FUNZIONE FILTRO PER CATEGORIA

    let btnsRadio = document.querySelectorAll(".form-check-input") //mi sono catturata tutti i radio check attraverso la classe di bootstraps ma restituisce una NodeList

    // console.log(btnsRadio)

    function filterCategory(array) {

        let nodeToArray = Array.from( btnsRadio )
        let radioChecked = nodeToArray.find( (btn) => btn.checked == true )
        if(radioChecked.id == "allCateg"){
            createCards(data)
        }else {
            let filtered = array.filter( (product)=> product.category == radioChecked.id )
            return filtered
        }
    }
    
    btnsRadio.forEach( (btnsRadio)=> {
        btnsRadio.addEventListener("input", ()=> {
            globalFilter()
            
        })
    } )


    // SETTING RANGE BAR FILTRO PREZZO
    
    let inputPrice = document.querySelector("#inputPrice")
    let labelPrice = document.querySelector("#labelPrice")

    let prices = data.map( (product)=> product.prezzo )
    let min = Math.min(...prices)
    let max = Math.max(...prices)

    inputPrice.min = min
    inputPrice.max = max
    inputPrice.value = max
    labelPrice.innerText = `${max} $` 

    
    // FILTRO PER PREZZO
    function filterPrice(array){
        let filtered = array.sort( (a, b)=> a.prezzo - b.prezzo ).filter( (product)=> product.prezzo <= inputPrice.value)
        return filtered
    }

    inputPrice.addEventListener("input", ()=> {
        labelPrice.innerText = `${inputPrice.value}$`
        globalFilter()
    })


    // FILTRO PER NOME

    let inputName = document.querySelector("#inputName")

    function filterName(array) {
        let filtered = array.filter((product)=> product.name.toLowerCase().includes(inputName.value.toLowerCase()) )
        return filtered
    }

    inputName.addEventListener("input", ()=> {
        globalFilter()
    })

    function globalFilter(){
        let filteredByCategory = filterCategory(data)
        let filteredByPrice = filterPrice(filteredByCategory)
        let filteredByName = filterName(filteredByPrice)
        createCards(filteredByName)
    }








} )