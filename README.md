# Patientsmartapp


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Launching the application:

The Application is designed to run on a Mobile application and should be started by calling the slaunch.html file to initiate a smart-on-fhir standalone launch.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Generating updated models
- using: https://github.com/ferdikoomen/openapi-typescript-codegen
- Installed via: npm install openapi-typescript-codegen -g

$ openapi -i https://mcc-niddk-backend.wl.r.appspot.com/api -o src/app/generated-data-api

or

$ openapi -i http://localhost:8081/api-docs -o src/app/generated-data-api/


## Browse API
    https://mcc-niddk-backend.wl.r.appspot.com/swagger-ui/index.html?configUrl=/api-docs/swagger-config

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Public deployment
 The application is publically deployed at https://mcc-niddk-patient-ab784.web.app/launch.html - Whihch is hooked to the Logica Sandbox MCC ECareplan Test

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Open Public FHIR Instance
https://api.logicahealth.org/MCCeCarePlanTest/open

# Docker
The included file 'Dockerfle-prod' is a basic production build docker file. It will build the app and containerize it in a node nginx server.
In addtion if you have a built version you may dockerize using the simple Dockerfile, which will cause the image to be built based on your most recent compile.

### Runtime Environment variabls
| Variable name | Sample Value |
| ------------- | ------------- | 
| API_SERVER | http://localhost:8080 |
| CLIENT_ID | 123456789abcdef |
| LAUNCH_SERVER | https://api.logicahealth.org/MCCeCarePlanTest/data |
| AUTH_DEBUG | false |

### Via Docker
$ docker run -it -e CLIENT_ID='xxxyyzzz123123" -e API_SERVER='http://localhost:8080' -p 80:80 --rm mcccareplan/mccproviderapp

### Example of connecting to a local development docker instance and exposing the app on port 4200
$ docker run -it -e CLIENT_ID='xxxyyzzz123123' -e API_SERVER='http://localhost:8080' -e LAUNCH_SERVER='https://mylaunch.com" -p 4200:80 --rm mcccareplan/mccproviderapp


### Example of running locally against a local production MCC API from Logical
$ docker run -it -e CLIENT_ID='1491aa24-3b5b-42e8-b532-63707c359493' -e API_SERVER='http://localhost:8080' -p 4200:80 --rm mcccareplan/mccproviderapp

  
## Building a production docker image

### Building the image
 $  docker build -f Dockerfile-prod -t mcccareplan/mccpatientapp .

### Running the image

 $ docker run -it -p 80:80 --rm mcccareplan/mccpatientapp



#Changelog

2021-03-15
- Release ("1.0.4")
- Fixed data calls to have custom headers containing fhir server

2021-03-12
- Release ("1.0.3")
- New eGFR Model
- Better Data fault tolerance
- Docker environment fixed to support environment variables
- Environment Variable handle fixed
- Multi-Aspect web launch now used as fall back.
- Removed aspect ratio limits
- Modified header/graphs to be fully responsive
- Changed eGFR to query/handle multiple datasets

2021-03-04
- Release ("1.0.1")
- Individual Error handling for Labs/Vitals
