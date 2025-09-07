// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada épica
    const entradaEpica = document.getElementById('entradaEpica');
    
    // Ocultar la entrada épica después de 3 segundos
    setTimeout(() => {
        entradaEpica.classList.add('fade-out');
        
        // Eliminar completamente el elemento después de la animación
        setTimeout(() => {
            entradaEpica.remove();
        }, 1500);
    }, 3000);
    
    // Cambiar título al cambiar de pestaña
    let tituloOriginal = document.title;
    let isTabActive = true;
    
    window.addEventListener('blur', () => {
        isTabActive = false;
        document.title = "Aún no terminamos...";
    });
    
    window.addEventListener('focus', () => {
        isTabActive = true;
        document.title = tituloOriginal;
    });
    
    // Navegación fija al hacer scroll
    const nav = document.querySelector('.nav-principal');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de contadores estadísticos
    const contadores = document.querySelectorAll('.numero');
    let ejecutado = false;
    
    function animarContadores() {
        if (ejecutado) return;
        
        const posicionScroll = window.scrollY;
        const seccionNosotros = document.getElementById('nosotros');
        
        if (seccionNosotros && posicionScroll >= seccionNosotros.offsetTop - 500) {
            ejecutado = true;
            
            contadores.forEach(contador => {
                const valorFinal = parseInt(contador.getAttribute('data-count'));
                let valorActual = 0;
                const duracion = 2000; // 2 segundos
                const incremento = valorFinal / (duracion / 16); // 60fps
                
                const timer = setInterval(() => {
                    valorActual += incremento;
                    
                    if (valorActual >= valorFinal) {
                        contador.textContent = valorFinal;
                        clearInterval(timer);
                    } else {
                        contador.textContent = Math.floor(valorActual);
                    }
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animarContadores);
    
    // Slider de testimonios
    const testimonios = document.querySelectorAll('.testimonio');
    const controles = document.querySelectorAll('.control-slider');
    let testimonioActivo = 0;
    
    function mostrarTestimonio(index) {
        testimonios.forEach(testimonio => testimonio.classList.remove('activo'));
        controles.forEach(control => control.classList.remove('activo'));
        
        testimonios[index].classList.add('activo');
        controles[index].classList.add('activo');
        testimonioActivo = index;
    }
    
    controles.forEach((control, index) => {
        control.addEventListener('click', () => {
            mostrarTestimonio(index);
        });
    });
    
    // Cambio automático de testimonios
    setInterval(() => {
        testimonioActivo = (testimonioActivo + 1) % testimonios.length;
        mostrarTestimonio(testimonioActivo);
    }, 5000);
    
    // Efectos 3D con el cursor
    const tarjetas3D = document.querySelectorAll('.tarjeta-3d, .tarjeta-abogado, .servicio');
    
    tarjetas3D.forEach(tarjeta => {
        tarjeta.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Cursor personalizado
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    document.addEventListener('mousemove', function(e) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });
    
    // Efectos de hover en enlaces y botones
    const elementosInteractivos = document.querySelectorAll('a, button, .servicio, .abogado');
    
    elementosInteractivos.forEach(elemento => {
        elemento.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderWidth = '1px';
        });
        
        elemento.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderWidth = '2px';
        });
    });
    
    // Animación de elementos al hacer scroll
    const elementosAnimables = document.querySelectorAll('h2, h3, p, .servicio, .abogado, .estadistica');
    
    function animarAlScroll() {
        elementosAnimables.forEach(elemento => {
            const posicion = elemento.getBoundingClientRect().top;
            const pantalla = window.innerHeight / 1.3;
            
            if (posicion < pantalla) {
                elemento.style.opacity = 1;
                elemento.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar opacidad para animación
    elementosAnimables.forEach(elemento => {
        elemento.style.opacity = 0;
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animarAlScroll);
    // Ejecutar una vez al cargar
    animarAlScroll();
    
    // Efecto de escritura para el eslogan
    const eslogan = document.querySelector('.eslogan');
    if (eslogan) {
        const textoOriginal = eslogan.textContent;
        eslogan.textContent = '';
        
        let i = 0;
        const velocidad = 50; // ms por carácter
        
        function typeWriter() {
            if (i < textoOriginal.length) {
                eslogan.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(typeWriter, velocidad);
            }
        }
        
        // Iniciar después de que desaparezca la entrada épica
        setTimeout(typeWriter, 3500);
    }
    
    // Preload de imágenes (simulado con SVG embebidos, no se necesita preload real)
    console.log("Todos los recursos SVG están embebidos en el documento.");
});