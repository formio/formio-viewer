// Change this file to alter the renderer to create custom renderer for your viewer.
import AllComponents from 'formiojs/components';
import Formio from 'formiojs/Formio';
import Components from 'formiojs/components/Components';
Components.setComponents(AllComponents);
Formio.Components = Components;
export Form from 'formiojs/Form';
export Utils from 'formiojs/utils';
export { Components, Formio };