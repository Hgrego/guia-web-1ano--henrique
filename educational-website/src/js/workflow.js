// Dados do fluxo de trabalho
const workflowSteps = [
    {
        id: 'descoberta',
        title: '1. Descoberta',
        deliverables: [
            'Análise de requisitos',
            'Pesquisa de usuários',
            'Definição de escopo'
        ],
        risks: [
            'Requisitos mal definidos',
            'Expectativas irreais'
        ]
    },
    {
        id: 'requisitos',
        title: '2. Requisitos',
        deliverables: [
            'Documento de requisitos',
            'User stories',
            'Critérios de aceitação'
        ],
        risks: [
            'Escopo indefinido',
            'Falta de priorização'
        ]
    },
    // Adicione mais etapas aqui
];

// SVG do fluxograma
const workflowDiagram = document.querySelector('.workflow-diagram');
const timeline = document.querySelector('.timeline');

// Gerar SVG do fluxograma
function generateWorkflowSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 200');
    svg.setAttribute('class', 'workflow-svg');
    
    // Adicionar elementos do fluxograma aqui
    // (Círculos, linhas e textos representando as etapas)
    
    workflowDiagram.appendChild(svg);
}

// Gerar timeline
function generateTimeline() {
    timeline.innerHTML = workflowSteps.map((step, index) => `
        <div class="timeline__item" data-step="${step.id}">
            <h3 class="timeline__title">${step.title}</h3>
            <div class="timeline__content">
                <h4>Entregas:</h4>
                <ul>
                    ${step.deliverables.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <h4>Riscos:</h4>
                <ul>
                    ${step.risks.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Tooltips
function setupTooltips() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const step = workflowSteps.find(s => s.id === item.dataset.step);
            if (step) {
                // Destacar etapa correspondente no fluxograma
                const stepElement = document.querySelector(`[data-step="${step.id}"]`);
                if (stepElement) {
                    stepElement.classList.add('is-active');
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('[data-step]').forEach(el => {
                el.classList.remove('is-active');
            });
        });
    });
}

// Inicialização
generateWorkflowSVG();
generateTimeline();
setupTooltips();

// Responsividade
window.addEventListener('resize', () => {
    // Atualizar posições dos elementos do fluxograma se necessário
});
