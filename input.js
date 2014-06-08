var commands = {};
var cmdmode = false;

$(document).ready(function(){
  $("#inputform").submit(function(e){
    e.preventDefault();
    var input = $("#input").val()
    $("#input").val("")
    
    handle_input(input);
  })
})


function handle_input(args){
  if(cmdmode&&("<?!:.$>".indexOf(args.substr(0,1))<0||args==""))args="."+args;//hacquetyhaqhak
  if(args.substr(0,3) == "js:"){
    try{
      msg(_.json(eval(args.substr(3))),"gray");
    }catch(err){
      msg("Execution Error: "+err,"red");
    }
  }else if("<?!:.$>".indexOf(args.substr(0,1)) != -1 && args != ""){
    if(args.split(/\s|:|;/).length > 0){
      var cmd = $.trim(args.substr(1, args.split(/\s|:|;/)[0].length-1));
    }else{
      var cmd = "";
    }
    var parts = $.map(args.substr(cmd.length+2).replace(/\\,/g,"PENGUINZRKUTE").split(","),function(e){
      return $.trim(e).replace(/PENGUINZRKUTE/g, ",")})
    //var parts = args.substr(1).substr(0,args.indexOf(/\s|:|;/)//args.substr(1).split(/\s|;|:/)
    if(args.substr(1) == ""){
      cmd = "_blank"
    }
    if(commands[cmd]){
      try{
        msg(commands[cmd].apply(this, parts), "gray");
      }catch(err){
        msg("Execution Error ("+cmd+"): "+err, "red");
      }
    }else{
      msg("Command Not Found: "+cmd, "red");
    }
    //find command
    
  }else{
    commands._default(args);
  }
}
