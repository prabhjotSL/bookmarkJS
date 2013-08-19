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

function createYouTubeRequestObject(){
  var title = $("#watch-headline-title #eow-title").attr("title");
  var author = $("#watch7-user-header .yt-user-name").text();
  var viewsCount = $("#watch7-views-info .watch-view-count").text().trim();
  var url = location.href;
  var obj = {
    id: 1,
    url: url,
    title: title,
    author: author,
    views: viewsCount.replace(/,/g, ""),
    timeBook: getTimeForBookmark(),
    dateBook: getDateForBookmark()
  };
  console.log(obj);
  return obj;  
}

function createRequestURL(baseURL, apiController){
  return baseURL + "/" + apiController;
}

function requestData(){
  var apiController = "book";
  //var apiParams = "{\"id\":\""+ obj.id + "\",\"url\":\"" + obj.url + "\",\"title\":\"" + obj.title + "\",\"author\":\"" + obj.author + "\",\"views-count\":\"" + obj.views + "\",\"time\":\"" + obj.timeBook + "\",\"date\":\"" + obj.dateBook + "\"}";
  var baseURL = "http://192.168.0.196:9000";
  //console.log(apiParams);
  return createRequestURL(baseURL, apiController);
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  //var url = 'http://updates.html5rocks.com';
  var url = requestData();
  console.log(url);
  var obj = createYouTubeRequestObject();

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

  xhr.send("SAMPLE STRING FOR POST");
}

return {
  makeCorsRequest: makeCorsRequest
};

})();

window.VIDOOK_MAIN__ = VIDOOK_MAIN__;