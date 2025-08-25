// Gerenciamento do accordion e checklist
const accordion = document.querySelector('.accordion');
const checkboxes = document.querySelectorAll('.checklist__item input[type="checkbox"]');
const progressBar = document.querySelector('.progress-bar__fill');
const progressText = document.querySelector('.progress-bar__text');

// Carregar progresso salvo
const savedProgress = JSON.parse(localStorage.getItem('practicesProgress') || '{}');
let totalItems = checkboxes.length;
let completedItems = 0;

// Inicializar checkboxes com estado salvo
checkboxes.forEach(checkbox => {
    checkbox.checked = savedProgress[checkbox.name] || false;
    if (checkbox.checked) completedItems++;
});

updateProgress();

// Event listeners para accordion
document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        
        // Fechar outros painéis
        document.querySelectorAll('.accordion__header[aria-expanded="true"]').forEach(openHeader => {
            if (openHeader !== header) {
                openHeader.setAttribute('aria-expanded', 'false');
                openHeader.nextElementSibling.hidden = true;
            }
        });

        // Alternar painel atual
        header.setAttribute('aria-expanded', !isExpanded);
        content.hidden = isExpanded;

        // Animação suave
        if (!isExpanded) {
            content.style.maxHeight = '0';
            content.hidden = false;
            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
            });
        }
    });
});

// Event listeners para checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Atualizar contagem
        completedItems = Array.from(checkboxes).filter(cb => cb.checked).length;
        
        // Salvar progresso
        savedProgress[checkbox.name] = checkbox.checked;
        localStorage.setItem('practicesProgress', JSON.stringify(savedProgress));
        
        // Atualizar barra de progresso
        updateProgress();
    });
});

function updateProgress() {
    const percentage = (completedItems / totalItems) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}% completo`;
}

// Navegação por teclado
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('accordion__header')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});
