var injectorAngular = angular.injector(['ng']);
// use the injector tog et $rootScope to listen to location events
injectorAngular.invoke(function($rootScope) {
  
  $rootScope.$on("$locationChangeStart",function(angularEventObj, newUrlInfo)
  {
    //did not get invoked when event was emitted/broadcasted
    alert("angularEventObj"+JSON.stringify(angularEventObj)+"\n"+"newUrlInfo: "+newUrlInfo);
  });
  $rootScope.$on("$locationChangeSuccess",function(angularEventObj, newUrlInfo)
  {
    //did not get invoked when event was emitted/broadcasted
    alert("angularEventObj"+JSON.stringify(angularEventObj)+"\n"+"newUrlInfo: "+newUrlInfo);
  });
   
  $rootScope.$on('$viewContentLoaded', function(data,j,d,a,s,cd,de,dw,dsd,frws) { 
    ////did not get invoked when event was emitted/broadcasted
    alert("$viewContentLoaded");
  });

  alert("listeners: "+JSON.stringify($rootScope.$$listeners)+"\n"+"$$listenerCount: "+JSON.stringify(childScope.$$listenerCount));
  /*
  Output: listeners: {"$locationChangeStart":function,"$locationChangeSuccess":function,"$viewContentLoaded":function}
  $$listenerCount: {"$locationChangeStart":1,"$locationChangeSuccess":1,"$viewContentLoaded":1}
  */

  
});
/*This is excuted after above block. Above block is synchronous code so below statement executed after it */
alert("listeners: "+JSON.stringify($rootScope.$$listeners)+"\n"+"$$listenerCount: "+JSON.stringify(childScope.$$listenerCount));  
/*
  Output: listeners: null
  $$listenerCount: null
*/