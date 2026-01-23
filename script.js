// Typing Effect
const roles = ["Student @ Maryvale", "Python Enthusiast", "Logic Builder"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pause = 2000;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const element = document.getElementById("typing-text");
    
    if (isDeleting) {
        element.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        element.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        typeDelay = pause;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typeDelay);
}
document.addEventListener('DOMContentLoaded', typeWriter);

// Chart.js
const ctx = document.getElementById('skillsChart').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['HTML/CSS', 'Python', 'Logic', 'Creativity', 'Debugging'],
        datasets: [{
            label: 'Skill Level',
            data: [90, 75, 85, 95, 80],
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
                pointLabels: { color: '#8892b0' },
                ticks: { display: false }
            }
        },
        plugins: { legend: { display: false } }
    }
});

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
            // Color de comparación (Rojo)
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
            
            // Regresar al color normal
            bars[j].style.background = "#8892b0"; 
            bars[j+1].style.background = "#8892b0";
        }
        // Color ordenado (Verde)
        bars[array.length - i - 1].style.background = "#64ffda"; 
    }
    bars[0].style.background = "#64ffda";
}

// Resource Finder
const resources = [
    { name: "Maryvale Library", type: "library", address: "68th Ave" },
    { name: "Starbucks WiFi", type: "wifi", address: "Indian School Rd" },
    { name: "Palo Verde Park", type: "library", address: "Study Spot" }
];

function filterResources() {
    const filter = document.getElementById("resource-filter").value;
    const list = document.getElementById("resource-list");
    list.innerHTML = "";
    
    resources.filter(r => filter === "all" || r.type === filter).forEach(r => {
        let li = document.createElement("li");
        li.textContent = `${r.name} - ${r.address}`;
        li.style.padding = "10px 0";
        li.style.borderBottom = "1px solid rgba(136,146,176,0.1)";
        list.appendChild(li);
    });
}
filterResources();

// API Quote
async function fetchQuote() {
    try {
        const res = await fetch('https://api.quotable.io/random?tags=technology');
        const data = await res.json();
        document.getElementById('quote-text').innerText = `"${data.content}"`;
        document.getElementById('quote-author').innerText = `- ${data.author}`;
    } catch (e) {
        document.getElementById('quote-text').innerText = '"Code is poetry."';
        document.getElementById('quote-author').innerText = "- WordPress";
    }
}
fetchQuote();

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
        
        // Agregar línea de comando previa
        let prevLine = document.createElement('div');
        prevLine.textContent = `jose@dev:~$ ${cmd}`;
        prevLine.style.color = '#8892b0';
        prevLine.style.marginTop = '10px';
        output.insertBefore(prevLine, this.parentElement);

        let response = document.createElement('div');
        response.style.marginBottom = '10px';

        switch(cmd) {
            case 'help':
                response.innerHTML = "Available commands: <br>- whoami: About me<br>- projects: List projects<br>- clear: Clear screen<br>- exit: Close terminal";
                break;
            case 'whoami':
                response.textContent = "Jose Olivas. 12yo. Future Engineer.";
                break;
            case 'projects':
                response.textContent = "Loading projects... [Bubble Sort, Maryvale Finder, Portfolio]";
                break;
            case 'clear':
                // Nota: Esto limpia visualmente pero mantiene el input
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
                response.textContent = `Command not found: ${cmd}`;
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
