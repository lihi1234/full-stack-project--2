/*A javaScript file for a flying bird game*/
const bird = document.querySelector('.bird');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const message = document.querySelector('.message');
const candy = document.createElement('div');
const numSpikes =Math.floor(window.innerHeight / 70) ;
let intervalLeft, intervalRight, check, game=false, sum, score = 0, level=1, b, l, fallSpeed = 2.5, sidee="left";
let isGameStarted = false, isJumping = false, done=false, flag=false;

//When you press any key on the keyboard, we want to start the game (if we are not in the middle of the game)
document.addEventListener('keydown', (event) => {
    if ((event.key !== 'p')&&(event.key !== 'P')&&(!isGameStarted)) {
        startGame();
    }

    if (event.key === 'v' || event.key === 'V') {//By pressing V the bird flies low
        jump(10)
    }
    if (event.key === ' ') {//if he clicked space you will send to jump 
        jump(30);
    }
    if (event.key === 'p' || event.key === 'P') {//to stop/continue the game
        let isPaused = false;
            Pause();
    }  
  
});

//Starts the game and updates the variables accordingly
function startGame() {
    isGameStarted = true; 
    message.style.display = 'none';
    bird.style.transform = 'rotateY(0deg)';//At the start of the game the bird should be in its normal direction
    if(game==false){spikes(); game=true; }//If this is the first time you have entered the function - the game has now started, we will call for the construction of the spikes and the creation of the candy
    generateSpikes('.spike-left'); //Decide which spikes will appear on the left wall
    flag=false;
    generateSpikes('.spike-right');//Decide which spikes will appear on the right wall
     check=setInterval(checkCollision,300);//The checkCollision function is called every 300 milliseconds and checks whether there is a collision between the bird and other elements
     sidee="left";//we will fly from left to right
    intervalLeft = setInterval(() => moveBird("left"), 50);//Every 50 milliseconds we will run the function that will move the bird
}

//Moves the bird up by the pixels sent in the parameter
function jump(high) {
        bird.style.top = (parseInt(bird.style.top) - high) + "px";
}

//A function that moves the bird to the right/left depending on the parameter and up and check if there is a collision with ceil, floor
function moveBird(side) {
    if(isGameStarted)
    {
        if (side === "left")
        { 
            bird.style.left = `${bird.offsetLeft + 2 * fallSpeed}px`;
        }
        else { 
            bird.style.left = `${bird.offsetLeft - 2 * fallSpeed}px`;
        }
        bird.style.top = `${bird.offsetTop + fallSpeed}px`;
        if (bird.offsetTop <= 0 || bird.offsetTop + bird.offsetHeight >= gameContainer.offsetHeight) {
            endGame();//If there is a collision with ceil or floor
        }
        else{ 
            if (bird.offsetLeft + bird.offsetWidth >= gameContainer.offsetWidth)//If the bird reached the right side we would like to change direction
            {
            done=false;
            clearInterval(intervalLeft);
            generateSpikes('.spike-left');
            scoreDisplay.textContent = ++score;//Score update
            levelDisplay.textContent = ++level;//Level update
            bird.style.transform = 'rotateY(180deg)';//We will turn the bird over
            sidee="right";
            intervalRight = setInterval(() => moveBird("right"), 50);
            }
            else if(bird.offsetLeft <= 0)//If the bird reached the left side we would like to change direction
            {
                done=false;
                clearInterval(intervalRight);
                generateSpikes('.spike-right');
                scoreDisplay.textContent=++score;//Score update
                levelDisplay.textContent=++level;//Level update
                sidee="left";
                intervalLeft=setInterval(() => moveBird("left"), 50);
                bird.style.transform = 'rotateY(0deg)';//We will turn the bird over
            }
            if(level%2==0&&fallSpeed<5)//Every 2 steps the speed increases
            {
                fallSpeed+=0.25;
            }       
        }
       
    }
}
//End game function
function endGame() {
    clearInterval(intervalLeft);
    clearInterval(intervalRight);
    clearInterval(check);
    message.innerHTML = `Game Over! Your score: ${score} <br> Press any key to start again`;//Printing the stage you reached and a new start
    message.style.display = 'block';
    isGameStarted = false;
    level=1;//initialize the level value
    score = 0;//initialize the score value
    fallSpeed=3;//initialize the fallSpeed value
    scoreDisplay.textContent = score;
    levelDisplay.textContent=level;
    bird.style.top = '50%';
    bird.style.left ='50px';
}

//A function to create the spikes in the walls
function createSpikes(className, side) {
    for (let i=0; i < numSpikes; i++) {
        const spike = document.createElement('div');
        spike.classList.add(className);
        spike.classList.add("spikes");
        spike.style.bottom = `${i *70}px`;
        spike.style.left = side === "right" ? `${gameContainer.offsetWidth - 40}px` : '10px';
        gameContainer.appendChild(spike);
    }
}
function spikes() {
    createSpikes('spike-right', 'right');
    createSpikes('spike-left', 'left');
    candy.classList.add("candies");
    gameContainer.appendChild(candy);
}

//A function that determines which of the spikes will appear on the left wall
function generateSpikes(className) {
    bonus();
    boom();
    let b=0;
    let a=document.querySelectorAll(className)
    a.forEach(spike => {
        b++;
        if (Math.random() < 0.5) {
            spike.style.display = 'block'; // הצגת המשולש
            flag=true;
        } else {
            spike.style.display = 'none'; // החבאת המשולש
        }
    });
    if(flag==false)
    {
        generateSpikes('.spike-left');
    }
    else
    {
        flag=false;
    }
}


// הגדרת מערך ריק לשמירת מיקומי הפצצות
var bombs = [];
for (var i = 0; i < 5; i++) {
    var bombElement = document.createElement('div');
    bombElement.className = 'bomb';
    bombElement.style.position = 'absolute';
    bombs.push(bombElement);
    gameContainer.appendChild(bombElement);

}


function boom() {
  
    // גרילת מיקומי הפצצות
    for (var i = 0; i < 5; i++) {
        var b = Math.floor(Math.random() * (gameContainer.offsetHeight - 80) + 40);
        var l = Math.floor(Math.random() * (gameContainer.offsetWidth - 130) + 65);
        bombs[i].style.display='block';
        bombs[i].style.bottom = `${b}px`;
        bombs[i].style.left = `${l}px`
    }

}


function bonus()
{
    b = Math.floor(Math.random() * (gameContainer.offsetHeight-60)+30);
    l = Math.floor(Math.random() * (gameContainer.offsetWidth -110) +55);
    candy.style.display='block';
    candy.style.bottom = `${b}px`;
    candy.style.left = `${l}px`;
}

function checkCollisionWith(rect,foo) {
    const birdRect = bird.getBoundingClientRect(); // קבלת גבולות האלמנט ברקע של המסך
    if(done==false)
    {
        if (
            birdRect.left < rect.right &&
            birdRect.right > rect.left &&
            birdRect.top < rect.bottom &&
            birdRect.bottom > rect.top
        ) {
           foo();
           done=true;

        }
    } 
}
function CollisionWithCandy()
{
     // הנגיעה בממתק
     score++; // הוספת ניקוד
     scoreDisplay.textContent = score; // עדכון התצוגה של הניקוד
     done=true;
     animateCandy();
}

function CollisionWithBomb()
{
    endGame();
}



function animateCandy() {
    // הפעל אנימציה על הממתק
    candy.style.transition = 'bottom 2s ease-out';
    candy.style.bottom = '150%'; // העלאת הממתק למעלה מהמסך

    // כשהאנימציה מסתיימת, החזר את הממתק למצבו הרגיל
    setTimeout(() => {
        candy.style.transition = ''; // מחזיר את הממתק למצבו הרגיל שלו ללא אנימציה
        candy.style.bottom = '-50px'; // חזרה של הממתק לתחתית המסך
    }, 1000); // זמן של 1000 מילי-שניות (1 שנייה) לאחר התחלת האנימציה
}


function checkCollision() {

   const birdRect = bird.getBoundingClientRect(); // קבלת גבולות האלמנט ברקע של המסך
    const candyRect = candy.getBoundingClientRect(); // קבלת גבולות האלמנט ברקע של המסך
    document.querySelectorAll('.spike-right').forEach(spike => {
        const spikeRectRight = spike.getBoundingClientRect(); // קבלת גבולות המשולש ברקע של המסך
        if (spike.style.display === 'block') { // רק אם המשולש במצב תצוגה
            if (birdRect.right >= spikeRectRight.left) {
                // כאן תוכל להוסיף פעולות נוספות כמו הפסקת המשחק וכו'
                if((birdRect.top <= spikeRectRight.top&&birdRect.bottom >= spikeRectRight.top)||(birdRect.top <= spikeRectRight.bottom &&birdRect.bottom >= spikeRectRight.bottom )||(birdRect.top >= spikeRectRight.top &&birdRect.bottom <= spikeRectRight.bottom ))
                {
                    endGame();
                }
            } 
        }
    
    });
    document.querySelectorAll('.spike-left').forEach(spike => {
        const spikeRectLeft = spike.getBoundingClientRect(); // קבלת גבולות המשולש ברקע של המסך
        if (spike.style.display === 'block') { // רק אם המשולש במצב תצוגה

            if (birdRect.left <= spikeRectLeft.right) {
                // כאן תוכל להוסיף פעולות נוספות כמו הפסקת המשחק וכו'
                if((birdRect.top <= spikeRectLeft.top&&birdRect.bottom >= spikeRectLeft.top)||(birdRect.top <= spikeRectLeft.bottom &&birdRect.bottom >= spikeRectLeft.bottom )||(birdRect.top >= spikeRectLeft.top &&birdRect.bottom <= spikeRectLeft.bottom ))
                {
                    endGame();
                }
            } 
        }

    });
    checkCollisionWith(candyRect, CollisionWithCandy); // בדיקת התנגשות עם הממתק
    done=false;
    bombs.forEach(element => { checkCollisionWith(element.getBoundingClientRect(), CollisionWithBomb);
    done=false;
    });
       
    }
    let isPaused = false;
    
    // פונקציה שמתבצעת כאשר לוחצים על הכפתור
    function Pause() {
        if (isPaused) {
            // אם המשחק היה עצור, תמשיך אותו
            if(sidee=="left"){
                intervalLeft = setInterval(() => moveBird(sidee), 50);
            }
            else
            {
                intervalRight = setInterval(() => moveBird(sidee), 50);
            }
        } else {
            // אם המשחק היה ממשיך, עצור אותו
            clearInterval(intervalLeft);
            clearInterval(intervalRight);
        }
        // שנה את המצב של המשחק (עצור או ממשיך)
        isPaused = !isPaused;
    }
   