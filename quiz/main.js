const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 565,
        height: 760,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });
    win.loadFile("index.html"); 
    
}

app.whenReady().then(() => {
    createWindow();

    // ✅ PUT THEM HERE
    ipcMain.on("minimize", () => {
        win.minimize();
    });

    ipcMain.on("close", () => {
        win.close();
    });
});

require("dotenv").config();

const { GoogleGenerativeAI } =
    require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite"
});

ipcMain.handle("generate-questions", async (event, syllabus) => {

    try {

        const prompt = `You are an engineering college exam question generator.

Generate 5 high-quality MCQs STRICTLY based on the academic concepts below.

DO NOT ask:
- which unit contains a topic
- what chapter discusses something
- syllabus structure questions
- meta questions about the curriculum

ONLY ask concept-based questions that test understanding, definitions, grammar, applications, formulas, or problem-solving.



Syllabus:
${syllabus}

Rules:
- Stay strictly within syllabus
- Medium difficulty
- 4 options each with no more than 10 words
- Return ONLY valid JSON
- No markdown
- No explanations

Format:
[
 {
   "question": "...",
   "options": ["A","B","C","D"],
   "answer": "..."
 }
]
`;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        const text = response.text()
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log(text);

        return JSON.parse(text);

    } catch (err) {

        console.error("GEMINI ERROR:");
        console.error(err);

        return [];
    }
});