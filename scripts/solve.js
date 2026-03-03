const levelButtonsContainer = document.getElementById(
  "lesson-buttons-container",
);
const wordContainer = document.getElementById("words-container");
const loadingContainer = document.getElementById("spinner-container");

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
<button class="btn bg-primary-content text-lg" ><i class="fa-solid fa-circle-info pointer-events-none"></i></button>
<button  class="btn bg-primary-content text-lg"><i class="fa-solid fa-volume-high pointer-events-none"></i></button>

</div>
</div>
  `;
    wordContainer.appendChild(wordCard);
  });
}
async function specificLessonDataGet(id) {
  const getSpecificLessonWords = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );

  const convJsData = await getSpecificLessonWords.json();

  renderDataOnUI();
}

async function specificLessonDataGet(id) {
  const getSpecificLessonWords = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`,
  );

  const convJsData = await getSpecificLessonWords.json();

  renderDataOnUI(convJsData.data);
}
