 var input = document.getElementById('input');
var searchBtn = document.getElementById("search");
var infoSkeleton = document.getElementById("infoSkeleton")
var infoWord = document.getElementById("infoWord")
var definition = document.getElementById("definition")
 var example = document.getElementById("example")
var synonym = document.getElementById("synonym")
var dataDisplay = document.getElementById("data_display")
var phoneticPara = document.getElementById("phoneticPara")
var toggleBtn = document.getElementById("toggleBtn")
var body = document.getElementById("body")
var error = document.getElementById("error")
var audio = document.getElementById("audio")
var audioBtn = document.getElementById("audioBtn")
var phoneticPara = document.getElementById("phoneticPara")




            
    //API consumption
async function fetchApi(word) {
    infoSkeleton.classList.remove('hidden')
    dataDisplay.classList.add('hidden')
    error.classList.add('hidden')
   try {
       let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; 
       const res = await fetch(url);
       const data = await res.json();
       infoSkeleton.classList.add('hidden')
       data[0].word === undefined ? dataDisplay.classList.add('hidden') : dataDisplay.classList.remove('hidden')     
           displayData(data, word);

   } catch (error) {
       console.log(error);
   }}

// Toggle light and dark
toggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark');
    })    

//display data on page////
 function displayData(data, word) {
     if ( data.result) {  // if api can't find word
         error.classList.remove('hidden')
     } else {
        error.classList.add('hidden')
         console.log(data);
         infoWord.innerText = `${word}`;
         phoneticPara.innerText =`${data[0].phonetic}`
         
          //play phonetics audio
         let getPhoneticAudio = data[0].phonetics.find((item, index) => {
             if (item.audio.length > 0) return true
           })
           audio.setAttribute('src', getPhoneticAudio.audio)
           function playAudio() {
             audio.play()
           }
           audioBtn.addEventListener('click', playAudio)
         
          //display meanings
          const meanings = data[0].meanings;
          let meaningList = ''
           meanings.map((item)=> {
               meaningList += displayMeaings(item)
           })
           definition.innerHTML = meaningList
        }

        function displayMeaings(meaning) {
            let otherDisplay = ''
            meaning.definitions.map((item) => (otherDisplay += otherDisplayFunc(item)))
            let display = `<div class="block">
            <header class="text-xl md:text-2xl font-bold capitalize">${meaning.partOfSpeech}</header>
            <ul class=" list-decimal text-sm md:text-base px-5">
            ${otherDisplay}
            </ul>
            </div>`

            display = display.trim()
            return display
        }
        function otherDisplayFunc(meaning) {
            definitionsHtml = `<li  class="leading-5 p-2"> ${meaning.definition}<ul>`
            let exampleList = ``
            let antonymList = ``
            let synonymList = ``

            if (meaning.example != undefined) {
                exampleList += `<li class="italic text-grey font-normal text-muted">sentence: “${meaning.example}"</li>`
              }
              if (meaning.synonyms != undefined) {
                synonymList += `<li class=" font-medium">Synonyms: “${flatArray(
                  meaning.synonyms,
                )}”</li>`
              }
            
              if (meaning.antonyms != undefined) {
                antonymList += `<li class="font-medium">Antonyms: “${flatArray(
                  meaning.antonyms,
                )}”</li>`
              }
            
              definitionsHtml += exampleList + synonymList + antonymList + '</ul></li>'
              return definitionsHtml
        }
        function flatArray(arr) {
            if (arr != undefined) {
              return arr.reduce((pv, cv) => {
                return pv + ', ' + cv
              })
            }
        
 }}
    
       



           // Event Listeners 
    input.addEventListener('keyup', async (e) => {
        
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            await fetchApi(e.target.value);
        }
    });
   
    searchBtn.addEventListener('click', fetchApi());
 
  


        