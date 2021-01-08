(function(window){
    window["env"] = window["env"] || {};

    //Environment Variables
  // clientId: "0950cf46-841c-466f-8bfb-19aa7d351b77",  //Public Server
  // clientId: "1491aa24-3b5b-42e8-b532-63707c359493", //Local Host Test
    window["env"]["clientId"] = "${CLIENT_ID}" || "0950cf46-841c-466f-8bfb-19aa7d351b77";
    window["env"]["apiServer"] = "${API_SERVER}";
    window['env']['standaloneServer']  = "${LAUNCH_SERVER}" || "https://api.logicahealth.org/MCCeCarePlanTest/data";
})(this);
