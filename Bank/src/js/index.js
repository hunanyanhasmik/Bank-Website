"use strict";

const currencyInput = document.querySelector("#currencyInp");
const currencyOutput = document.querySelector("#currencyOut");
const inpMoney = document.querySelector("#inp-money");
const outMoney = document.querySelector("#out-money");
const button = document.querySelector("#btn");

function calculate () {
    outMoney.addEventListener("input", (e)=> {
        const request = new XMLHttpRequest();
        const input = currencyInput.value;
        const output = currencyOutput.value;
        request.open("GET", "./db/data.json");
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.addEventListener("load", () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                inpMoney.value = ((parseFloat(e.target.value) / parseFloat(data.change[input]))*data.change[output]).toFixed(2);
            } else {
                console.log("Error 404 file is not found !!!");
            }
            if (isNaN(inpMoney.value)) {
                inpMoney.value = 0;
            }
        });
    });
    inpMoney.addEventListener("input", (e)=> {
            const request = new XMLHttpRequest();
            const input = currencyInput.value;
            const output = currencyOutput.value;
            request.open("GET", "./db/data.json");
            request.setRequestHeader("Content-Type", "application/json");
            request.send();
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    const data = JSON.parse(request.response);
                    outMoney.value = ((parseFloat(e.target.value) / parseFloat(data.change[output]))*data.change[input]).toFixed(2);
                } else {
                    console.log("Error 404 file is not found !!!");
                }
                if (isNaN(outMoney.value)) {
                    outMoney.value = 0;
                }
            });
        });
}

inpMoney.addEventListener('input', calculate);
outMoney.addEventListener('input', calculate);
button.addEventListener('click', () => {
    const temp = currencyInput.value;
    const tempN = inpMoney.value;
    currencyInput.value = currencyOutput.value;
    currencyOutput.value = temp;
    inpMoney.value = outputNumber.value;
    outMoney.value = tempN;
    calculate();
});


const slider = document.querySelector(".main-slider .slider-block");
const sliderItem = document.querySelectorAll(".main-slider .slider-block .slider-item");
const image = ["../img/slide2.jpg", "../img/slide1.jpg"];
let current = 0;

for (let i = 0; i < image.length; i++) {
    sliderItem[i].style.backgroundImage = `url(${image[i]})`;
}
let set = setInterval(() => {
    current -= 100;
    current == -(image.length + '00') ? current = 0 : '';
    slider.style.left = current + '%';
}, 6000);