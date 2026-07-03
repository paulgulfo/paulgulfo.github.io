document.addEventListener("DOMContentLoaded", () => {
const widgetShell = document.createElement('div');
widgetShell.className = 'chat-widget-shell';
widgetShell.innerHTML = `
    <div class="chat-widget-panel" id="chatWidgetPanel">
        <div class="chat-widget-header">
            <div>
                <p class="chat-widget-title">Paul Assistant</p>
                <p class="chat-widget-subtitle">Ask about services and projects</p>
            </div>
            <button class="chat-widget-close" id="chatWidgetClose" type="button" aria-label="Close chat">✕</button>
        </div>
        <div class="chat-widget-body" id="chatWidgetBody"></div>
        <div class="chat-widget-typing" id="chatWidgetTyping" aria-hidden="true">
            <span class="chat-widget-dot"></span>
            <span class="chat-widget-dot"></span>
            <span class="chat-widget-dot"></span>
            <span>Paul is typing…</span>
        </div>
        <form class="chat-widget-form" id="chatWidgetForm">
            <input class="chat-widget-input" id="chatWidgetInput" type="text" placeholder="Ask me something..." autocomplete="off" />
            <button class="chat-widget-send" type="submit">Send</button>
        </form>
    </div>
    <button class="chat-widget-toggle" id="chatWidgetToggle" type="button" aria-label="Open chat">🧠</button>
`;

document.body.appendChild(widgetShell);

const widgetPanel = document.getElementById('chatWidgetPanel');
const widgetToggle = document.getElementById('chatWidgetToggle');
const widgetClose = document.getElementById('chatWidgetClose');
const widgetBody = document.getElementById('chatWidgetBody');
const widgetTyping = document.getElementById('chatWidgetTyping');
const widgetForm = document.getElementById('chatWidgetForm');
const widgetInput = document.getElementById('chatWidgetInput');
const STORAGE_KEY = 'paulPortfolioWidgetChat';
const WELCOME_MESSAGE = {
    role: 'ai',
    content: '👋 Hello! I’m Paul Assistant. I can help with logo design, branding, marketing design, packaging, social media design, print work, portfolio information, and contact details.',
    time: new Date().toISOString(),
};

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getHistory() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [WELCOME_MESSAGE];
    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length ? parsed : [WELCOME_MESSAGE];
    } catch {
        return [WELCOME_MESSAGE];
    }
}

function saveHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function renderHistory() {
    widgetBody.innerHTML = '';
    getHistory().forEach(message => {
        const bubble = document.createElement('div');
        bubble.className = `chat-widget-message ${message.role}`;
        bubble.innerHTML = `<div>${message.content.replace(/\n/g, '<br>')}</div><span class="chat-widget-message-time">${formatTime(message.time)}</span>`;
        widgetBody.appendChild(bubble);
    });
    scrollWidgetBottom();
}

function scrollWidgetBottom() {
    widgetBody.scrollTop = widgetBody.scrollHeight;
}

function setWidgetTyping(active) {
    widgetTyping.classList.toggle('active', active);
    widgetTyping.setAttribute('aria-hidden', active ? 'false' : 'true');
    if (active) {
        widgetBody.scrollTop = widgetBody.scrollHeight;
    }
}

function addHistory(role, content) {
    const history = getHistory();
    history.push({ role, content, time: new Date().toISOString() });
    saveHistory(history);
    renderHistory();
}

function openWidget() {
    widgetPanel.classList.add('open');

    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');

    if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    widgetInput.focus();
}

function closeWidget() {
    widgetPanel.classList.remove('open');
}

async function sendWidgetMessage(message) {
    const text = message.trim();
    if (!text) return;

    addHistory('user', text);
    widgetInput.value = '';
    widgetInput.disabled = true;
    widgetForm.classList.add('typing');
    setWidgetTyping(true);

    try {
const API_URL = "https://graphicdesign.up.railway.app/chat";

const response = await fetch(API_URL, {
                method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
        });

        let reply = 'I’m here to help with your portfolio questions.';
        try {
            const result = await response.json();
            reply = result?.reply || result?.message || reply;
        } catch {
            reply = await response.text();
        }

        if (!reply || reply === 'undefined') {
            reply = 'I can help with logo design, branding, marketing design, packaging, social media design, and print work.';
        }

        addHistory('ai', reply);
    } catch (error) {
        addHistory('ai', 'I can help with logo design, branding, marketing design, packaging, social media design, and print work.');
        console.error(error);
    } finally {
        widgetInput.disabled = false;
        widgetForm.classList.remove('typing');
        setWidgetTyping(false);
    }
}

widgetToggle.addEventListener('click', () => {
    if (widgetPanel.classList.contains('open')) {
        closeWidget();
    } else {
        openWidget();
    }
});

widgetClose.addEventListener('click', closeWidget);

widgetForm.addEventListener('submit', event => {
    event.preventDefault();
    sendWidgetMessage(widgetInput.value);
});

widgetInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendWidgetMessage(widgetInput.value);
    }
});

renderHistory();
});
