const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
    let activePanel;

    btns.forEach(btn => {
        btn.addEventListener('click', function() {

            this.classList.add('active');
            this.nextElementSibling.classList.add('active-content');

            if (activePanel) {
                activePanel.classList.remove('active');
                activePanel.nextElementSibling.classList.remove('active-content');
            }

            activePanel = (activePanel === this) ? 0 : this;
        });
    });

    btns[0]?.click();

};

export default accordion;