 var input = document.getElementById('input');
var searchBtn = document.getElementById("search");
var infoSkeleton = document.getElementById("infoSkeleton")
var infoWord = document.getElementById("infoWord")
var definition = document.getElementById("definition")
var sentence = document.getElementById("sentence")
var synonym = document.getElementById("synonym")




            // Functions
    //API consumption
 async function fetchApi(word) {
     infoSkeleton.classList.remove('hidden')
    try {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; 
        const res = await fetch(url);
        const data = await res.json();
        infoSkeleton.classList.add('hidden')               
            displayData(data, word);
           
        
    } catch (error) {
        console.log(error);
    }}

//display data on page
 function displayData(data, word) {
    console.log(data);
    infoWord.innerText = `${word}`;
     //display meanings
    // const meanings = data[0].meanings[0].definitions;
    // let meaningList = ``;
    // meanings.forEach((meaning, ind) => {
    //   meaningList += `${ind + 1}. ${meaning.definition} \n`;
    //   definition.innerText = meaningList
    //   });
 
 } 

           // Event Listeners
    input.addEventListener('keyup', async (e) => {
        console.log(e.key, e.target.value)
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            await fetchApi(e.target.value);
        }
    });
   
    //searchBtn.addEventListener('click', fetchApi(word));

