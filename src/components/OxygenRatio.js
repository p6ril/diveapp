import { useTranslation } from 'react-i18next';
import { range } from '../utils/divelib';

/** @function
 * @name OxygenRatio (React component)
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.oxygenRatio - the oxygen ratio (in %) coming from a parent component's state
 * @param {Function} props.setOxygenRatio - a function to update the lifted up oxygenRatio state value in a parent component
 * 0description  OxygenRatio is a controlled component that simply shows possible oxygen ratio values in a dropdown
 */

function OxygenRatio (props) {
  const { t } = useTranslation(),
        airLabel = t('cylinder.oxygenRatio.air'),
        nitroxLabel = t('cylinder.oxygenRatio.nitrox'),
        ratios = range(21, 40),
        options = ratios.map(ratio =>
          ( <option key={'oxygenRatio-' + ratio} value={ratio}>{ratio}</option> )
        );

  /** @function
   * @name onOxygenRatioChange (component's event handler)
   * @param {Object} e - the event object fired when the oxygen ratio input field changes
   * @param {Function} setOxygenRatio - a function to update the lifted up oxygenRatio state value in a parent component
   * @description Sets the gaz label as appropriate then updates the oxygen ratio state value in a parent component
   */

  function onOxygenRatioChange (e, setOxygenRatio, labels) {
    const gazMixLabel = document.getElementById('gazMixLabel');
 
    if ( e.target.value > 21 ) {
      gazMixLabel.innerHTML = labels.nitrox;
      gazMixLabel.classList.replace('air', 'nitrox');
    } else {
      gazMixLabel.innerHTML = labels.air;
      gazMixLabel.classList.replace('nitrox', 'air');
    }
    setOxygenRatio(e);
  }

  return (
    <>
      <label>{ t('cylinder.oxygenRatio.label') } - <span id="gazMixLabel" className={( props.oxygenRatio > 21 ) ? 'nitrox' : 'air'}>{( props.oxygenRatio > 21 ) ? nitroxLabel : airLabel}</span></label>
      <select
        value={props.oxygenRatio}
        onChange={ (e) => {
          onOxygenRatioChange(e, props.setOxygenRatio, {air: airLabel, nitrox: nitroxLabel});
        }}>
        {options}
      </select>
    </>
  );
}

export default OxygenRatio;
