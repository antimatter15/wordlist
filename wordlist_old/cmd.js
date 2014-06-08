var hintsize = 0;

var commands = {};

commands.help= commands.h = commands.hint= function(){return "Hint:<br>"+makehint()}

commands.error= function(){throw("Error! This is a test error")}

commands.stat = commands.stats= function(){return _.tpl("Statistics:<br>Of the last {ws} words, you scored {right} right, {wrong} wrong, and {typo} typos.",getstats())}

commands.report= function(){return "Report: Work-In-Progress"}

commands.cheat= commands.c = function(){return "Cheater!:<br>{def}"}



function makehint(){
var fs = "";
hintsize ++;
var q = dat.def.split(" ")
for(var i = 0; i < q.length; i++){
  for(var v = 0; v < q[i].length; v++){
    if(v < hintsize){
      fs += q[i].substr(v,1);
    }else{
      fs += "*"
    }
  }
  fs += " "
}
return $.trim(fs);
}


function getstats(){
var mw = res.slice(res.length-index.length);
var wrong = 0, right = 0, typo = 0
for(var i = 0; i< mw.length; i++){

if(mw[i].type == "wrong"){
wrong++	
}
if(mw[i].type == "correct"){
right++	
}
if(mw[i].type == "typo"){
typo++	
}
}
return {wrong: wrong, right: right, typo: typo, ws: mw.length};
}