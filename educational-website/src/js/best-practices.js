// Gerenciamento do accordion
const accordion = document.querySelector('.accordion');

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
