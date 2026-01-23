/* ========================
   0. SECRET MESSAGE FOR TECH JUDGES
   ======================== */
console.log("%c Hello World! ", "background: #222; color: #00ff00; font-size: 20px; padding: 5px;");
console.log("I built this site from scratch to apply for the Young Scholars Program.");
console.log("If you are reading this, thank you for looking strictly at the logic behind the code.");
console.log("Status: Ready to learn. 🚀");

/* ========================
   1. GLOBAL & THEME LOGIC
   ======================== */
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
    initChart(); 
    getQuote();  
});

/* ========================
   3. CHART.JS VISUALIZATION
   ======================== */
function initChart() {
    const ctx = document.getElementById('learningChart').getContext('2d');
    const textColor = '#666'; 
    const gridColor = '#999';

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS/Design', 'JavaScript', 'Python', 'Logic', 'Problem Solving'],
            datasets: [{
                label: 'Skill Level (Growth Mindset)',
                data: [90, 85, 80, 60, 95, 100],
                backgroundColor: 'rgba(0, 123, 255, 0.2)', 
                borderColor: 'rgba(0, 123, 255, 1)',      
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: 'rgba(150, 150, 150, 0.3)' },
                    pointLabels: { color: textColor, font: { size: 12, weight: 'bold' } },
                    suggestedMin: 0, suggestedMax: 100, ticks: { display: false }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

/* ========================
   4. API FETCH (QUOTES)
   ======================== */
async function getQuote() {
    const textElem = document.getElementById('quote-text');
    const authorElem = document.getElementById('quote-author');
    try {
        const response = await fetch('https://api.quotable.io/random?tags=technology,science');
        const data = await response.json();
        textElem.innerText = `"${data.content}"`;
        authorElem.innerText = `- ${data.author}`;
    } catch (error) {
        textElem.innerText = "The code works, but the network is shy today.";
        authorElem.innerText = "- Jose's Fallback System";
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
   6. RESOURCE FINDER (Maryvale Edition)
   ======================== */
// Hardcoded curated list for community impact
const resources = [
    { name: "Desert Sage Library", type: "Quiet Study / Free WiFi", address: "7602 W Encanto Blvd" },
    { name: "Maryvale Community Center", type: "Group Projects", address: "4420 N 51st Ave" },
    { name: "Palo Verde Park", type: "Outdoor Reading", address: "38th Ave & Campbell" },
    { name: "Cartwright Tech Hub", type: "School Resources", address: "Available for District Students" },
    { name: "Local Starbucks", type: "WiFi Spot", address: "51st Ave & Indian School" }
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

/* ========================
   7. PIANO EASTER EGG
   ======================== */
function playNote() {
    // Plays a sound
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); 
    audio.play();
    // Feedback to user
    alert("🎵 Trying to turn logic into music. Even without a piano teacher, I keep practicing.");
}

/* ========================
   8. TERMINAL HACKER MODE
   ======================== */
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

// Toggle function for Mobile Button
function toggleTerminal() {
    terminalOverlay.classList.toggle('hidden');
    if (!terminalOverlay.classList.contains('hidden')) {
        terminalInput.focus();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === '~' || e.key === '`') {
        e.preventDefault(); 
        toggleTerminal();
    }
});

terminalOverlay.addEventListener('click', (e) => {
    if (e.target === terminalOverlay) toggleTerminal();
});

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.toLowerCase().trim();
        const output = document.createElement('p');
        
        output.innerHTML = `<span style="color:#00ff00">jose@dev:~$</span> ${command}`;
        terminalBody.insertBefore(output, terminalInput.parentElement);

        let response = '';
        switch(command) {
            case 'help': 
                response = "Available commands: about, math, school, piano, contact, clear, exit"; 
                break;
            case 'about': 
                response = "I am a 12-year-old coding student using logic to solve real-world problems."; 
                break;
            case 'math': 
                response = "> Math is my playground. I taught myself Algebra in 6th grade and now I hunt for geometry problems online."; 
                break;
            case 'school': 
                response = "> AMS Flower is great, but I need more speed. I'm ready for a challenge where 'advanced' is the new normal."; 
                break;
            case 'piano': 
                response = "> I don't have a teacher, but code is my instrument. I try to turn noise into music every day."; 
                break;
            case 'contact': 
                response = "GitHub: jomi222olivas-sys | Location: Maryvale, AZ"; 
                break;
            case 'jkcscholar': 
                response = "ACCESS GRANTED. Status: Highly Motivated Applicant. Determination: 100%"; 
                break;
            case 'clear': 
                terminalBody.innerHTML = ''; 
                terminalBody.appendChild(terminalInput.parentElement); 
                response = null; 
                break;
            case 'exit': 
                toggleTerminal(); 
                response = null; 
                break;
            default: 
                response = `Command not found: ${command}. Type 'help' for options.`;
        }

        if (response) {
            const respNode = document.createElement('p');
            respNode.innerText = response;
            respNode.style.color = "#ccc";
            respNode.style.marginLeft = "10px";
            terminalBody.insertBefore(respNode, terminalInput.parentElement);
        }
        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight; 
    }
});
