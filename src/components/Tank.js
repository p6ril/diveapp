import { useTranslation } from 'react-i18next';
import CylinderCapacity from './CylinderCapacity';
import CylinderPressure from './CylinderPressure';
import PressureSafetyReserve from './PressureSafetyReserve';
import OxygenRatio from './OxygenRatio';

function Tank (props) {
  const { t } = useTranslation();

  return (
    <fieldset>
      <legend>{t('cylinder.fieldsetLegend')}</legend>
      <CylinderCapacity
        volume={props.cylinderCapacity}
        setCylinderCapacity={props.setCylinderCapacity} />
      <CylinderPressure
        pressure={props.cylinderPressure}
        reserve={props.pressureSafetyReserve} // tweak to access the tank's pressure safety reserve value from the pressure validation function on change
        setCylinderPressure={props.setCylinderPressure} />
      <PressureSafetyReserve
        pressure={props.cylinderPressure} // tweak to access the tank's pressure value from the pressure safety reserve validation function on change
        reserve={props.pressureSafetyReserve}
        setPressureSafetyReserve={props.setPressureSafetyReserve} />
      <OxygenRatio
        oxygenRatio={props.oxygenRatio}
        setOxygenRatio={props.setOxygenRatio} />
    </fieldset>
  );
}

export default Tank;
