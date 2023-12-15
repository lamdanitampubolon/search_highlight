const contentEle        = document.getElementById("konten");
const searchInput       = document.getElementById("searchInput");
const foundEle          = document.getElementById('found')
const searchBtn         = document.getElementById("searchBtn");
const positionEle       = document.getElementById('position')
const totalEle          = document.getElementById('total')
const highlightsEle     = document.getElementsByClassName('di_spot')
const originalString    = contentEle.innerHTML //original content

function highlight(element, originalString, cari){
    if(cari.length > 0) {
        let regex         = new RegExp(cari, "gi");
        let newString     = originalString.replace(regex, "<span class='di_spot'>" + cari + "</span>")
        element.innerHTML = newString
    } else {
        //tidak mencari apapun
        element.innerHTML = originalString
    }
}

function foundWord(){ 
    if(highlightsEle.length > 0){
        foundEle.style.display = 'inline';
        totalEle.innerText     = highlightsEle.length //jumlah kata yg di temukan
        indicator(1) //default set indicator 1
    } else {
        foundEle.style.display = 'none';
    }
}

function indicator(currentPosition){
    if(currentPosition > highlightsEle.length ){
        
        indicator(1)

        processing(currentPosition)
    }

    else if(currentPosition == 0){
        indicator(highlightsEle.length)
        
        processing(currentPosition)
    }

    removeCurrentIndicator()
    processing(currentPosition)
}

function processing(currentPosition) {
    highlightsEle[currentPosition - 1].id  = currentPosition
    highlightsEle[currentPosition - 1].classList.add('active');
    positionEle.innerText      = currentPosition
    window.location.hash    = '#' + currentPosition //move location
}

function prev(){
    indicator(parseInt(positionEle.innerText) - 1) 
}

function next(){
    indicator(parseInt(positionEle.innerText) + 1)  
}

function removeCurrentIndicator(currentPosition){
  if(highlightsEle[parseInt(positionEle.innerText) - 1]){
    highlightsEle[parseInt(positionEle.innerText) - 1].classList.remove('active');
  }
}

searchBtn.addEventListener("click", function(){
    highlight(konten, originalString, searchInput.value)
    foundWord() //hitung jumlah kata yang di temukan
});