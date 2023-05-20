let currencyAPIKey = "BXEh8fPVQeAN2jijFixukfmK2PNmKo83";
let theAmount = document.getElementById("amount");
let fromCurrency = document.getElementById("from");
let toCurrency = document.getElementById("to");
let theAnswer = document.getElementById("answer");

window.onload = getData();

async function getData() {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=USD&from=CAD&amount=1&apikey=BXEh8fPVQeAN2jijFixukfmK2PNmKo83"
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Convert API result is: " , result);

            let tempAmount = result.info.rate;
            console.log("the rate is: " + tempAmount);
            
            outputData(tempAmount);
        }

} catch (error) {
    if (error) throw error;
    console.log("Convert API error ", error);
    let 
}
}


function outputData(answer) {
    // theAmount.innerHTML = amount;
    // fromCurrency.innerHTML = from;
    // toCurrency.innerHTML = to;
    theAnswer.innerHTML = answer;
}