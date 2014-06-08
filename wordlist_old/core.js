var rightmsg = "Correct!<br> <i>{word}</i> means <i>{def}</i>";
var wrongmsg = "Sorry, Wrong!<br> <i>{word}</i> means <i>{def}</i>"
var typomsg = "Oops! You made a typo.<br>You entered <i>{enter}</i>, it should be <i>{def}</i>"
var errormsg = "Execution Error:<br>{err}"
var words = {};
var index = [];
var fin = [];
var curw = 0;
var dat = {};
var res = [];
var lists = [];

function tpl(str,add){return _.tpl(str, _.extend(dat, add))}
$(function(){
  $("#wpc")[0].selectedIndex = 0;
  $("#in").keyup(function(){
  })
  try {
    eval(unescape(window.location.search.substr(1))); //config opt
  }catch(err){}
})

function checkcmd(){
    if(".#>".indexOf($("#in").val().substr(0,1)) != -1 && $("#in").val() != ""){
      updatedat();
      $(".msg").hide()
	if($("#in").val().length == 1){
          $("#log").html(tpl(commands["hint"]()))
          $("#log").fadeIn("slow")
return true
}
      if(commands[$("#in").val().substr(1)]){
        try{
          $("#log").html(tpl(commands[$("#in").val().substr(1)]()))
          $("#log").fadeIn("slow")
        }catch(err){
          $("#err").html(tpl(errormsg, {err: err}))
          $("#err").fadeIn("slow")
        }
        $("#in").val('')
      }else{
          $("#err").html(tpl(errormsg, {err: "Command Not Found"}))
          $("#err").fadeIn("slow")
      }
      return true
    }
    
}
$.get("lists.txt",{},function(e){
  $.each(e.replace(/\r/g, "").split("\n"), function(){
    var nEl = $("<option></option>");
    nEl.val(this);
    nEl.text("Word Parts #"+this);
    lists.push(this+'');
    nEl.appendTo($("#wpc"))
  })
},"text")

function updateword(){
  $("#wrd").html("What does <i>"+index[curw]+"</i> mean?");
}
function changelist(s){
  $("#test").fadeOut("slow", function(){
  index = [];
  fin = [];
  words = {};
  curw = 0;
  $(".msg").hide()
  $.get("wpl/"+$("#wpc")[0].value+".txt",{ck: Math.random()},function(e){
    var ln = e.split("\n");
    $.each(ln, function(){
      var x = this.replace(/\r/g, "").split(",")
      words[x[0]] = x[1];
    })
    
    for(var i in words){
      index.push(i);
    }
    updateword();
    $("#test").fadeIn("slow");
      $("#in").focus();
  },"text")
  });
}
function updatedat(){
try{
	dat.word = index[curw]
	dat.def = words[index[curw]];
	dat.enter = $("#in").val();
	dat.lwrent = $("#in").val().toLowerCase()
	dat.lwrdef = words[index[curw]].toLowerCase()
	dat.lwrwrd = index[curw].toLowerCase()
}catch(err){}
}

function check(){
  if(checkcmd())return;
  
  $(".msg").hide()
  
  updatedat()
  
var type = "";
  if(dat.def == dat.lwrent){
    $("#cor").html(tpl(rightmsg))
    $("#cor").fadeIn("slow")
	type = "correct"
    
  }else if(damlev(dat.lwrdef, dat.lwrent) == 1){
    $("#typo").html(tpl(typomsg))
type = "typo"
    $("#typo").fadeIn("slow")
  }else{
type = "wrong"
      $("#err").html(tpl(wrongmsg))
      $("#err").fadeIn("slow")
  }
  res.push(_.extend({type: type}, dat))
  fin.push(index.splice(curw,1))
  
  curw = Math.floor(index.length*Math.random())
  
  if(index.length == 0){
    index = fin.slice(0);
    fin = []
    curw = 0
  }
  
hintsize = 0;
  updateword();
  
  $("#in").val("")
  
}

