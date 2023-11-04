const input = document.querySelector(".input");
const infoText = document.querySelector(".info-text");
const wordTitle = document.querySelector(".word-title");
const wordMeaning = document.querySelector(".word-meaning");
const meaningContainer = document.querySelector(".meaning-conteiner")
const audio = document.querySelector("audio");


async function fetchApi(word){
    try{
        infoText.style.display = "block";
        meaningContainer.style.display ="none";
        audio.src = "";
        infoText.innerText = `searching the meaning of "${word}"...`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url);
        const resultInJson = await result.json();

        if(resultInJson.title){
            meaningContainer.style.display ="block";
            wordTitle.innerText = "Word not found";
            wordMeaning.innerText = "N/A";
            audio.style.display = "none";
        }else{
            audio.style.display = "block";
            infoText.style.display = "none";
            meaningContainer.style.display ="block";
            wordTitle.innerText = resultInJson[0].word;
            wordMeaning.innerText = resultInJson[0].meanings[0].definitions[0].definition;
            audio.src = resultInJson[0].phonetics[0].audio || resultInJson[0].phonetics[1].audio;
        }
    } catch(e){
        infoText.innerText = `An Error Occured.. Try Again`;
    }
}

input.addEventListener("keyup", (e)=>{
    if(e.target.value && e.key === "Enter"){
        fetchApi(e.target.value);
    }
})