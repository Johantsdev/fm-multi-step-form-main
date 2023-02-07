const navSteps = [...document.querySelectorAll('.nav-step div')];
const sections = [...document.querySelectorAll('section')];
const nextButton = document.querySelector('.next-button');
const backButton = document.querySelector('.back-button');
const footer = document.querySelector('footer');

let currentPage = 0;

function handleNextAndBackButtonVisibility(currentPage) {
    if (currentPage === 0) {
        backButton.style.visibility = 'hidden';
    } else {
        backButton.style.visibility = 'visible';
    }
    if (currentPage === 3) {
        nextButton.textContent = "Confirm";
    }
};

function handleCurrentPageDisplay(currentPage) {
    sections.map(section => {
        section.style.display = 'none';
    })
    sections[currentPage].style.display = 'flex';

    navSteps.map(navStep => {
        navStep.classList.remove('current-step');
    })
    if (currentPage !== 4) {
        navSteps[currentPage].classList.add('current-step');
    } else {
        navSteps[3].classList.add('current-step');
        footer.style.display = 'none'; 
    }
    handleNextAndBackButtonVisibility(currentPage);
};


nextButton.addEventListener('click', () => {
    switch (true) {

        case currentPage === 0 :
            let [lock, errors] = [...handleStep1()];
            inputs.map(input => input.classList.remove('required'));
            inputsFieldRequired.map(input => input.style.display = 'none');
            if (lock) {
                currentPage++;
                console.log(personalInfo); 
            } else {
                for (const error of errors) {
                    switch (error) {
                        case 0 :
                            inputs[0].classList.add('required');
                            inputsFieldRequired[0].style.display = 'inline';                           
                            break;
                        case 1 :
                            inputs[1].classList.add('required');
                            inputsFieldRequired[1].style.display = 'inline';                           
                            break;
                        case 2 : 
                            inputs[2].classList.add('required');
                            inputsFieldRequired[2].style.display = 'inline';                           
                            break;
                    }
                }
            }
            break;

        case currentPage === 1 :
            handleStep2();
            currentPage++; 
            break;

        case currentPage === 2 : 
            handleStep3();
            displayStep4Content();
            currentPage++;
            break;

        case currentPage === 3 :
            currentPage++;
            break;
    }

    handleCurrentPageDisplay(currentPage);
});

backButton.addEventListener('click', () => {
    if (currentPage === 0) {
        return;
    }
    currentPage--;
    handleCurrentPageDisplay(currentPage);
});

//Handle first step
const inputs = [...document.querySelectorAll('input')];
const inputsFieldRequired = [...document.querySelectorAll('.step-1 .flex-space-between p')];
const regexName = /^[a-z ,.'-]+$/i;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPhoneNumber =/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;
const personalInfo = {};

function handleStep1() {
    let lock = 0;
    let error = [];

    inputs.map((input, index) => {
        switch (index) {
            case 0 : 
                let condition0 = regexName.test(input.value) === true; 
                if (condition0) {
                    lock++;
                    personalInfo.name = input.value;
                } else {
                    error.push(index);
                }
                break;
            case 1 : 
                let condition1 = regexEmail.test(input.value) === true; 
                if (condition1) {
                    lock++;
                    personalInfo.email = input.value;
                } else {
                    error.push(index);
                }
                break;
            case 2 :
                let condition2 = regexPhoneNumber.test(input.value) === true; 
                if (condition2) {
                    lock++;
                    personalInfo.phoneNumber = input.value;
                } else {
                    error.push(index);
                }
                break;
        }
    })
    
    return [lock === 3, error];
};


//Handle second step
const toggleRecurrenceButton = document.querySelector('.toggle-recurrence-btn');
const monthlyplans = document.querySelector('.monthly-plans');
const yearlyplans = document.querySelector('.yearly-plans');

toggleRecurrenceButton.addEventListener('click', () => {

    monthlyplans.classList.toggle('toggled');
    yearlyplans.classList.toggle('toggled');

    if (monthlyplans.classList.contains('toggled')) {
        toggleRecurrenceButton.style.justifyContent = 'flex-start';
        displayMonthlyplans();
    } else {
        toggleRecurrenceButton.style.justifyContent = 'flex-end';
        displayYearlyplans();
    }
});

const changingContents = [...document.querySelectorAll('.changing-content')];

function displayMonthlyplans() {
    changingContents.map((changingContent, i) => {
        switch (i) {
            case 0:
                changingContent.innerHTML = `
                <p>$9/mo</p>
                `;
                break;
            case 1:
                changingContent.innerHTML = `
                <p>$12/mo</p>
                `;
                break;
            case 2:
                changingContent.innerHTML = `
                <p>$15/mo</p>
                `;
                break;
        }
    })
};
function displayYearlyplans() {
    changingContents.map((changingContent, i) => {
        switch (i) {
            case 0:
                changingContent.innerHTML = `
                <p>$90/yr</p>
                `;
                break;
            case 1:
                changingContent.innerHTML = `
                <p>$120/yr</p>
                `;
                break;
            case 2:
                changingContent.innerHTML = `
                <p>$150/yr</p>
                `;
                break;
        }
        changingContent.innerHTML += `
        <p class="discount">2 months free</p>
        `;
    })
};

const plans = [...document.querySelectorAll('.plan')];
plans.map((plan) => {
    plan.addEventListener('click', () => {
        plans.map((plan) => {
            plan.classList.remove('selected-plan');
        })
        plan.classList.add('selected-plan');
    })
});

const selectedPlan = {};

function handleStep2() {

    plans.map(plan => {
        if (plan.classList.contains('selected-plan')) {
            let data = plan.getAttribute('data-value').split('-');
            selectedPlan.title = data[0];
        
            if (monthlyplans.classList.contains('toggled')) {
                selectedPlan.price = Number(data[1]);
                selectedPlan.recurrence = 'Monthly';
            } else {
                selectedPlan.price = Number(data[1])*10;
                selectedPlan.recurrence = 'Yearly';
            }
            console.log(selectedPlan);
        }
    })

    displayStep3Content();
    
}


//Handle third step
const addOns = [...document.querySelectorAll('.add-on')];
const addOnsPrice = [...document.querySelectorAll('.add-on-price')];

function displayStep3Content() {
    if (selectedPlan.recurrence === 'Monthly') {
        addOnsPrice.map((price, index) => {
            price.textContent = index === 0 ? '+$1/mo' : '+$2/mo';
        })
    } else {
        addOnsPrice.map((price, index) => {
            price.textContent = index === 0 ? '+$10/yr' : '+$20/yr';
        })
    }
}

addOns.map((addOn) => {
    addOn.addEventListener('click', () => {
        addOn.classList.toggle('selected-add-on');
    })
})

const selectedAddOns = [];
function handleStep3() {
    selectedAddOns.length = 0;
    addOns.map((addOn) => {
        if (addOn.classList.contains('selected-add-on')) {
            let data = addOn.getAttribute('data-value').split('-');
            let price = selectedPlan.recurrence === 'Monthly' ? Number(data[1]) : Number(data[1])*10;
            selectedAddOns.push({
                title: data[0],
                price: price
            })
        }
    })
    console.log(selectedAddOns);
};

//Handle fourth step

const changePlanButton = document.getElementById('changePlan');
changePlanButton.addEventListener('click', () => {
    currentPage = 1;
    handleCurrentPageDisplay(currentPage);
});

function displayStep4Content() {
    let recurrenceIndicator = selectedPlan.recurrence === 'Monthly' ? ['mo', 'month'] : ['yr', 'year'];

    const h3 = document.querySelector('.summary-plan h3');
    h3.textContent = `${selectedPlan.title} (${selectedPlan.recurrence})`;

    const planPrice = document.querySelector('.plan-price');
    planPrice.textContent = `$${selectedPlan.price}/${recurrenceIndicator[0]}`;

    const summaryAddOns= document.querySelector('.summary-add-ons');
    summaryAddOns.innerHTML = `
    ${selectedAddOns.map(addOn => {
        return (
        `<div class="flex-space-between">
            <p class="add-on-title">${addOn.title}</p>
            <p class="add-on-price">+$${addOn.price}/${recurrenceIndicator[0]}</p>
        </div>  ` 
        )
      })}  
    `;


    const summaryTotal = document.querySelector('.summary-total');
    let totalPrice = selectedPlan.price;
    for (let addOn of selectedAddOns) {
        totalPrice += addOn.price;
    };
    summaryTotal.innerHTML = `
        <p>Total (per <span class="reccurence-indicator">${recurrenceIndicator[1]}</span>)</p>
        <p class="total-price">+$${totalPrice}/mo</p>
    `
}

