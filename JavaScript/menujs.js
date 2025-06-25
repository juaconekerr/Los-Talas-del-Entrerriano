/**
 * Funcionalidad específica para la página de Menú
 */

document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------
    // Variables
    // -------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const dayTabs = document.querySelectorAll('.day-tab');
    const daySelect = document.getElementById('day-select');
    const menuDays = document.querySelectorAll('.menu-day');
    
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
    // Selector de días (versión desktop)
    // -------------------------------
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las pestañas
            dayTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase active a la pestaña clickeada
            this.classList.add('active');
            
            // Obtener el día correspondiente
            const day = this.getAttribute('data-day');
            
            // Mostrar el menú del día seleccionado
            showDayMenu(day);
            
            // Actualizar el selector móvil si existe
            if (daySelect) {
                daySelect.value = day;
            }
        });
    });
    
    // -------------------------------
    // Selector de días (versión móvil)
    // -------------------------------
    if (daySelect) {
        daySelect.addEventListener('change', function() {
            const day = this.value;
            
            // Actualizar pestañas desktop si existen
            dayTabs.forEach(tab => {
                if (tab.getAttribute('data-day') === day) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Mostrar el menú del día seleccionado
            showDayMenu(day);
        });
    }
    
    // -------------------------------
    // Función para mostrar el menú de un día específico
    // -------------------------------
    function showDayMenu(day) {
        // Ocultar todos los menús
        menuDays.forEach(menu => {
            menu.classList.remove('active');
        });
        
        // Mostrar el menú del día seleccionado
        const activeMenu = document.getElementById(day);
        if (activeMenu) {
            activeMenu.classList.add('active');
        }
    }
    
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