export class Constants {
    public static readonly customHeadersName: string = "custom-headers-patient-app-1";
    public static featureToggling: any = {
        "healthAndSocialConcerns": {
            "activeDiagnoses": true,
            "inactiveDiagnoses": true,
            "socialConcerns": true
        },
        "goalsAndPreferences": {
            "goals": true,
            "targets": true,
            "patientChoices": true
        },
        "maintenanceAndInterventions": {
            "medications": true,
            "education": true,
            "counseling": true,
            "referrals": true
        },
        "status": {
            "clinicalResults": true,
            "labResults": true
        }
    }
}

interface PatientLabResultsMap {
    name: string;
    value: string;
    type: string;
}