async function topCurrencies() {
    
    loadSpinner();
    const apiURL =  "https://api.apilayer.com/exchangerates_data/latest?symbols=CAD%2C%20GBP%2C%20EUR%2C%20CHF%2C%20KYD%2C%20KWD%2C%20KRW%2C%20CNY%2C%20INR&base=USD" + "&apikey=" + apiKey;

    https://api.apilayer.com/exchangerates_data/latest?symbols=CAD%2C%20GBP%2C%20EUR%2C%20CHF%2C%20KYD%2C%20KWD%2C%20KRW%2C%20CNY%2C%20INR

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            hideSpinner();
            console.log("Latest API result is: " , result);

            let CAD = (result.rates["CAD"]).toFixed(2);
            let GBP = (result.rates["GBP"]).toFixed(2);
            let EUR = (result.rates["EUR"]).toFixed(2);
            let CHF = (result.rates["CHF"]).toFixed(2);
            let KYD = (result.rates["KYD"]).toFixed(2);
            let KWD = (result.rates["KWD"]).toFixed(2);
            let KRW = (result.rates["KRW"]).toFixed(2);
            let CNY = (result.rates["CNY"]).toFixed(2);
            let INR = (result.rates["INR"]).toFixed(2);
            let theDate = result.date;
            let timeStamp = result.timestamp;

            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(timeStamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(theDate);
            console.log(formattedTime);


            let answer01 = document.getElementById("answer01");
            let answer02 = document.getElementById("answer02");
            let answer03 = document.getElementById("answer03");
            let answer04 = document.getElementById("answer04");
            let answer05 = document.getElementById("answer05");
            let answer06 = document.getElementById("answer06");
            let answer07 = document.getElementById("answer07");
            let answer08 = document.getElementById("answer08");
            let answer09 = document.getElementById("answer09");
            
            answer01.innerHTML = CAD;
            answer02.innerHTML = GBP;
            answer03.innerHTML = EUR;
            answer04.innerHTML = CHF;
            answer05.innerHTML = KYD;
            answer06.innerHTML = KWD;
            answer07.innerHTML = KRW;
            answer08.innerHTML = CNY;
            answer09.innerHTML = INR;

            let updatedDate = document.getElementById("date");
            let updatedTime = document.getElementById("time");

            updatedDate.innerHTML = theDate;
            updatedTime.innerHTML = formattedTime;
            
            
        }

} catch (error) {
    if (error) throw error;
    console.log("Convert API error ", error);
    let 
}

 
    
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
