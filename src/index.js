 var input = document.getElementById('input');
var searchBtn = document.getElementById("search");
var infoSkeleton = document.getElementById("infoSkeleton")
var infoWord = document.getElementById("infoWord")
var definition = document.getElementById("definition")
var example = document.getElementById("example")
var synonym = document.getElementById("synonym")
var dataDisplay = document.getElementById("data_display")
var phoneticPara = document.getElementById("phoneticPara")




            // Functions///
    //API consumption
 async function fetchApi(word) {
     infoSkeleton.classList.remove('hidden')
     dataDisplay.style.display = 'none'
    try {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; 
        const res = await fetch(url);
        const data = await res.json();
        infoSkeleton.classList.add('hidden')
        dataDisplay.style.display = 'block'               
            displayData(data, word);
           
        
    } catch (error) {
        console.log(error);
    }}

//display data on page////
 function displayData(data, word) {
    console.log(data);
    infoWord.innerText = `${word}`;
    //display phonetic symbol
    // const phonetic = data[0].phonetic
    // phoneticPara.innerHTML = phonetic;
     //display meanings
    const meanings = data[0].meanings[0].definitions;
    let meaningList = ``;
    meanings.forEach((meaning, ind) => {
      meaningList += ` ${ind + 1}. ${meaning.definition}  \n  sentence: ${meaning.example} \n synonyms: ${meaning.synonym } \n`;
      
      definition.innerText = meaningList
      });
    //display examples
    let exampleList = ``;
    meanings.forEach((meaning) => {
        exampleList += `${meaning.example} \n`;
        example.innerText = exampleList
        });

 
 } 

           // Event Listeners 
    input.addEventListener('keyup', async (e) => {
        
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            await fetchApi(e.target.value);
        }
    });
   
    searchBtn.addEventListener('click', fetchApi());

