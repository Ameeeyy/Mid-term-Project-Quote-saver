const quoteInput = document.getElementById('quoteInput');
const addBtn = document.getElementById('addBtn');
const quotesList = document.getElementById('quotesList');
const quoteCount = document.getElementById('quoteCount');

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

displayQuotes();

addBtn.addEventListener('click', addQuote);

quoteInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addQuote();
    }
});

function addQuote() {
    const quoteText = quoteInput.value.trim();

    if (quoteText === '') {
        quoteInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            quoteInput.style.animation = '';
        }, 500);
        return;
    }

    addBtn.classList.add('success-feedback');
    setTimeout(() => {
        addBtn.classList.remove('success-feedback');
    }, 600);

    quotes.push(quoteText);

    saveToLocalStorage();

    quoteInput.value = '';

    displayQuotes();

    quoteInput.focus();
}

function deleteQuote(index) {
    const quoteItems = document.querySelectorAll('.quote-item');
    const itemToDelete = quoteItems[index];

    itemToDelete.classList.add('deleting');

    setTimeout(() => {
        quotes.splice(index, 1);

        saveToLocalStorage();

        displayQuotes();
    }, 400);
}

function saveToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function displayQuotes() {
    quotesList.innerHTML = '';

    quoteCount.textContent = quotes.length;
    quoteCount.style.animation = 'pulse 0.5s';

    if (quotes.length === 0) {
        quotesList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">💭</div>
                        <div class="empty-state-text">No quotes yet. Add your first one!</div>
                    </div>
                `;
        return;
    }

    quotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.className = 'quote-item';
        li.style.animationDelay = `${index * 0.1}s`;

        li.innerHTML = `
                    <span class="quote-text">"${quote}"</span>
                    <button class="delete-btn" onclick="deleteQuote(${index})">Delete</button>
                `;

        quotesList.appendChild(li);
    });
}

const style = document.createElement('style');
style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
document.head.appendChild(style);
