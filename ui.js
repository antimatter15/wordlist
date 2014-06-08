      var pretty_names = {
        "words.txt": "Words",
        "parts.txt": "Parts"
      }
      
      var themes = {}
      
        themes["gray"] = themes["default"] = 
          {bg: "DarkGray", text: "black", link: "#888888", linksel: "black"},
        themes["black"] = themes["noir"] = 
          {bg: "black", text: "white", link: "#A9A9A9", linksel: "white"},
        themes["white"] = themes['blanco'] = themes['blank'] = 
          {bg: "white", text: "black", link: "#A9A9A9", linksel: "black"}
        themes["azure"] = themes["blue"] = 
          {bg: "#F0FFFF", text: "#007fff", link: "#5B92E5", linksel: "blue"}
        themes["green"] = themes["lime"] =
          {bg: "#90EE90", text: "#006400", link: "#006400", linksel: "black"}
          
      function set_theme(name){
        theme = themes[name];
        $("body").css("background-color", theme.bg);
        $("body").css("color", theme.text);
        $("a").css("color", theme.link);
        $(".linksel").css("color", theme.linksel)
      }
      
      var theme = themes['gray'];
      
      function msg(content, color){
        if(content === false) return;
        
        $("#msg").fadeOut();
        if(content){
          if(content.indexOf(";") > 2 && content.indexOf(";") < 7){
            color = content.substr(0,content.indexOf(";"))
            content = content.substr(color.length+1);
          }
          $("#msg").queue(function(){
            $("#msg").html(content);
            $("#msg").css("background-color", color);
            $("#msg").fadeIn();
            if($.browser.msie){
              $("#msg").css("display","");
            }
            $(this).dequeue();
          });
        }
      }
      
      function query(content){
        $("#query").html(content);
      }
      
      function hide_box(){
        msg();
        $("#query, #input").fadeOut("slow");
      }
      
      function show_box(){
        $("#input").val("");
        $("#query, #input").fadeIn("slow");
      }
      
      
      function create_sub(list){
        $("#sub")
        .fadeOut("slow")
        .queue(function(){
          $(this).css("display","none");
          $(this).html("")
          $.each(list, function(index, item){
            var prettyindex = pretty_names[index]?pretty_names[index]:index.replace(".txt","");
            $(document.createElement("a"))
              .text(prettyindex)
              .data("index",index)
              .attr("href","#")
              .css("color", theme.link)
              .click(function(e){
                cfile = $(this).data("index")
                
                e.preventDefault();
                $("a")
                  .removeClass("linksel")
                if(!$.browser.msie){
                  $("a").animate({color: theme.link})
                }else{
                  $("a").css("color", theme.link);
                }
                $(this)
                  .addClass("linksel")
                  .queue(function(){
                    setTimeout(function(){
                      newlist();
                    },100)
                    $(this).dequeue();
                  })
                if(!$.browser.msie){
                  $(this).animate({color: theme.linksel})
                }else{
                  $(this).css("color", theme.linksel);
                }
                  hide_box();
            })
            .appendTo("#sub")
          })
          $("#sub")
            .children()
            .filter(":eq(0)")
            .click()
          
          $(this).dequeue()
        })
        .fadeIn('slow')
      }
      
      
      $(document).ready(function(){
        $("#initial_select").attr("disabled","true")
        $("#list_select").change(function(e){
          hide_box();
          cgroup = $("#list_select :selected").val();
          create_sub(lists[cgroup])
        })
      })
      
      function build_list(){
        $.each(lists, function(index, item){
          if(index){
            $(document.createElement("option"))
              .attr("id","whatever"+index)
              .val(index)
              .text(index)
              .appendTo("#list_select")
          }
        })
      }
