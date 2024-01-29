const scrolling = (upSelector) => {
    const element = document.documentElement,
          body = document.body,
          upElem = document.querySelector(upSelector);
    let links = document.querySelectorAll('[href^="#"]');

    window.addEventListener('scroll', () => {
        let scrollTop = Math.round(element.scrollTop || body.scrollTop);
        if (scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let hash = this.hash;
            if (hash == '') return;

            doScrolling(this, hash);
        });
    });

    // Считаю, что свое решение лучше, т.к. имеет реальный плавный скролл к якорным объектам.
    // Если использовать решение от автора, то в зависимости от длины скролла, с учетом фикс.скорости,
    // скролл в некоторых местах будет медленным, где-то очень быстрым, что не есть очень красиво.
    // Улучшил оптимизацию по плавному скроллу.

    // В будущем можно экспортировать функцию doScrolling отдельным модулем для того, чтобы можно было управлять скроллом, вызывая ее
    // по другим событиям, где это необходимо, к примеру, для пагинации в каталоге интернет-магазина или в корзине/оформления заказа.
    // Также можно доработать, чтобы при скролле к элементу, имелись некоторые отступы, чтобы видимая часть экрана клиента не прилипала близко к якорной ссылке.

    function doScrolling(event, elementSelector, statelocation = false, duration = false) {
        let startingY = window.scrollY,
            elementS = document.querySelector(elementSelector),
            elementY = startingY + elementS.getBoundingClientRect().top,
            scrollHeight = Math.round(element.scrollHeight || body.scrollHeight),
            targetY = scrollHeight - elementY < window.innerHeight ? scrollHeight - window.innerHeight : elementY,
            difference = targetY - startingY,
            start = null;

        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        let easing = (t) => { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 };

        if (!difference) return;

        requestAnimationFrame(step);

        function step(time) {
            if (!duration) duration = 1500;
            if (start === null) start = time;
            let progress = time - start,
                percent = easing(Math.min(progress / duration, 1)),
                scrollPx = startingY + difference * percent;

            window.scrollTo(0, scrollPx);

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                if (statelocation && !event.hasAttribute('data-no-hash')) {
                    location.hash = elementSelector;
                }
            }
        }

    };

    // Ниже представлены скрипты от автора курса

    // Прокрутка с помощью requestAnimationFrame
    /*
    let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
    */

    // Чистая js прокрутка 
    /*
    const element = document.documentElement,
          body = document.body;

    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (this.hash !== '') {
                event.preventDefault();
                let hashElement = document.querySelector(this.hash),
                    hashElementTop = 0;

                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                }

                hashElementTop = Math.round(hashElementTop);
                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        
        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    calcScroll();
    */

};

export default scrolling;