import { Formio } from 'formiojs/formio.form.js';
import './components/ViewerCalendar';
import ViewerDateTime from './components/DateTime';
Formio.Components.setComponent('datetime', ViewerDateTime);
export { Formio };
