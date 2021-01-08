(function (window) {
  window["env"] = window["env"] || {};

  //Environment Variables
  // clientId: "0950cf46-841c-466f-8bfb-19aa7d351b77",  //Public Server
  // clientId: "1491aa24-3b5b-42e8-b532-63707c359493", //Local Host Test
  //Maybe be replaced by the copy in src/deployment/production
  window["env"]["clientId"] = "1491aa24-3b5b-42e8-b532-63707c359493";
  window["env"]["apiServer"] = "";
  window['env']['standaloneServer'] = "https://api.logicahealth.org/MCCeCarePlanTest/data";
})(this);
