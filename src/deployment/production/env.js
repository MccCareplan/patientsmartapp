(function(window){
    window["env"] = window["env"] || {};

    //Environment Variables
  // clientId: "0950cf46-841c-466f-8bfb-19aa7d351b77",  //Public Server
  // clientId: "1491aa24-3b5b-42e8-b532-63707c359493", //Local Host Test
    window["env"]["clientId"] = "eec8d2d2-fb01-4b3c-809e-8b6feac595e8";
    window["env"]["apiServer"] = "https://mcc-niddk-backend.wl.r.appspot.com";
    window['env']['standaloneServer'] = 'https://api.logicahealth.org/MCCeCarePlanTest/data';
    window["env"]["authdebug"] = "false";
})(this);
