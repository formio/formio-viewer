import DateTimeComponent from 'formiojs/components/datetime/DateTime';
export default class ViewerDateTime extends DateTimeComponent {
  offset(date) {
    // Ensure the displayInTimezone in viewer is never "viewer" for server PDF generation to work correctly...
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
    return super.offset(date);
  }
}