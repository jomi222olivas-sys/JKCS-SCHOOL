// 🕵️‍♂️ Secret Message for Developers
console.log("%c Hand-coded by Jose Olivas. 100% Grit.", "color: #64ffda; font-size: 16px; font-weight: bold; background: #112240; padding: 10px; border-radius: 5px;");

// 1. Typing Effect Logic
const phrases = [
    "I Build Logic.",
    "I Solve Problems.",
    "I am a Young Scholar." 
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pause = 2000;

function typeWriter() {
    const currentPhrase = phrases[roleIndex];
    const element = document.getElementById("typing-text");
    
    if (isDeleting) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        element.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeDelay = pause;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % phrases.length;
    }

    setTimeout(typeWriter, typeDelay);
}
document.addEventListener('DOMContentLoaded', typeWriter);

// 2. Bubble Sort Visualizer (Fixed: Prevent Multiple Clicks)
const container = document.getElementById("visualizer-container");
let array = [];
let isSorting = false;

function generateArray() {
    if(isSorting) return;
    container.innerHTML = "";
    array = [];
    for(let i=0; i<10; i++){
        let val = Math.floor(Math.random() * 80) + 10;
        array.push(val);
        let bar = document.createElement("div");
        bar.style.height = `${val}%`;
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}
// Generate initial array
generateArray();

async function startBubbleSort() {
    if(isSorting) return; // Prevent double clicking
    isSorting = true;
    const btn = document.getElementById("sort-btn");
    btn.disabled = true;
    btn.innerText = "Sorting...";

    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.background = "#e74c3c"; // Comparing Red
            bars[j+1].style.background = "#e74c3c";
            
            await new Promise(r => setTimeout(r, 100));

            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                
                bars[j].style.height = `${array[j]}%`;
                bars[j+1].style.height = `${array[j+1]}%`;
            }
            
            bars[j].style.background = "#8892b0"; // Reset
            bars[j+1].style.background = "#8892b0";
        }
        bars[array.length - i - 1].style.background = "#64ffda"; // Sorted Green
    }
    bars[0].style.background = "#64ffda";
    
    isSorting = false;
    btn.disabled = false;
    btn.innerText = "Run Sort Again";
    setTimeout(generateArray, 2000); // Reset after 2 seconds
}

// 3. Resource Finder Logic
const resources = [
    { name: "Palo Verde Library", type: "library", desc: "Quiet study area." },
    { name: "AMS Flower", type: "school", desc: "My academic base." },
    { name: "Starbucks 51st Ave", type: "wifi", desc: "Coding sprints spot." },
    { name: "Maryvale Community Center", type: "library", desc: "Public resources." }
];

function filterResources() {
    const filter = document.getElementById("resource-filter").value;
    const list = document.getElementById("resource-list");
    
    list.innerHTML = "";
    
    resources.filter(r => filter === "all" || r.type === filter).forEach(r => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${r.name}:</strong> ${r.desc}`;
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid rgba(136,146,176,0.1)";
        li.style.color = "var(--secondary)";
        let strong = li.querySelector("strong");
        strong.style.color = "var(--primary)";
        list.appendChild(li);
    });
}
// Init list on load
filterResources();

// 4. API Quote (Safe Fetch)
async function fetchQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    quoteText.innerText = "Loading...";
    quoteAuthor.innerText = "";

    try {
        const res = await fetch('https://api.quotable.io/random?tags=technology');
        if (!res.ok) throw new Error("API Limit");
        const data = await res.json();
        quoteText.innerText = `"${data.content}"`;
        quoteAuthor.innerText = `- ${data.author}`;
    } catch (e) {
        // Fallback if API fails
        quoteText.innerText = '"The best error message is the one that never shows up."';
        quoteAuthor.innerText = "- Developer Wisdom";
    }
}
fetchQuote();

// 5. Music Button
document.getElementById('music-btn').addEventListener('click', () => {
    alert("🎹 Practicing logic scales... (Imagine a cool synthwave track playing!)");
});

// 6. Terminal Logic (Robust)
document.addEventListener('keydown', (e) => {
    if (e.key === '~') toggleTerminal();
});

function toggleTerminal() {
    const term = document.getElementById('terminal-overlay');
    term.classList.toggle('hidden');
    if (!term.classList.contains('hidden')) document.getElementById('terminal-input').focus();
}

document.getElementById('terminal-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        let cmd = this.value.toLowerCase().trim();
        let output = document.getElementById('terminal-body');
        
        // Add previous command line
        let prevLine = document.createElement('div');
        prevLine.textContent = `jose@dev:~$ ${cmd}`;
        prevLine.style.color = '#8892b0';
        prevLine.style.marginTop = '10px';
        output.insertBefore(prevLine, this.parentElement);

        let response = document.createElement('div');
        response.style.marginBottom = '10px';
        response.style.lineHeight = '1.5';

        // Commands Logic
        switch(cmd) {
            case 'help':
                response.innerHTML = "Available commands: <br> > <span style='color:#64ffda'>about</span> <br> > <span style='color:#64ffda'>math</span> <br> > <span style='color:#64ffda'>piano</span> <br> > <span style='color:#64ffda'>why_jkcf</span> <br> > clear <br> > exit";
                break;
            case 'about':
                response.innerHTML = "<strong>Name:</strong> Jose Olivas.<br><strong>Location:</strong> Maryvale, Phoenix.<br><strong>Status:</strong> Ready to learn. <br><strong>Goal:</strong> Engineering.";
                break;
            case 'math':
                response.textContent = "🧮 Math is my playground. I taught myself Algebra 1 in 6th grade using online resources. It was hard (I struggled at first!), but I loved the challenge of solving problems.";
                response.style.color = "#ffbd2e"; // Yellow
                break;
            case 'piano':
                response.textContent = "🎹 My parents gave me a keyboard. I practice every day, but I currently teach myself by ear. I need a teacher to help me turn the noise into real music.";
                response.style.color = "#ff5f56"; // Red
                break;
            case 'why_jkcf':
                response.textContent = "🚀 Because I'm bored with 'easy'. I need a community that pushes me to be better, faster, and smarter. I am ready for the rigor.";
                response.style.color = "#27c93f"; // Green
                break;
            case 'clear':
                Array.from(output.children).forEach(child => {
                    if(!child.classList.contains('input-line')) child.style.display = 'none';
                });
                this.value = '';
                return; 
            case 'exit':
                toggleTerminal();
                this.value = '';
                return;
            default:
                response.textContent = `Command not found: ${cmd}. Type 'help' for options.`;
                response.style.color = '#ff5f56';
        }
        
        output.insertBefore(response, this.parentElement);
        this.value = '';
        // Auto scroll to bottom
        output.scrollTop = output.scrollHeight;
    }
});

// Dark/Light Mode
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.body.setAttribute("data-theme", "dark");
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute("data-theme", "light");
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});
