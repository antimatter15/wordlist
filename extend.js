var ds = null;
                
$(document).ready(function(){            
  ds = new Datastore("wordlist-english-version2", "dsproxy.php?", true);
  if(window.location.search.length > 1){
    if(unescape(window.location.search.substr(1,1)) == "!"){
      override(unescape(window.location.search.substr(2)));
    }else{
    try{
      eval(unescape(window.location.search.substr(1)))
    }catch(err){
      setTimeout(function(){
        msg("red;URL Query Execution Error: "+err);
      },100)
    }
  }
  }
})

override = load = function(name, info){
  ds.latest(name, function(data){ //first is more safer, but latest is more interestinger
    if(info){
      msg("gray;Acquired data, executing stack")
    }
    setTimeout(function(){
      try {
        eval(data.data);
        msg("green;Override Successful!")
      }catch(err){
        msg("red;Override Execution Error:"+err)
      }
    },200)
    //data
  })
}
