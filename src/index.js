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
   try {
       let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; 
       const res = await fetch(url);
       const data = await res.json();
       infoSkeleton.classList.add('hidden')
       data[0].word === 'undefined' ? dataDisplay.classList.add('hidden') : dataDisplay.classList.remove('hidden')     
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
    console.log(data);
    infoWord.innerText = `${word}`;
    phoneticPara.innerText =`${data[0].phonetic}`
    
     //play phonetics audio
    let getPhoneticAudio = data[0]?.phonetics.find((item, index) => {
        if (item.audio?.length > 0) return true
      })
      audio.setAttribute('src', getPhoneticAudio.audio)
      function playAudio() {
        audio.play()
      }
      audioBtn.addEventListener('click', playAudio)
    
      
    
     //display meanings
    const meanings = data[0].meanings[0].definitions;
    let meaningList = ``;
    meanings.forEach((meaning, ind) => {
      meaningList += ` ${ind + 1}. ${meaning.definition}  \n  sentence: ${meaning.example} \n synonyms: ${meaning.synonym } \n`;
      
      definition.innerText = meaningList
      });

    // //display examples
    // let exampleList = ``;
    // meanings.forEach((meaning) => {
    //     exampleList += `${meaning.example} \n`;
    //     example.innerText = exampleList
    //     });
 } 





           // Event Listeners 
    input.addEventListener('keyup', async (e) => {
        
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            await fetchApi(e.target.value);
        }
    });
   
    searchBtn.addEventListener('click', fetchApi());

