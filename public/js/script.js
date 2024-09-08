/* Navbar Starting */
let icon = document.querySelector(".icon");
let ul = document.querySelector("nav ul");

icon.addEventListener("click",()=>{
    ul.classList.toggle("showdata");
    if(ul.classList=="showdata"){
        document.getElementById("bar").className = "fa fa-close";
    }else{
        document.getElementById("bar").className = "fa fa-bars";
    }
})
/* Navbar Ends here */

let currentYear = new Date().getFullYear();

