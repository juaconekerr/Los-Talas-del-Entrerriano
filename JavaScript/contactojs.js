/**
 * Funcionalidad específica para la página de Contacto
 * Incluye validación de formulario y manejo del modal del mapa
 */

document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------
    // Variables
    // -------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const contactForm = document.getElementById('contact-form');
    const openMapBtn = document.getElementById('open-map');
    const mapModal = document.getElementById('map-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // -------------------------------
    // Menú móvil (compartido con index)
    // -------------------------------
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.innerHTML = navList.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // -------------------------------
    // Validación del formulario
    // -------------------------------
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Resetear mensajes de error
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Validar campos
            let isValid = true;
            
            // Validar nombre
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Por favor ingresa tu nombre';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validar email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('email-error').textContent = 'Por favor ingresa un email válido';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validar asunto
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '') {
                document.getElementById('subject-error').textContent = 'Por favor selecciona un asunto';
                document.getElementById('subject-error').style.display = 'block';
                isValid = false;
            }
            
            // Validar mensaje
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Por favor escribe tu mensaje';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            // Si el formulario es válido, enviar
            if (isValid) {
                // Aquí iría la lógica para enviar el formulario
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            }
        });
    }
    
    // -------------------------------
    // Manejo del modal del mapa
    // -------------------------------
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            mapModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mapModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) {
            mapModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // -------------------------------
    // Efecto de scroll en el header (compartido con index)
    // -------------------------------
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'var(--white)';
        }
    });
});