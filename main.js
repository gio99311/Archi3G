let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", ()=> {
    if(window.scrollY > 0){
        navbar.classList.add("scrolledNav")
    }else {
        navbar.classList.remove("scrolledNav")
    }
})