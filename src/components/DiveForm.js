import Tank from './Tank';
import Diver from './Diver';
import Dive from './Dive';

function DiveForm(props) {
  return (
    <div>
      <form>
        <Tank
          cylinderCapacity={props.cylinderCapacity}
          cylinderPressure={props.cylinderPressure}
          pressureSafetyReserve={props.pressureSafetyReserve}
          oxygenRatio={props.oxygenRatio}
          setCylinderCapacity={props.setCylinderCapacity}
          setCylinderPressure={props.setCylinderPressure}
          setPressureSafetyReserve={props.setPressureSafetyReserve}
          setOxygenRatio={props.setOxygenRatio}
          setErrorStatus={props.setErrorStatus} />
        <Diver
          consumption={props.diverConsumption}
          o2PartialPressure={props.o2PartialPressure}
          ascentRate={props.ascentRate}
          maxDepth={props.maxDepth}
          setDiverConsumption={props.setDiverConsumption}
          setO2PartialPressure={props.setO2PartialPressure}
          setAscentRate={props.setAscentRate} />
        <Dive
          depth={props.diveDepth}
          maxDepth={props.maxDepth}
          setDiveDepth={props.setDiveDepth}
          setErrorStatus={props.setErrorStatus} />
      </form>
    </div>
  );
}

export default DiveForm;
