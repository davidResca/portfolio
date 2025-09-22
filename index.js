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



document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_7na1op7', 'template_79j5pgk', this)
        .then(() => {
            document.getElementById('status').innerText = "Correo enviado ✅";
            this.reset();
        }, (error) => {
            document.getElementById('status').innerText = "Error al enviar ❌";
            console.error(error);
        });
});