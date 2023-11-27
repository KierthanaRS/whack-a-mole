
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    const scoreElement = document.getElementById('score-value');

    let score = 0;
    let moles = [];
    const gameTime = 20; 
    let timer = gameTime;
    let timerInterval;
    class Mole {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.isVisible = false;
        }

        draw() {
            if (this.isVisible) {
                const moleColor = '#8B4513'; // Brown color for the mole
                const eyeColor = '#000'; // Color for the eyes
        
                context.fillStyle = moleColor;
                context.beginPath();
                context.arc(this.x, this.y, 30, 0, 2 * Math.PI);
                context.fill();
        
                // Eyes
                const eyeRadius = 5;
                context.fillStyle = eyeColor;
                context.beginPath();
                context.arc(this.x - 8, this.y - 8, eyeRadius, 0, 2 * Math.PI);
                context.arc(this.x + 8, this.y - 8, eyeRadius, 0, 2 * Math.PI);
                context.fill();
        
                // Nose
                context.fillStyle = moleColor;
                context.beginPath();
                context.arc(this.x, this.y + 5, 3, 0, 2 * Math.PI);
                context.fill();
        
                // Cute mole cheeks
                const cheekSize = 7;
                context.fillStyle = '#FFD700'; // Yellow for the cute cheeks
                context.beginPath();
                context.arc(this.x - 12, this.y + 10, cheekSize, 0, 2 * Math.PI);
                context.arc(this.x + 12, this.y + 10, cheekSize, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }

    function createMole() {
        const mole = new Mole(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );

        moles.push(mole);
    }

    function drawMoles() {
        moles.forEach(mole => mole.draw());
    }

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawMoles();

        requestAnimationFrame(gameLoop);
    }
    function animateMoles() {
        moles.forEach(mole => {
            // Moles will be visible for 2 seconds
            mole.isVisible = true;
            mole.draw();

            setTimeout(() => {
                mole.isVisible = false;
                mole.draw();
            }, 2000); // Adjust the duration as needed
        });
    }
    canvas.addEventListener('click', (event) => {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        moles.forEach(mole => {
            // Check if the click is within the bounds of a visible mole
            if (
                mole.isVisible &&
                mouseX > mole.x - 30 && mouseX < mole.x + 30 &&
                mouseY > mole.y - 30 && mouseY < mole.y + 30
            ) {
                // Whack the mole
                mole.isVisible = false;
                mole.draw();
                increaseScore();
            }
        });
    });

    function increaseScore() {
        score++;
        scoreElement.textContent = score;
    }
    function updateTimer() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        document.getElementById('message').textContent = `Time Left: ${minutes}:${seconds}`;
    }

    function startTimer() {
        
        timerInterval = setInterval(() => {
            if (timer > 0) {
                timer--;
                updateTimer();
            } else {
                endGame();
                
            }
        }, 1000);
        
    }

    
    function endGame() {
        clearInterval(timerInterval);
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        document.getElementById('message').innerHTML = `<strong>Game Over! Your Score: ${score}</strong>
        <br><br><button id="restart" onclick="window.location.href = 'game.html'">Restart</button><br><br><br><br><br>`;
        let res = score;
        if (res<=4 && res!=0){
            document.getElementById('result').innerHTML = `<img src="losing.gif" alt="You loseF" width="640" height="360">`
        }
        else if(res>4 && res<=8){
            document.getElementById('result').innerHTML = `<img src="medium.gif" alt="You win" width="640" height="360">`
        }
        else if (res>8){
            document.getElementById('result').innerHTML = `<img src="winning.gif" alt="You win" width="640" height="360">`
        }

    }
    
    
    function startGame() {
        setInterval(() => {
            createMole();
            animateMoles();
        }, 3000); // Adjust the interval based on your preference
        startTimer();
        gameLoop();
  
        
    }
 
    startGame();
    // get the final score from local storage and convert it into an integer
    
});
