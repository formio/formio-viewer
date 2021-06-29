import CalendarWidget from 'formiojs/widgets/CalendarWidget';
import Widgets from 'formiojs/widgets';
export class ViewerCalendar extends CalendarWidget {
  constructor(settings, component, instance, index) {
    super(settings, component, instance, index);
    this.originalDisplayInTimezone = this.settings.displayInTimezone;
  }
  get timezone() {
    // Ensure the displayInTimezone is never viewer since the server "views" the submission...
    if (!this.originalDisplayInTimezone || this.originalDisplayInTimezone === 'viewer') {
      this.settings.displayInTimezone = this.settings.submissionTimezone ? 'submission' : 'utc';
    }
    return super.timezone;
  }
}

// Create the viewer calendar.
Widgets.viewercalendar = ViewerCalendar;
