import CalendarWidget from 'formiojs/widgets/CalendarWidget';
import Widgets from 'formiojs/widgets';
export class ViewerCalendar extends CalendarWidget {
  get timezone() {
    // Ensure the displayInTimezone is never viewer since the server "views" the submission...
    if (!this.settings.displayInTimezone || (this.settings.displayInTimezone === 'viewer')) {
      this.settings.displayInTimezone = this.settings.submissionTimezone ? 'submission' : 'utc';
    }
    return super.timezone;
  }
}

// Create the viewer calendar.
Widgets.viewercalendar = ViewerCalendar;