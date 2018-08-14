// Import all components and alter those for this viewer.
import AllComponents from 'formiojs/components';
import ViewerDateTime from './components/DateTime';
AllComponents.datetime = ViewerDateTime;

import Formio from 'formiojs/Formio';
import Components from 'formiojs/components/Components';
Components.setComponents(AllComponents);
Formio.Components = Components;
export Form from 'formiojs/Form';
export Utils from 'formiojs/utils';
export { Components, Formio };