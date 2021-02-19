MicroModal.init();

//выезжающая карта
document.querySelectorAll('.blog-item').forEach(elem=> mouseenter(elem))
function mouseenter(elem) {
    elem.addEventListener('mouseover', ()=> {
        elem.lastChild.classList.add('card-up')
    })
}
document.querySelectorAll('.blog-item').forEach(elem=> mouseleave(elem))
function mouseleave(elem) {
    elem.addEventListener('mouseleave', () => {
        elem.lastChild.classList.remove('card-up')
    })
}

//Прверяем local state theme
let stateTheme = localStorage.getItem('theme');
if(!stateTheme) {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
} else if(stateTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
} else if (stateTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

//изменение темы
document.querySelector('i[name=theme]').addEventListener('click', subscriber)
document.querySelector('i[name=theme1]').addEventListener('click', subscriber)

function subscriber () {
        if(localStorage.getItem('theme') === 'light') {
            trans()
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else if (localStorage.getItem('theme') === 'dark') {
            trans()
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

//menu burger
let menuBurgerActivity = false;
let menuBurger = document.querySelector('.menu');
menuBurger.addEventListener('click', clickerMenu);
function clickerMenu() {
    if(menuBurgerActivity === false) {
        menuBurgerActivity = true;
    } else {
        menuBurgerActivity = false;
    }
    console.log(menuBurgerActivity)
    if(menuBurgerActivity===true) {
        menuBurger.classList.toggle('active')
        document.querySelector('.menu-burger').classList.add('activeMenuList')
        document.body.style.overflow='hidden'
    } else {
        menuBurger.classList.toggle('active')
        document.querySelector('.menu-burger').classList.remove('activeMenuList')
        document.body.style.overflow='scroll'
    }
}
document.querySelectorAll('.menu-burger__item').forEach(i=> i.addEventListener('click', clear))

//убрать меню при нажатии на ссылку
function clear () {
    menuBurger.classList.remove('active')
    document.querySelector('.menu-burger').classList.remove('activeMenuList')
    document.body.style.overflow='scroll'
    menuBurgerActivity = false;
}
