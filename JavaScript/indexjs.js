/**
 * Archivo principal de JavaScript para el sitio web del restaurante
 * Contiene la funcionalidad del carrusel, menú móvil y otros efectos
 */

document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------
    // Variables globales
    // -------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 segundos
    
    // -------------------------------
    // Funcionalidad del menú móvil
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
    // Funcionalidad del carrusel
    // -------------------------------
    function showSlide(index) {
        // Validar índice
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar diapositiva actual
        slides[currentSlide].classList.add('active');
        
        // Actualizar indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners para controles del carrusel
    nextBtn.addEventListener('click', function() {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });
    
    prevBtn.addEventListener('click', function() {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });
    
    // Pausar carrusel al pasar el mouse
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopSlideShow);
    heroSlider.addEventListener('mouseleave', startSlideShow);
    
    // Iniciar carrusel
    showSlide(currentSlide);
    startSlideShow();
    
    // -------------------------------
    // Efecto de scroll en el header
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
    
    // -------------------------------
    // Animaciones al hacer scroll
    // -------------------------------
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    document.querySelectorAll('.feature-card, .about-image, .about-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});