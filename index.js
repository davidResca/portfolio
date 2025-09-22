const burger = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector(".nav-bar");

const toggleNavMenu = () => {
  if (navMenu.classList.contains('nav-open')) {
    navMenu.classList.remove('nav-open');
    navMenu.classList.add('nav-closed');
  } else {
    navMenu.classList.add('nav-open');
    navMenu.classList.remove('nav-closed');
  }
};

burger.addEventListener('click', toggleNavMenu);

// Cerrar al hacer click fuera
document.addEventListener('click', (e) => {
  const isClickInsideNav = navbar.contains(e.target) || navMenu.contains(e.target);
  const isBurgerClick = burger.contains(e.target);

  if (navMenu.classList.contains('nav-open') && !isClickInsideNav && !isBurgerClick) {
    navMenu.classList.remove('nav-open');
    navMenu.classList.add('nav-closed');
  }
});

const form = document.getElementById('contact-form');
const statusMsg = document.getElementById('status');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = form.name;
    const email = form.email;
    const message = form.message;

    let isValid = true;

    // Reset clases
    [name, email, message].forEach(field => {
        field.classList.remove('invalid', 'valid');
    });

    // Validaciones
    if (!/^[a-zA-Z\s]{2,}$/.test(name.value.trim())) {
        name.classList.add('invalid');
        isValid = false;
    } else {
        name.classList.add('valid');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('invalid');
        isValid = false;
    } else {
        email.classList.add('valid');
    }

    if (message.value.trim().length < 10 || message.value.trim().length > 500) {
        message.classList.add('invalid');
        isValid = false;
    } else {
        message.classList.add('valid');
    }

    if (!isValid) {
        statusMsg.innerText = "Por favor corrige los campos resaltados.";
        return;
    }

    // Enviar si todo está correcto
    emailjs.sendForm('service_7na1op7', 'template_79j5pgk', this)
        .then(() => {
            statusMsg.innerText = "Correo enviado ✅";
            form.reset();
            [name, email, message].forEach(field => field.classList.remove('valid'));
        }, (error) => {
            statusMsg.innerText = "Error al enviar ❌";
            console.error(error);
        });
});
