window.addEventListener("DOMContentLoaded", () => {

    const close = document.querySelector(".close");
    const min = document.querySelector(".minimize");

    console.log("windowControls:", window.windowControls);

    min?.addEventListener("click", () => {
        console.log("minimize clicked");
        window.windowControls?.minimize();
    });

    close?.addEventListener("click", () => {
        console.log("close clicked");
        window.windowControls?.close();
    });
});


// ======================
// PAGE NAVIGATION
// ======================

const click = document.getElementById('click');
if (click) {
    click.addEventListener('click', () => {
        window.location.href = "subject.html";
    });
}

const ic = document.getElementById('ICCA');
if (ic) {
    ic.addEventListener('click', () => {
        window.location.href = "ICCA.html";
    });
}

const ca = document.getElementById('CA');
if (ca) {
    ca.addEventListener('click', () => {
        window.location.href = "CA.html";
    });
}

const ds = document.getElementById('DS');
if (ds) {
    ds.addEventListener('click', () => {
        window.location.href = "DS.html";
    });
}

const ad = document.getElementById('ADD');
if (ad) {
    ad.addEventListener('click', () => {
        window.location.href = "ADD.html";
    });
}

const qe = document.getElementById('QE');
if (qe) {
    qe.addEventListener('click', () => {
        window.location.href = "QE.html";
    });
}

const pe = document.getElementById('PE');
if (pe) {
    pe.addEventListener('click', () => {
        window.location.href = "PE.html";
    });
}


// ======================
// QUIZ VARIABLES
// ======================

const subject = document.body.dataset.subject;

let questions = [];
let currentQuestion = 0;
let score = 0;

const nextBtn = document.getElementById("next");
const retryBtn = document.getElementById("retry");
const menuBtn = document.getElementById("menu");


// ======================
// SCORE
// ======================

function updateScore() {
    document.getElementById("scoreDisplay").textContent =
        `Score: ${score}/${questions.length}`;
}


// ======================
// AI QUESTION GENERATION
// ======================

async function startQuiz() {

    document.getElementById("question").textContent =
        "Generating questions...";

    try {

        questions = await window.ai.generateQuestions(
            syllabusBank[subject]
        );

        if (!questions || questions.length === 0) {

            document.getElementById("question").textContent =
            "No questions could be generated.";

            return;
        }

        currentQuestion = 0;
        score = 0;

        document.getElementById("scoreDisplay").style.display = "block";
        document.getElementById("progress").style.display = "block";

        document.getElementById("scoreDisplay").textContent =
            `Score: 0/${questions.length}`;

        retryBtn.style.display = "none";
        nextBtn.style.display = "block";

        loadQuestion();

    } catch (err) {

        console.error(err);

        document.getElementById("question").textContent =
            "Failed to generate questions.";
    }
}


// ======================
// LOAD QUESTION
// ======================

function loadQuestion() {

    nextBtn.disabled = true;

    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    document.getElementById("result").textContent = "";

    q.options.forEach(option => {

        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {

            const allButtons =
                optionsDiv.querySelectorAll("button");

            allButtons.forEach(button => {
                button.disabled = true;
            });

            nextBtn.disabled = false;

            if (option === q.answer) {

                btn.style.backgroundColor = "lightgreen";

                document.getElementById("result").textContent =
                    "✔ Correct!";

                score++;

            } else {

                btn.style.backgroundColor = "lightcoral";

                document.getElementById("result").textContent =
                    `✘ Wrong! Correct answer: ${q.answer}`;

                allButtons.forEach(button => {

                    if (button.textContent === q.answer) {
                        button.style.backgroundColor =
                            "lightgreen";
                    }
                });
            }

            updateScore();
        });

        optionsDiv.appendChild(btn);
        optionsDiv.appendChild(document.createElement("br"));
    });
}


// ======================
// NEXT BUTTON
// ======================

if (nextBtn) {

    nextBtn.disabled = true;

    nextBtn.addEventListener("click", () => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            document.getElementById("question").textContent =
`⋆˙⟡ Quiz completed! ⋆˙⟡
Score: ${score}/${questions.length}`;

            document.getElementById("options").innerHTML = "";
            document.getElementById("result").textContent = "";

            document.getElementById("scoreDisplay").style.display =
                "none";

            document.getElementById("progress").style.display =
                "none";

            nextBtn.style.display = "none";

            retryBtn.style.display = "block";
        }
    });
}


// ======================
// RETRY BUTTON
// ======================

if (retryBtn) {

    retryBtn.style.display = "none";

    retryBtn.addEventListener("click", () => {

        startQuiz();
    });
}


// ======================
// MENU BUTTON
// ======================

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        window.location.href = "subject.html";
    });
}


// ======================
// START QUIZ
// ======================

if (document.getElementById("question")) {

    startQuiz();
}