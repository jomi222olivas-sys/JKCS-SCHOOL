/* ========================
   1. GLOBAL & THEME LOGIC
   ======================== */
console.log("%c Hello JKC Committee! Keep looking, there are secrets here.", "color: #00ff00; background: #000; padding: 5px; font-size: 16px;");

const toggleButton = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.textContent = '☀️';
}
toggleButton.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '☀️';
    }
});

/* ========================
   2. TYPEWRITER EFFECT
   ======================== */
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}
TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if(this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); } 
    else { this.txt = fullTxt.substring(0, this.txt.length + 1); }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 200;
    if(this.isDeleting) { typeSpeed /= 2; }
    if(!this.isDeleting && this.txt === fullTxt) { typeSpeed = this.wait; this.isDeleting = true; } 
    else if(this.isDeleting && this.txt === '') { this.isDeleting = false; this.wordIndex++; typeSpeed = 500; }
    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
    
    // Init Features
    filterResources();
    generateArray();
    initChart(); // Initialize Chart
    getQuote();  // Fetch first quote
});

/* ========================
   3. CHART.JS VISUALIZATION
   ======================== */
function initChart() {
    const ctx = document.getElementById('learningChart').getContext('2d');
    // Using a grey color for lines so it works on White and Dark backgrounds
    const textColor = '#666'; 
    const gridColor = '#999';

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS/Design', 'JavaScript', 'Python', 'Logic', 'Problem Solving'],
            datasets: [{
                label: 'Skill Level (Self-Assessment)',
                data: [90, 85, 80, 60, 95, 100],
                backgroundColor: 'rgba(0, 123, 255, 0.2)', // Primary blue transparent
                borderColor: 'rgba(0, 123, 255, 1)',      // Primary blue solid
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: 'rgba(150, 150, 150, 0.3)' },
                    pointLabels: { 
                        color: textColor,
                        font: { size: 12, weight: 'bold' }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false } // Hide numbers to look cleaner
                }
            },
            plugins: {
                legend: { display: false } // Hide legend for cleaner look
            }
        }
    });
}

/* ========================
   4. API FETCH (QUOTES)
   ======================== */
async function getQuote() {
    const textElem = document.getElementById('quote-text');
    const authorElem = document.getElementById('quote-author');
    
    textElem.innerText = "Fetching wisdom...";
    authorElem.innerText = "";

    try {
        // Fetch from open source API
        const response = await fetch('https://api.quotable.io/random?tags=technology,science');
        const data = await response.json();
        
        textElem.innerText = `"${data.content}"`;
        authorElem.innerText = `- ${data.author}`;
    } catch (error) {
        // Fallback if API fails
        textElem.innerText = "Code never lies, comments sometimes do.";
        authorElem.innerText = "- Anonymous";
        console.error("API Error:", error);
    }
}

/* ========================
   5. ALGORITHM VISUALIZER
   ======================== */
const container = document.getElementById("array-container");
let bars = [];
function generateArray(num = 15) {
    container.innerHTML = ''; bars = [];
    for (let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * 80) + 10; 
        const bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.style.width = "10px";
        bar.style.margin = "0 2px";
        bar.style.background = "var(--primary-color)";
        container.appendChild(bar);
        bars.push(bar);
    }
}
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function bubbleSort() {
    const len = bars.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            bars[j].style.background = "red"; bars[j + 1].style.background = "red";
            await sleep(50);
            const h1 = parseInt(bars[j].style.height);
            const h2 = parseInt(bars[j + 1].style.height);
            if (h1 > h2) {
                bars[j].style.height = `${h2}px`; bars[j + 1].style.height = `${h1}px`;
            }
            bars[j].style.background = "var(--primary-color)"; bars[j + 1].style.background = "var(--primary-color)";
        }
        bars[len - i - 1].style.background = "green";
    }
    bars[0].style.background = "green";
}

/* ========================
   6. RESOURCE FINDER & TOOLS
   ======================== */
const resources = [
    { name: "Desert Sage Library", type: "Library/Wi-Fi", address: "7602 W Encanto Blvd" },
    { name: "Maryvale Community Center", type: "Study Spot", address: "4420 N 51st Ave" },
    { name: "Cartwright Tech Hub", type: "Computer Lab", address: "Local School District" },
    { name: "Palo Verde Park", type: "Public Wi-Fi", address: "38th Ave & Campbell" }
];

function filterResources() {
    const input = document.getElementById('resourceInput').value.toUpperCase();
    const list = document.getElementById('resourceList');
    list.innerHTML = ''; 
    
    const filtered = resources.filter(item => 
        item.name.toUpperCase().includes(input) || item.type.toUpperCase().includes(input)
    );

    filtered.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong> <br> <small>${item.type} | ${item.address}</small>`;
        list.appendChild(li);
    });
}

function calculateGoal() {
    const savings = parseFloat(document.getElementById('weeklySavings').value);
    const cost = parseFloat(document.getElementById('goalCost').value);
    const resultDiv = document.getElementById('goalResult');
    const bar = document.getElementById('progressBar');

    if(!savings || !cost || savings <= 0) {
        resultDiv.innerText = "Please enter valid numbers.";
        bar.style.width = "0%";
        return;
    }
    const weeks = Math.ceil(cost / savings);
    resultDiv.innerText = `It will take you ${weeks} weeks to reach your goal!`;
    resultDiv.style.color = "green";
    bar.style.width = "100%";
}

/* ========================
   7. POMODORO TIMER
   ======================== */
let timerInterval;
let timeLeft = 1500; 

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if(timerInterval) return; 
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            alert("Study session complete!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 1500;
    updateTimer();
}

/* ========================
   8. TERMINAL HACKER MODE
   ======================== */
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

document.addEventListener('keydown', (e) => {
    if (e.key === '~' || e.key === '`') {
        e.preventDefault(); 
        terminalOverlay.classList.toggle('hidden');
        if (!terminalOverlay.classList.contains('hidden')) {
            terminalInput.focus();
        }
    }
});

terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) {
        terminalOverlay.classList.add('hidden');
    }
});

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.toLowerCase().trim();
        const output = document.createElement('p');
        
        output.innerHTML = `<span style="color:#fff">jose@dev:~$</span> ${command}`;
        terminalBody.insertBefore(output, terminalInput.parentElement);

        let response = '';
        switch(command) {
            case 'help': response = "Available commands: help, about, contact, jkcscholar, exit"; break;
            case 'about': response = "I am Jose, a 12-year-old developer seeking to change the world through code."; break;
            case 'contact': response = "Email: student@example.com | GitHub: jomi222olivas-sys"; break;
            case 'jkcscholar': response = "ACCESS GRANTED. Status: Highly Motivated Applicant. Probability of Success: 100%"; break;
            case 'clear': terminalBody.innerHTML = ''; terminalBody.appendChild(terminalInput.parentElement); response = null; break;
            case 'exit': terminalOverlay.classList.add('hidden'); response = null; break;
            default: response = `Command not found: ${command}`;
        }

        if (response) {
            const respNode = document.createElement('p');
            respNode.innerText = response;
            respNode.style.color = "#ccc";
            terminalBody.insertBefore(respNode, terminalInput.parentElement);
        }
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight; 
    }
});

/**
 *               -------
 *  ----------  |    0  |
 * /          \/ ______\|
 * |          / /
 * |___________/
 * |_||_| |_||_|
 */