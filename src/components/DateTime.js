import DateTimeComponent from 'formiojs/components/datetime/DateTime';
export default class ViewerDateTime extends DateTimeComponent {
  get timezone() {
    // Ensure the displayInTimezone is never viewer...
    if (
      this.options.pdf &&
      (!this.component.displayInTimezone || (this.component.displayInTimezone === 'viewer'))
    ) {
      if (
        this.options.submissionTimezone ||
        (this.root && this.root.options && this.root.options.submissionTimezone)
      ) {
        this.component.displayInTimezone = 'submission';
      }
      else {
        this.component.displayInTimezone = 'utc';
      }
    }
    return super.timezone;
  }
}