import { Component, Input, OnInit } from '@angular/core';
import { Constants } from '../common/constants';
import { QuestionnaireService } from '../services/questionnaire.service';
declare var LForms: any;

@Component({
  selector: 'questionnaire-graph',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class GenericQuestionnaireComponent implements OnInit {
  @Input() code: string;

  constructor(
    protected questionnaireService: QuestionnaireService
  ) {

  }

  ngOnInit() {
    // @ts-ignore
    this.code = code;
    if (this.code) {
      this.renderNewForm();
    }
  }


  renderNewForm() {
    LForms.Util.addFormToPage(Constants.questionnaireMap.get(this.code), "questionnaireFormContainer", { prepopulate: true });
  }

  submitForm() {
    var qr = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
    qr.questionnaire = "Questionnaire/loinc-" + this.code;
    qr.subject = {
      "reference": "Patient/cc-pat-betsy"
    }
    this.questionnaireService.submit(qr);
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
    //
  }
}