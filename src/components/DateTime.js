import DateTimeComponent from 'formiojs/components/datetime/DateTime';
export default class ViewerDateTime extends DateTimeComponent {
  performInputMapping(input) {
    if (input.widget && input.widget.settings) {
      //set to don't lose it after redraw.
      this.component.widget.submissionTimezone = this.submissionTimezone;
      input.widget.settings.submissionTimezone = this.submissionTimezone;
    }
    return input;
  }
}
