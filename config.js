default_config["parts.txt"] = {
                  query: function(v){
                    if(v[2]){
                      //if(v[2].replace(/[a-z]/g,"").toLowerCase() == v[0]){
                      //  return "What does "+v[2]+" mean?"
                      //}else{
                        return "What does <i>"+v[0]+"</i> ("+v[2].toLowerCase()+") mean?";  
                      //}
                    }else{
                      return "What does <i>"+v[0]+"</i> mean?"
                    }
                  },
                  correct: "Correct! <i>{0}</i> means <i>{arg}</i>",
                  typo: "Oops! You made a typo. You said {arg} but it should have been {1}",
                  wrong: "Wrong! <i>{0}</i> means <i>{1}</i>"
                }
                
default_config["words.txt"] = {
                  query: "What is the definition of {0}?",
                  correct: "Correct! <i>{0}</i> means <i>{arg}</i>!",
                  typo: "Oops! You made a typo. You said {arg} but it should have been {1}",
                  wrong: "Wrong! <i>{0}</i> means <i>{1}</i>"
                }
                
default_config["_all"] = {
                  query: "What is {0}?",
                  correct: "Correct! {0} is {arg}!",
                  typo: "Oops! You made a typo. You said {arg} but it should have been {1}",
                  wrong: "Wrong! {0} is {1}"
                }

