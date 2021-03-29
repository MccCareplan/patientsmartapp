export interface Questionnaire {
    lformsVersion: string;
    PATH_DELIMITER: string;
    code: string;
    codeList?: (CodeListEntity)[] | null;
    identifier?: null;
    name: string;
    type: string;
    template: string;
    copyrightNotice?: null;
    items?: (ItemsEntity)[] | null;
    templateOptions: TemplateOptions;
    extension?: (null)[] | null;
    hasSavedData: boolean;
}
export interface CodeListEntity {
    code: string;
    display: string;
}
export interface ItemsEntity {
    questionCode: string;
    localQuestionCode?: null;
    dataType: string;
    header: boolean;
    units?: (UnitsEntityOrUnit)[] | null;
    codingInstructions?: string | null;
    copyrightNotice?: null;
    question: string;
    answers?: (AnswersEntity)[] | null;
    skipLogic?: null;
    restrictions?: null;
    defaultAnswer?: null;
    formatting?: null;
    calculationMethod?: null;
    linkId: string;
    codeList?: (CodeListEntity)[] | null;
    questionCardinality: QuestionCardinalityOrAnswerCardinality;
    answerCardinality: QuestionCardinalityOrAnswerCardinality;
    unit?: UnitsEntityOrUnit1 | null;
    displayControl?: DisplayControlOrDefaultAnswerLayout | null;
}
export interface UnitsEntityOrUnit {
    name: string;
    code?: string | null;
    system?: string | null;
    default: boolean;
}
export interface AnswersEntity {
    label?: null;
    code: string;
    text: string;
    other?: null;
}
export interface QuestionCardinalityOrAnswerCardinality {
    min: string;
    max: string;
}
export interface UnitsEntityOrUnit1 {
    name: string;
    code?: string | null;
    system?: string | null;
    default: boolean;
}
export interface DisplayControlOrDefaultAnswerLayout {
    answerLayout: AnswerLayout;
}
export interface AnswerLayout {
    type: string;
    columns: string;
}
export interface TemplateOptions {
    showQuestionCode: boolean;
    showCodingInstruction: boolean;
    tabOnInputFieldsOnly: boolean;
    hideFormControls: boolean;
    showFormOptionPanel: boolean;
    showFormOptionPanelButton: boolean;
    showItemOptionPanelButton: boolean;
    hideUnits: boolean;
    allowMultipleEmptyRepeatingItems: boolean;
    allowHTMLInInstructions: boolean;
    useAnimation: boolean;
    displayControl: DisplayControl;
    viewMode: string;
    showFormHeader: boolean;
    formHeaderItems?: (FormHeaderItemsEntity)[] | null;
    showColumnHeaders: boolean;
    defaultAnswerLayout: DisplayControlOrDefaultAnswerLayout1;
    useTreeLineStyle: boolean;
    columnHeaders?: (ColumnHeadersEntity)[] | null;
}
export interface DisplayControl {
    questionLayout: string;
}
export interface FormHeaderItemsEntity {
    question: string;
    questionCode: string;
    dataType: string;
    answers?: string | (AnswersEntity1)[] | null;
    answerCardinality?: QuestionCardinalityOrAnswerCardinality1 | null;
}
export interface AnswersEntity1 {
    text: string;
    code: string;
}
export interface QuestionCardinalityOrAnswerCardinality1 {
    min: string;
    max: string;
}
export interface DisplayControlOrDefaultAnswerLayout1 {
    answerLayout: AnswerLayout;
}
export interface ColumnHeadersEntity {
    name: string;
}
