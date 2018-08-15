import DateTimeComponent from 'formiojs/components/datetime/DateTime';
export default class ViewerDateTime extends DateTimeComponent {
  get timezone() {
    // Ensure the displayInTimezone is never viewer...
    if (
      this.options.pdf &&
      (!this.component.displayInTimezone || (this.component.displayInTimezone === 'viewer'))
    ) {
      if (this.root && this.root.hasTimezone) {
        this.component.displayInTimezone = 'submission';
      }
      else {
        this.component.displayInTimezone = 'gmt';
      }
    }
    return super.timezone;
  }
}