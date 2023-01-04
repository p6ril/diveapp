import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../data/config';

/** @function
 * @name CylinderPressure (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.pressure - the diving tank pressure (in bars) entered by the user in the input field (lifted up state in a parent component)
 * @param {integer} props.reserve - the pressure safety reserve (in bars)
 * @param {Function} setPressure - a function to update the lifted up cylinder pressure state value in a parent component
 * 0description the CylinderPressure component enables the user to input the cylinder operating pressure. I've decided for an uncontrolled
 *              component in order to display error / help messages as I want when the input field is invalid.
 */

function CylinderPressure (props) {
  const { t } = useTranslation();

  /** @function
   * @name onCylinderPressureChange
   * @param {Object} e - the event object fired on the tank pressure input field change
   * @param {Function} setPressure - a function to change the lifted up cylinderPressure state value in a parent component
   * @description Sets the cylinder pressure state value (whatever it is including NaN) in a parent component
   */
  
  function onCylinderPressureChange (e, setPressure) {
    const pressure = Number.parseInt(e.target.value, 10), // can be NaN if parseInt fails
          inputField = document.getElementById('cylinderPressureInputField');
  
    setPressure(pressure, !inputField.validity.valid);
  }

  // using the useEffect hook to set the input field value after the component is rendered as I
  // don't want to constrain the value directly on the input HTML element which has side effects.
  useEffect( () => {
    const inputField = document.getElementById('cylinderPressureInputField');

    if ( inputField.value === '' ) {
      inputField.value = props.pressure;
     }
  }, [props.pressure]);

  return (
    <>
      <label htmlFor="cylinderPressureInputField">{ t('cylinder.pressure.label') }</label>
      <input
        id="cylinderPressureInputField"
        type="number"
        required
        min={ !Number.isNaN(props.reserve) ? props.reserve + 10 : 60 }
        max={config.cylinderMaxPressure}
        step="10"
        placeholder={ t('cylinder.pressure.placeholder') }
        onChange={ (e) => {
          onCylinderPressureChange(e, props.setCylinderPressure);
        }}
      />
      <span className="validity"></span>
      <p id="cylinderPressureWarning" className="warning displayNone">{ t('cylinder.pressure.warning', {maxPressure: config.cylinderMaxPressure}) }</p>
    </>
  );
}

export default CylinderPressure;
