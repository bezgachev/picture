const showMoreStylesFirst = (trigger, styles) => {
    const cards = document.querySelectorAll(styles),
          btn = document.querySelector(trigger);

    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });

        // В данном случае предпочтительнее не удалять кнопку, а скрывать стилями, чтобы следующая секция блока по дизайну не схлопывалась, т.к. margin отступы имеются у кнопки, иначе дизайн стиль отступов между секциями будет нарушен.
        // btn.remove();

        btn.style.cssText = `
            opacity: 0;
            pointer-events: none;
        `;
    });

};

export default showMoreStylesFirst;