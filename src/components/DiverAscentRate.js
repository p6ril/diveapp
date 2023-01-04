import { useTranslation } from 'react-i18next';
import { range } from '../utils/divelib';

/** @function
 * @name DiverAscentRate (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.ascentRate - the ascent speed (in meters / mimute) coming from a parent component's state
 * @param {Function} props.setAscentRate - a function to update the lifted up ascentRare state value in a parent component
 * 0description DiverAscentRate is a controlled component that simply shows possible ascent speed values in a dropdown
 */

function DiverAscentRate (props) {
  const { t } = useTranslation(),
        ascentRates = range(9, 15),
        options = ascentRates.map(ascentRate =>
          <option key={'ascentRate-' + ascentRate} value={ascentRate}>{ascentRate}</option>
        );

  return (
    <>
      <label>{ t('diver.ascentRateLabel') }</label>
      <select value={props.ascentRate} onChange={props.setAscentRate}>
        {options}
      </select>
    </>
  );
}

export default DiverAscentRate;
