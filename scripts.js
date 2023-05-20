let currencyAPIKey = "BXEh8fPVQeAN2jijFixukfmK2PNmKo83";
let theAnswer = document.getElementById("answer");


// window.onload = getData();

/**
 * On form submission, get values and call convert function
 */

function processForm() {

    let theAmount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;


    console.log(theAmount);
    console.log(fromCurrency);
    console.log(toCurrency);
    formConvert(theAmount,fromCurrency,toCurrency);
}

/**
 * On form submission, get values and call history function
 */


function processHistoryForm()
{
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    let historyDate = document.getElementById("date").value;
    console.log(historyDate.value);
    console.log(fromCurrency);
    console.log(toCurrency);
    getHistory(historyDate,fromCurrency,toCurrency);
}

async function getHistory(dateInput, fromInput, toInput) {

//     https://api.apilayer.com/exchangerates_data/2023-05-18?symbols=CAD&base=USD
// 
    console.log("the date is: " + dateInput);
    const apiURL =  "https://api.apilayer.com/exchangerates_data/" + dateInput + "?symbols=" + fromInput + "&base=" + toInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("History API result is: " , result);

            //CAD is hardcoded 
            //how to access the rates: Object { CAD: 1.34955 }
            let tempAmount = result.rates["CAD"];
            console.log("the rate is: " + tempAmount);
            
            outputData(tempAmount);
        }

} catch (error) {
    if (error) throw error;
    console.log("History API error ", error);
    let 
}
 

}

/**
 * On form submission, provide the conversion result
 * @param {*} amountInput 
 * @param {*} fromInput 
 * @param {*} toInput 
 */

async function formConvert(amountInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=" + fromInput + "&from=" + toInput + "&amount=" + amountInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Convert API result is: " , result);

            let tempAmount = result.result;
            console.log("the rate is: " + tempAmount);
            
            outputData(tempAmount);
        }

} catch (error) {
    if (error) throw error;
    console.log("Convert API error ", error);
    let 
}
}


    



/**
 *  Run this form on page load
 */

// async function getData() {

//     const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=USD&from=CAD&amount=1&apikey=BXEh8fPVQeAN2jijFixukfmK2PNmKo83"
 
//     try {
//         const response = await fetch(apiURL, {cache: "no-cache"});
//         const result = await response.json();
    
//         if (response.ok) {
//             console.log("Convert API result is: " , result);

//             let tempAmount = result.info.rate;
//             console.log("the rate is: " + tempAmount);
            
//             outputData(tempAmount);
//         }

// } catch (error) {
//     if (error) throw error;
//     console.log("Convert API error ", error);
//     let 
// }
// }


function outputData(answer) {
    // theAmount.innerHTML = amount;
    // fromCurrency.innerHTML = from;
    // toCurrency.innerHTML = to;
    theAnswer.innerHTML = answer;
}