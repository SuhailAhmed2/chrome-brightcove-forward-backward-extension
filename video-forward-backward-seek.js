/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

can be sure people are using chrome 60 above version from stats: https://www.w3counter.com/globalstats.php
 */
document.addEventListener("keydown", event => {
  let checkVideoJsAndPropertiesExist = function () {
    if (window.hasOwnProperty("videojs")) {
      if (typeof videojs === "function") {
        if (videojs.hasOwnProperty("getPlayers") && typeof videojs.getPlayers === "function") {

          let currentPlayer = videojs.getPlayers();
          if (typeof currentPlayer === "object") {
            if (currentPlayer.hasOwnProperty('abcPlayer')) {
              if (typeof currentPlayer.abcPlayer === "object") {
                if (currentPlayer.abcPlayer !== null) {
                  //Object.getOwnPropertyNames(Object.getPrototypeOf(videojs.getPlayers().abcPlayer)).includes("currentTime")
                  if (Object.getPrototypeOf(currentPlayer.abcPlayer) && Object.getOwnPropertyNames(Object.getPrototypeOf(currentPlayer.abcPlayer)).includes("currentTime") && typeof currentPlayer.abcPlayer.currentTime === "function") {
                    if (Object.getOwnPropertyNames(Object.getPrototypeOf(currentPlayer.abcPlayer)).includes("duration") && typeof currentPlayer.abcPlayer.duration === "function") {
                      return true;//completely validated
                    }
                    else {
                      //exception 
                      console.error("duration is either not defined in prototype chain or duration is not of type function");
                    }
                  }
                  else {
                    //exception 
                    console.error("currentTime is either not defined in prototype chain or prototype of abcPlayer does not exist or currentTime is not of type function");
                  }
                }//else its not an exception
              }
              else {
                //exception
                console.error("videojs.getPlayers().abcPlayer is not of type object");
              }

            }
            else {
              //exception 
              console.error("abcPlayer does not exist on object returned by videojs.getPLayers()");
            }
          }
          else {
            //exception 
            console.error("Data returned by videojs.getPLayers() is not object type");
          }
        }
        else {
          //exception
          console.error("getPlayers not defined or getPlayers is not function");
        }
      } else {
        //exception
        console.error("videojs is not function");
      }
    }
  }
  try {
    // try-catch block. currentTime get and set is synchronous method  so we can add try catch block    
    //and all methods used here are synchronous
    if (checkVideoJsAndPropertiesExist() === true) {
      /**
       * Brightcove forward and backward seek 
       * https://support.brightcove.com/brightcove-player-sample-back-and-forward-buttons#Player_example
       */
      let myPlayer = videojs.getPlayers().abcPlayer;
      let jumpAmount = 5;
      
      if (event.keyCode === 37) {
        let newTime,
          rewindAmt = jumpAmount,
          videoTime = myPlayer.currentTime();
        if (videoTime >= rewindAmt) {
          newTime = videoTime - rewindAmt;
        } else {
          newTime = 0;
        }
        myPlayer.currentTime(newTime);        
      }
      else if (event.keyCode === 39) {
        // Forward button logic, don't jump past the duration
        let newTime,
          forwardAmt = jumpAmount,
          videoTime = myPlayer.currentTime(),
          videoDuration = myPlayer.duration();
        if (videoTime + forwardAmt <= videoDuration) {
          newTime = videoTime + forwardAmt;
        } else {
          newTime = videoDuration;
        }
        myPlayer.currentTime(newTime);        
      }
    }
  } catch (e) {
    console.error("an exception occured in extension", e);
  }
  }
  );
  


/**
  
   Object.getOwnPropertyNames(Object.getPrototypeOf(videojs.getPlayers().abcPlayer)).includes("currentTime")
   
   function getCurrentTimeProtoTypeLength(obj)
{
    let found = false;
    let prototypeLength=0;
    while (obj = Object.getPrototypeOf(obj)) {
        prototypeLength++;
        if( Object.getOwnPropertyNames(obj).includes("currentTime") )
        {        
              return prototypeLength;                
        }                    
    }
    return false;// not found
}

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
*/