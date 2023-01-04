import { useTranslation } from 'react-i18next';
import { range } from '../utils/divelib';
import config from '../data/config';

/** @function
 * @name DiverConsumption (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.consumption - the diver's estimated average gaz consumption (in liters / minute) coming from a parent component's state
 * @param {Function} props.setDiverConsumption - a function to update the lifted up consumption state value in a parent component
 * 0description DiverConsumption is a controlled component that simply shows possible consumption values in a dropdown
 */

function DiverConsumption (props) {
  const { t } = useTranslation(),
        min = config.diverMinConsumption,
        max = config.diverMaxConsumption,
        consumptions = range(min, max),
        options = consumptions.map(value =>
          <option key={'diverConsumption-' + value + 'l'} value={value}>{value}</option>
        );

  return (
    <>
      <label>{ t('diver.consumptionLabel') }</label>
      <select value={props.consumption} onChange={props.setDiverConsumption}>
        {options}
      </select>
    </>
  );
}

export default DiverConsumption;
