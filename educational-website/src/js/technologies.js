// Dados das tecnologias
const technologies = [
    {
        name: 'React',
        category: 'frontend',
        description: 'Biblioteca JavaScript para construção de interfaces',
        pros: ['Grande ecossistema', 'Performance otimizada', 'Componentização'],
        cons: ['Curva de aprendizado', 'Configuração complexa'],
        whenToUse: 'Ideal para aplicações web complexas e interativas',
        whenToAvoid: 'Projetos pequenos ou sites estáticos simples',
        level: 'Intermediário',
        link: 'https://reactjs.org'
    },
    // Adicione mais tecnologias aqui
];

// Renderização do grid de tecnologias
const techGrid = document.querySelector('.tech-grid');

// Mostrar todas as tecnologias
renderTechnologies(technologies);

function renderTechnologies(techs) {
    techGrid.innerHTML = techs.map(tech => `
        <article class="tech-card" data-category="${tech.category}">
            <h3 class="tech-card__title">${tech.name}</h3>
            <p class="tech-card__desc">${tech.description}</p>
            <div class="tech-card__details">
                <h4>Prós:</h4>
                <ul>
                    ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
                <h4>Contras:</h4>
                <ul>
                    ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
            </div>
            <footer class="tech-card__footer">
                <span class="tech-card__level">${tech.level}</span>
                <a href="${tech.link}" class="tech-card__link" target="_blank" rel="noopener">Documentação</a>
            </footer>
        </article>
    `).join('');

    // Adicionar event listeners para os cards
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('click', () => showModal(card.querySelector('.tech-card__title').textContent));
    });
}

// Modal
const modal = document.getElementById('techModal');
const modalClose = modal.querySelector('.modal__close');

function showModal(techName) {
    const tech = technologies.find(t => t.name === techName);
    if (!tech) return;

    modal.querySelector('.modal__title').textContent = `Quando escolher ${tech.name}?`;
    modal.querySelector('.modal__body').innerHTML = `
        <p><strong>Quando usar:</strong> ${tech.whenToUse}</p>
        <p><strong>Quando evitar:</strong> ${tech.whenToAvoid}</p>
    `;

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-active');
}

modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-active');
});

// Fechar modal com Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        modalClose.click();
    }
});

// Carregar tecnologias iniciais
filterTechnologies();
