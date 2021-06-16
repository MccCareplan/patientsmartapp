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
 The application is publically deployed at https://mcc-niddk-patient-ab784.web.app/launch.html - Which is hooked to the Logica Sandbox MCC ECareplan Test

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Open Public FHIR Instance
https://api.logicahealth.org/MCCeCarePlanTest/open

# Docker
The included file 'Dockerfle-prod' is a basic production build docker file. It will build the app and containerize it in a node nginx server.
In addtion if you have a built version you may dockerize using the simple Dockerfile, which will cause the image to be built based on your most recent compile.

### Runtime Environment variables
| Variable name | Sample Value |
| ------------- | ------------- | 
| API_SERVER | http://localhost:8080 |
| CLIENT_ID | 123456789abcdef |
| LAUNCH_SERVER | https://api.logicahealth.org/MCCeCarePlanTest/data |
| AUTH_DEBUG | false |

## Environment variables to override after build
| Path | File Name | Description |
| ---- | --------- | ----------- |
| /assets/json/data | lab-mappings.json | Defines the lab results to query on the "Health Status" screen.  Use the file found in  folder [/assets/json/data-backups](src/assets/json/data-backups) | 
| /assets/json/data | vital-mappings.json | Defines the vital signs to query on the "Health Status" screen  Use the file found in  folder [/assets/json/data-backups](src/assets/json/data-backups) | 
| /assets/json/data | feature-toggling.json | Toggle functionality on/off across the application.  Also configure preferred units.  Use the file found in  folder [/assets/json/data-backups](src/assets/json/data-backups) | 
| /assets/icons/logo | logo.jpg | Organizational Icon shown in the header (suggested aspect ratio is 4:7 or something close to this) | 

The file names and types must match exactly.  Also, you must include all json files even if you are only modifying one.

Running with a custom logo
$ docker run -v {Path to folder with logo.jpg}:/usr/share/nginx/html/assets/icons/logo -d -p 80:80 --rm mcccareplan/mccpatientapp

Running with custom json files
$ docker run -v {Path to folder with .json files}:/usr/share/nginx/html/assets/json/data -d -p 80:80 --rm mcccareplan/mccpatientapp


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
2021-06-15
- Release ("1.1.6")
- Updated WoT to have configurable preferred units
- Updated WoT to have dynamic y-axis range
- Updated WoT to render preferred units in title and data
- Updated CSS to account for odd responsive behavior in status screen

2021-06-14
- Release ("1.1.5")
- Removed color coding for Weight Over Time

2021-05-21
- Release ("1.1.4")
- Experimental fix for caching issues

2021-05-14
- Release ("1.1.3")
- New EGFR unit types api param utilized
- Added "firstRecorded" as field to display for active/inactive conditions

2021-05-11
- Release ("1.1.2")
- New nginx config file added to docker build process to fix intermittent 404 routing issues
- Change default logo to NIDDK
- Whitelisting the launch.html file (will hopefully resolve the firefox/safari persistent user issue)
- Updated readme for simpler instructions on deploying custom image

2021-05-10
- Release ("1.1.1")
- 404 Retry handler
- Handling EGFR values without a unit type
- Added "EGFR" label to EGFR dropdown values

2021-05-4
- Release ("1.1.0")
- Remove default logo
- Patient banner restyling
- Attempted fix for UACR/EGFR lifecycle issues

2021-05-03
- Release ("1.0.9")
- Fix specific table sorting
- Converted customize-able features into docker commands (see readme)
- Fixed custom table sorting
- Fixed cursor not indicating clickable events in labs/vitals
- Added a "launch.html"

2021-04-20
- Release ("1.0.8")
- Fix for Firefox session issues
- Demographic header info
- UACR graph not rendering fix
- Hiding email on Care Team contacts
- Better labels for questionnaires

2021-04-08
- Release ("1.0.7")
- Fix for WoT graph
- Labs/Vitals configurable via JSON
- Features able to be toggled on/off via JSON

2021-03-29
- Release ("1.0.6")
- Handling no careplans available
- Better responsiveness
- Crash fixes

2021-03-15
- Release ("1.0.5")
- Changed method of setting custom header to avoid state issues

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
