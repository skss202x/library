// Sample Data: In a real app, this might come from a JSON file
const reviews = [
    {
        title: "The Hobbit",
        student: "Alex R.",
        rating: "⭐⭐⭐⭐⭐",
        text: "An amazing adventure! My teacher loved my analysis of Bilbo's courage.",
        recommends: "Harry Potter, Percy Jackson"
    },
    {
        title: "Wonder",
        student: "Sam V.",
        rating: "⭐⭐⭐⭐",
        text: "A very emotional book about kindness. Graded 'A' by Mrs. Smith!",
        recommends: "Out of My Mind, Fish in a Tree"
    }
];

const dailyQuiz = {
    question: "Who wrote 'Charlie and the Chocolate Factory'?",
    options: ["J.K. Rowling", "Roald Dahl", "Rick Riordan", "Dr. Seuss"],
    correct: 1
};

// Load Reviews
function displayReviews() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = reviews.map(rev => `
        <div class="review-card">
            <h3>${rev.title}</h3>
            <p><strong>Reviewer:</strong> ${rev.student} ${rev.rating}</p>
            <p>"${rev.text}"</p>
            <div class="recommendation">🔍 Similar: ${rev.recommends}</div>
        </div>
    `).join('');
}

// Load Quiz
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
    if(index === dailyQuiz.correct) {
        feedback.innerText = "🎉 Correct! You know your authors!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = "❌ Not quite! Try again.";
        feedback.style.color = "red";
    }
}

// Form Submission (Simulated)
document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Review submitted! Since this is a static site, your teacher will need to manually add this to the code or a linked database.");
});

// Initialize
displayReviews();
loadQuiz();
