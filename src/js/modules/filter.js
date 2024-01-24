const filter = (menuSelector, wrapperSelector, absoluteSelector) => {
    
    let selectorClass;
    const menu = document.querySelector(menuSelector),
        wrapper = document.querySelector(wrapperSelector),
        noItem = document.querySelector(absoluteSelector);

    function changeClass(e, action = false) {
        let classes = ['active', 'animated', 'fadeIn'];
        (action === 'remove') ? e.classList.remove(...classes) : e.classList.add(...classes);
    }

    function showPortfolio(selector) {
        (wrapper.querySelector(`.${selector}`)) ? changeClass(noItem, 'remove') : changeClass(noItem);

        wrapper.querySelectorAll('div').forEach(item => {
            changeClass(item, 'remove');

            if (item.classList.contains(selector)) {
                changeClass(item);
            }
        });
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target && target.tagName == 'LI') {
            target.parentNode.querySelectorAll('li').forEach(btn => changeClass(btn, 'remove'));
            selectorClass = target.className;

            target.classList.add('active');
            showPortfolio(selectorClass);
        }
    });

    menu.querySelectorAll('li')[0]?.click();

}

export default filter;