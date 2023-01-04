import { Trans } from 'react-i18next';
import { range } from '../utils/divelib';

/** @function
 * @name O2PartialPressure (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.o2PartialPressure - the oxygen partial pressure (in bars) coming from a parent component's state
 * @param {Function} props.setO2PartialPressure - a function to update the lifted up o2PartialPressure state value in a parent component
 * 0description O2PartialPressure is a controlled component that simply shows possible oxygen partial pressure values in a dropdown
 */

function O2PartialPressure (props) {
  const o2pp = range(1.4, 1.6, 0.1),
        options = o2pp.map(value =>
          <option key={'o2PartialPressure-' + value} value={value}>{value}</option>
        );

  return (
    <>
      <label><Trans i18nKey="diver.o2PartialPressureLabel">O<sub>2</sub> Partial Pressure</Trans></label>
      <select value={props.o2PartialPressure} onChange={props.setO2PartialPressure}>
        {options}
      </select>
    </>
  );
}

export default O2PartialPressure;
