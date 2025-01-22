const base_url="https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select")  //. is used to select class dropdown and select is tag


// for(let code in countryList){
//     console.log(code, countryList[code]);
// }


for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText= currcode;
        newoption.value=currcode;
       
    if(select.name === "from" && currcode ==="USD"){
        newoption.selected="selected";
    }else if(select.name === "to" && currcode ==="INR"){
        newoption.selected="selected";
    }

    select.append(newoption);
}
}