/*require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});*/

window.addEventListener("DOMContentLoaded", () => {
document.querySelector(".minimize")?.addEventListener("click", () => {
    console.log("MIN CLICKED");
    window.windowControls.minimize();
});    const close = document.querySelector(".close");
const min = document.querySelector(".close");

    console.log("windowControls:", window.windowControls); // 👈 DEBUG

    min?.addEventListener("click", () => {
        console.log("minimize clicked");
        window.windowControls?.minimize();
    });

    close?.addEventListener("click", () => {
        console.log("close clicked");
        window.windowControls?.close();
    });
});

const click = document.getElementById('click');
if(click) {
    click.addEventListener('click', function() {
        window.location.href = "subject.html";
    });
}

const ic = document.getElementById('ICCA');
if(ic) {
    ic.addEventListener('click', function() {
        window.location.href = "ICCA.html";
    });
}

const ca = document.getElementById('CA');
if(ca) {
    ca.addEventListener('click', function() {
        window.location.href = "CA.html";
    });
}

const ds = document.getElementById('DS');
if(ds) {
    ds.addEventListener('click', function() {
        window.location.href = "DS.html";
    });
}

const ad = document.getElementById('ADD');
if(ad) {
    ad.addEventListener('click', function() {
        window.location.href = "ADD.html";
    });
}

const qe = document.getElementById('QE');
if(qe) {
    qe.addEventListener('click', function() {
        window.location.href = "CA.html";
    });
}

const pe = document.getElementById('PE');
if(pe) {
    pe.addEventListener('click', function() {
        window.location.href = "PE.html";
    });
}

function updateScore() {
    document.getElementById("scoreDisplay").textContent =
        `Score: ${score}/${questions.length}`;
}

/*async function generateQuestions() {
    console.log(syllabusBank.PE);    
    const prompt = `
    Using ONLY the following Professional English syllabus,
    generate 10 multiple choice questions.

    Syllabus:
    ${syllabusBank.PE}

    Rules:
    - Stay strictly within the syllabus
    - Difficulty: medium
    - Return JSON only
    - Format:
    [
    {
        "question": "...",
        "options": ["A", "B", "C", "D"],
        "answer": "..."
    }
    ]
    `;
    const response = await client.responses.create({
        model: "gpt-5",
        input: prompt
    });

    return JSON.parse(response.output_text);
}

document.getElementById("question").textContent =
    "Syllabus loaded successfully!";

let questions = [];
let currentQuestion = 0;

async function startQuiz() {
    questions = await generateQuestions();
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", function () {
            if (option === q.answer) {
                document.getElementById("result").textContent = "Correct!";
            } else {
                document.getElementById("result").textContent = "Wrong!";
            }
        });

        optionsDiv.appendChild(btn);
        optionsDiv.appendChild(document.createElement("br"));
    });
}

startQuiz();*/

const subject = document.body.dataset.subject;
const questions = questionBank[subject];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    nextBtn.disabled = true;

    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", function () {
    const allButtons = optionsDiv.querySelectorAll("button");

    // disable all buttons after one click
    allButtons.forEach(button => {
        button.disabled = true;
    });

    nextBtn.disabled = false;

    if (option === q.answer) {
        btn.style.backgroundColor = "lightgreen";
        document.getElementById("result").textContent = "✔ Correct!";
        score++;
        document.getElementById("scoreDisplay").textContent =
        `Score: ${score}`;
    } 
    else {
        btn.style.backgroundColor = "lightcoral";
        document.getElementById("result").textContent =
            `✘ Wrong! Correct answer: ${q.answer}`;

        // highlight correct one
        allButtons.forEach(button => {
            if (button.textContent === q.answer) {
                button.style.backgroundColor = "lightgreen";
            }
        });
    }
    updateScore();
});

        optionsDiv.appendChild(btn);
        optionsDiv.appendChild(document.createElement("br"));
    });
}

const nextBtn = document.getElementById("next");
nextBtn.disabled = true;

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            document.getElementById("result").textContent = "";
            loadQuestion();
        } else {
            document.getElementById("question").textContent =
                `Quiz completed! Score: ${score}/${questions.length}`;
            document.getElementById("options").innerHTML = "";
            document.getElementById("result").textContent = "";
            nextBtn.style.display = "none";
        }
    });
}

if (document.getElementById("question")) {
    loadQuestion();
}
