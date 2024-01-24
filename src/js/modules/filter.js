const filter = (menuSelector, wrapperSelector, absoluteSelector) => {
    
    let selectorClass;
    const menu = document.querySelector(menuSelector),
        wrapper = document.querySelector(wrapperSelector),
        noItem = document.querySelector(absoluteSelector);

    function changeClass(e, action = false) {
        (action === 'add') ? e.classList.add('active', 'animated', 'fadeIn') : e.classList.remove('active', 'animated', 'fadeIn');
    }

    function showPortfolio(selector) {
        (wrapper.querySelector(`.${selector}`)) ? changeClass(noItem) : changeClass(noItem, 'add');

        wrapper.querySelectorAll('div').forEach(item => {
            changeClass(item);

            if (item.classList.contains(selector)) {
                changeClass(item, 'add');
            }
        });
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target && target.tagName == 'LI') {
            target.parentNode.querySelectorAll('li').forEach(btn => changeClass(btn));
            selectorClass = target.className;

            target.classList.add('active');
            showPortfolio(selectorClass);
        }
    });

    menu.querySelectorAll('li')[0]?.click();

}

export default filter;