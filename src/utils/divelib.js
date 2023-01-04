import config from '../data/config';

/** @function
 * @name operatingVolume
 * @param {integer} volume - the cylinder volume capacity (in liters)
 * @param {integer} pressure - the cylinder pressure (in bars)
 * @param {integer} reserve - the cylinder pressure safety reserve (in bars)
 * @returns {integer} the usable volume of gaz (in liters) compressed in the tank (holding back the safety reserve)
 */

function operatingVolume (volume, pressure, reserve) {
  return volume * (pressure - reserve);
}

/** @function
 * @name litersToBars
 * @param {integer} volume - the gaz volume (in liters)
 * @param {integer} cylinderCapacity - the cylinder volume capacity (in liters)
 * @returns {integer} converts a gaz volume into pressure amount according to the cylinder capacity 
 */

function litersToBars (volume, cylinderCapacity) {
  return Math.ceil(volume / cylinderCapacity);
}

/** @function
 * @name pressure
 * @param {integer} depth - the underwater depth (in meters)
 * @returns {float} the pressure at the depth considered (in bars)
 */

function pressure (depth) {
  return (depth / 10) + 1;
}

/** @function
 * @name maxDepth
 * @param {integer} o2Ratio - the oxygen ratio in the cylinder gaz mix
 * @param {integer} o2PP - the diver's oxygen partial pressure setup
 * @returns {integer} the maximum depth authorized
 */

function maxDepth (o2Ratio, o2PP) {
  return Math.min( Math.floor( (o2PP * 100 / o2Ratio - 1) * 10 ), 60);
}

/** @function
 * @name abacusDepths
 * @param {Array} abacus - an array representing the MN90 table data
 * @returns {Array} an array containing the depths defined in the MN90 table
 */

function abacusDepths (abacus) {
  return abacus.map( element => element.depth );
}

/** @function
 * @name abacusDataAtDepth
 * @param {Array} abacus - an array representing the MN90 table data
 * @returns {Object} an object representing the MN90 table data at the depth considered
 */

function abacusDataAtDepth (abacus, depth) {
  return abacus.find( element => ( element.depth >= depth ) ); // returns the 1st element found or undefined
}

/** @function
 * @name range
 * @param {integer} start - the begining of the range (included)
 * @param {integer} end - the end of the range (included)
 * @param {integer} [step=1] - the (optional) step to go from start to end 
 * @returns {Array} an array containing all the values from start to end in steps
 */

function range (start, end, step=1) {
  const arr = [];

  for ( let i = start ; i <= end ; i += step ) {
    arr.push(i);
  }
  return arr;
}

/** @function
 * @name ascentReqs
 * @access private
 * @param {integer} depth - the dive depth
 * @param {integer} firstStopDepth - the first deco stop depth
 * @param {integer} diverConsumption - the diver average gaz consumption (in liters / minute)
 * @param {integer} ascentDuration - the ascent duration (in minutes)
 * @returns {integer} calculates the breathable gaz requirement for the duration of the ascent up to the first deco stop 
 */

function ascentReqs (depth, firstStopDepth, diverConsumption, ascentDuration) {
  const midAscentPressure = pressure( (depth + firstStopDepth) / 2 ); // "average" pressure optimization

  return Math.ceil( midAscentPressure * diverConsumption * ascentDuration );
}

function decoReqs (stops, depths, diverConsumption) {
  return Math.ceil(stops.reduce( (acc, stopDuration, index) => {
    const stopDepthpressure = pressure(depths[index]);

    return acc + (stopDuration + 0.5) * diverConsumption * stopDepthpressure; // +0.5 for the ascent in between stops or the surface
  }, 0));
}

function calcReqs (data, depth, diverConsumption, ascentRate) {
  const bottomPressure = pressure(depth); // the target dive depth is considered not the closest operating MN90 depth

  data.durations.forEach( elm => {
    if ( elm.stops.length === 0 ) {
      // uninterrupted ascent, no deco stop
      const ascentDuration = (depth - 3) / ascentRate + 0.5; // 6 m/min between 3m and the surface thus + half a minute

      elm.ascentReqs = ascentReqs(depth, 0, diverConsumption, ascentDuration);
      elm.diveReqs = Math.ceil( bottomPressure * diverConsumption * elm.duration );
      elm.totalReqs = elm.diveReqs + elm.ascentReqs;
      elm.dtr = Math.ceil(ascentDuration);
    } else {
      // deco required, stop(s) must be considered
      const stopDepths = config.stops.slice(0, elm.stops.length).reverse(),
            ascentDuration = (depth - stopDepths[0]) / ascentRate;

      elm.ascentReqs = ascentReqs(depth, stopDepths[0], diverConsumption, ascentDuration);
      elm.decoReqs = decoReqs(elm.stops, stopDepths, diverConsumption);
      elm.diveReqs = Math.ceil( bottomPressure * diverConsumption * elm.duration );
      elm.totalReqs = elm.diveReqs + elm.ascentReqs + elm.decoReqs;
      elm.dtr = Math.ceil(ascentDuration + elm.stops.reduce( (acc, stopDuration) => (acc + stopDuration) ));
      }
  });
}

export {
  operatingVolume,
  litersToBars,
  pressure,
  maxDepth,
  abacusDepths,
  abacusDataAtDepth,
  range,
  calcReqs
};
