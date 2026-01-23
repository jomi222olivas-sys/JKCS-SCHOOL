// 🕵️‍♂️ Secret Message for Developers
console.log("%c Hello Dev! 👋 If you're looking at this, you found the logic behind the magic. Let's build something cool.", "color: #64ffda; font-size: 16px; font-weight: bold; background: #112240; padding: 10px; border-radius: 5px;");

// Typing Effect - Completando frases "I Build..."
const phrases = ["Logic.", "Solutions.", "The Future.", "My Own Path."];
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

// Chart.js - Asegurando que cargue
try {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML/CSS', 'Math/Algebra', 'Logic', 'Creativity', 'Debugging'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 85, 95, 80],
                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                borderColor: '#64ffda',
                pointBackgroundColor: '#64ffda',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(136, 146, 176, 0.2)' },
                    grid: { color: 'rgba(136, 146, 176, 0.2)' },
                    pointLabels: { color: '#8892b0', font: { size: 12 } },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: { legend: { display: false } },
            maintainAspectRatio: false
        }
    });
} catch (error) {
    console.error("Chart failed to load:", error);
}

// Bubble Sort Visualizer
const container = document.getElementById("visualizer-container");
let array = [];

function generateArray() {
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
generateArray();

async function startBubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.background = "#e74c3c"; 
            bars[j+1].style.background = "#e74c3c";
            
            await new Promise(r => setTimeout(r, 100));

            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                
                bars[j].style.height = `${array[j]}%`;
                bars[j+1].style.height = `${array[j+1]}%`;
            }
            
            bars[j].style.background = "#8892b0"; 
            bars[j+1].style.background = "#8892b0";
        }
        bars[array.length - i - 1].style.background = "#64ffda"; 
    }
    bars[0].style.background = "#64ffda";
}

// Resource Finder Data (Sincronizado con HTML)
const resources = [
    { name: "Palo Verde Library", type: "library", desc: "Quiet study area." },
    { name: "AMS Flower", type: "school", desc: "My academic base." },
    { name: "Starbucks 51st Ave", type: "wifi", desc: "Coding sprints spot." },
    { name: "Maryvale Community Center", type: "library", desc: "Public resources." }
];

function filterResources() {
    const filter = document.getElementById("resource-filter").value;
    const list = document.getElementById("resource-list");
    
    // Limpiamos la lista para re-renderizar
    list.innerHTML = "";
    
    resources.filter(r => filter === "all" || r.type === filter).forEach(r => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${r.name}:</strong> ${r.desc}`;
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid rgba(136,146,176,0.1)";
        li.style.color = "var(--secondary)";
        
        // Colorear el nombre
        let strong = li.querySelector("strong");
        strong.style.color = "var(--primary)";
        
        list.appendChild(li);
    });
}

// API Quote
async function fetchQuote() {
    try {
        const res = await fetch('https://api.quotable.io/random?tags=technology');
        const data = await res.json();
        document.getElementById('quote-text').innerText = `"${data.content}"`;
        document.getElementById('quote-author').innerText = `- ${data.author}`;
    } catch (e) {
        document.getElementById('quote-text').innerText = '"The best error message is the one that never shows up."';
        document.getElementById('quote-author').innerText = "- Developer Wisdom";
    }
}
fetchQuote();

// Music Button Logic
document.getElementById('music-btn').addEventListener('click', () => {
    alert("🎹 Practicing logic scales... (Imagine a cool synthwave track playing!)");
});

// Terminal Logic
document.addEventListener('keydown', (e) => {
    if (e.key === '~') toggleTerminal();
});

function toggleTerminal() {
    const term = document.getElementById('terminal-overlay');
    term.classList.toggle('hidden');
    if (!term.classList.contains('hidden')) document.getElementById('terminal-input').focus();
}

document.getElementById('terminal-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let cmd = this.value.toLowerCase().trim();
        let output = document.getElementById('terminal-body');
        
        let prevLine = document.createElement('div');
        prevLine.textContent = `jose@dev:~$ ${cmd}`;
        prevLine.style.color = '#8892b0';
        prevLine.style.marginTop = '10px';
        output.insertBefore(prevLine, this.parentElement);

        let response = document.createElement('div');
        response.style.marginBottom = '10px';
        response.style.lineHeight = '1.4';

        // 🧠 LÓGICA PERSONALIZADA AQUI
        switch(cmd) {
            case 'help':
                response.innerHTML = "Available commands: <br>- whoami: About me<br>- math: My math journey<br>- piano: My hobby<br>- school: Education<br>- clear: Clear screen<br>- exit: Close terminal";
                break;
            case 'whoami':
                response.textContent = "Jose Olivas. 12yo. Future Engineer.";
                break;
            case 'math':
                response.textContent = "🧮 Math is my playground. Taught myself Algebra in 6th grade because standard classes weren't fast enough.";
                response.style.color = "#ffbd2e"; // Yellow
                break;
            case 'piano':
                response.textContent = "🎹 Turning noise into music. Still looking for a teacher, but I learn by ear.";
                response.style.color = "#ff5f56"; // Red
                break;
            case 'school':
                response.textContent = "🏫 AMS Flower student. Top of the class, ready for more advanced challenges.";
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
                response.textContent = `Command not found: ${cmd}. Type 'help'.`;
                response.style.color = '#ff5f56';
        }
        
        output.insertBefore(response, this.parentElement);
        this.value = '';
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
