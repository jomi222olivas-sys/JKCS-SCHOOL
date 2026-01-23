// 🕵️‍♂️ Secret Message for Developers
console.log("%c Hand-coded by Jose Olivas. 100% Grit.", "color: #64ffda; font-size: 16px; font-weight: bold; background: #112240; padding: 10px; border-radius: 5px;");

// Typing Effect - STRATEGIC MESSAGING
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
}

// Resource Finder Data (Failsafe)
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

// Terminal Logic - THE INTERACTIVE BIOGRAPHY
document.addEventListener('keydown', (e) => {
    if
