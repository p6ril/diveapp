import { Component } from 'react';
import { withTranslation } from 'react-i18next'; // can't use the { t } hook in a class
import { operatingVolume, litersToBars, abacusDataAtDepth, calcReqs } from '../utils/divelib';
import mn90 from '../data/mn90';
import DiveSummary from './DiveSummary';

/** @class
 * @name DiveResults
 * @param {Object} props - the properties passed on to the react component as an object
 * @param {integer} props.cylinderCapacity - the volume of the diving tank (in liters)
 * @param {integer} props.cylinderPressure - the pressure of the diving tank (in bars)
 * @param {integer} props.pressureSafetyReserve - the cylinder pressure safety reserve (in bars)
 * @param {integer} props.diverConsumption - the diver's estimated consumption (in liters / minute)
 * @param {integer} props.ascentRate - the ascent speed (in meters / minute)
 * @param {integer} props.diveDepth - the targeted dive depth (in meters)
 * @param {boolean} props.error - true if any of the form uncontrolled components has errors, false otherwise
 * @description manages the dive details display for the authorized dive durations at a specific depth
 * @todo since the input fields rely on the browser HTML5 validation add a function to check that the
 *       uncontrolled form field values match what's stored in the state?
 */

class DiveResults extends Component {
  constructor (props) {
    super(props);

    // diveIndex is the only state value truly managed by the DiveResults component
    // it needs to be recomputed when the props change hence the implementation of getDerivedStateFromProps()
    this.state = {
      diveIndex: -1 // init value to differentiate from operating values as an index is >= 0
    };

    this.shorterDiveClick=this.shorterDiveClick.bind(this);
    this.longerDiveClick=this.longerDiveClick.bind(this);
  }

  /** @method
  * @name getDerivedStateFromProps
  * @static
  * @param {Object} props - the properties passed on to the react component as an object
  * @param {integer} props.cylinderCapacity - the volume of the diving tank (in liters)
  * @param {integer} props.cylinderPressure - the pressure of the diving tank (in bars)
  * @param {integer} props.pressureSafetyReserve - the cylinder pressure safety reserve (in bars)
  * @param {integer} props.diverConsumption - the diver's estimated consumption (in liters / minute)
  * @param {integer} props.ascentRate - the ascent speed (in meters / minute)
  * @param {integer} props.diveDepth - the targeted dive depth (in meters)
  * @param {Object} state - the component state object
  * 0description React lifecycle method to initialize the component state depending on the properties received.
  *              The idea here is to recalculate the possible dives when the properties change. Memoization would work for that purpose.
  *              However DiveResults also maintains its own state that also depends on those calculations.
  *              https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  */

  static getDerivedStateFromProps (props, state) {
    const totalVolume = props.cylinderCapacity * props.cylinderPressure,
          effectiveVolume = operatingVolume(props.cylinderCapacity, props.cylinderPressure, props.pressureSafetyReserve),
          dataAtDepth = abacusDataAtDepth(mn90, props.diveDepth);
    let durations = null, safetyWarning = false;

    if ( !props.error &&
      ( state.diveIndex === -1 // checks for component init (if state.diveIndex = -1) or any change in the property values
      || state.cylinderCapacity !== props.cylinderCapacity
      || state.cylinderPressure !== props.cylinderPressure
      || state.pressureSafetyReserve !== props.pressureSafetyReserve
      || state.diverConsumption !== props.diverConsumption
      || state.ascentRate!==  props.ascentRate
      || state.diveDepth !== props.diveDepth ) ) {
      calcReqs(dataAtDepth, props.diveDepth, props.diverConsumption, props.ascentRate); // if so we need to recalculate with the new parameters
      durations = dataAtDepth.durations.filter( elm =>
        elm.totalReqs <= effectiveVolume
      );
      if ( dataAtDepth.durations.length > durations.length
        && dataAtDepth.durations[durations.length].totalReqs > totalVolume ) { // checking the next dive (if any) duration requirements
        safetyWarning = true;
      }
      // setting property values to the component state to track future changes
      // also "memoizing" the dive requirement calculations by saving results to the state only on props change
      return {
        cylinderCapacity: props.cylinderCapacity,
        cylinderPressure: props.cylinderPressure,
        pressureSafetyReserve: props.pressureSafetyReserve,
        diverConsumption: props.diverConsumption,
        ascentRate: props.ascentRate,
        diveDepth: props.diveDepth,
        // component's local state update starts here
        diveIndex: durations.length - 1, // focus on the max duration dive
        operatingVolume: effectiveVolume,
        dataAtDepth: dataAtDepth,
        durations: durations,
        safetyWarning: safetyWarning,
        domReset: true // need to reset the previous / next buttons in the DOM to browse the updated dive results
      };
    }
    return null; // no need to update the component's state: no props change, no need to recalculate anything, diveIndex is managed locally by the component
  }

  /** @method
  * @name componentDidUpdate
  * 0description
  */

  componentDidUpdate () {
    if ( !this.props.error && this.state.domReset ) {
      // the 'shorterDive' and 'longerDive' DIVs can only be manipulated if 'diveResults' is part of the DOM.
      // If any of the form inputs is invalid or there is no possible dive to show there won't be a 'diveResults'
      // DIV in the DOM.
      if ( this.state.durations.length === 1 ) { // there is just the one dive, both buttons must be hidden
        document.getElementById('shorterDive').classList.add('displayNone');
      } else {
        document.getElementById('shorterDive').classList.remove('displayNone');
      }
      document.getElementById('longerDive').classList.add('displayNone');
    }
  }

  /** @method
  * @name shorterDiveClick
  * 0description 
  */

  shorterDiveClick () {
    this.setState( (prevState) => {
      if ( prevState.diveIndex === ( this.state.durations.length - 1 ) ) {
        document.getElementById('longerDive').classList.remove('displayNone');
      }
      if ( prevState.diveIndex === 1 ) {
        document.getElementById('shorterDive').classList.add('displayNone');
      }
      return ( { diveIndex: (prevState.diveIndex > 0 ? prevState.diveIndex - 1 : prevState.diveIndex), domReset: false } );
    });
  }

  /** @method
  * @name longerDiveClick
  * 0description 
  */

  longerDiveClick () {
    this.setState( (prevState) => {
      if ( prevState.diveIndex === 0 ) {
        document.getElementById('shorterDive').classList.remove('displayNone');
      }
      if ( prevState.diveIndex === ( this.state.durations.length - 2 ) ) {
        document.getElementById('longerDive').classList.add('displayNone');
      }
      return ( { diveIndex: ( prevState.diveIndex < (this.state.durations.length - 1) ? prevState.diveIndex + 1 : prevState.diveIndex ), domReset: false } );
    });
  }
  render () {
    
    if ( this.props.error ) {
      return null;
    }
    if ( this.state.operatingVolume < this.state.dataAtDepth.durations[0].totalReqs ) {
      return (
        <p className="warning">{ this.props.t('results.warning.lowvolume') }</p>
      );
    }
    return (
      <div id="diveResults">
        <h2>{ this.props.t('results.title') }</h2>
        <table>
          <tbody>
            <tr>
              <td className="fontsize120p bold">{ this.props.t('results.depth.label') }</td>
              <td><span className="highlight">{ this.props.t('results.depth.value', {depth: this.state.diveDepth}) }</span></td>
            </tr>
            <tr>
              <td>{ this.props.t('results.depth.operatinglabel') }</td>
              <td>{ this.props.t('results.depth.operatingvalue', {depth: this.state.dataAtDepth.depth}) }</td>
            </tr>
            <tr>
              <td>{ this.props.t('results.operatingvolume.label') }</td>
              <td>{ this.props.t('results.operatingvolume.value', {operatingVolume: this.state.operatingVolume}) }<br/>
                  ({ this.props.t('results.operatingpressure.value', {operatingPressure: litersToBars(this.state.operatingVolume, this.state.cylinderCapacity)}) })
              </td>
            </tr>
          </tbody>
        </table>
        <h2>{ this.state.durations.length > 1 ? this.props.t('divesummary.title.plural', {count: this.state.durations.length, index: this.state.diveIndex + 1}) : this.props.t('divesummary.title.singular') }</h2>
        <div>
          <div id="shorterDive" onClick={this.shorterDiveClick}>
            <span className="button">&lt; { this.props.t('results.button.previous') }</span>
          </div>
          <DiveSummary
              isMaxDurationDive={this.state.diveIndex === ( this.state.durations.length - 1 )}
              operatingVolume={this.state.operatingVolume}
              cylinderCapacity={this.state.cylinderCapacity}
              pressureSafetyReserve={this.state.pressureSafetyReserve}
              data={this.state.durations[this.state.diveIndex]}
              safetyWarning={this.state.safetyWarning}
            />
          <div id="longerDive" className="displayNone" onClick={this.longerDiveClick}>
            <span className="button">{ this.props.t('results.button.next') } &gt;</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(DiveResults); // https://react.i18next.com/latest/withtranslation-hoc
