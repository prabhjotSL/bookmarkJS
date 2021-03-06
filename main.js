/*

Code for VIDOOK Plugin to 
1. generate bookmark object
2. show notification of success/unsuccess bookmarking
3. Send data to server
4. A better way will be to include Timezone plugin file as a json directly from CDN ? Problem could be that this library is removed from CDN ?
(Discuss)
*/

var VIDOOK_MAIN__ = (function() {// Create the XHR object.
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }

  function getTimeForBookmark(){
      time = new Date();
      return (time.getHours() < 10 ? "0" : "") + time.getHours() + ":" + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes() + ":" + (time.getSeconds() < 10 ? "0" : "") + time.getSeconds();
  }

  function getDateForBookmark(){
      newDate = new Date();
      return newDate.getFullYear() + "-" + ((newDate.getMonth() + 1) < 10 ? "0" : "") + (newDate.getMonth() + 1) + "-" + (newDate.getDate() < 10 ? "0" : "") + newDate.getDate();
  }

  function getTimezoneString(){
    var tz = jstz.determine(); // Determines the time zone of the browser client
    return tz.name(); // Returns the name of the time zone eg "Europe/Berlin"
  }

  function createYouTubeRequestObject(){
    // This function will be called only if youtube is detected, this is inside function.
    // we can hard code source url and source name here.
    var title = $("#watch-headline-title #eow-title").attr("title");
    var author = $("#watch7-user-header .yt-user-name").text();
    var viewsCount = $("#watch7-views-info .watch-view-count").text().trim();
    viewsCount = viewsCount.replace(/views/g, "");
    viewsCount = viewsCount.trim();
    viewsCount = viewsCount.replace(/,/g, "");
    //viewsCount = parseInt(viewsCount);
    var source_url = "http://youtube.com";
    var source_name = "Youtube";
    var url = location.href;
    var obj = {
      id: 1,
      url: url,
      title: title,
      author: author,
      views:  viewsCount,
      timeBook: getTimeForBookmark(),
      dateBook: getDateForBookmark(),
      source_url: source_url,
      source_name: source_name,
      timezone: getTimezoneString()
    };
    console.log(obj);
    return obj;  
  }

  function createRequestURL(baseURL, apiController){
    return baseURL + "/" + apiController;
  }

  function requestData(){
    var apiController = "book";
    //var baseURL = "http://localhost:9000";
    var baseURL = "http://vidoo.in";
    return createRequestURL(baseURL, apiController);
  }

  // Make the actual CORS request.
  function makeCorsRequest() {
    var url = requestData();
    console.log(url);
    var obj = createYouTubeRequestObject();
    // Creating JSON String.
    // OLD API PARAMS WITH TITLE, AUTHOR, VIEWS
    //var apiParams = "{\"id\":"+ obj.id + ",\"url\":\"" + obj.url + "\",\"title\":\"" + obj.title + "\",\"author\":\"" + obj.author + "\",\"views-count\":\"" + obj.views + "\",\"time\":\"" + obj.timeBook + "\",\"date\":\"" + obj.dateBook + "\"}";

    // NEW API PARAMS WITH SOURCE_URL AND SOURCE_NAME
    var apiParams = "{\"id\":"+ obj.id + ",\"source_url\":\"" + obj.source_url + "\",\"source_name\":\"" + obj.source_name + "\",\"url\":\"" + obj.url + "\",\"timezone\":\"" + obj.timezone + "\"}";

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
      console.log('CORS not supported');
      return;
    }

    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      console.log(text);
    };

    xhr.onerror = function() {
      console.log('Woops, there was an error making the request.');
    };

    //xhr.setRequestHeader("Content-type","text/plain");
    xhr.setRequestHeader("Content-type","application/json");
    // Code to send POST request.
    xhr.send(apiParams);
  }

  return {
    makeCorsRequest: makeCorsRequest
  };

})();

window.VIDOOK_MAIN__ = VIDOOK_MAIN__;