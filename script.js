document.addEventListener("DOMContentLoaded", function() {
    // Game state
    let runs = 0;
    let wickets = 0;
    let balls = 0;

    const maxOvers = 5; // 5 overs = 30 balls
    const maxWickets = 10;

    // DOM elements
    const runsEl = document.getElementById("runs");
    const wicketsEl = document.getElementById("wickets");
    const oversEl = document.getElementById("overs");
    const commentaryEl = document.getElementById("commentary-text");
    const batBtn = document.getElementById("bat-button");
    const bowlBtn = document.getElementById("bowl-button");
    const ballEl = document.getElementById("ball");
    const wicketEl = document.getElementById("wicket");

    // Update scoreboard
    function updateScoreboard() {
        runsEl.textContent = runs;
        wicketsEl.textContent = wickets;
        oversEl.textContent = `${Math.floor(balls / 6)}.${balls % 6}`;
    }

    // Update commentary
    function say(message) {
        commentaryEl.textContent = message;
    }

    // Check if game over
    function isGameOver() {
        if (wickets >= maxWickets) {
            say("ALL OUT! Innings Ended.");
            batBtn.disabled = true;
            bowlBtn.disabled = true;
            return true;
        }
        if (balls >= maxOvers * 6) {
            say("Overs Completed! Innings Over.");
            batBtn.disabled = true;
            bowlBtn.disabled = true;
            return true;
        }
        return false;
    }

    // Animate ball
    function animateBall() {
        ballEl.classList.remove("hidden");
        ballEl.classList.add("hit");
        setTimeout(() => {
            ballEl.classList.remove("hit");
            ballEl.classList.add("hidden");
        }, 1000);
    }

    // Show wicket
    function showWicket() {
        wicketEl.classList.remove("hidden");
        setTimeout(() => {
            wicketEl.classList.add("hidden");
        }, 1000);
    }

    // Handle Bat click
    function handleBatClick() {
        if (isGameOver()) return;

        balls++;
        const outcome = Math.floor(Math.random() * 7); // 0-6

        animateBall();

        if (outcome === 0) {
            wickets++;
            say("OUT! The batsman is bowled!");
            showWicket();
        } else {
            runs += outcome;
            say(`Batsman scores ${outcome} run(s)!`);
        }

        updateScoreboard();
        isGameOver();
    }

    // Handle Bowl click
    function handleBowlClick() {
        if (isGameOver()) return;

        balls++;
        const outcome = Math.floor(Math.random() * 6) + 1; // 1-6
        runs += outcome;
        animateBall();
        say(`Bowler delivers ${outcome} run(s).`);

        updateScoreboard();
        isGameOver();
    }

    // Initialize
    updateScoreboard();
    say("Game starts now!");

    // Event listeners
    batBtn.addEventListener("click", handleBatClick);
    bowlBtn.addEventListener("click", handleBowlClick);
});
