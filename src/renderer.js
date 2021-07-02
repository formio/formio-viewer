import { Formio } from 'formiojs/formio.form.js';
import Flatpickr from 'flatpickr';
window.flatpickr = window['flatpickr-css'] = Flatpickr;
import './components/ViewerCalendar';
import ViewerDateTime from './components/DateTime';
import ViewerTextField from './components/TextField';
Formio.Components.setComponent('datetime', ViewerDateTime);
Formio.Components.setComponent('textfield', ViewerTextField);
export { Formio };
