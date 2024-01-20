import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStylesFirst from "./modules/showMoreStylesFirst";
import showMoreStylesSecond from "./modules/showMoreStylesSecond";
import calc from "./modules/calc";

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');

    // Простая подгрузка элементов (1 вариант)
    // showMoreStylesFirst('.button-styles', '.styles-2');

    // Подгрузка элементов через сервер, точнее db.json (2 вариант)
    showMoreStylesSecond('.button-styles', '.styles-2', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price');

});