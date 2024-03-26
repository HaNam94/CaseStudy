document.addEventListener("DOMContentLoaded", function() {
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('score-value');
    const gameOverDisplay = document.getElementById('game-over');

    let score = 0;
    let isGameOver = false;

    // Add fruit images
    const fruitImages = ['apple.png', 'banana.png', 'orange.png'];

    // Play sound when fruit is sliced
    const sliceSound = new Audio('slice.mp3');

    // Game loop
    setInterval(function() {
        if (!isGameOver) {
            const fruit = document.createElement('div');
            fruit.classList.add('fruit');
            fruit.style.backgroundImage = `url(${fruitImages[Math.floor(Math.random() * fruitImages.length)]})`;
            fruit.style.left = `${Math.random() * (game.offsetWidth - 100)}px`;
            fruit.style.animationDuration = `${Math.random() * 2 + 1}s`;
            game.appendChild(fruit);

            fruit.addEventListener('click', function() {
                sliceSound.play();
                fruit.remove();
                score++;
                scoreDisplay.textContent = String(score);
            });

            fruit.addEventListener('animationend', function() {
                fruit.remove();
                if (!isGameOver) {
                    score--;
                    scoreDisplay.textContent = String(score);
                    if (score < 0) {
                        endGame();
                    }
                }
            });
        }
    }, 1000);

    // End game function
    function endGame() {
        isGameOver = true;
        gameOverDisplay.style.display = 'block';
    }
});