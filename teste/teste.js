// --- CONTROLE DE PÁGINAS (SPA) ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Suporte para navegação por teclado (Enter e Espaço nos botões/links do Nav)
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button') {
        e.target.click();
    }
});

// --- FERRAMENTAS DE ACESSIBILIDADE ---
let currentFontSize = 16;

// Aumentar/Diminuir Fonte
document.getElementById('btn-increase-font')?.addEventListener('click', () => {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.setProperty('--font-base-size', `${currentFontSize}px`);
        localStorage.setItem('pref_font_size', currentFontSize);
    }
});

document.getElementById('btn-decrease-font')?.addEventListener('click', () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty('--font-base-size', `${currentFontSize}px`);
        localStorage.setItem('pref_font_size', currentFontSize);
    }
});

// Alternância de Temas
const body = document.body;

document.getElementById('btn-theme-light')?.addEventListener('click', () => setTheme('light'));
document.getElementById('btn-theme-dark')?.addEventListener('click', () => setTheme('dark'));
document.getElementById('btn-theme-contrast')?.addEventListener('click', () => setTheme('contrast'));

function setTheme(theme) {
    body.classList.remove('theme-dark', 'theme-high-contrast');
    if (theme === 'dark') body.classList.add('theme-dark');
    if (theme === 'contrast') body.classList.add('theme-high-contrast');
    localStorage.setItem('pref_theme', theme);
}

// Fonte para Dislexia
document.getElementById('btn-toggle-dyslexic')?.addEventListener('click', () => {
    body.classList.toggle('font-dyslexic');
    const isDyslexic = body.classList.contains('font-dyslexic');
    localStorage.setItem('pref_dyslexic', isDyslexic);
});

// Sintetizador de Voz (Leitor de Tela Nativo)
document.getElementById('btn-read-page')?.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Parar leituras anteriores
        
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;

        const textToRead = activePage.innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('O seu navegador não suporta a API de leitura de voz.');
    }
});

// --- SUBMISSÃO E AÇÕES DO DASHBOARD ---
document.getElementById('form-agendamento')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const esp = document.getElementById('especialidade').value;
    const und = document.getElementById('unidade').value;
    const data = document.getElementById('data_consulta').value;
    const hora = document.getElementById('hora_consulta').value;

    alert(`Agendamento realizado com sucesso para ${esp} na ${und} dia ${data} às ${hora}!`);
    e.target.reset();
});

function cancelarAgendamento(button) {
    if (confirm('Tem certeza de que deseja cancelar este agendamento?')) {
        const row = button.closest('tr');
        row.remove();
    }
}

// --- CARREGAR PREFERÊNCIAS SALVAS ---
window.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('pref_font_size');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        document.documentElement.style.setProperty('--font-base-size', `${currentFontSize}px`);
    }

    const savedTheme = localStorage.getItem('pref_theme');
    if (savedTheme) setTheme(savedTheme);

    const savedDyslexic = localStorage.getItem('pref_dyslexic');
    if (savedDyslexic === 'true') body.classList.add('font-dyslexic');
});