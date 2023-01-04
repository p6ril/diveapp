import { useTranslation } from 'react-i18next';
import DiverConsumption from './DiverConsumption';
import O2PartialPressure from './O2PartialPressure';
import DiverAscentRate from './DiverAscentRate';

function Diver (props) {
  const { t } = useTranslation();

  return (
    <fieldset>
      <legend>{t('diver.fieldsetLegend')}</legend>
      <DiverConsumption
        consumption={props.consumption}
        setDiverConsumption={props.setDiverConsumption} />
      <O2PartialPressure
        o2PartialPressure={props.o2PartialPressure}
        setO2PartialPressure={props.setO2PartialPressure} />
      <DiverAscentRate
        ascentRate={props.ascentRate}
        setAscentRate={props.setAscentRate} />
      <p>{t('diver.authorizedMaxDepth', {maxDepth: props.maxDepth})}</p>
    </fieldset>
  );
}

export default Diver;
