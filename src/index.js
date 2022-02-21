 var input = document.getElementById('input');
var searchBtn = document.getElementById("search");
var infoSkeleton = document.getElementById("infoSkeleton")
var infoWord = document.getElementById("infoWord")



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
 const displayData = (data) => {
    console.log(data)
 }   



             // Event Listeners
    input.addEventListener('keyup', e => {
        if (e.key === 'enter' && input.target.value) {
            fetchApi(input.target.value);
        }
    });
    searchBtn.addEventListener('click', fetchApi());

