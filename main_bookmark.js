javascript: (function(){
  if (!($ = window.jQuery)) {
    script = document.createElement( "script" );  
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";   
    script.onload=getTheWood;  
    document.body.appendChild(script);  
  }   
  else {  
    getTheWood();  
  }
  
  function getTheWood() {
    if(!(window.VIDOOK_MAIN__)){
      var SCRIPT_URL = "https://raw.github.com/prabhjotSL/bookmarkJS/master/main.js";
      var jsCode = document.createElement("script");   
      jsCode.setAttribute("src", SCRIPT_URL);
      jsCode.onload = getJSTimezonePlugin;
      document.body.appendChild(jsCode);
    }
    else {
      getJSTimezonePlugin();
    }
  }

  function getJSTimezonePlugin() {
    if(!(window.jstz)){
      var SCRIPT_URL = "//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js";
      var jsCode = document.createElement("script");   
      jsCode.setAttribute("src", SCRIPT_URL);
      jsCode.onload = releasetheTrojanHorse;
      document.body.appendChild(jsCode);
    }
    else {
      releasetheTrojanHorse();
    }
  }

  function releasetheTrojanHorse() {
    VIDOOK_MAIN__.makeCorsRequest();
  }

})();