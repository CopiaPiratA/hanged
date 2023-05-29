const words = ['cat','dog','bird','tree','book','pen','chair','door','window',
'computer','phone','car','river','mountain','sun','moon',
'star','ocean',
'sky','cloud'];
const images = ["img/0.png","img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png"]
let notClickedBtns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z'];
let image = document.getElementById("image");
let showWord = document.getElementById("word");
var buttons = Array.from(document.getElementsByClassName("button"));
let retryButton = document.getElementById("retry-btn");
let randomWord = "";
let hiddenWord = "";
let hiddenArray = [];
let firstIndex = 0;
let secondIndex = 0;
let thirdIndex = 0;
let i = 0;
let usedBtns = [];
let luckyBtns = [];
let lenght = 0;

function setRandomWord() {
    randomWord = words[Math.floor(Math.random()* words.length)];
    lenght = randomWord.length;
        for (let i = 0 ; i < lenght ; i ++) {
            hiddenWord = hiddenWord + "_";
        }
    hiddenArray = hiddenWord.split("")
    hiddenArray = hiddenWord.split("")
    showWord.innerHTML = hiddenArray.join(" ");
    console.log(randomWord)
}

function defeat(){
    let retrySection = document.getElementById("retry-section");
    retrySection.style.display = "flex";
    retryButton.innerHTML = "Play again"
}
retryButton.addEventListener("click",()=>{
    location.reload();
})

function hint() {
    let hintBtn = document.createElement("BUTTON");
    let hintText = document.createTextNode("Hint");
    hintBtn.appendChild(hintText);
    hintBtn.className = "hint";
    document.body.appendChild(hintBtn);

        hintBtn.addEventListener("click",()=>{
            for (i = 0 ;  i < randomWord.length ; i++){ 
                hintBtn.addEventListener("click", () => {
                    for (let i = 0; i < 7; i++) {
                      if (notClickedBtns.includes(randomWord[i])) {
                            notClickedBtns.splice(notClickedBtns.indexOf(randomWord[i]), 1);
                            let remainingBtns = notClickedBtns.filter(btn => !randomWord.includes(btn));
                            luckyBtns.push(remainingBtns[Math.floor(Math.random() * remainingBtns.length)]);
                            console.log(luckyBtns);

                                for (let i = 0; i < buttons.length; i++) {
                                    let buttonText = buttons[i].textContent;
                                    if (luckyBtns.includes(buttonText)) {
                                    buttons[i].className = "clicked";
                                    buttons[i].disabled = true;
                                    hintBtn.style.display = "none";
                                }
                            }
                        }
                    }
                });
            }
            
        })
}

function contains(letter) {
    if (randomWord.includes(letter.textContent)){ 
        firstIndex = randomWord.indexOf(letter.textContent);
        secondIndex = randomWord.indexOf(letter.textContent, firstIndex + 1);
        thirdIndex = randomWord.indexOf(letter.textContent, secondIndex + 1);
        hiddenArray[firstIndex] = letter.textContent;
        hiddenArray[secondIndex] = letter.textContent;
        hiddenArray[thirdIndex] = letter.textContent;
        showWord.innerHTML = hiddenArray.join(" ");
        if (!hiddenArray.includes("_")){
            image.src = "img/dance.gif";
            defeat()
            document.getElementById("victory-img").src = "img/victory.gif";   
        }
    }
    else {
        i = i + 1; 
        image.src = images[i];
        if (i === 4){
            hint()
        }
        if(i === 7) {
            defeat()
            showWord.innerHTML = randomWord;
            image.src = "img/sad.jpg";
            document.getElementById("victory-img").src = "img/next-time.png";
        }
    }
}

buttons.forEach (button => button.addEventListener("click",event =>{
    button.className = "clicked";
    button.disabled = true;
    let btnIndex = notClickedBtns.indexOf(button.textContent);
    notClickedBtns.splice(btnIndex,1);
    usedBtns.push(button.textContent);
    contains(button);
}))
setRandomWord()
