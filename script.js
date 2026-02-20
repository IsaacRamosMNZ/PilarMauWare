/* ================================================== */
/*     PILARMAUWARE - JAVASCRIPT COM VALIDAÇÕES      */
/* ================================================== */

// ==================== VALIDAÇÃO DE FORMULÁRIO ====================

document.addEventListener('DOMContentLoaded', function() {
    // Obter formulário se existir
    const form = document.querySelector('.contact-form');
    
    if (form) {
        // Adicionar evento de envio
        const submitBtn = form.querySelector('.btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(event) {
                event.preventDefault();
                validarEEnviarFormulario();
            });
        }
    }
});

// ==================== VALIDAR E ENVIAR FORMULÁRIO ====================

function validarEEnviarFormulario() {
    // Obter valores dos campos
    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const telefone = document.getElementById('phone');
    const mensagem = document.getElementById('message');

    // Limpar erros anteriores
    limparErros();

    // Validações
    let temErro = false;

    // Validar nome
    if (!nome.value.trim()) {
        mostrarErro(nome, 'Nome é obrigatório');
        temErro = true;
    } else if (nome.value.trim().length < 3) {
        mostrarErro(nome, 'Nome deve ter pelo menos 3 caracteres');
        temErro = true;
    }

    // Validar email
    if (!email.value.trim()) {
        mostrarErro(email, 'Email é obrigatório');
        temErro = true;
    } else if (!validarEmail(email.value)) {
        mostrarErro(email, 'Email inválido');
        temErro = true;
    }

    // Validar telefone
    if (!telefone.value.trim()) {
        mostrarErro(telefone, 'Telefone é obrigatório');
        temErro = true;
    } else if (!validarTelefone(telefone.value)) {
        mostrarErro(telefone, 'Telefone deve ter pelo menos 10 dígitos');
        temErro = true;
    }

    // Validar mensagem
    if (!mensagem.value.trim()) {
        mostrarErro(mensagem, 'Mensagem é obrigatória');
        temErro = true;
    } else if (mensagem.value.trim().length < 10) {
        mostrarErro(mensagem, 'Mensagem deve ter pelo menos 10 caracteres');
        temErro = true;
    }

    // Se não houver erros, mostrar mensagem de sucesso
    if (!temErro) {
        mostrarSucesso();
        // Limpar formulário
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';
    }
}

// ==================== VALIDAR EMAIL ====================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== VALIDAR TELEFONE ====================

function validarTelefone(telefone) {
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length >= 10;
}

// ==================== MOSTRAR ERRO NO CAMPO ====================

function mostrarErro(campo, mensagem) {
    // Adicionar classe de erro
    campo.style.borderBottom = '2px solid #e74c3c';

    // Criar ou atualizar elemento de erro
    let erroElement = campo.nextElementSibling;
    if (!erroElement || !erroElement.classList.contains('form-error')) {
        erroElement = document.createElement('div');
        erroElement.className = 'form-error';
        campo.parentNode.insertBefore(erroElement, campo.nextSibling);
    }

    erroElement.textContent = mensagem;
    erroElement.style.display = 'block';
}

// ==================== LIMPAR ERROS ====================

function limparErros() {
    const campos = document.querySelectorAll('.contact-form input, .contact-form textarea');
    campos.forEach(campo => {
        campo.style.borderBottom = 'none';
        
        // Remover elemento de erro
        let erroElement = campo.nextElementSibling;
        if (erroElement && erroElement.classList.contains('form-error')) {
            erroElement.remove();
        }
    });
}

// ==================== MOSTRAR MENSAGEM DE SUCESSO ====================

function mostrarSucesso() {
    const form = document.querySelector('.contact-form');
    let sucessoElement = document.querySelector('.form-success');

    if (!sucessoElement) {
        sucessoElement = document.createElement('div');
        sucessoElement.className = 'form-success';
        form.parentNode.insertBefore(sucessoElement, form);
    }

    const nomeValue = document.getElementById('name').value;
    sucessoElement.textContent = `✓ Obrigado, ${nomeValue}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`;
    sucessoElement.style.display = 'block';

    // Remover mensagem após 5 segundos
    setTimeout(() => {
        sucessoElement.style.display = 'none';
    }, 5000);
}

// ==================== MÁSCARAS DE ENTRADA ====================

document.addEventListener('DOMContentLoaded', function() {
    // Máscara de telefone
    const telefoneInput = document.getElementById('phone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            // Remover caracteres não numéricos
            let valor = this.value.replace(/\D/g, '');

            // Aplicar máscara (XX) 9XXXX-XXXX
            if (valor.length <= 10) {
                valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            } else {
                valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            }

            this.value = valor;
        });
    }

    // Validação em tempo real - Email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() && !validarEmail(this.value)) {
                this.style.borderBottom = '2px solid #e74c3c';
            } else {
                this.style.borderBottom = 'none';
            }
        });

        emailInput.addEventListener('input', function() {
            this.style.borderBottom = 'none';
        });
    }
});

// ==================== NAVEGAÇÃO ATIVA ====================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const paginaAtual = document.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ==================== SUAVIZAR SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== EFEITOS INTERATIVOS ====================

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito hover nos cards
    const cards = document.querySelectorAll('.benefit-card, .step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Efeito nos slots do mockup
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = 'none';
            }, 600);
        });
    });
});

// ==================== ANIMAÇÕES CSS ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== MONITORAMENTO DE PERFORMANCE ====================

// ==================== MENU HAMBÚRGUER ====================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==================== EFEITO DE SCROLL ====================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adicionar classe quando scrollar mais de 50px
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('⏱️ Tempo de carregamento: ' + pageLoadTime + 'ms');
    }
});

console.log('🛡️ PilarMauWare - Proteção inteligente para quem você ama');
