const levelButtonsContainer = document.getElementById(
  "lesson-buttons-container",
);
const wordContainer = document.getElementById("words-container");
const loadingContainer = document.getElementById("spinner-container");

const wordDataContainer = document.getElementById("word-data");
const wordModalDialogue = document.getElementById("word_modal");

async function loadAllLessonButton() {
  const getLessonButtonData = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const convJsData = await getLessonButtonData.json();

  convJsData.data.forEach((x) => {
    const { level_no } = x;

    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
 <button onclick="specificLessonDataGet(${level_no})" class="lesson-btn btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i> Lesson-${level_no}</button>


`;

    levelButtonsContainer.appendChild(buttonContainer);
  });
}

loadAllLessonButton();

//This is for render word card

function renderDataOnUI(getDataContainer) {
  if (getDataContainer.length === 0) {
    wordContainer.innerHTML = "";
    const defaultEmpthyWordSekelton = document.createElement("div");

    defaultEmpthyWordSekelton.innerHTML = `

  <div class=" text-center space-y-4 py-10  font-bangla mx-auto " >
<img src="./assets/alert-error.png" alt="" class="mx-auto">

<p class="font-bangla text-[#79716b] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

<h6 class="font-medium text-4xl text-[#292524]">নেক্সট Lesson এ যান</h6>

  </div>
`;
    defaultEmpthyWordSekelton.classList.add("col-span-3");
    wordContainer.appendChild(defaultEmpthyWordSekelton);
    return;
  }

  wordContainer.innerHTML = "";

  getDataContainer.forEach((x) => {
    const { id, word, meaning, pronunciation } = x;
    const wordCard = document.createElement("div");

    wordCard.innerHTML = `
  
  <div class="p-10 rounded-xl text-center space-y-3 bg-base-100 shadow-sm h-full">

  <h2 class="font-bold text-3xl">${word}</h2>
<p class="font-medium text-xl">Meaning/Pronounciation</p>
<p class="font-bangla text-2xl font-semibold">${meaning ? meaning : "অর্থ খুঁজে পাওয়া যায়নি"}/${pronunciation}</p>
<div class="flex justify-between items-center mt-10">
<button onclick="infoShow(${id})" class=" btn bg-primary-content text-lg" ><i class="fa-solid fa-circle-info pointer-events-none"></i></button>
<button onclick="listenVoice('${word}')" class=" btn bg-primary-content text-lg"><i class="fa-solid fa-volume-high pointer-events-none"></i></button>

</div>
</div>
  `;
    wordContainer.appendChild(wordCard);
  });
}

async function specificLessonDataGet(id) {
  spinnerShow(true);
  const getSpecificLessonWords = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );

  const convJsData = await getSpecificLessonWords.json();
  spinnerShow(false);
  renderDataOnUI(convJsData.data);
}

levelButtonsContainer.addEventListener("click", (event) => {
  const getButton = event.target;

  if (getButton.classList.contains("lesson-btn")) {
    const getAllLessonButtons =
      levelButtonsContainer.querySelectorAll(".lesson-btn");

    getAllLessonButtons.forEach((button) => {
      button.classList.remove("bg-primary", "text-white");
    });

    getButton.classList.add("bg-primary", "text-white");
  }
});

async function infoShow(id) {
modalSpinner(true)
 wordModalDialogue.showModal();
  // getting specfic word details using api

  const getWordDetails = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`,
  );
  const convJsData = await getWordDetails.json();
 

 
  //destructuring
  const { word, meaning, pronunciation, sentence, synonyms } = convJsData.data;

  const synonymsAdd = (x) => {
    if (x.length === 0) {
      return `<span class='btn bg-primary-content'>সিনোনিমস পাওয়া যায়নি</span>`;
    }

    const getSynonyms = x.map((x) => {
      return `<span class="btn bg-primary-content">${x}</span>`;
    });

    return getSynonyms.join(" ");
  };
 modalSpinner(false)
  wordDataContainer.innerHTML = `

<div class="space-y-8">
  <h2 class="font-bangla text-4xl font-semibold">${word} <span>(<i class="fa-solid fa-microphone-lines"></i>:${pronunciation})</span></h2>
<div><p class="text-2xl font-semibold">Meaning</p>
<span class="font-bangla font-medium">${meaning ? meaning : "অর্থ খুঁজে পাওয়া যায়নি"}</span></div>
<div><p class="text-2xl font-semibold">Example</p>
<span class='text-lg'>${sentence}</span></div>
<div><p class="font-bangla font-medium text-xl">সমার্থক শব্দ গুলো</p>
<p class="mt-2 flex items-center gap-4">${synonymsAdd(synonyms)}</p></div>
</div>
`;

  
}

function listenVoice(getWord) {
  const uttreanceObj = new SpeechSynthesisUtterance(getWord);
  uttreanceObj.lang = "en-US"; //its for getting US Accent Pronounciation
  window.speechSynthesis.speak(uttreanceObj);
}


function modalSpinner(wanna){
  
  const modalSpinnerContainer=document.getElementById('spinner-container-modal')
  if(wanna){

modalSpinnerContainer.classList.remove('hidden')
wordDataContainer.classList.add('hidden')

  }
else{
  
modalSpinnerContainer.classList.add('hidden')
wordDataContainer.classList.remove('hidden')
}

}

function spinnerShow(wanna) {
  if (wanna) {
    loadingContainer.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    wordContainer.classList.remove("hidden");
    loadingContainer.classList.add("hidden");
  }
}
