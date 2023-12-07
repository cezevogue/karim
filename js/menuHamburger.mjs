export function menuburger(menu,spanTop,spanMiddle,spanBottom,links){

    if(menu.classList[1] != "open"){
        
        menu.classList.add("open");
        spanMiddle.style.display = "none";
        spanBottom.style.marginTop = "-5px";
        spanBottom.style.transform = "rotate(45deg)";
        spanTop.style.transform = "rotate(-45deg)";
        links.style.top = "50px";

    }else{
        spanMiddle.style.display = "block";
        spanBottom.style.marginTop = "5px";
        spanBottom.style.transform = "rotate(0deg)";
        spanTop.style.transform = "rotate(0deg)";
        links.style.top = "-300px";
        menu.classList.remove("open");
    }

}
