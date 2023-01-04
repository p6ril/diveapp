import { useTranslation } from 'react-i18next';
import config from '../data/config';

function CylinderCapacity (props) {
  const { t } = useTranslation(),
        volumes = config.cylinderCapacities,
        options = volumes.map(volume =>
          ( <option key={'cylinderCapacity-' + volume + 'l'} value={volume}>{volume}</option> )
        );

  return (
    <>
      <label>{t('cylinder.capacity.label')}</label>
      <select value={props.volume} onChange={props.setCylinderCapacity}>
        {options}
      </select>
    </>
  );
}

export default CylinderCapacity;
