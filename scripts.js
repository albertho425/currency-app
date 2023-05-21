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

/**
 * On form submission, get values and call fluctuation function
 */


function processFluctuationForm() 
{
    let fromDate = document.getElementById("startDate").value;
    let toDate = document.getElementById("endDate").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;

    console.log(fromDate);
    console.log(toDate);
    console.log(fromCurrency);
    console.log(toCurrency);

    getFluctuation(fromDate,toDate,fromCurrency,toCurrency);

}

/**
 * Calculate the amount of change and % change for a chosen currency at a chosen interval
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} startCurrency 
 * @param {*} endCurrency 
 */

async function getFluctuation(startDate, endDate, startCurrency, endCurrency)
{
    // https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2023-05-01&end_date=2023-05-20
    const apiURL =  "https://api.apilayer.com/exchangerates_data/fluctuation?start_date=" + startDate + "&end_date=" + endDate + "&base=" + startCurrency + "&symbols=" + endCurrency + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Fluctuation API result is: " , result);

            // USD: Object { start_rate: 0.737841, end_rate: 0.740988, change: 0.0031, … }
            // change: 0.0031
            // change_pct: 0.4265
            // end_rate: 0.740988
            // start_rate: 0.737841
            

            let tempResultChange = result.rates["USD"].change;
            let tempResultChangePCT = result.rates["USD"].change_pct;
            
            console.log("Result change is: " + tempResultChange);
            console.log("Result change % is: " + tempResultChangePCT);


            // let tempStringChange = "result.rates[" + endCurrency + "].change";
            // let tempAmountChange = tempStringChange;

            // // to access inside an object
            // let tempStringChangePCT = "result.rates[" + endCurrency + "].change_pct";
            // let tempAmountChangePCT = tempStringChangePCT;

            // console.log("the rate of change is: " + tempAmountChange);
            // console.log("the rate of change % is: " + tempAmountChangePCT);
            
            // outputData(tempAmount);
        }

}   catch (error) {
        if (error) throw error;
        console.log("Fluctuation API error ", error);
    
}


}


async function getHistory(dateInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/" + dateInput + "?symbols=" + toInput + "&base=" + fromInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("History API result is: " , result);

            //CAD is hardcoded 
            //how to access the rates: Object { CAD: 1.34955 }
            let tempAmount = result.rates["USD"];
            console.log("the rate on that day is: " + tempAmount);
            
            outputData(tempAmount);
        }

}   catch (error) {
        if (error) throw error;
        console.log("History API error ", error);
    
}
 

}

/**
 * On form submission, provide the conversion result
 * @param {*} amountInput 
 * @param {*} fromInput 
 * @param {*} toInput 
 */

async function formConvert(amountInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=" + toInput + "&from=" + fromInput + "&amount=" + amountInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Convert API result is: " , result);

            let tempResult = result.result;
            console.log("The conversion result is: " + tempResult);

            outputData(tempResult);
            
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