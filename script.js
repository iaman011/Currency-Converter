const base_url="https://latest.currency-api.pages.dev/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");  //. is used to select class dropdown and select is tag
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");   //to store the finalamount


// for(let code in countryList){
//     console.log(code, countryList[code]);
// }

//to appear a dropdown list of all currcode

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText= currcode;
        newoption.value=currcode;
       
        // assign usd and inr  by default in FROM and TO
    if(select.name === "from" && currcode ==="USD"){
        newoption.selected="selected";
    }else if(select.name === "to" && currcode ==="INR"){
        newoption.selected="selected";
    }

    select.append(newoption);
    }

    // to change the img of flag while selecting the currcode

    select.addEventListener("change",(evt) => {
        updateflag(evt.target);
    });
    }

    const updateflag = (element) => {
        let currcode=element.value;
        let countrycode=countryList[currcode];
        let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
        let img= element.parentElement.querySelector("img");
        img.src=newsrc;

    }

    // input value
    btn.addEventListener("click" , async (evt) => {
        evt.preventDefault(); //means we forcefully stop all the work that is done automatically now we assign work to perform
        let amount = document.querySelector(".amount input");
        let amtval = parseFloat(amount.value);
        // console.log(amtval);
     

        if (isNaN(amtval) || amtval <= 0) {
          amtval = 1;
          amount.value = "1";
      }
  

    //fetching API

    
   try{
    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;

    let respone = await fetch(url);
    let data = await respone.json();
   
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;  

   }catch (error) {
    console.error("Error:", error.message);
    msg.innerText = "Error fetching exchange rate.";
}
});

