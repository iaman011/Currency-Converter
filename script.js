// const base_url="https://2024-03-06.currency-api.pages.dev/v1/currencies.json";

// const dropdowns = document.querySelectorAll(".dropdown select");  //. is used to select class dropdown and select is tag
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");   //to store the finalamount


// // for(let code in countryList){
// //     console.log(code, countryList[code]);
// // }

// //to appear a dropdown list of all currcodw

// for(let select of dropdowns){
//     for(currcode in countryList){
//         let newoption=document.createElement("option");
//         newoption.innerText= currcode;
//         newoption.value=currcode;
       
//         // assign usd and inr  by default in FROM and TO
//     if(select.name === "from" && currcode ==="USD"){
//         newoption.selected="selected";
//     }else if(select.name === "to" && currcode ==="INR"){
//         newoption.selected="selected";
//     }

//     select.append(newoption);
//     }

//     // to change the img of flag while selecting the currcode

//     select.addEventListener("change",(evt) => {
//         updateflag(evt.target);
//     });
//     }

//     const updateflag = (element) => {
//         let currcode=element.value;
//         let countrycode=countryList[currcode];
//         let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
//         let img= element.parentElement.querySelector("img");
//         img.src=newsrc;

//     }

//     // input value
//     btn.addEventListener("click" , async (evt) => {
//         evt.preventDefault(); //means we forcefully stop all the work that is done automatically now we assign work to perform
//         let amount = document.querySelector(".amount input");
//         let amtval = amount.value;
//         console.log(amtval);
//         if (amtval === "" || amtval < 1){
//             amtval=0;
//             amount.value="0";
//         }
  

//     //fetching API

//     const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  //API do not deal in capital letters
//     let respone = await fetch(url);
//     let data = await respone.json();
//     let rate = data[toCurr.value.toLowerCase()];
//     let finalamount = amtval * rate;
//     msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;  //1 USD = 86.25 INR

// });



const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



