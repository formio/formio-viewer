import TextFieldComponent from 'formiojs/components/textfield/TextField';

export default class ViewerTextField extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Pass along the pdf option to the calendar widget.
    if (this.options.pdf && this.component.widget?.type === 'calendar') {
      this.component.widget.type = 'viewercalendar';
    }
  }

  performInputMapping(input) {
    if (input.widget && input.widget.settings) {
      //set to don't lose it after redraw.
      this.component.widget.submissionTimezone = this.submissionTimezone;
      input.widget.settings.submissionTimezone = this.submissionTimezone;
    }
    return input;
  }
}
