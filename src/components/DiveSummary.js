import { useTranslation, Trans } from 'react-i18next';
import config from '../data/config';
import { litersToBars } from '../utils/divelib';

/** @function
 * @name NDLDive
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {boolean} props.show - true if the current dive is in the NDL, false otherwise
 * 0description displays a short message if the current dive is in the No Decompression Limit (NDL) (i.e. no deco stop)
 */

 function NDLDive (props) {
  const { t } = useTranslation();

  return ( props.show && ( <p className="fontsize120p bold green">{ t('divesummary.information.ndldive') }</p> ) ) || null;
}

/** @function
 * @name MaxDurationDive
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {boolean} props.show - true if the current dive duration is the longest possible, false otherwise
 * 0description displays a short message if the current dive duration is the longest possible
 */

 function MaxDurationDive (props) {
  const { t } = useTranslation();

  return ( props.show && ( <p className="fontsize120p bold orange">{ t('divesummary.information.maxdurationdive') }</p> ) ) || null;
}

/** @function
 * @name DiveDuration
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.volume - the volume of gaz (in liters) required for the dive
 * @param {integer} props.volumeRatio - the volume of gaz ratio (in %) required for the dive
 * @param {integer} props.pressure - the pressure equivalent (in bars) required for the dive
 * @param {integer} props.duration - the dive duration
 * 0description displays the volume consumed as well as the max duration at detpth
 */

function DiveDuration (props) {
  const { t } = useTranslation();

  return (
    <table>
      <tbody>
        <tr>
          <td rowSpan="2">{ t('divesummary.volume.label') }</td>
          <td>{ t('divesummary.volume.value', {volume: props.volume, volumeRatio: props.volumeRatio}) }</td>
        </tr>
        <tr>
          <td>({props.pressure} bars)</td>
        </tr>
        <tr>
          <td className="fontsize120p bold">{ t('divesummary.maxduration.label') }</td>
          <td><span className="highlight">{ t('divesummary.maxduration.value', {duration: props.duration}) }</span></td>
        </tr>
      </tbody>
    </table>
  );
}

/** @function
 * @name AscentTotalDuration
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.dtr - the ascent total duration, including deco stops (in minutes)
 * @param {Array} props.stops - an array of stop durations (in minutes) if any or an empty array
 * @param {Array} props.stopDepths - an array containing the stop depths (in meters) considered for the dive [15, 9, 6, ...] if any or null
 * 0description displays the total ascent duration (in minutes) as well as the stop depths and durations if any
 */

function AscentTotalDuration (props) {
  const { t } = useTranslation();

  return (
    <table>
      <tbody>
        { ( props.dtr >= 10 ) ?
          ( <tr>
              <td className="fontsize120p bold">{ t('divesummary.dtr.label') }</td>
              <td><span className="highlight">{ t('divesummary.dtr.value', {dtr: props.dtr}) }</span></td>
            </tr> ) :
          ( <tr>
              <td>{ t('divesummary.dtr.label') }</td>
              <td>{ t('divesummary.dtr.value', {dtr: props.dtr}) }</td>
            </tr> )
        }
        <DecoStops stops={props.stops} stopDepths={props.stopDepths} />
      </tbody>
    </table>
  );
}

/** @function
 * @name DecoStops
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {Array} props.stops - an array of stop durations (in minutes) if any or an empty array
 * @param {Array} props.stopDepths -  an array containing the stop depths (in meters) considered for the dive [15, 9, 6, ...] if any or null
 * 0description displays the necessary deco stop (if any) details for the dive
 */

function DecoStops (props) {
  const { t } = useTranslation();

  if ( props.stops.length === 0 ) { // no deco stop
    return null;
  } else {
    return (props.stops.map( (duration, index) =>
      ( <tr key={'stopDepth-' + props.stopDepths[index] + 'm'}>
        <td>{ t('divesummary.stop.label', {stopDepth: props.stopDepths[index]}) }</td>
        <td>{ t('divesummary.stop.value', {stopDuration: duration}) }</td>
      </tr> ))
    );
  }
}

/** @function
 * @name Consumption
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.diveReqs - the dive (at depth) pressure requiremets (in bars)
 * @param {integer} props.ascentReqs - the ascent (excluding deco stops) pressure requiremets (in bars)
 * @param {integer} props.decoReqs - the deco stops, if any, pressure requirements (in bars)
 * 0description displays the dive pressure requirements (in bars): at depth, during the ascent up to the first deco stop if any or the surface, for the deco stops if any
 */

function Consumption (props) {
  const { t } = useTranslation();

  return (
    <table>
      <tbody>
        <tr><td>{ t('divesummary.consumption.title') }</td></tr>
        <tr><td>{ t('divesummary.consumption.dive') }</td><td>{props.diveReqs} bars</td></tr>
        <tr><td>{ t('divesummary.consumption.ascent') }</td><td>{props.ascentReqs} bars</td></tr>
        { !!props.decoReqs ? ( <tr><td>{t('divesummary.consumption.deco') }</td><td>{props.decoReqs} bars</td></tr> ) : null }
      </tbody>
    </table>
  );
}

/** @function
 * @name AscentMinPressure
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.pressure - the minimal pressure (in bars) at which to start the ascent
 * 0description displays the minimal pressure (in bars) at which to start the ascent
 */

 function AscentMinPressure (props) {
  const { t } = useTranslation();

  return (
    <table>
      <tbody>
        <tr>
          <td className="fontsize120p bold">{ t('divesummary.ascentminpressure.label') }</td>
          <td><span className="highlight">{props.pressure} bars</span></td>
        </tr>
      </tbody>
    </table>
  );
}

/** @function
 * @name SafetyWarning
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {boolean} props.safetyWarning - a boolean indicating if a safety warning applies
 * @param {boolean} props.isMaxDurationDive - a boolean to limit showing the warning only on the max duration dive
 * 0description displays a security warning if the pressure safety reserve won't cover the duration of the next deco stops
 */

 function SafetyWarning (props) {
  const icon = require('../img/warning-icon-96px.png'),
        { t } = useTranslation();

  return ( props.isMaxDurationDive && props.safetyWarning && (
    <div id="safetyWarning" className="warning">
      <img src={icon}
          title={ t('divesummary.safetywarning.img.title') }
          alt={ t('divesummary.safetywarning.img.alt') }
          width={ t('divesummary.safetywarning.img.width') } height={ t('divesummary.safetywarning.img.height') } />
      <p><Trans i18nKey="divesummary.safetywarning.warningmessage" /></p>
    </div>
  ) ) || null;
}

/** @function
 * @name DiveSummary
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {boolean} props.isMaxDurationDive - true if the current dive is the longest possible
 * @param {integer} props.operatingVolume - the operating volume of gaz available for the dive (i.e. excluding the pressure safety reserve)
 * @param {integer} props.cylinderCapacity - the volume of the diving tank
 * @param {integer} props.pressureSafetyReserve - the cylinder pressure safety reserve
 * @param {Object} props.data - an object containing the consumption data for the target depth and duration dive
 * @param {Object} props.safetyWarning - true if a safety warning must be displayed, false otherwise
 * 0description displays a dive's consumption details for a specific depth and duration
 */

function DiveSummary (props) {

  const stops = props.data.stops.length, // the number of deco stops
        stopDepths = ( stops > 0 ) ? config.stops.slice(0, stops).reverse() : null,
        volumeRequired = props.data.totalReqs, // the total volume of gaz required for the dive
        pressureRequired = litersToBars(volumeRequired, props.cylinderCapacity),
        volumeRatioRequired = Math.round((volumeRequired / props.operatingVolume) * 100),
        diveReqs = litersToBars(props.data.diveReqs, props.cylinderCapacity),
        ascentReqs = litersToBars(props.data.ascentReqs, props.cylinderCapacity),
        decoReqs = !!props.data.decoReqs ? litersToBars(props.data.decoReqs, props.cylinderCapacity) : undefined,
        minAscentPressure = props.pressureSafetyReserve + ascentReqs + ( !!decoReqs ? decoReqs : 0 ),
        { t } = useTranslation();

  return (
    <div id="diveSummary">
      <NDLDive show={!!stops ? false : true} />
      <MaxDurationDive show={props.isMaxDurationDive} />
      <DiveDuration volume={volumeRequired} volumeRatio={volumeRatioRequired} pressure={pressureRequired} duration={props.data.duration} />
      <AscentTotalDuration dtr={props.data.dtr} stops={props.data.stops} stopDepths={stopDepths} />
      <Consumption diveReqs={diveReqs} ascentReqs={ascentReqs} decoReqs={decoReqs} />
      <AscentMinPressure pressure={minAscentPressure} />
      <table>
        <tbody>
          <tr>
            <td>{ t('divesummary.gps.label') }</td>
            <td>{ t('divesummary.gps.value', {gps: props.data.gps} )}</td>
          </tr>
        </tbody>
      </table>
      <SafetyWarning isMaxDurationDive={props.isMaxDurationDive} safetyWarning={props.safetyWarning} />
    </div>
  );
}

export default DiveSummary;
