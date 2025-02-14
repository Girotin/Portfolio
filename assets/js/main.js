// O código abaixo é referente ao index.html e ao styles.css do Portfolio
// Cada trecho foi separado em seções/módulos para melhor organização.
// Criador original: Bedimmcode
// Alterações e comentários em português: Girotin

/**------------------------------------------------------------------------
 * ?                 Botão de Exibir o Menu (Mobile)
 * 
 * Sistema simples que exibe e remove o menu de IDs do modo mobile
*------------------------------------------------------------------------**/

const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/**------------------------------------------------------------------------
 * ?                  Removedor automático do Menu (Mobile)
 * 
 * Sistema que recolhe o menu de IDs no modo mobile ao selecionar algum deles
 * (Início, Sobre, etc)
 *------------------------------------------------------------------------**/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/**------------------------------------------------------------------------
 * ?           Sistema de animação das IDs no topo (Desktop)
 * 
 * Necessário para a exibição correta da animação do tópico selecionado no 
 * momento (Início, Sobre, etc)
 *------------------------------------------------------------------------**/

const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/**------------------------------------------------------------------------
 * ?          Animação de revelar os elementos ao scrollar a tela
 * 
 * Sistema de exibição em fade-in dos elementos da página
 *------------------------------------------------------------------------**/

const sr = ScrollReveal({   // Aqui você pode manipular animação, duração, delay, escala da animç, e outros 
    origin: 'top',
    distance: '60px',
    duration: 1250,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .about__img, .about__img2, .about__img3, .textoContato, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/**------------------------------------------------------------------------
 * ?                       Sistema de Modo Dark/Light
 * ! (Tem erro em algum lugar por aqui)
 * Botão e sistema do modo Escuro
 *------------------------------------------------------------------------**/

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const toggleDarkMode = () => {

    document.body.classList.toggle("dark-mode");            // Liga/Desliga o modo escuro
    
    if (document.body.classList.contains("dark-mode")) {    // Salva no localStorage a preferência do tema //! (Não está funcionando)
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

/**------------------------------------------------------------------------
 * ?  Carregar a preferência de tema Claro/Escuro quando a página carregar
 * !  NÃO ESTÁ FUNCIONANDO!!!!
 * 
 * Precisa de revisão, deveria guardar localmente a preferência do usuário
 *------------------------------------------------------------------------**/

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");   // Armazena o tema do usuário
    
    if (savedTheme) {
      document.body.classList.add(savedTheme);          // Aciona o tema salvo (dark ou light)
    }
  });

/**------------------------------------------------------------------------
 * ?     Sistema de alteração da logo SVG fixa nos modos Dark/Light
 * 
 * Usa inserção de HTML dinâmica pelo bem da sanidade mental do dev
 * e manutenção do index.html 
 * (Aparententmente a animação SVG usada não é compativel com sistemas APPLE)
 *------------------------------------------------------------------------**/

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("theme-toggle");

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
      }

    button.addEventListener("click", function () {
        // Alternar o tema
        const body = document.body;
        body.classList.toggle("dark-mode"); // Troca o tema
        document.body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains("dark-mode");

        // Alterar a logo com base no tema
        const logo = document.getElementById("logo");
        if (logo) {
            if ((isDarkMode) == false) {
                logo.outerHTML = `
                    <svg id="logo" class="nav__logo" viewBox="0 0 100 22">
                        <defs>
                            <linearGradient id="gradient-dark">
                                <stop offset="0%" stop-color="#000" />
                                <stop offset="100%" stop-color="#444" />
                            </linearGradient>
                            <pattern id="wave-dark" x="0" y="1" width="100%" height="100%" patternUnits="userSpaceOnUse">
                                <path id="wavePath-dark" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" 
                                      mask="url(#mask-dark)" fill="url(#gradient-dark)">
                                    <animateTransform
                                        attributeName="transform"
                                        begin="0s"
                                        dur="1.5s"
                                        type="translate"
                                        from="0,0"
                                        to="40,0"
                                        repeatCount="indefinite" />
                                </path>
                            </pattern>
                        </defs>
                        <text text-anchor="middle" x="13" y="15" font-size="10" fill="white" fill-opacity="0.1">Giroto</text>
                        <text text-anchor="middle" x="13" y="15" font-size="10" fill="url(#wave-dark)" fill-opacity="1">Giroto</text>
                    </svg>`;
            } else {
                logo.outerHTML = `
                    <svg id="logo" class="nav__logo" viewBox="0 0 100 22">
                        <defs>
                            <linearGradient id="gradient-light">
                                <stop offset="0%" stop-color="#fff" />
                                <stop offset="100%" stop-color="#ccc" />
                            </linearGradient>
                            <pattern id="wave-light" x="0" y="1" width="100%" height="100%" patternUnits="userSpaceOnUse">
                                <path id="wavePath-light" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" 
                                      mask="url(#mask-light)" fill="url(#gradient-light)">
                                    <animateTransform
                                        attributeName="transform"
                                        begin="0s"
                                        dur="1.5s"
                                        type="translate"
                                        from="0,0"
                                        to="40,0"
                                        repeatCount="indefinite" />
                                </path>
                            </pattern>
                        </defs>
                        <text text-anchor="middle" x="13" y="15" font-size="10" fill="black" fill-opacity="0.1">Giroto</text>
                        <text text-anchor="middle" x="13" y="15" font-size="10" fill="url(#wave-light)" fill-opacity="1">Giroto</text>
                    </svg>`;
            }
        }
    });
});