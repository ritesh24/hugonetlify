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
    let postType=document.getElementById("postType").innerText
    let localityData=e.target.innerText.trim();
    localityData=localityData.replace(/ /g, "-")
    let url=`/${postType}/${localityData}`
    window.location.href =url
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
    ga('send', {
        hitType: 'event',
        eventCategory: 'product_Listing',
        eventAction: 'Apply_now',
        eventLabel: 'Product Listing Campaign'
      });
    gtag('event', 'product_listing_apply', { 'event_label': 'productlisting_apply_now', 'event_category': 'button_click_productlisting'})
    let phone = phoneNumber
    if(phoneValidation(phone)){
        mobileNumber = document.getElementById("mobile_number").value;
        pushMobileGoogleSheet(this, mobileNumber);
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
        document.getElementById("info_popup").style.display="block"
        document.getElementById("desktopinfo_popup").style.display="block"
      };
      xhr.onerror = function() { // only triggers if the request couldn't be made at all
        document.getElementById("errorinfo_popup").style.display="block"
        document.getElementById("desktoperrorinfo_popup").style.display="block"
      };
  }



