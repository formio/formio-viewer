import { Formio } from 'formiojs/formio.form.js';
import Flatpickr from 'flatpickr';
window.flatpickr = window['flatpickr-css'] = Flatpickr;
import './components/ViewerCalendar';
import ViewerDateTime from './components/DateTime';
Formio.Components.setComponent('datetime', ViewerDateTime);
export { Formio };
