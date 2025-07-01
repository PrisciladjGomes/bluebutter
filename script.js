// Variáveis globais
let cart = [];
let cartCount = 0;

// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Planner Fofuras",
        price: 12.50,
        originalPrice: 15.00,
        discount: "ECONOMIZE 17%",
        description: "Espaço para imagem do Planner Fofuras. Sua personalidade está em primeiro lugar.",
        longDescription: "Para quem ama cuidado, planejar e viver. Com estilos delicados, temas fofos e primeira categoria.",
        features: [
            "Planejamento diário com horários",
            "Rastreador de humor e água",
            "Checklists semanais",
            "Calendários mensais",
            "Espaço para anotações",
            "Adesivos da Canva (100% editável)"
        ]
    },
    {
        id: 2,
        name: "Coleção Professora - Docente",
        price: 13.50,
        originalPrice: 16.00,
        discount: "ECONOMIZE 16%",
        description: "Espaço para imagem do Planner Docente. Sua personalidade está em primeiro lugar.",
        longDescription: "Elegante e fácil para trabalhar no profissional da área. Tempo otimizado nas atividades acadêmicas.",
        features: [
            "Agenda semanal e mensal completa",
            "Planejamento de aulas",
            "Estilo discreto e clean",
            "Folhas explicativas",
            "Anotações jurídicas",
            "Espaço para preços importantes"
        ]
    },
    {
        id: 3,
        name: "Planner Mármore Rosa",
        price: 13.00,
        originalPrice: 15.00,
        discount: "ECONOMIZE 13%",
        description: "Espaço para imagem do Planner Mármore Rosa. Sua personalidade está em primeiro lugar.",
        longDescription: "Organize sua vida com estilo elegante. Use o mármore rosa e feminino - ideal para quem gosta de estética chic.",
        features: [
            "Visão global semanal e mensal",
            "Estilo mármore com tons rosê",
            "Espaço para metas e estudos",
            "Rotina pessoal organizada",
            "Planejamento anual",
            "Design elegante e elegante"
        ]
    },
    {
        id: 4,
        name: "Caderno Digital - Mármore Roxo",
        price: 12.00,
        originalPrice: 14.00,
        discount: "10% OFF",
        description: "Transforme sua rotina com o Caderno Digital Mármore Roxo.",
        longDescription: "A ferramenta ideal para transformar seus sonhos em realidade com organização e estilo.",
        features: [
            "Design mármore roxo elegante",
            "Planejamento diário e semanal",
            "Seções para metas e objetivos",
            "Rastreador de hábitos",
            "Calendário integrado",
            "100% editável no Canva"
        ]
    },
    {
        id: 5,
        name: "Caderno Digital - Mármore Azul",
        price: 13.50,
        originalPrice: 15.50,
        discount: "12% OFF",
        description: "Mais que organização, um estilo de vida!",
        longDescription: "Planeje hoje, conquiste amanhã! Design sofisticado em tons de azul.",
        features: [
            "Design mármore azul sofisticado",
            "Organização mensal e anual",
            "Seções para projetos especiais",
            "Rastreador de água e exercícios",
            "Páginas para reflexões",
            "Compatível com tablets"
        ]
    },
    {
        id: 6,
        name: "Caderno Digital - Mármore Verde",
        price: 13.00,
        originalPrice: 14.50,
        discount: "5% OFF",
        description: "Produtividade e inspiração em cada página.",
        longDescription: "A ferramenta ideal para transformar seus sonhos em realidade com tons relaxantes de verde.",
        features: [
            "Design mármore verde relaxante",
            "Planejamento de rotina completa",
            "Seções para autocuidado",
            "Rastreador de humor",
            "Calendário personalizado",
            "Design minimalista e clean"
        ]
    }
];


// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    updateCartDisplay();
    
    console.log('🦋 Butterfly Planner carregado com sucesso!');
});

// Navegação
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para rolar para uma seção específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animações de entrada
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
        const animatedElements = document.querySelectorAll('.benefit-card, .product-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    updateCartDisplay();
    showNotification(`${productName} adicionado ao carrinho! 🛒`);
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #bfa2db, #8d5da0);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Funções dos produtos
function buyProduct(productName, price) {
    // Simular processo de compra
    showNotification(`Redirecionando para pagamento de ${productName}... 💳`);
    
    // Aqui você integraria com um sistema de pagamento real
    setTimeout(() => {
        alert(`Compra de ${productName} por R$${price.toFixed(2).replace('.', ',')} iniciada!\n\n🔒 Pagamento seguro\n⬇️ Download imediato\n💜 Garantia de 30 dias`);
    }, 1500);
}

function viewDetails(productName) {
    const product = products.find(p => p.name === productName);
    
    if (product) {
        let featuresText = product.features.map(feature => `• ${feature}`).join('\n');
        
        alert(`📱 ${product.name}\n\n${product.longDescription}\n\n💰 Preço: R$${product.price.toFixed(2).replace('.', ',')}\n${product.originalPrice ? `💸 De: R$${product.originalPrice.toFixed(2).replace('.', ',')}` : ''}\n\n✨ Funcionalidades:\n${featuresText}\n\n🔒 Garantia de 30 dias\n⭐ Avaliação 4.9/5`);
    }
}

function requestCustomization() {
    showNotification('Redirecionando para personalização... ✨');
    
    setTimeout(() => {
        alert(`✨ Personalização de Caderno Digital\n\nNosso time criará um planner exclusivo para você!\n\n📝 O que incluir:\n• Suas cores favoritas\n• Seções personalizadas\n• Seu nome/logo\n• Layout exclusivo\n\n📞 Entre em contato:\n📧 contato@butterflyplanner.com\n📱 (11) 99999-9999\n\n💜 Transforme sua rotina com um planner único!`);
    }, 1500);
}

function takeOffer() {
    showNotification('Aproveitando oferta especial... 🦋');
    
    setTimeout(() => {
        alert(`🦋 Oferta Especial Ativada!\n\n🎁 Benefícios inclusos:\n• Todos os 3 planners\n• Desconto de até 17%\n• Suporte prioritário\n• Atualizações gratuitas\n\n💰 Valor total: R$39,00\n💸 Economia: R$7,00\n\n🛒 Finalizar compra?\n\n🔒 Pagamento 100% seguro\n⬇️ Download imediato\n💜 Garantia de satisfação`);
    }, 1500);
}

// Efeitos visuais adicionais
function addVisualEffects() {
    // Efeito de hover nos cards
    const cards = document.querySelectorAll('.benefit-card, .product-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para destacar navegação ativa
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Função para carregar dados dinamicamente (se necessário)
function loadDynamicContent() {
    // Aqui você pode carregar conteúdo de uma API
    // Por exemplo, produtos, depoimentos, etc.
    console.log('Conteúdo dinâmico carregado');
}

// Função para validar formulários (se houver)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Função para analytics (opcional)
function trackEvent(eventName, eventData) {
    console.log(`📊 Evento: ${eventName}`, eventData);
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
}

// Função para otimização de performance
function optimizePerformance() {
    // Lazy loading de imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    addVisualEffects();
    highlightActiveSection();
    optimizePerformance();
    
    // Adicionar estilos CSS para navegação ativa
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--purple-primary) !important;
            font-weight: 700;
        }
        
        .notification {
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Função para debug (desenvolvimento)
function debugInfo() {
    console.log('🦋 Butterfly Planner Debug Info:');
    console.log('📦 Produtos:', products);
    console.log('🛒 Carrinho:', cart);
    console.log('📊 Contagem do carrinho:', cartCount);
}

// Expor funções globais necessárias
window.scrollToSection = scrollToSection;
window.buyProduct = buyProduct;
window.viewDetails = viewDetails;
window.requestCustomization = requestCustomization;
window.takeOffer = takeOffer;
window.debugInfo = debugInfo;

