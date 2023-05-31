let theAnswer = document.getElementById("answer");
let theAnswerChangePCT = document.getElementById("answerPCT");

let amount = document.getElementById("amount");
let from = document.getElementById("from");
let to = document.getElementById("to");
let theDate = document.getElementById("date");
let theStartDate = document.getElementById("startDate");
let theEndDate = document.getElementById("endDate");

//Create dropdown from the currencies array
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    from.add(option);
  });
  
  //Repeat same thing for the other dropdown
  currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    to.add(option);
  });
  
//Default values of currencies
from.value="CAD";
to.value="USD";
amount.value=1.0;
let today = new Date();
var year = today.toLocaleString("default", { year: "numeric" });
var month = today.toLocaleString("default", { month: "2-digit" });
var day = today.toLocaleString("default", { day: "2-digit" });


var formattedDate = year + "-" + month + "-" + day;
console.log(formattedDate);  // Prints: 2022-05-0

console.log(today);
startDate.value = formattedDate;



/**
 * Check that the start and end date are not missing, and the start date is before the end date, and the start date and end date are valid (in the past)
 */
function checkStartAndEndDate() {

    //start date is not empty
    //end date is not empty
    //start date is before the end date
    //start date is in the past or up to the current date
    //end date is in the past or up to the current date


}

function checkFromCurrency() {
    if(from.validity.valid) {
        document.getElementById('from').innerHTML= from.value;
        document.getElementById('fromError').innerHTML = "";
        from.style.color="";   
      
    }
      else if(from.validity.valueMissing) {
      document.getElementById('fromError').innerHTML = "Select a currency";      
      from.style.color = "red";
      console.log("error in base currency")
      
    }
}

function checkToCurrency() {
    if(to.validity.valid) {
        document.getElementById('to').innerHTML= to.value;
        document.getElementById('toError').innerHTML = "";
        to.style.color="black;";   
        
        
    }
      else if(to.validity.valueMissing) {
      document.getElementById('toError').innerHTML = "Select a currency";      
      to.style.color = "red";
      console.log("Error in output currency");
    }
}

function checkStartDate() {

    if(theStartDate.validity.valid) {
        document.getElementById('startDate').innerHTML= startDate.value;
        document.getElementById('startDateError').innerHTML = "";
        theStartDate.style.color="";   
        
    }
      else if(theStartDate.validity.valueMissing) {
      document.getElementById('startDateError').innerHTML = "Select a start date";      
      theStartDate.style.color = "red";
      console.log("start date error");
    }
    

}

function checkEndDate() {

    if(theEndDate.validity.valid) {
        document.getElementById('endDate').innerHTML= theEndDate.value;
        document.getElementById('endDateError').innerHTML = "";
        theEndDate.style.color="";   
        
    }
      else if(theEndDate.validity.valueMissing) {
      document.getElementById('endDateError').innerHTML = "Select a end date";      
      theEndDate.style.color = "red";
      console.log("end date error");
    }
    

}

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
    loadSpinner();
    formConvert(theAmount,fromCurrency,toCurrency);
}

/**
 * On form submission, get values and call history function
 */


function processHistoryForm()
{
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    
    loadSpinner();
    getHistory(theStartDate.value,fromCurrency,toCurrency);
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

    loadSpinner();
    getFluctuation(fromDate,toDate,fromCurrency,toCurrency);

}

/**
 * Calculate the amount of change and % change for a chosen currency at a chosen interval
 * 
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} startCurrency 
 * @param {*} endCurrency 
 */

async function getFluctuation(startDate, endDate, startCurrency, endCurrency)
{
    // https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2023-05-01&end_date=2023-05-20
    const apiURL =  "https://api.apilayer.com/exchangerates_data/fluctuation?start_date=" + startDate + "&end_date=" + endDate + "&base=" + startCurrency  + "&apikey=" + apiKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            hideSpinner();
            console.log("Fluctuation API result is: " , result);
            
            let tempResultChange = result.rates[endCurrency].change;
            let tempResultChangePCT = result.rates[endCurrency].change_pct;
            
            console.log("Result change is: " + tempResultChange);
            console.log("Result change % is: " + tempResultChangePCT);

            theAnswer.innerHTML = tempResultChange;
            theAnswerChangePCT.innerHTML = tempResultChangePCT;
            
        }

}   catch (error) {
        if (error) throw error;
        console.log("Fluctuation API error ", error);
    
}


}

/**
 * Get the currency value at a specified date in the past
 * @param {*} dateInput 
 * @param {*} fromInput 
 * @param {*} toInput 
 */


async function getHistory(dateInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/" + dateInput + "?symbols=" + toInput + "&base=" + fromInput + "&apikey=" + apiKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "force-cache"});
        const result = await response.json();
    
        if (response.ok) {
            // showAnswer();
            hideSpinner();
            console.log("History API result is: " , result);

             let tempAmount = result.rates[toInput];
             let amountToConvert = amount.value;
             console.log(tempAmount);
             let totalAmount = (tempAmount * amount.value).toFixed(2);
             let success = result.success;

             if (success === true) {
                console.log("success is true");
             }
             else {
                console.log("success is false");
             }
            //  console.log(success);
            
            let sentence = `On ${dateInput}, ${amountToConvert} from ${fromInput} to ${toInput} is ${totalAmount}.`;
             console.log(sentence);
            outputData(sentence);

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

    const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=" + toInput + "&from=" + fromInput + "&amount=" + amountInput + "&apikey=" + apiKey;

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            hideSpinner();
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



/**
 *  Call the getTimeSeries function on form submission 
 */
function processTimeSeries() {
    console.log("process time series function");

    let fromDate = document.getElementById("startDate").value;
    let toDate = document.getElementById("endDate").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    
    console.log(fromDate);
    console.log(toDate);
    console.log(fromCurrency);
    console.log(toCurrency);

    
    // Check that the fields are not empty
    // in the future, check that the start date is ahead of end date, and the start date is today or past, AND the end date is today or PAST
    if ((from.validity.valid) && (to.validity.valid) && (theStartDate.validity.valid) && (theEndDate.validity.valid))   {
        console.log("no errors");
        loadSpinner();
        getTimeSeries(fromDate, toDate, fromCurrency, toCurrency);

    }
    else if (!(from.validity.valid)) {
        checkFromCurrency();
        checkStartDate();
        checkEndDate();
        checkToCurrency();
    }
    else {
        checkToCurrency();
    }
    



}

/**
 * Get the table/graph for a currency at a specific time interval
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} startCurrency 
 * @param {*} endCurrency 
 */

async function getTimeSeries(startDate, endDate, startCurrency, endCurrency)
{
    
    const apiURL =  "https://api.apilayer.com/exchangerates_data/timeseries?start_date=" + startDate + "&end_date=" + endDate + "&base=" + startCurrency + "&apikey=" + apiKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            hideSpinner();
            console.log("Timeseries API result is: " , result);

       
        console.log("the endCurrency is: " + endCurrency);

        let rate1 = result.rates[startDate][endCurrency];
        let rate5 = result.rates[endDate][endCurrency];
        
       console.log(rate1);
       console.log(rate5);
       
    //    console.log( ObjectLength(result) );
       drawGraph(startDate, endDate, rate1, rate5);
       
        
            
        }

}   catch (error) {
        if (error) throw error;
        console.log("Timeseries API error ", error);
    
}


}

function drawGraph(dateFirst, dateLast, input1, input5) {
    const ctx = document.getElementById('myChart');
    

        

        var myLineChart =  new Chart(ctx, {
            type: 'line',
            data: {
              labels: [dateFirst, dateLast],
              datasets: [{
                label: 'Value of Currency',
                data: [input1,input5],
                borderWidth: 3,
                backgroundColor: 'red',
                borderColor: 'red'
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

        // myLineChart.destroy();
          
}


/**
 * Hide the spinner
 */

function hideSpinner() {
    document.getElementById('spinner')
            .style.display = 'none';
} 

/**
 * Show the spinner
 */

function loadSpinner() {
    document.getElementById('spinner')
            .style.display = '';
}

function hideAnswer() {
    document.getElementById('answer')
            .style.display = 'none';
}

function showAnswer() {
    document.getElementById('answer')
            .style.display = 'block';
}

function clearForm() {
    let answer2 = document.getElementById("anwswer");
    answer2.innerHTML="";
    console.log("cleared the form");
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()