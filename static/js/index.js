// GETTING LOCALITY LIST ON PAGE LOAD (IIFE FUNCTION)
(function fetchLocality(){
    let sublocalities=document.getElementById("localities").innerText.split(/[,\-_]/)
    console.log("sublocalities", sublocalities);
    let postType=document.getElementById("postType").innerText
    for (i=0;i<sublocalities.length;i++)
    {
        let localityData=sublocalities[i].trim();
        localityData=localityData.replace(/ /g, "-")
        document.getElementById("localityname_desktop").innerHTML += "<a class='locality_name' href=/"+postType+"/"+localityData+"><div>"+sublocalities[i]+"</div></a>"
    }
})()


// NAVIGATION CONTROL FIUNCTION FOR HAMBERG CLICK
function navigationControl() {
    let topNav_divData = document.getElementById("myTopnav");
    if (topNav_divData.className === "topnav") {
        topNav_divData.className += " responsive";
    } else {
        topNav_divData.className = "topnav";
    }
}


// GETTING LOCALITY ON CLICK OF THE OPTIONS THAT HAS BEEN SELECTED BY THE USER
function gettingLocality(e){
    console.log("CALLED");
    // document.getElementById("selectedValue").value=e.target.innerText;
    // document.getElementById("selectedValue").innerHTML=e.target.innerText;
    // document.getElementById("localities_select").style.display="none";
    let postType=document.getElementById("postType").innerText
    let localityData=e.target.innerText.trim();
    localityData=localityData.replace(/ /g, "-")
    console.log("localityData", localityData);
    console.log("test", `/${postType}/${localityData}`)
    var test=`/${postType}/${localityData}`
    window.location.href =test
}


// TOGGLE CUSTIOM MADE DROPDOWN FOR LOCALITY IN THE MOBILE
function toggleSelectoptions(id) {
    let div = document.getElementById("localities_select");
    let sublocalities=document.getElementById("localities").innerText.split(/[,\-_]/)
    let postType=document.getElementById("postType").innerText

    for (i=0;i<sublocalities.length;i++)
    {
        let localityData=sublocalities[i].trim();
        localityData=(localityData.replace(/ /g, "-")).toLowerCase()
        document.getElementById("localities_select").innerHTML += "<li class='customselect_li localities_option'><a class='locality_name' href=/"+postType+"/"+localityData+">"+sublocalities[i]+"</a></li>"
    };
    div.style.display = div.style.display == "block" ? "none" : "block";
}


var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var utmSource = '-',
      utmMedium = '-',
      utmCampaign = '-',
      gclId = '-',
      uniqueNumber, mobileNumber, width, userName = '-',
      goldAmt = '',
      pinCode = '-',
      selected_value = '-',
      existingLoan = '-',
      otpNum = '-',
      otpVerified = false;
      var currentUrl=window.location.href;

  function phoneValidation(phoneNumber) {
      let regEx = /^([6-9])([0-9]{9})$/g;
      return phoneNumber.match(regEx) ? true : false;
  }
  function pincodeValidation(pincode){
    console.log("pincode", pincode)
    let testingpara=/^[0-9]{1,6}$/;
    return pincode.match(testingpara) ? true : false;
  }
function capture_mobileNumber(phoneNumber) {
    console.log("MOBILE COUNT FUNCTION HAS BEEN CALLED", phoneNumber);
    gtag('event', 'product_listing_apply', { 'event_label': 'productlisting_apply_now', 'event_category': 'button_click_productlisting'})
    var phone = phoneNumber
    console.log("phone", phone);
    console.log("phoneValidation", phoneValidation(phone));
    if(phoneValidation(phone)){
        mobileNumber = document.getElementById("mobile_number").value;
        pushMobileGoogleSheet(this, mobileNumber);
        // document.getElementById("mobile_numberInput").style.display="none"
        // document.getElementById("pincode_Input").style.display="block"
    }
    else{
        document.getElementById("mobile_errormessage").style.display="block"
    }
  }
function fetchingBasic_data(){
    let currentDate = new Date();
      // variable is used to store current date
      let date = currentDate.getDate();
      // variable is used to store current month
      let month = currentDate.getMonth();
      // variable is used to store current year
      let year = currentDate.getFullYear();
      // variable is used to store hour
      let hour = parseInt(currentDate.getHours());
      // variable is used to store current minutes
      let minutes = currentDate.getMinutes();
      // if time is below 12 hours then adding "AM" else adding "PM" and converted to 12 hour format
      let time = (hour < 12) ? hour + ':' + minutes + ' AM' : ((hour === 12) ? hour : (hour % 12)) + ':' + minutes + ' PM';
      // variable is used to store current date and time in DD-MM-YYYY Time Format
      let timeStamp = `${date}-${monthList[month]}-${year} ${time}`;
      
      return {date, month, year, hour, minutes, time, timeStamp}
}
function pushMobileGoogleSheet(target) {
      console.log("PUSH MOBILE GOOOGLE SHEET HAS BEEN CALLED");
      let schemes = {}
      let url = 'https://vs.rupeek.com:446/gsheets';
      let requiredData=fetchingBasic_data();
      // variable is used to store current date and time in DD-MM-YYYY Time Format
      let timeStamp = requiredData.timeStamp;
      let current_city=document.getElementById("current_city").innerText;

      schemes.timestamp = timeStamp;
      schemes.sessionId = uniqueNumber;
      schemes.unbounce_phone = mobileNumber;
      schemes.unbounceUrl = currentUrl;
      schemes.city = current_city;

      console.log("pushMobileGoogleSheet", schemes);
      // ajax api call
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url)
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send( JSON.stringify(schemes))
      xhr.onload = function() {
        console.log(`Loaded: ${xhr.status} ${xhr.response}`);
        document.getElementById("info_popup").style.display="block"
      };
      xhr.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
        document.getElementById("errorinfo_popup").style.display="block"
      };
  }



// // function for updating data on last submit.
//   function updateGoogleSheet(target) {
//       console.log("updateGoogleSheet CALLED");
//       let url = 'https://vs.rupeek.com:446/gsheets/update';

//       // if ($(target).data('api') === 'third-party') {
//       //     storeWebFlowSession(uniqueNumber)
//       //     url = 'https://vs.rupeek.com:446/gsheets/thirdPartyLeadUpdate';
//       // }
//       let requiredData=fetchingBasic_data();
//       // variable is used to store current date and time in DD-MM-YYYY Time Format
//       let timeStamp = requiredData.timeStamp;
//       let current_city=document.getElementById("current_city").innerText;
//       let pin_code=document.getElementById("pincode").value;
//       let pin_codeVerification=pincodeValidation(pin_code);
//       console.log("pin_codeVerification",pin_codeVerification);
//       // if name and mobile number enter user then click data push to api else throw error message
//       if (mobileNumber && mobileNumber.length === 10 && current_city && pin_codeVerification) {
//           // Object is used to store the sessionId,phone number,name,city,gclid,timestamp,utmsource,utmmedium,utmcampaign,user name and gold amount
//           let schemes = {}
//           schemes.sessionId = uniqueNumber;
//           schemes.productListing_phone = mobileNumber;
//           schemes.name = userName;
//           schemes.timestamp = timeStamp;
//           schemes.gclid = gclId;
//           schemes.city = current_city;
//           schemes.utmSource = utmSource;
//           schemes.utmMedium = utmMedium;
//           schemes.utmCampaign = utmCampaign;
//           schemes.productListingUrl = currentUrl;
//           schemes.dm_gold_amount = goldAmt;
//           schemes.pin_code = pin_code;
//           schemes.existing_loan = existingLoan;
//           schemes.otp_verified_user = otpVerified;

//           console.log("updateGoogleSheet schemes", schemes);
//           // ajax api call
//           let xhr = new XMLHttpRequest();
//           xhr.open('POST', url)
//           xhr.send(schemes)
//           xhr.onload = function() {
//             alert(`Loaded: ${xhr.status} ${xhr.response}`);
//             document.getElementById("mobile_numberInput").style.display="block"
//             document.getElementById("pincode_Input").style.display="none"
//           };

//           xhr.onerror = function() { // only triggers if the request couldn't be made at all
//             alert(`Network Error`);
//           };
//       } else {
//           console.log('error');
//           document.getElementById("pincode_errormessage").style.display="block"
//       }
//   }




