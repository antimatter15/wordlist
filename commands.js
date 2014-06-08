//hints
commands["_blank"] = commands["hint"] = commands["h"] = function(){
  var fs = "";
  hintsize++;
  var q = citem[1].split(" ")
  for(var i = 0; i < q.length; i++){
    for(var v = 0; v < q[i].length; v++){
      if(v < hintsize) fs += q[i].substr(v,1); else fs += "*";
    }
    fs += " "
  }
  return "Hint: " + $.trim(fs);
}

//override
commands['override'] = commands['load'] = commands['o'] = commands['l'] = function(type){
  override(type);
  return "Connecting to datastore server. Attempting to override."
}

//default
commands['default'] = function(){
  commands._default = function(args){commands.wordlistmain(args)}
}

//kitty
commands['kitty'] = function(){document.body.innerHTML="<img src='http://farm1.static.flickr.com/232/522563155_73757af6e4.jpg?v=0'>"}

//http://www.emperor-penguin.com/penguin-chick.jpg

//penguin
commands['penguin'] = commands['peng'] = commands['superpeng'] = commands['cute'] = function(){document.body.innerHTML="<img src='http://www.emperor-penguin.com/penguin-chick.jpg'>"}

//loadall
commands['supercache'] =commands['cacheall'] = function(){
  for(var x in lists){
    for(var y in lists[x]){
      (function(group, file){
        if(!lists[group][file].list){
          $.get("proxy.php", {fn:group+"/"+file}, function(e){
            parse_list(group, file, e);
          })
        }
      })(x, y)
    }
  }
}

//skip
commands['youstillfail'] = commands['skip'] = commands['next'] = function(){
  next_word();
}

//src
commands['view'] = commands['info'] = commands['src'] = commands['source'] = commands['man'] = function(name){
  return commands[name].toString();
}

//useful when cmdmode is on
commands['enter'] = commands['type'] = commands['default'] = function(args){
  commands._default(args);
}

//points to place with everything
commands['fulllist'] = commands['currentlist'] = commands['listtext'] =  function(args){
  window.location = "proxy.php?fn=" + encodeURIComponent(cgroup+"/"+cfile)
}

//cmdmode
commands['cmdmode'] = commands['cmd'] = commands['autocmd'] = 
commands['autocommand'] = commands['command'] = function(mode){
  if(mode == "toggle" || mode == "switch"){
    cmdmode = cmdmode?false:true;
    return "green;CMDMODE is now "+cmdmode.toString();
  }else
  if(mode == "on" || mode == "yes" || mode == "true"){
    cmdmode = true;
    return "green;The system will now interpret all entries as a command. Prefixes will now be unnecessary.";
  }else
  if(mode == "off" || mode == "no" || mode == "false"){
    cmdmode = false;
    return "green;The system will forward entries to the command line and the application based on prefixes.";
  }else{
    return "red;No Mode Specified, please specify as arguments either on or off. Current Value: "+cmdmode.toString()
  }
  return "red;the internets haz fail!";
}

//report
commands['report'] = function(){
  return "[unimplemented]"
}

//typing
commands['typing'] = commands['typingtest'] = commands['typetraining'] = function(){
  window.location = "?!typing_test3"
}

//results
commands['advstat'] = commands['advstats'] = commands['results'] = commands['result'] = commands['res'] = function(){
  var out = "";
  for(var i = 0; i < results.length; i++){
    out += _.json(results[i]) + "<br>"
  }
  return out;
}

//eionarstupcdlmhbgvfxqjk
//analytics
commands['analytics'] = function(){
  var list = [];
  var combined = "";
  for(var x in lists){
    for(var y in lists[x]){
      if(list = lists[x][y].list){
        for(var i = 0; i < list.length; i++){
          combined += list[i][0].toLowerCase()
        }
      }
    }
  }
  var lastel = "";
  var lastcount = 0;
  var out = []
  $.map(combined.split("").sort(), function(el){
    if(el != lastel){
      out.push([lastcount, lastel])
      lastel = el;
      lastcount = 0;
    }else{
      lastcount++;
    }
  });
  return $.map(out.sort(function(a,b){
    return b[0]-a[0]
  }), function(el){
    return el[1] + ":" + el[0]
  }).join("<br>")
  
}

//eval
commands['javascript'] = commands['ecmascript'] = commands['jscript'] = commands['script'] = commands['eval'] = commands['exec'] = commands['js'] = commands['1337'] = function(js){
  return _.json(eval(js));
}

//time
commands['time'] = commands['naw'] = commands['now'] = commands['date'] = commands['current'] = function(){
var n = new Date, h = n.getHours(), m = n.getMinutes(), t = n.getMonth(), d = n.getDate(), y = n.getFullYear()
return t+"/"+d+"/"+y+", "+(h%12)+":"+(m<10?"0":"")+m+" "+(h>11?"PM":AM)
}

//levenschetein

commands['levenshtein'] = commands['damlev'] = commands['levenschtein'] = commands['icantspelllevenshtein'] = function(a,b){
  return damlev(a,b).toString();
}
//set theme
commands["theme"] = commands["set_theme"] = commands["themes"] = commands["settheme"] = function(tname){
  if(tname == ""){
    return "red;No Theme Specified!";
  }
  if(themes[tname]){
    set_theme(tname);
    return "green;Theme set to <i>"+tname+"</i>";
  }else{
    return "red;Theme not found: "+tname
  }
}

//reload a list
commands['reload'] = commands['refresh'] = commands['clearcache'] = function(){
  lists[cgroup][cfile] = {};
  newlist();
  return "green;Reloaded word list "+cgroup+"/"+cfile
}

//about
commands['about'] = commands['author'] = function(){return "I Failed."}

//stats
commands['stats'] = commands['stat'] = commands['statistics'] = function(len){
  var mw = results.slice(0, parseInt(len)?parseInt(len):clist.list.length), right = 0, wrong = 0, typo = 0;
  for(var i = 0; i < mw.length; i++){
    if(mw[i].result == "correct") right++;
    if(mw[i].result == "typo") typo++;
    if(mw[i].result == "wrong") wrong++;
  }
  return "Of the last "+mw.length+" words, you have had "+right+" correct, "+typo+" typos, and "+wrong+" wrong.";
}

//nextlist
commands['nextlist'] = commands['newlist'] = commands['imbored'] = function(){
  $("#list_select")[0].selectedIndex++;
  $("#list_select").change()
  return false;
}

//prevlist
commands['prevlist'] = commands['oldlist'] = commands['lastlist'] = commands['imnotbored'] = commands['studyagain'] = function(){
  $("#list_select")[0].selectedIndex++;
  $("#list_select").change()
  return false;
}

//override
commands['setgroup'] = commands['setdsgroup'] = commands['datagroup'] = function(group){
  ds.setgroup(group)
  return "Changed datastore group to "+group
}

//readmsg
commands['readmsg'] = commands['read'] = function(type){
  ds.latest(type,function(data){msg(data.data)});
  return "loading..."
}

//sendmsg
commands['sendmsg'] = commands['send'] = commands['write'] = function(type, data){
  ds.write(type,data, function(data){msg("Done!")});
  return "sending..."
}

//cheat
commands['cheat'] = commands['answer'] = commands['giveaway'] = 
commands['ans'] = commands['giveup'] = function(){return citem[1]}

//asplode
commands['asplode'] = commands['explode'] = function(){document.body.innerHTML = "FAIL"}

//fail
commands['failure'] = function(){return "Maybe you fail as much as me now?"}

//fail
commands['fail'] = commands['phail'] = function(){handle_input("I HAZ A PHAILURE")/*tjhsst*/}

//msg
commands['out'] = commands['msg'] = commands['print'] = function(x){return x}

//old
commands['old'] = commands['legacy'] = commands['ancient'] = function(){location="http://www.antimatter15.com/wordlist/wordlist_old/"}

//title
commands['title'] = commands['pagetitle'] = commands['page'] = function(x){document.title = x; return "Page Title Changed To "+x}

//reset
commands['reset'] = commands['noresults'] = function(){results=[];update_stats();return "green;Results array sucessfully reset"}

//list
commands['list'] = commands['aboutcmd'] = commands['commandlist'] = commands['ls'] = commands['dir'] =  function(){
  var text = "";
  for(var x in commands){
    //text += "<li>"+x+"</li>";
    text += ", "+x
  }
  return "<div style='font-size:17px'>"+text.substr(2)+"</div>"
  //return "<ul style='font-size:11px;margin:0;padding-left:10px'>"+text+"</ul>"
}


//tips
commands['tips'] = commands['usage'] = commands['tutorial'] =function(){
return "<div style='font-size:16px'><i>This wordlist engine includes a powerful command engine. To execute a command, type prepend the command's name with a $ dollar sign and press enter.</i></div><div style='font-size: 15px;'>\
<i>$theme</i> changes the color scheme. To use, type in <i>$theme name</i> where you replace <i>name</i> with white, gray, azure or black.<br>\
<i>$hint</i> can be used to give a small hint on the question. Use the command multiple times on a question as necessary, or just type in ? instead.<br>\
<i>$list</i> will give you a list of available commands<br>\
<i>$stats</i> will give you statistics on your accuracy</div>";
} 
