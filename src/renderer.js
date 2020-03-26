import { Formio, Components } from 'formiojs/formio.form.js';
import './components/ViewerCalendar';
import ViewerDateTime from './components/DateTime';
Components.setComponent('datetime', ViewerDateTime);
export { Formio, Components };
