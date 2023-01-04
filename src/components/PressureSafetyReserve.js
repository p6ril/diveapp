import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../data/config';

/** @function
 * @name PressureSafetyReserve (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.pressure - the diving tank pressure (in bars)
 * @param {integer} props.reserve - the pressure safety reserve (in bars) entered by the user in the input field (lifted up state in a parent component)
 * @param {Function} setReserve - a function to update the lifted up cylinder pressure safety reserve state value in a parent component
 * 0description the PressureSafetyReserve component enables the user to input a pressure safety reserve. I've decided for an uncontrolled
 *              component in order to display error / help messages as I want when the input field is invalid.
 */

function PressureSafetyReserve (props) {
  const { t } = useTranslation();

  /** @function
   * @name onSafetyPressureReserveChange
   * @arg {Object} e - the event object fired on the tank air reserve input field change
   * @arg {Function} setAirReserve- a function to change the pressureReserve state value
   * @arg {string} warning - the warning message displayed in case of improper value
   * @description checks the user input validity 
   */
  
  function onPressureSafetyReserveChange (e, setReserve) {
    const reserve = Number.parseInt(e.target.value, 10), // can be NaN if parseInt fails
          inputField = document.getElementById('pressureSafetyReserveInputField');
  
    setReserve(reserve, !inputField.validity.valid);
  }

  // using the useEffect hook to set the input field value after the component is rendered as I
  // don't want to constrain the value directly on the input html element which has side effects.
  useEffect( () => {
    const inputField = document.getElementById('pressureSafetyReserveInputField');

    if ( inputField.value === '' ) {
      inputField.value = props.reserve;
     }
  }, [props.reserve]);

  return (
    <>
      <label htmlFor="pressureSafetyReserveInputField">{ t('cylinder.reserve.label') }</label>
      <input
        id="pressureSafetyReserveInputField"
        type="number"
        required
        min={config.pressureSafetyReserveMin}
        max={config.pressureSafetyReserveMax}
        step="10"
        placeholder={ t('cylinder.reserve.placeholder') }
        onChange={ (e) => {
          onPressureSafetyReserveChange(e, props.setPressureSafetyReserve);
        }}
      />
      <span className="validity"></span>
      <p id="pressureSafetyReserveWarning" className="warning displayNone">{ t('cylinder.reserve.warning', {min: config.pressureSafetyReserveMin, max:config.pressureSafetyReserveMax}) }</p>
    </>
  );
}

export default PressureSafetyReserve;
