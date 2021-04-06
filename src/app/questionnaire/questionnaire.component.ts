import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Constants } from '../common/constants';
import { QuestionnaireService } from '../services/questionnaire.service';
import * as fromRoot from '../ngrx/reducers';
declare var LForms: any;

@Component({
  selector: 'questionnaire-graph',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class GenericQuestionnaireComponent implements OnInit {
  @Input() code: string;
  private patientId: string;

  constructor(
    private store: Store<fromRoot.State>,
    protected questionnaireService: QuestionnaireService
  ) {

  }

  ngOnInit() {
    // @ts-ignore
    this.code = code;
    if (this.code) {
      // this.renderNewForm();
      this.findExistingResponses();
    }

    this.store.select(fromRoot.getPatientProfile).subscribe(x => {
      if (x && x.fhirid) {
        this.patientId = x.fhirid;
      }
    });
  }


  renderNewForm() {
    LForms.Util.addFormToPage(Constants.questionnaireMap.get(this.code), "questionnaireFormContainer", { prepopulate: true });
  }

  submitForm() {
    var qr = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
    qr.questionnaire = "Questionnaire/loinc-" + this.code;
    qr.subject = {
      "reference": "Patient/" + this.patientId
    }
    this.questionnaireService.submit(qr).then(x => {
      window.alert("Succesfully posted.");
    }).catch(x => {
      window.alert("Error: " + JSON.stringify(x));
    });
  }


  // TODO: Having difficulty rendering this using the LForms plugin.  May need to re-architect
  findExistingResponses() {
    this.questionnaireService.getQuestionnaireResponsesForSubject("cc-pat-betsy").then((x: any) => {
      let matchFound: boolean = false;
      for (var i = 0; i < x.entry.length; i++) {
        let entry = x.entry[i];
        if (entry.resource.questionnaire.indexOf(this.code) > -1) {
          this.renderExistingForm(entry);
          matchFound = true;
          break;
        }
      }
      if (!matchFound) this.renderNewForm();
    }).catch(x => {
      this.renderNewForm();
    });
  }

  // TODO
  renderExistingForm(formData: any) {
    let template = LForms.Util.convertFHIRQuestionnaireToLForms(Constants.questionnaireMap.get(this.code), "R4");
    let formattedForm = LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", formData, template, "R4");
    LForms.Util.addFormToPage(formattedForm, "questionnaireFormContainer", { prepopulate: true });
  }
}