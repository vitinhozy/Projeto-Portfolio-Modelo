document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelector('.scroll-down').addEventListener('click', function () {
    window.scrollBy({
        top: window.innerHeight - 0,
        behavior: 'smooth'
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.about-text, .profile-image, .measurements-grid, .gallery, .contact-info, .contact-form');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== FUNCIONALIDADE DOS EDITORIAIS - VERSÃO SIMPLIFICADA =====

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Pequeno delay para garantir que tudo está carregado
    setTimeout(initPortfolioGallery, 100);
});

function initPortfolioGallery() {
    console.log('Inicializando galeria...');

    // Verifica se os elementos existem
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryCategories = document.querySelectorAll('.gallery-category');

    if (categoryButtons.length === 0 || galleryCategories.length === 0) {
        console.warn('Elementos da galeria não encontrados');
        return;
    }

    // Preenche a galeria "Todos" se existir
    populateAllGallery();

    // Adiciona eventos aos botões
    categoryButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const category = this.getAttribute('data-category');
            console.log('Categoria clicada:', category);

            // Remove classe active de todos os botões
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Adiciona classe active ao botão clicado
            this.classList.add('active');

            // Remove classe active de todas as galerias
            galleryCategories.forEach(gallery => {
                gallery.classList.remove('active');
            });

            // Adiciona classe active à galeria correspondente
            const targetGallery = document.getElementById(`gallery-${category}`);
            if (targetGallery) {
                targetGallery.classList.add('active');

                // Adiciona animação de entrada
                targetGallery.style.opacity = '0';
                targetGallery.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    targetGallery.style.transition = 'all 0.5s ease';
                    targetGallery.style.opacity = '1';
                    targetGallery.style.transform = 'translateY(0)';
                }, 10);
            }

            // Rola suavemente para a seção de portfolio
            document.getElementById('portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    console.log('Galeria inicializada com sucesso!');
}

// Função para preencher a galeria "Todos" com todas as imagens
function populateAllGallery() {
    const allGallery = document.getElementById('gallery-todos');
    if (!allGallery) return;

    const galleryContainer = allGallery.querySelector('.gallery');
    if (!galleryContainer) return;

    // Limpa conteúdo existente
    galleryContainer.innerHTML = '';

    // Adiciona título
    const titleDiv = document.createElement('div');
    titleDiv.className = 'gallery-section-title';
    titleDiv.innerHTML = '<h3>Todos os Editoriais</h3><p>Confira todas as produções</p>';
    galleryContainer.appendChild(titleDiv);

    // Coleta todas as imagens das outras galerias
    const allImages = [];
    const otherGalleries = document.querySelectorAll('.gallery-category:not(#gallery-todos)');

    otherGalleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-item');
        images.forEach(img => {
            const clone = img.cloneNode(true);
            allImages.push(clone);
        });
    });

    // Adiciona as imagens à galeria "Todos"
    allImages.forEach(img => {
        galleryContainer.appendChild(img);
    });
}

// Adiciona animação às galerias quando visíveis
function animateGalleriesOnScroll() {
    const galleries = document.querySelectorAll('.gallery-category.active .gallery');

    galleries.forEach(gallery => {
        const rect = gallery.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            gallery.style.opacity = '1';
            gallery.style.transform = 'translateY(0)';

            // Anima os itens individualmente
            const items = gallery.querySelectorAll('.gallery-item, .gallery-section-title, .gallery-subtitle');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            });
        }
    });
}

// Adiciona evento de scroll para animações
window.addEventListener('scroll', animateGalleriesOnScroll);

// Inicializa animações na carga da página
window.addEventListener('load', function () {
    animateGalleriesOnScroll();

    // Pequeno delay para garantir que tudo está pronto
    setTimeout(() => {
        const activeGallery = document.querySelector('.gallery-category.active .gallery');
        if (activeGallery) {
            activeGallery.style.opacity = '1';
            activeGallery.style.transform = 'translateY(0)';
        }
    }, 300);
});

