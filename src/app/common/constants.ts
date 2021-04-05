export class Constants {
    public static readonly questionnaireMap: Map<string, any[]> = new Map<string, any>(
        [
            [
                "75259-2",
                { "lformsVersion": "28.0.0", "PATH_DELIMITER": "/", "code": "75259-2", "codeList": [{ "code": "75259-2", "display": "PROMIS short form - pain intensity 3a - version 1.0" }], "identifier": null, "name": "PROMIS short form - pain intensity 3a - version 1.0", "type": "LOINC", "template": "table", "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx", "items": [{ "questionCode": "75262-6", "localQuestionCode": null, "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx", "question": "In the past 7 days - How intense was your pain at its worst?", "answers": [{ "label": "1", "code": "LA13879-4", "text": "Had no pain", "score": 1, "other": null }, { "label": "2", "code": "LA6752-5", "text": "Mild", "score": 2, "other": null }, { "label": "3", "code": "LA6751-7", "text": "Moderate", "score": 3, "other": null }, { "label": "4", "code": "LA6750-9", "text": "Severe", "score": 4, "other": null }, { "label": "5", "code": "LA13958-6", "text": "Very severe", "score": 5, "other": null }], "skipLogic": null, "restrictions": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "linkId": "/75262-6", "codeList": [{ "code": "75262-6", "display": "In the past 7 days - How intense was your pain at its worst?" }], "displayControl": { "answerLayout": { "type": "COMBO_BOX", "columns": "0" } }, "questionCardinality": { "min": "1", "max": "1" }, "answerCardinality": { "min": "0", "max": "1" } }, { "questionCode": "75261-8", "localQuestionCode": null, "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx", "question": "In the past 7 days - How intense was your average pain?", "answers": [{ "label": "1", "code": "LA13879-4", "text": "Had no pain", "score": 1, "other": null }, { "label": "2", "code": "LA6752-5", "text": "Mild", "score": 2, "other": null }, { "label": "3", "code": "LA6751-7", "text": "Moderate", "score": 3, "other": null }, { "label": "4", "code": "LA6750-9", "text": "Severe", "score": 4, "other": null }, { "label": "5", "code": "LA13958-6", "text": "Very severe", "score": 5, "other": null }], "skipLogic": null, "restrictions": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "linkId": "/75261-8", "codeList": [{ "code": "75261-8", "display": "In the past 7 days - How intense was your average pain?" }], "displayControl": { "answerLayout": { "type": "COMBO_BOX", "columns": "0" } }, "questionCardinality": { "min": "1", "max": "1" }, "answerCardinality": { "min": "0", "max": "1" } }, { "questionCode": "75260-0", "localQuestionCode": null, "dataType": "CNE", "header": false, "units": null, "codingInstructions": null, "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx", "question": "What is your level of pain right now?", "answers": [{ "label": "1", "code": "LA131-5", "text": "No pain", "score": 1, "other": null }, { "label": "2", "code": "LA6752-5", "text": "Mild", "score": 2, "other": null }, { "label": "3", "code": "LA6751-7", "text": "Moderate", "score": 3, "other": null }, { "label": "4", "code": "LA6750-9", "text": "Severe", "score": 4, "other": null }, { "label": "5", "code": "LA13958-6", "text": "Very severe", "score": 5, "other": null }], "skipLogic": null, "restrictions": null, "defaultAnswer": null, "formatting": null, "calculationMethod": null, "linkId": "/75260-0", "codeList": [{ "code": "75260-0", "display": "What is your level of pain right now?" }], "displayControl": { "answerLayout": { "type": "COMBO_BOX", "columns": "0" } }, "questionCardinality": { "min": "1", "max": "1" }, "answerCardinality": { "min": "0", "max": "1" } }, { "questionCode": "77825-8", "localQuestionCode": null, "dataType": "REAL", "header": false, "units": [{ "name": "{score}", "code": "{score}", "system": "http://unitsofmeasure.org", "default": false }], "codingInstructions": null, "copyrightNotice": "Copyright © 2010 PROMIS Health Organization or other individuals/entities that have contributed information and materials to Assessment Center, and are being used with the permission of the copyright holders. Use of PROMIS instruments (e.g., item banks, short forms, profile measures) are subject to the PROMIS Terms and Conditions available at: http://www.assessmentcenter.net/TandC.aspx", "question": "PROMIS short form - pain intensity 3a - version 1.0 raw score", "answers": null, "skipLogic": null, "restrictions": null, "defaultAnswer": null, "formatting": null, "calculationMethod": { "name": "TOTALSCORE", "value": ["/75262-6", "/75261-8", "/75260-0"] }, "linkId": "/77825-8", "codeList": [{ "code": "77825-8", "display": "PROMIS short form - pain intensity 3a - version 1.0 raw score" }], "questionCardinality": { "min": "1", "max": "1" }, "answerCardinality": { "min": "0", "max": "1" }, "unit": { "name": "{score}", "code": "{score}", "system": "http://unitsofmeasure.org", "default": false }, "value": 0 }], "templateOptions": { "showQuestionCode": false, "showCodingInstruction": false, "tabOnInputFieldsOnly": false, "hideFormControls": true, "showFormOptionPanel": false, "showFormOptionPanelButton": true, "showItemOptionPanelButton": true, "hideUnits": false, "allowMultipleEmptyRepeatingItems": false, "allowHTMLInInstructions": false, "useAnimation": true, "displayControl": { "questionLayout": "vertical" }, "viewMode": "auto", "showFormHeader": false, "showColumnHeaders": true, "defaultAnswerLayout": { "answerLayout": { "type": "COMBO_BOX", "columns": "0" } }, "useTreeLineStyle": true, "columnHeaders": [{ "name": "Name" }, { "name": "Value" }, { "name": "Units" }] }, "extension": [], "hasSavedData": true }
            ]
        ]
    )
    public static readonly customHeadersName: string = "custom-headers-patient-app-1";
    public static readonly labResultsMap: Map<string, PatientLabResultsMap[]> = new Map<string, PatientLabResultsMap[]>(
        [["general",
            [
                {
                    name: "Serum Creatinine",
                    value: "2.16.840.1.113762.1.4.1222.111",
                    type: "valueset"
                },
                {
                    name: "Hemoglobin",
                    value: "2.16.840.1.113762.1.4.1222.114",
                    type: "valueset"
                },
                {
                    name: "A1C",
                    value: "2.16.840.1.113762.1.4.1222.119",
                    type: "valueset"
                },
                {
                    name: "Serum Potassium",
                    value: "2.16.840.1.113762.1.4.1222.120",
                    type: "valueset"
                },
                {
                    name: "Serum Phosphorus",
                    value: "2.16.840.1.113762.1.4.1222.123",
                    type: "valueset"
                },
                {
                    name: "Calcium",
                    value: "17861-6",
                    type: "code"
                },
                {
                    name: "Serum Albumin",
                    value: "2.16.840.1.113762.1.4.1222.151",
                    type: "valueset"
                },
                {
                    name: "Blood Urea Nitrogen",
                    value: "2.16.840.1.113762.1.4.1222.113",
                    type: "valueset"
                },
                {
                    name: "LDL",
                    value: "2.16.840.1.113883.3.117.1.7.1.215",
                    type: "valueset"
                },
                {
                    name: "HDL",
                    value: "2.16.840.1.113762.1.4.1222.135",
                    type: "valueset"
                },
                {
                    name: "Triglycerides",
                    value: "2.16.840.1.113762.1.4.1222.137",
                    type: "valueset"
                },
                {
                    name: "Total Cholesterol",
                    value: "2.16.840.1.113762.1.4.1222.139",
                    type: "valueset"
                },
                {
                    name: "Vitamin D",
                    value: "2.16.840.1.113762.1.4.1222.126",
                    type: "valueset"
                },
                {
                    name: "Serum Bicarbonate",
                    value: "2.16.840.1.113762.1.4.1222.130",
                    type: "valueset"
                },
                {
                    name: "Sodium",
                    value: "2.16.840.1.113762.1.4.1222.131",
                    type: "valueset"
                },
                {
                    name: "Chloride",
                    value: "2.16.840.1.113762.1.4.1222.132",
                    type: "valueset"
                },
            ]],
        ["ckd", [
            {
                name: "eGFR",
                value: "2.16.840.1.113762.1.4.1222.179",
                type: "valueset"
            },
            {
                name: "Serum Creatinine",
                value: "2.16.840.1.113762.1.4.1222.111",
                type: "valueset"
            },
            {
                name: "UACR",
                value: "2.16.840.1.113883.3.6929.2.1002",
                type: "valueset"
            },
            {
                name: "Hemoglobin",
                value: "2.16.840.1.113762.1.4.1222.114",
                type: "valueset"
            },
            {
                name: "A1C",
                value: "2.16.840.1.113762.1.4.1222.119",
                type: "valueset"
            },
            {
                name: "Serum Potassium",
                value: "2.16.840.1.113762.1.4.1222.120",
                type: "valueset"
            },
            {
                name: "Serum Phosphorus",
                value: "2.16.840.1.113762.1.4.1222.123",
                type: "valueset"
            },
            {
                name: "Calcium",
                value: "17861-6",
                type: "code"
            },
            {
                name: "Serum Albumin",
                value: "2.16.840.1.113762.1.4.1222.151",
                type: "valueset"
            },
            {
                name: "Transferrin Saturation",
                value: "2.16.840.1.113762.1.4.1222.118",
                type: "valueset"
            },
            {
                name: "Ferritin",
                value: "2.16.840.1.113762.1.4.1222.140",
                type: "valueset"
            },
            {
                name: "Blood Urea Nitrogen",
                value: "2.16.840.1.113762.1.4.1222.113",
                type: "valueset"
            },
            {
                name: "LDL",
                value: "2.16.840.1.113883.3.117.1.7.1.215",
                type: "valueset"
            },
            {
                name: "HDL",
                value: "2.16.840.1.113762.1.4.1222.135",
                type: "valueset"
            },
            {
                name: "Triglycerides",
                value: "2.16.840.1.113762.1.4.1222.137",
                type: "valueset"
            },
            {
                name: "Total Cholesterol",
                value: "2.16.840.1.113762.1.4.1222.139",
                type: "valueset"
            },
            {
                name: "Vitamin D",
                value: "2.16.840.1.113762.1.4.1222.126",
                type: "valueset"
            },
            {
                name: "KT/V",
                value: "2.16.840.1.113762.1.4.1222.128",
                type: "valueset"
            },
            {
                name: "Intact Parathyroid Hormone",
                value: "2.16.840.1.113762.1.4.1222.129",
                type: "valueset"
            },
            {
                name: "Serum Bicarbonate",
                value: "2.16.840.1.113762.1.4.1222.130",
                type: "valueset"
            },
            {
                name: "Sodium",
                value: "2.16.840.1.113762.1.4.1222.131",
                type: "valueset"
            },
            {
                name: "Chloride",
                value: "2.16.840.1.113762.1.4.1222.132",
                type: "valueset"
            },
            {
                name: "PTH",
                value: "2.16.840.1.113762.1.4.1222.129",
                type: "valueset"
            }
        ]]
        ]);

    public static readonly vitalSignsMap: Map<string, PatientLabResultsMap[]> = new Map<string, PatientLabResultsMap[]>(
        [["general", [
            {
                name: "Blood Pressure",
                value: "85354-9",
                type: "panel"
            },
            {
                name: "Weight",
                value: "29463-7",
                type: "panel"
            }
        ]],
        ["ckd", [
            {
                name: "Blood Pressure",
                value: "85354-9",
                type: "panel"
            },
            {
                name: "Weight",
                value: "29463-7",
                type: "panel"
            },
            {
                name: "Cognitive Status",
                value: "72172-0",
                type: "question"
            },
            {
                name: "Fatigue",
                value: "77864-7",
                type: "question"
            },
            {
                name: "Functional Status",
                value: "77827-4",
                type: "question"
            },
            {
                name: "Pain Interference",
                value: "77865-4",
                type: "question"
            },
            {
                name: "Pain Severity",
                value: "38221-8",
                type: "question"
            },
            {
                name: "PHQ9",
                value: "44261-6",
                type: "question"
            }
        ]]
        ]);
}

interface PatientLabResultsMap {
    name: string;
    value: string;
    type: string;
}
