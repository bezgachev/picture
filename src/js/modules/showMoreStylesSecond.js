import {getResourse} from '../services/requests';

const showMoreStylesSecond = (trigger, styles, wrapper) => {
    const cards = document.querySelectorAll(styles),
          btn = document.querySelector(trigger);

    cards.forEach(card => {
        card.remove();
    });

    btn.addEventListener('click', function() {
        getResourse('data/db.json')
            .then(res => {
                createCards(res.styles);
                this.style.cssText = `
                    opacity: 0;
                    pointer-events: none;
                `;
            })
            .catch(error => {
                console.log(error);
                this.textContent = 'Не получилось загрузить. Попробуйте снова';
                setTimeout(() => {
                    this.textContent = 'Посмотреть больше стилей';
                }, 5000);
            })
            .finally();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class="styles-block">
                    <img src="${src}" alt="style">
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);

        });
    }

};

export default showMoreStylesSecond;