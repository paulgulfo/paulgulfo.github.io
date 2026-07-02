const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const clearChatButton = document.getElementById('clearChat');
const typingIndicator = document.getElementById('typingIndicator');
const themeToggle = document.getElementById('themeToggle');
const chatToggle = document.getElementById('chatToggle');

const STORAGE_KEY = 'paulPortfolioChatHistory';
const THEME_KEY = 'paulPortfolioChatTheme';

const initialWelcome = {
    role: 'ai',
    content: 'Hi! I’m Paul’s portfolio assistant. Ask me about logo design, brand identity, marketing campaigns, product packaging, social media design, or print work.',
    time: new Date().toISOString(),
};

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function saveHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getHistory() {
    const history = localStorage.getItem(STORAGE_KEY);
    if (!history) return [initialWelcome];
    try {
        const parsed = JSON.parse(history);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [initialWelcome];
    } catch (error) {
        return [initialWelcome];
    }
}

function setTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? 'Dark' : 'Light';
    localStorage.setItem(THEME_KEY, theme);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(savedTheme || (prefersLight ? 'light' : 'dark'));
}

function createBubble(role, text, timestamp) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${role}`;
    messageEl.innerHTML = `
        <div class="message-text">${text.replace(/\n/g, '<br>')}</div>
        <span class="message-time">${formatTime(timestamp)}</span>
    `;
    chatBody.appendChild(messageEl);
}

function renderHistory() {
    chatBody.innerHTML = '';
    const history = getHistory();
    history.forEach(message => createBubble(message.role, message.content, message.time));
    scrollToBottom();
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function setTyping(isTyping) {
    typingIndicator.classList.toggle('active', isTyping);
}

function updateHistory(role, content) {
    const history = getHistory();
    history.push({ role, content, time: new Date().toISOString() });
    saveHistory(history);
    createBubble(role, content, new Date().toISOString());
    scrollToBottom();
}

function resetChat() {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
}

async function sendMessage(message) {
    if (!message.trim()) return;

    updateHistory('user', message.trim());
    chatInput.value = '';
    setTyping(true);

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message.trim() }),
        });

        const result = await response.json();
        const reply = response.ok && result.reply ? result.reply : 'Sorry, I could not reach the AI service. Please try again later.';
        updateHistory('ai', reply);
    } catch (error) {
        updateHistory('ai', 'I’m having trouble answering right now. Please try again later.');
        console.error('Chat request failed:', error);
    } finally {
        setTyping(false);
    }
}

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage(chatInput.value);
});

chatInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage(chatInput.value);
    }
});

clearChatButton.addEventListener('click', () => {
    if (confirm('Clear the chat history?')) {
        resetChat();
    }
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

chatToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('chat-expanded');
    chatToggle.textContent = isOpen ? '✕' : '💬';
    const panel = document.querySelector('.chat-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

window.addEventListener('load', () => {
    applySavedTheme();
    renderHistory();
});
