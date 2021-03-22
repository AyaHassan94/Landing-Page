//global variables
const nav = document.querySelector('#navbar__list');
const nav2 = document.querySelectorAll('section');
var navTexts = document.getElementsByTagName('li')
// BuildNav function to build the navbar
function buildNav() {
    const fragment = document.createDocumentFragment();

    nav2.forEach((navSection) => {
        const LI = document.createElement('li');
        LI.setAttribute('class', 'link');
        const ahref = document.createElement('a');
        ahref.innerText = navSection.getAttribute('data-nav');
        ahref.setAttribute('class', 'menu__link');
        ahref.addEventListener("click", () => {
            navSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        });
        LI.appendChild(ahref);
        fragment.appendChild(LI);
    });
    nav.appendChild(fragment);
};
// function to hover the sections at navbar and adding bubbles to the selected section
function toggleActiveState() {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target.dataset.nav);

                observer.unobserve(entry.target);
                for (section of nav2) {
                    section.classList.remove('your-active-class');
                    if (entry.target.id == section.id) {
                        section.classList.add('your-active-class')
                    }

                }
                for (navText of navTexts) {
                    navText.children[0].classList.remove('item-active-class');
                    console.log(navText.children[0].textContent)
                    if (entry.target.dataset.nav == navText.children[0].textContent) {
                        navText.children[0].classList.add('item-active-class');
                    }

                }
            }
        });
    }, { rootMargin: "0px 0px -200px 0px", threshold: 0.7, });
    for (section of nav2)
        observer.observe(section)

}
// calling the function
window.addEventListener('scroll', toggleActiveState);

buildNav();
