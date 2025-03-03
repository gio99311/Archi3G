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






} )