const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(e) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '').replace(/^8/, "7").replace(/^9/, "79");

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (!e.target.hasAttribute('inputmode')) {
            e.target.setAttribute('inputmode', 'numeric');
        }

        if (e.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            } else {
                checkNumberPhone(this);
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    function checkNumberPhone(e) {
        if (e.value.replace(/\D/g, '').length !== 11) {
            console.log('Номер введен не полностью');
        } else {
            console.log('Номер введен корректно');
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        input.addEventListener('click', createMask);
    });

};

export default mask;