const words = ['cat','dog','bird','tree','book','pen','chair','door','window',
'computer','phone','car','river','mountain','sun','moon','algorithm', 'blockchain',
'cybersecurity', 'programming','robotics', 'nanotechnology', 'augmented reality',
'star','ocean','sky','cloud','Montevideo', 'beaches','tango','asado', 'mate',
'football', 'carnival', 'gauchos','Rambla', 'Candombe'];
let notClickedBtns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z'];
const images = ["img/0.png","img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png"]
let image = document.getElementById("image");
let showWord = document.getElementById("word");
let buttons = Array.from(document.getElementsByClassName("button"));
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
    /* selects a random word from the array words,
        then changes every letter for a "_", and 
        shows it showWord.
    */
    randomWord = words[Math.floor(Math.random()* words.length)];
    lenght = randomWord.length;
        for (let i = 0 ; i < lenght ; i ++) {
            hiddenWord = hiddenWord + "_";
        }
    hiddenArray = hiddenWord.split("")
    hiddenArray = hiddenWord.split("")
    showWord.innerHTML = hiddenArray.join(" ");
}

function contains(letter) {
        /* checks that the string randomWord contains the letter the user clicked,
         if so, gets the indices of those letters
          and then replaces those indices in hiddenArray with that letter.
        */
    if (randomWord.includes(letter.textContent)){ 
        firstIndex = randomWord.indexOf(letter.textContent);
        secondIndex = randomWord.indexOf(letter.textContent, firstIndex + 1);
        thirdIndex = randomWord.indexOf(letter.textContent, secondIndex + 1);
        hiddenArray[firstIndex] = letter.textContent;
        hiddenArray[secondIndex] = letter.textContent;
        hiddenArray[thirdIndex] = letter.textContent;
        showWord.innerHTML = hiddenArray.join(" ");
            // if all the letters are replaced, the game the game ends as a win.
            if (!hiddenArray.includes("_")){
                image.src = "img/dance.gif";
                finish()
                document.getElementById("victory-img").src = "img/victory.gif";   
            }
    } // 
    else {  /*i represents the number of wrong letters the user selected.
            if i is equal to 4, hint() is executed,
            if i is equal to 7 the game ends as a defeat.
            */
        i = i + 1; 
        image.src = images[i];
            if (i === 4){
                hint()
            }
            if(i === 7) {
                finish()
                showWord.innerHTML = randomWord;
                image.src = "img/sad.jpg";
                document.getElementById("victory-img").src = "img/next-time.png";
            }
    }
}
function hint() {
    let hintBtn = document.createElement("BUTTON");
    let hintText = document.createTextNode("Hint");
    hintBtn.appendChild(hintText);
    hintBtn.className = "hint";
    document.body.appendChild(hintBtn);

        hintBtn.addEventListener("click", () => {
            hintBtn.style.display = "none";
            for (let i = 0; i < 7; i++) {
                /*notClickedBtns contains all the buttons on the screen,
                  as they are clicked they are removed of the array,
                  also the letters that are present in randomWord.

                  once the unwanted letters are removed,
                  luckyBtns is created which is an array with random
                  letters held in notClickedBtns.
                */
                if (notClickedBtns.includes(randomWord[i])) {
                    notClickedBtns.splice(notClickedBtns.indexOf(randomWord[i]), 1);
                    let remainingBtns = notClickedBtns.filter(btn => !randomWord.includes(btn));
                    luckyBtns.push(remainingBtns[Math.floor(Math.random() * remainingBtns.length)]);
                    hintBtn.style.display = "none";
                        //finally the buttons with the values of luckyBtns are deactivated.
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
function finish(){
    let retrySection = document.getElementById("retry-section");
    retrySection.style.display = "flex";
    retryButton.innerHTML = "Play again"
}

buttons.forEach (button => button.addEventListener("click",event =>{
    button.className = "clicked";
    button.disabled = true;
    let btnIndex = notClickedBtns.indexOf(button.textContent);
    notClickedBtns.splice(btnIndex,1);
    usedBtns.push(button.textContent);
    contains(button);

        retryButton.addEventListener("click",()=>{
            location.reload();
        })
}))
setRandomWord()
