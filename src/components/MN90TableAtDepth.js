import { useTranslation } from 'react-i18next';
import config from '../data/config';
import mn90 from '../data/mn90';

/** @function
 * @name MN90TableAtDepth
 * @arg {Object} props - the props object should either contain an integer representing the
 *                       dive depth or the mn90 table already filtered to the right depth
 * @description this react component displays the MN90 table data for the chosen depth
 */

function MN90TableAtDepth(props) {
  const { t } = useTranslation(), // only call hooks at the top level: https://reactjs.org/docs/hooks-rules.html
        mn90AtDepth = props.mn90AtDepth || mn90.find(elm => (elm.depth >= props.depth));

  if ( !mn90AtDepth ) {
    return null;
  }

  const depth = mn90AtDepth.depth,
        maxStops = mn90AtDepth.durations[mn90AtDepth.durations.length - 1].stops.length,
        diveStopDepths = config.stops.slice(0, maxStops).reverse(),
        expandedStops = [];

  // Working on copies or the 'stops' arrays as the function calculateAirRequirements
  // in utils/divelib.js relies on their length to check for stops during the ascent.
  // In other words, the 'stops' arrays shouldn't be changed in place as their parent
  // object (mn90AtDepth) is passed by reference (and thus would be modified as well).

  mn90AtDepth.durations.forEach(element => {
    let tmpArray = null,
        nbrStops = element.stops.length;

    if ( nbrStops < maxStops ) {
      tmpArray = new Array(maxStops - nbrStops);
      tmpArray = [...tmpArray, ...element.stops];
      expandedStops.push(tmpArray);
    } else {
      expandedStops.push([...element.stops]);
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th rowSpan="2">{t('mn90tableatdepth.table.header.duration')}</th>
          <th colSpan={maxStops}>{t('mn90tableatdepth.table.header.stops')}</th>
          <th rowSpan="2">DTR</th>
          <th rowSpan="2">GPS</th>
        </tr>
        <tr>
            {
              diveStopDepths.map(element => (
                <th key={'stop-depth-' + element}>{element} m</th>
              ))
            }
        </tr>
      </thead>
      <tbody>
        {
          mn90AtDepth.durations.map((element, index) =>
            (
            <tr key={'mn90-' + depth + '-' + element.duration}>
              <td>{element.duration} min</td>
              {
                expandedStops[index] && expandedStops[index].map((stop, stopIndex) => {
                  let key = 'mn90-' + depth + '-' + element.duration + '-' + diveStopDepths[stopIndex];

                  if ( !stop ) {
                    return (<td key={key}></td>);
                  } else {
                    return (<td key={key}>{stop} min</td>)
                  }
                })
              }
              <td>{element.dtr} min</td>
              <td>{element.gps}</td>
            </tr>
            )
          )
        }
      </tbody>
    </table>
  );
}

export default MN90TableAtDepth;
