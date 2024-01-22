const calc = (size, material, options, promocode, result, calcState) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);
    let sum = 0;
    const calcFunc = (e) => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
        let target = e.target,
            resultText;

        if (e.type === 'change') {
            (+target.value)
                ? calcState[target.id] = `${target.options[target.selectedIndex].text}: ${target.value}`
                : delete calcState[target.id];
        }

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
            delete calcState['sum'];
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultText = `${Math.round(sum * 0.7)} ₽`;
            calcState['sum'] = `${resultText} cо скидкой`;
            resultBlock.textContent = resultText;
        } else {
            resultText = `${sum} ₽`;
            calcState['sum'] = resultText;
            resultBlock.textContent = resultText;
        }
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;