// Executa o script quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Função para calcular o tempo estimado de leitura do artigo
    function calculateReadingTime() {
        const articleText = document.querySelector('.article-body').innerText;
        const wordsPerMinute = 200; // Média de palavras lidas por minuto
        const numberOfWords = articleText.trim().split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(numberOfWords / wordsPerMinute);
        
        const readingTimeElement = document.getElementById('reading-time');
        if (readingTimeElement) {
            readingTimeElement.textContent = `⏱️ ${readingTimeMinutes} min de leitura`;
        }
    }

    // Função de otimização: Adiciona segurança em links externos se houver
    function secureExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // Inicialização das funções
    calculateReadingTime();
    secureExternalLinks();
});