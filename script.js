// 1. Configuration - Put your Sheet ID here
const SHEET_ID = '1XHmW1yh2cl5DVvKLkGT0van7RmAB3RGcXK2zqoeOFk8';
const SHEET_TITLE = 'Form Responses 1'; // This is usually the name of the tab at the bottom
const SHEET_RANGE = 'A2:E100'; // Grabs columns A through E
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

async function loadReviewsFromSheet() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = "<p>Loading the latest reviews...</p>";

    try {
        const response = await fetch(FULL_URL);
        const text = await response.text();
        
        // Google returns a weirdly formatted JSON; we need to clean it
        const data = JSON.parse(text.substr(47).slice(0, -2));
        const rows = data.table.rows;

        let html = '';
        rows.forEach(row => {
            // Mapping spreadsheet columns to our layout
            const title = row.c[1].v;       // Column B
            const student = row.c[2].v;     // Column C
            const ratingNum = row.c[3].v;   // Column D
            const reviewText = row.c[4].v;  // Column E
            const recommends = row.c[5] ? row.c[5].v : "None"; // Column F (optional)

            html += `
                <div class="review-card">
                    <h3>${title}</h3>
                    <p><strong>Reviewer:</strong> ${student} ${"⭐".repeat(ratingNum)}</p>
                    <p>"${reviewText}"</p>
                    <div class="recommendation">🔍 Similar: ${recommends}</div>
                </div>
            `;
        });

        grid.innerHTML = html || "<p>No reviews found yet!</p>";

    } catch (error) {
        console.error("Error loading sheet:", error);
        grid.innerHTML = "<p>Failed to load reviews. Please check your Sheet ID.</p>";
    }
}

// Keep your Quiz Logic from before
const dailyQuiz = {
    question: "Which magical world is reached through a wardrobe?",
    options: ["Hogwarts", "Narnia", "Middle Earth", "Neverland"],
    correct: 1
};

function loadQuiz() {
    const qEl = document.getElementById('question');
    const optEl = document.getElementById('options');
    qEl.innerText = dailyQuiz.question;
    optEl.innerHTML = dailyQuiz.options.map((opt, i) => `
        <button onclick="checkAnswer(${i})">${opt}</button>
    `).join(' ');
}

function checkAnswer(index) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.innerText = (index === dailyQuiz.correct) ? "🎉 Correct!" : "❌ Try again!";
    feedback.style.color = (index === dailyQuiz.correct) ? "green" : "red";
}

// Initialize everything
window.onload = () => {
    loadReviewsFromSheet();
    loadQuiz();
};
