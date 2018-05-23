import { resolve, sep } from 'path';

$(document).ready(function(){

function option(num, text){
 return `
    <span class="loo-calc__value">X${num}</span> ${text}
 `
}

const benchmarks = [
    {
        value: 150,
        response: {
            firstOption: option(1, 'Luxury 2plus1')
        }
    },
    {
        value: 300,
        response: {
            firstOption: option(1, 'Luxury 3plus1')
        }
    },
    {
        value: 400,
        response: {
            firstOption: option(1, 'Luxury 8 Bay')
        }
    },
    {
        value: 500,
        response: {
            firstOption: option(1, 'Luxury 4plus2')
        }
    },
    {
        value: 600,
        response: {
            firstOption: option(1, 'Luxury 4plus2'),
            secondOption: option(1, 'Luxury 3plus1')
        }
    },
    {
        value: 750,
        response: {
            firstOption: option(2, 'Luxury 4plus2')
        }
    },
    {
        value: 900,
        response: {
            firstOption: option(2, 'Luxury 4plus2'),
            secondOption: option(1, 'Luxury 3plus1')
        }
    },
    {
        value: 1150,
        response: {
            firstOption: option(3, 'Luxury 4plus2')
        }
    },
    {
        value: 1200,
        response: {
            firstOption: option(3, 'Luxury 4plus2')
        }
    },
    {
        value: 1500,
        response: {
            firstOption: option(4, 'Luxury 4plus2')
        }
    },
    {
        value: 2000,
        response: {
            firstOption: `Please contact us with your requirements`
        }
    }
];

// Variables
const nav = document.querySelector('.wsite-menu-default');
const mobileNav = document.querySelector('#navMobile .wsite-menu-default')
const anchor = document.querySelector('[data-js-calc="anchor"]');
const mobAnchor = document.querySelector('[data-js-calc="mobAnchor"]');
const calc = document.querySelector('[data-js-calc="calc"]');
const wrapper = document.querySelector('[data-js-calc="wrapper"]');
const close = document.querySelector('[data-js-calc="close"]');
const generate = document.querySelector('[data-js-calc="generate"]');
const recalculate = document.querySelector('[data-js-calc="recalculate"]');
const quote = document.querySelector('[data-js-calc="quoteBtn"]');
const duration = document.querySelector('[data-js-calc="duration"]');
const guests = document.querySelector('[data-js-calc="guests"]');
const firstOption = document.querySelector('[data-js-calc="firstOption"]');
const secondOption = document.querySelector('[data-js-calc="secondOption"]');
const seperator = document.querySelector('[data-js-calc="seperator"]');
const guestForm = document.querySelector('[data-js-calc="guestForm"]');
const durationForm = document.querySelector('[data-js-calc="durationForm"]');

let index = 1;
// Functions

function init() {
    nav.appendChild(anchor);
    mobileNav.appendChild(mobAnchor);
    addEventListeners();
    checkHeight();
    
}

function addEventListeners() {
	generate.addEventListener('click', generateQuote);
	anchor.addEventListener('click', toggleCalc);
    mobAnchor.addEventListener('click', toggleCalc);
    recalculate.addEventListener('click', toggleActiveClass);
    quote.addEventListener('click', getQuote);
    close.addEventListener('click', toggleCalc);
}

function toggleActiveClass(e) {
    if (wrapper.classList.contains('active')) {
        wrapper.classList.remove('active');
        index = index - 1;
        firstOption.innerHTML = '';
        secondOption.innerHTML = '';
        seperator.classList.add('hide');
    } else {
        wrapper.classList.add('active');
        index = index + 1;
    }
}

function generateQuote() {
    if (checkEntryFields()) {
        if (checkDuration()) {
            firstOption.innerHTML = 'PLEASE CONTACT US WITH YOUR REQUIREMENTS.';
            toggleActiveClass();
            checkHeight();
        } else {
            const response = getResponse();
            renderResponse(response);
            toggleActiveClass();
            checkHeight();
        }
    }
}

function renderResponse(response) {
    Object.keys(response).forEach((key, i) => {
        
        i === 1 ? seperator.classList.remove('hide') : seperator.classList.add('hide');
        
        document.querySelector(`[data-js-calc="${key}"]`).innerHTML = `${
            response[key]
        }`;
    });
}

function getResponse() {
    const totalGuests = parseInt(guests.value);

    let mark = benchmarks.find((el, i) => {
        if (totalGuests < el.value) {
            return el;
        }
    });

    return mark.response;
}

function checkDuration() {
    if (duration.value > 12) {
        return true;
    }
    return false;
}

function checkEntryFields(params) {
    if (guests.value === '') {
        duration.parentElement.classList.remove('error');
        guests.parentElement.classList.add('error');
        return false;
    } else if (duration.value === '') {
        guests.parentElement.classList.remove('error');
        duration.parentElement.classList.add('error');
        return false;
    }
    guests.parentElement.classList.remove('error');
    duration.parentElement.classList.remove('error');
    return true;
}

function getQuote() {
    if (wrapper.classList.contains('quote')) {
        wrapper.classList.remove('quote');
        index = index - 1;
    } else {
        wrapper.classList.add('quote');
        index = index + 1;
    }
    addValuesToForm();
    checkHeight();
}

function addValuesToForm() {
    guestForm.value = guests.value;
    durationForm.value = duration.value;
    return;
}

function toggleCalc() {
    calc.classList.toggle('hide');
    document.body.classList.toggle('hidden');
}

function checkHeight() {
    const currentSlide = document.querySelector(`[data-js-calc="${index}"]`);
    const height = currentSlide.scrollHeight + 200;
    const windowHeight = window.innerHeight;
    if (height > windowHeight) {
        calc.classList.add('scroll');
    } else {
        calc.classList.remove('scroll');
    }
}

if (calc) {
    setTimeout(() => {
        // Timeout for toilet to load
        init();
    }, 1000);
}

});