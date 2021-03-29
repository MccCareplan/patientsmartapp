import { Component, OnInit } from '@angular/core';
import { Constants } from '../common/constants';
import { QuestionnaireService } from '../services/questionnaire.service';
declare var window: any;
declare var LForms: any;

@Component({
  selector: 'questionnaire-graph',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class GenericQuestionnaireComponent implements OnInit {

  constructor(
    protected questionnaireService: QuestionnaireService
  ) {

  }

  ngOnInit() {
    setTimeout(function () {
      window.createQuestionnaire(Constants.formDefinitionData, 'questionnaireFormContainer'  );//, { prepopulate: true })
    }, 1000);
  }

  submitForm() {
    this.questionnaireService.submit(LForms.Util.getFormHL7Data());
  }
}