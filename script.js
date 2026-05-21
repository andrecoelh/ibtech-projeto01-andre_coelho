// =========================
// TYPEWRITER
// =========================

const descricao = document.querySelector(".descricao");
const textoOriginal =
    "Estudante de Ciência de Dados e IA no IBMEC-BH, interessado na interseção entre dados, tecnologia e finanças.";

descricao.textContent = "";
let index = 0;

function typeWriter() {
    if (index < textoOriginal.length) {
        descricao.textContent += textoOriginal.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
    }
}

typeWriter();


// =========================
// TEMA CLARO / ESCURO
// Usa data-theme no <html> para compatibilidade com variáveis CSS :root
// =========================

const html = document.documentElement;

const botaoTema = document.createElement("button");
botaoTema.classList.add("botao-tema");
botaoTema.setAttribute("aria-label", "Alternar tema");
document.body.appendChild(botaoTema);

function aplicarTema(tema) {
    html.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
    botaoTema.textContent = tema === "light" ? "🌙" : "☀️";
}

// Na carga: usa o salvo; se não houver, respeita o sistema
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "light" || temaSalvo === "dark") {
    aplicarTema(temaSalvo);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    aplicarTema("light");
} else {
    aplicarTema("dark");
}

botaoTema.addEventListener("click", () => {
    const atual = html.getAttribute("data-theme");
    aplicarTema(atual === "light" ? "dark" : "light");
});


// =========================
// COPIAR E-MAIL
// =========================

const emailSpan   = document.querySelector(".email");
const feedback    = document.getElementById("email-feedback");
const EMAIL       = "moldre@outlook.com";

const botaoCopiar = document.createElement("button");
botaoCopiar.textContent = "Copiar e-mail";
botaoCopiar.classList.add("botao");
emailSpan.insertAdjacentElement("afterend", botaoCopiar);

botaoCopiar.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(EMAIL);
        feedback.hidden = false;
        botaoCopiar.textContent = "Copiado!";
        setTimeout(() => {
            feedback.hidden = true;
            botaoCopiar.textContent = "Copiar e-mail";
        }, 2000);
    } catch {
        botaoCopiar.textContent = "Erro ao copiar";
        setTimeout(() => { botaoCopiar.textContent = "Copiar e-mail"; }, 2000);
    }
});


// =========================
// INTERSECTION OBSERVER — animação de entrada
// =========================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
            observer.unobserve(entry.target); // dispara só uma vez
        }
    });
}, { threshold: 0.15 });

cards.forEach((card) => observer.observe(card));


// =========================
// TERMINAL MODE (Ctrl+K)
// =========================

const overlay       = document.querySelector(".terminal-overlay");
const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");

// Abrir / fechar
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        overlay.classList.add("ativo");
        terminalInput.focus();
    }
    if (event.key === "Escape") {
        overlay.classList.remove("ativo");
    }
});

// Fechar clicando fora do terminal
overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("ativo");
    }
});

// Comandos
const comandos = {
    help: `
Comandos disponíveis:<br><br>
whoami &nbsp;&nbsp; — quem sou eu<br>
skills &nbsp;&nbsp; — minhas habilidades<br>
projects — projetos em andamento<br>
vision &nbsp;&nbsp; — visão de futuro<br>
music &nbsp;&nbsp;&nbsp; — o que toca aqui<br>
contact &nbsp; — como me encontrar<br>
clear &nbsp;&nbsp;&nbsp; — limpar o terminal`,

    whoami: `André Coelho — estudante de Data Science & AI no IBMEC-BH,
focado em finanças, sistemas e tecnologia.`,

    skills: `Python · Data Analysis · Automation
Risk Management · Artificial Intelligence`,

    projects: `Construindo portfólio e explorando
sistemas de risco financeiro.`,

    vision: `Transformar dados em sistemas que resolvem
problemas reais.`,

    music: `Radiohead, ambient soundscapes e
sessões de código de madrugada.`,

    contact: `moldre@outlook.com
github.com/andrecoelh`,
};

terminalInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const cmd = terminalInput.value.toLowerCase().trim();
    terminalInput.value = "";

    if (cmd === "clear") {
        terminalOutput.innerHTML = "";
        return;
    }

    const resposta = comandos[cmd] ||
        `Comando não reconhecido. Digite <strong>help</strong> para ver os disponíveis.`;

    terminalOutput.innerHTML += `
        <p class="comando">> ${cmd}</p>
        <p>${resposta}</p>
        <br>
    `;

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
});