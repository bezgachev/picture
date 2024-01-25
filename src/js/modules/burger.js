// Пришлось конкретно подстроиться под верстку и ТЗ, чтобы модуль адекватно работал.
const burger = (menuSelector, burgerSelector) => {
    const menu = document.querySelector(menuSelector),
          burgerEl = document.querySelector(burgerSelector);

    const show = () => menu.style.display = 'block';
    const hide = () => menu.style.display = 'none';
    const changeStateMenu = (e) => {
        let action = e.type;
        if ((action === 'click' && window.screen.availWidth < 993) || (action === 'mouseover')) {
            (menu.style.display == 'none') ? show() : hide();
        }
        else if ((action === 'resize' && window.screen.availWidth > 992) || (action === 'mouseout') ) {
            hide();
        }
    }

    burgerEl.addEventListener('click', changeStateMenu);
    burgerEl.parentNode.addEventListener('mouseover', changeStateMenu);
    burgerEl.parentNode.addEventListener('mouseout', changeStateMenu);
    window.addEventListener('resize', changeStateMenu);

    hide();
};

export default burger;