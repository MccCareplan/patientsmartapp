export interface FormDefinition {
    "code": string,
    "name": string,
    "template": string
    "templateOptions": {
        "showFormHeader": boolean,
        "formHeaderItems": [{
            "question": string,
            "dataType": string,
            "answers": [{
                "text": string,
                "code": string
            }]
        }],
    },
    "items": [{
        "questionCode": string,
        "linkId": string,
        "questionCardinality": {
            "min": string,
            "max": string
        },
        "question": string,
        "answerCardinality": {
            min: string,
            max: string
        },
        "answers": any,
        "answerCodeSystem": string,
        "externallyDefined": string,
        "dataType": string,
        "units": [{
            "name": string,
            "code": string,
            "system": string,
            "default": boolean
        }],
        "header": boolean,
        "skipLogic": {
            "conditions": [{
                "source": string
                "trigger": {
                    "value": any,
                    "minExclusive": number,
                    "minInclusive": number,
                    "maxExclusive": number,
                    "maxInclusive": number
                }
            }],
            "action": string
        },
        displayControl: {
            "colCSS": any[],
            "listColHeaders": any[]
        }
        "codingInstructions": string,
        "calculationMethod": {
            "name": string
        }
    }],
}