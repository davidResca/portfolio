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

const btn = document.querySelector('#contact-form button[type="submit"]');
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
   event.preventDefault();

   const trap = document.getElementById('honeypot_field');
   if (trap.value !== "") {
       console.log("Bot detectado. Envío cancelado.");
       return;
   }

   const lastEmailTime = localStorage.getItem('lastEmailTime');
   const now = Date.now();
   

   if (lastEmailTime && (now - lastEmailTime) < 60000) {
       alert('Por favor espera un minuto antes de enviar otro mensaje.');
       return;
   }



   const textoOriginal = btn.textContent;
   btn.textContent = 'Enviando...';
   btn.disabled = true; 

   const serviceID = 'service_9o15rcr'; 
   const templateID = 'template_x9c6q1r';

   const params = {
       name: this.name.value,
       email: this.email.value,
       message: this.message.value
   };

   emailjs.send(serviceID, templateID, params)
    .then(() => {
       btn.textContent = 'Enviado';
       alert('¡Mensaje enviado correctamente!');
       form.reset();
       
       // Guardamos la hora del envío
       localStorage.setItem('lastEmailTime', Date.now());

       setTimeout(() => {
           btn.textContent = textoOriginal;
           btn.disabled = false;
       }, 2000);
    }, (err) => {
       btn.textContent = textoOriginal;
       btn.disabled = false;
       alert('Ocurrió un error. Intenta nuevamente.');
       console.error(err);
    });
});