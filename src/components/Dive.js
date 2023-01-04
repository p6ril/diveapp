import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** @function
 * @name Dive (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.depth - the target dive depth entered by the user in the input field (lifted up state in a parent component)
 * @param {integer} props.maxDepth - the maximun depth authorized depending on the gaz mix (beware of NITROX)
 * 0description the Dive component enables the user to input a target dive depth. I've decided for an uncontrolled
 *              component in order to display error / help messages as I want when the input field is invalid.
 */

function Dive (props) {
  const { t } = useTranslation();

  /** @function
   * @name onDiveDepthChange (component's event handler)
   * @param {Object} e - the event object fired when the dive depth input field changes
   * @param {Function} setDiveDepth - a function to update the lifted up diveDepth state value in a parent component
   * @description Sets the dive depth state value (whatever it is including NaN) in a parent component
   */
  
  function onDiveDepthChange (e, setDiveDepth) {
    const targetDepth = Number.parseFloat(e.target.value), // using parseFloat as the standard number input field validation allows for engineering format (i.e. 1.2e1 = 120)
          inputField = document.getElementById('diveDepthInputField');
  
    setDiveDepth(targetDepth, !inputField.validity.valid);
  }

  /** @function
   * @name onRepetitiveDivesClick (component's event handler)
   * @description manages whether the repetitive dives part of the form shows up
   */
  
  function onRepetitiveDivesClick () {
    const div = document.getElementById('repetitiveDives');
  
    div.classList.toggle('displayNone');
    div.classList.toggle('displayFlex');
  }

  // using the useEffect hook to set the input field value after the component is rendered as I
  // don't want to constrain the value directly on the input HTML element which has side effects.
  useEffect( () => {
    const inputField = document.getElementById('diveDepthInputField');

    if ( inputField.value === '' ) {
      inputField.value = props.depth;
     }
  }, [props.depth]);

  return (
    <fieldset>
      <legend>{ t('dive.fieldsetLegend') }</legend>
      <label htmlFor="diveDepthInputField">{ t('dive.depth.label') }</label>
      <input
        id="diveDepthInputField"
        type="number"
        required
        min="1"
        max={props.maxDepth}
        placeholder={ t('dive.depth.placeholder') }
        onChange={ (e) => {
          onDiveDepthChange(e, props.setDiveDepth);
        }}
      />
      <span className="validity"></span>
      <p id="diveDepthWarning" className="warning displayNone">{ t('dive.depth.warning', {maxDepth: props.maxDepth}) }</p>
      <label>{ t('dive.checkboxLabel') }</label>
      <input type="checkbox" onChange={onRepetitiveDivesClick}/>
      <div id="repetitiveDives" className="displayNone">
        <label>{ t('dive.gpsLabel') }</label>
        <input />
        <label>{ t('dive.lastDiveEndTimeLabel') }</label>
        <input type="datetime-local" />
        <label>{ t('dive.nextDiveTimeLabel') }</label>
        <input type="datetime-local" />
        <p className="warning">Cette fonctionnalité n'est pas encore implémentée. J'y travaille :-)</p>
      </div>
    </fieldset>
  );
}

export default Dive;
