/*This is the command that handles all the words*/

var list_queue = [];
var citem = []; //wha? I dont cite anything. if i didn't despise camelcase, it should be cItem
var hintsize = 0;
var results = [];
var clist = {};
var typoindex = 1;
var disptime = 0; //Since 1970? Wow.. that took you a long time. U really are an Epoch Fail...

function newlist(){
  list_queue = [];
  if(next_word() != false){
    show_box();
  }
  $("#input").focus();
  setTimeout(function(){
    $("#input").focus();
  },100);
}

function next_word(){
  if(!lists[cgroup][cfile].list){
    $.get("proxy.php", {fn:cgroup+"/"+cfile}, function(e){
      parse_list(cgroup, cfile, e);
      next_word();
      show_box();
    })
    return false;
  }
  hintsize = 0;
  if(!lists || !lists[cgroup] || !lists[cgroup][cfile] || !lists[cgroup][cfile].list){
    query("Use recovery commands on input box.");
    return msg("System Loading Error! List data not available.","red");
  }
  clist = lists[cgroup][cfile];
  var list = clist.list;
  if(list_queue.length == 0){
    list_queue = list.slice(0)
    var item = list_queue.splice(0, 1)[0];
  }else{
    var item = list_queue.splice(Math.floor(list_queue.length*Math.random()),1)[0];
  }
  citem = item;
  var qhand = lists[cgroup][cfile].config.query;
  
  query(handle_query(qhand, build_vars({}, citem)))
  disptime = (new Date).getTime();
}

function brainfsck(args){
  if(!window.mem){
  mem = {}
  ptr = 0;
  ip = 0;
  loops = []
  }
  var code = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.".split("")
  ip++
  if(code[ip]==">")ptr++;
  if(code[ip]=="<")ptr--;
  if(code[ip]=="+")mem[ptr]=mem[ptr]?mem[ptr]+1:1;
  if(code[ip]=="-")mem[ptr]=mem[ptr]?mem[ptr]-1:(-1);
  if(code[ip]==".")msg("green",String.fromCharCode(mem[ptr]));
  if(code[ip]=="["&&!ptr)ip=code.join("").indexOf("]",ip);
  if(code[ip]=="]")ip=code.join("").indexOf("[");
  return code[ip]
}

function typing(args){
  //score
    var time = (new Date).getTime()-disptime;
    var chars = "abcdefghijklmnopqrstuvwxyz".split(""), txt = ""
    if(citem[0]){
    var score = damlev(args, citem[0]);
    
    if(score >= (chars.length/2)){
      msg("red;You had over half of the characters wrong in "+time+"ms")
      results.splice(0, 0, {word: citem[0], result: "wrong",time: time, score: score})
    }else if(score >= 1){
      msg("orange;You made a few mistakes in "+time+"ms")
      results.splice(0, 0, {word: citem[0], result: "typo",time: time, score: score})
    }else if(score == 0){
      msg("green;You typed everything correctly in "+time+"ms")
      results.splice(0, 0, {word: citem[0], result: "correct",time: time, score: score})
    }
  }
  //generate the random string
  for(var i = 0; i < 10; i++){
    txt += chars[Math.floor(Math.random()*chars.length)]
  }
  //do stuff
  citem = [txt]
  query("Please type "+txt)
  disptime = (new Date).getTime();
  var mw = results, total = 0;
  for(var i = 0; i < mw.length; i++){
    total += mw[i].score
  }
  if(mw.length > 0){
    $("#stats").text("Accuracy: "+Math.round((((mw.length*chars.length)-total)/(mw.length*chars.length))*100)+"%");
  }else{
    $("#stats").text("Accuracy: 0%");
  }
}

function typeoverride(){
  citem = [];
  resutls = [];
  commands._default = function(args){typing(args)}
  show_box();
  $("#list_select").fadeOut();
  typing();
}


function build_vars(vars, citem){
  for(var i = 0; i < citem.length; i++){
    vars[i] = citem[i]
  }
  return vars;
}


function handle_query(handler, vars){
  if(typeof handler == "function"){
    return handler(vars)
  }else{
    return _.M(handler, vars)
  }
}


commands._default = function(args){
  commands.wordlistmain(args);
}

commands.wordlistmain = function(args){
  var vars = build_vars({arg: args}, citem);
  var conf = lists[cgroup][cfile].config
  var time = (new Date).getTime()-disptime;
  if(citem.length > 0){
    if(args == "penguin"){
      msg("You Win!!!","green")
    }else if(args.toLowerCase() == citem[1].toLowerCase()){
      msg(handle_query(conf.correct, vars), "green")
      results.splice(0, 0, {word: vars[0], result: "correct",time: time})
      //msg("Correct! "+citem[0]+" means "+args+"!","green")
    }else if(damlev(args.toLowerCase(), citem[1].toLowerCase()) <= typoindex){
      msg(handle_query(conf.typo, vars), "orange")
      results.splice(0, 0, {word: vars[0], result: "typo", time: time})
      //msg("Oops! You made a typo. You said "+args+" but it should have been "+citem[1],"orange")
    }else{
      msg(handle_query(conf.wrong, vars), "red")
      results.splice(0, 0, {word: vars[0], result: "wrong", time: time})
      //msg("Wrong! "+citem[0]+" means "+citem[1],"red");
    }
  }
  
  update_stats();
  next_word();
}

function update_stats(){
  var mw = results.slice(0, clist.list.length), total = 0;
  for(var i = 0; i < mw.length; i++){
    if(mw[i].result == "correct") total += 1;
    if(mw[i].result == "typo") total += 0.5;
    if(mw[i].result == "wrong") total += 0;
  }
  if(mw.length > 0){
    $("#stats").text("Accuracy: "+Math.floor(100*total/mw.length)+"%");
  }else{
    $("#stats").text("Accuracy: 0%");
  }
}
