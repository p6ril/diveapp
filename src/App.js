import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { maxDepth } from './utils/divelib';
import DiveForm from './components/DiveForm';
import DiveResults from './components/DiveResults';
import MN90TableAtDepthWrapper from './components/MN90TableAtDepthWrapper';
import UserConsent from './components/UserConsent';

import './App.css';

/** @function
 * @name Navbar
 * 0description manages the responsive navigation bar at the top of the screen
 */

function Navbar () {
  const { t } = useTranslation();

  // check 'Creating a responsive mobile menu with CSS without JavaScript'
  // https://blog.logrocket.com/create-responsive-mobile-menu-with-css-no-javascript/

  return (
    <div id="navbar">
      <div id="navbarLogo">{ t('app.header.name') }</div>
      <input id="hamburgerTrick" type="checkbox" />
      <label id="hamburger" htmlFor="hamburgerTrick">
        <span id="hamburgerLine"></span>
      </label>
      <nav>
        <ul>
          <li key="key1">menu 1</li>
          <li key="key2">menu 2</li>
        </ul>
      </nav>
    </div>
  );
}

/** @function
 * @name Header
 * 0description displays the responsive navigation bar, the main image and the applicaton title
 */

function Header () {
  const logo500w = require('./img/diveapp-logo-500w.webp'),
        logo400w = require('./img/diveapp-logo-400w.webp'),
        logo300w = require('./img/diveapp-logo-300w.webp'),
        { t } = useTranslation();

  return (
    <header>
      <Navbar />
      <div  id="logo">
        <img src={logo300w}
          srcSet={logo300w + " 300w, " + logo400w + " 400w, " + logo500w + " 500w"}
          sizes="(min-width: 500px) 500px, (min-width: 400px) 400px, (min-width: 300px) 300px"
          title={ t('app.header.logo.title') }
          alt={ t('app.header.logo.alt') } />
      </div>
      <h1>{ t('app.header.title') }</h1>
    </header>
  );
}

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t('app.footer.copyright')}</p>
    </footer>
  );
}

/** @function
 * @name initSessionValue
 * @param {integer} name - the name of the parameter to get (or set) in sessionStorage
 * @param {integer} value - the value of the parameter to get (or set) in sessionStorage
 * @returns {integer|float}  either the sessionStorage value if one existed or the init value
 *                           and sets the sessionStorage accordingly
 */

function initSessionValue (name, value) {
  const sessionData = sessionStorage.getItem(name);

  if ( sessionData !== null ) {
    switch ( name ) {
      case 'o2PartialPressure':
           return(Number.parseFloat(sessionData)); // parseFloat may return NaN
           //break;
      default:
           return(Number.parseInt(sessionData, 10)); // parseInt may return NaN
    };
  } else {
    try {
      sessionStorage.setItem(name, value);
    } catch (e) {
      console.log('[App.js] ERROR writing data to session storage.');
    }
    return(value);
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    // using sessionStorage allows to persist values when reloading the page
    this.state = {
      cylinderCapacity: initSessionValue('cylinderCapacity', 15),
      cylinderPressure: initSessionValue('cylinderPressure', 200),
      pressureSafetyReserve: initSessionValue('pressureSafetyReserve', 50),
      oxygenRatio: initSessionValue('oxygenRatio', 21),
      diverConsumption: initSessionValue('diverConsumption', 18),
      o2PartialPressure: initSessionValue('o2PartialPressure', 1.5),
      ascentRate: initSessionValue('ascentRate', 12),
      maxDepth: initSessionValue('maxDepth', maxDepth(1.6, 21)),
      diveDepth: initSessionValue('diveDepth', 20),
      pressureGroup: '',
      inputError: { // only for uncontrolled components
        cylinderPressure: false,
        pressureSafetyReserve: false,
        diveDepth: false
      }
    };
    this.setCylinderCapacity = this.setCylinderCapacity.bind(this);
    this.setCylinderPressure = this.setCylinderPressure.bind(this);
    this.setPressureSafetyReserve = this.setPressureSafetyReserve.bind(this);
    this.setOxygenRatio = this.setOxygenRatio.bind(this);
    this.setDiverConsumption = this.setDiverConsumption.bind(this);
    this.setO2PartialPressure = this.setO2PartialPressure.bind(this);
    this.setAscentRate = this.setAscentRate.bind(this);
    this.setMaxDepth = this.setMaxDepth.bind(this);
    this.setDiveDepth = this.setDiveDepth.bind(this);
    //this.setErrorStatus = this.setErrorStatus.bind(this);
  }

  setCylinderCapacity (e) {
    const cylinderCapacity = Number.parseInt(e.target.value, 10); // the dropdown should only return integers (as a string)

    if ( cylinderCapacity !== this.state.cylinderCapacity ) {
      this.setState({
        cylinderCapacity: cylinderCapacity
      });
      try {
        sessionStorage.setItem('cylinderCapacity', cylinderCapacity);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setCylinderPressure (component's binded setter function)
   * @param {integer} pressure - the diving tank pressure (in bars) entered by the user in the input field which can be NaN in case of error
   * @param {boolean} error - true if the cylinder pressure input field is invalid, false otherwise. True can mean NaN or an invalid number
   * @description State callback setter function, to update the component's cylinder pressure state value from a child component
   */

  setCylinderPressure (pressure, error) {
    if ( pressure !== this.state.cylinderPressure ) {
      this.setState({
        cylinderPressure: pressure,
        inputError: { ...this.state.inputError, cylinderPressure: error }
      });
      try {
        sessionStorage.setItem('cylinderPressure', pressure);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setPressureSafetyReserve (component's binded setter function)
   * @param {integer} reserve - the diving tank pressure safety reserve (in bars) entered by the user in the input field which can be NaN in case of error
   * @param {boolean} error - true if the cylinder pressure safety reserve input field is invalid, false otherwise. True can mean NaN or an invalid number
   * @description State callback setter function, to update the component's pressure safety reserve state value from a child component
   */

  setPressureSafetyReserve (reserve, error) {
    if ( reserve !== this.state.pressureSafetyReserve ) {
      this.setState({
        pressureSafetyReserve: reserve,
        inputError: { ...this.state.inputError, pressureSafetyReserve: error }
      });
      try {
        sessionStorage.setItem('pressureSafetyReserve', reserve);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setOxygenRatio (component's binded setter function)
   * @param {Object} e - an event triggered by the corresponding input field
   * @description State callback setter function, to update the cylinder oxygen's ratio state value from a child component
   */

  setOxygenRatio (e) {
    const oxygenRatio = Number.parseInt(e.target.value, 10); // the dropdown should only return integers (as a string)

    if ( oxygenRatio !== this.state.oxygenRatio ) {
      this.setState({
        oxygenRatio: oxygenRatio
      });
      try {
        sessionStorage.setItem('oxygenRatio', oxygenRatio);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
      this.setMaxDepth({o2Ratio: oxygenRatio});
    }
  }

  /** @function
   * @name setDiverConsumption (component's binded setter function)
   * @param {Object} e - an event triggered by the corresponding input field
   * @description State callback setter function, to update the component's diver consumption state value from a child component
   */

  setDiverConsumption (e) {
    const consumption = Number.parseInt(e.target.value, 10); // the dropdown should only return integers (as a string)

    if ( consumption !== this.state.diverConsumption ) {
      this.setState({
        diverConsumption: consumption
      });
      try {
        sessionStorage.setItem('diverConsumption', consumption);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setO2PartialPressure (component's binded setter function)
   * @param {Object} e - an event triggered by the corresponding input field
   * @description State callback setter function, to update the component's oxygen partial pressure state value from a child component
   */

  setO2PartialPressure (e) {
    const o2pp = Number.parseFloat(e.target.value); // the dropdown should only return floats (as a string)

    if ( o2pp !== this.state.o2PartialPressure ) {
      this.setState({
        o2PartialPressure: o2pp
      });
      try {
        sessionStorage.setItem('o2PartialPressure', o2pp);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
      this.setMaxDepth({o2PP: o2pp});
    }
  }

  /** @function
   * @name setAscentRate (component's binded setter function)
   * @param {Object} e - an event triggered by the corresponding input field
   * @description State callback setter function, to update the component's dive depth state value from a child component
   */

  setAscentRate (e) {
    const ascentRate = Number.parseInt(e.target.value, 10); // the dropdown should only return integers (as a string)

    if ( ascentRate !== this.state.ascentRate ) {
      this.setState({
        ascentRate: ascentRate
      });
      try {
        sessionStorage.setItem('ascentRate', ascentRate);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setMaxDepth (component's binded setter function)
   * @param {Object} obj - an object containing either, neither or both of the oxygen partial pressure and the oxygen ratio values
   * @param {integer} [obj.o2Ratio=this.state.oxygenRatio] - the cylinder oxygen's ratio or the current state value by default if not provided
   * @param {integer} [obj.o2PP=this.state.o2PartialPressure] - the diver's oxygen partial pressure setting or the current state value by default if not provided
   * @description State callback setter function, to update the component's max depth state value from a child component
   */

  setMaxDepth (obj) {
    obj.o2Ratio = obj.o2Ratio || this.state.oxygenRatio;
    obj.o2PP = obj.o2PP || this.state.o2PartialPressure;
    const authorizedDepth = maxDepth(obj.o2Ratio, obj.o2PP),
          isDiveDepthNaN = Number.isNaN(this.state.diveDepth),
          error = isDiveDepthNaN || (this.state.diveDepth > authorizedDepth ? true : false);

    if ( authorizedDepth !== this.state.maxDepth ) {
      this.setState({
        maxDepth: authorizedDepth,
        inputError: { ...this.state.inputError, diveDepth: error }
      });
      try {
        sessionStorage.setItem('maxDepth', authorizedDepth);
      } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /** @function
   * @name setDiveDepth (component's binded setter function)
   * @param {integer} depth - the target dive depth entered by the user in the input field which can be NaN in case of error
   * @param {boolean} error - true if the dive depth input field is invalid, false otherwise. True can mean NaN or an invalid number
   * @description State callback setter function, to update the component's dive depth state value from a child component
   */

  setDiveDepth (depth, error) {
     if ( depth !== this.state.diveDepth ) {
      this.setState({
        diveDepth: depth,
        inputError: { ...this.state.inputError, diveDepth: error }
      });
      try {
        sessionStorage.setItem('diveDepth', depth);
       } catch (e) {
        console.log('[App.js] ERROR writing data to session storage.');
      }
    }
  }

  /*setErrorStatus (name, value) {
    const errorStatus = this.state.errorStatus;

    if ( errorStatus[name] !== value ) {
      errorStatus[name] = value;
      this.setState({errorStatus});
    }
  }*/

  render() {
    const error = Object.keys(this.state.inputError).reduce( (acc, key) => acc || this.state.inputError[key], false );

    return (
      <>
        <Header />
        <main>
          <DiveForm
            cylinderCapacity={this.state.cylinderCapacity}
            cylinderPressure={this.state.cylinderPressure}
            pressureSafetyReserve={this.state.pressureSafetyReserve}
            oxygenRatio={this.state.oxygenRatio}
            diverConsumption={this.state.diverConsumption}
            o2PartialPressure={this.state.o2PartialPressure}
            ascentRate={this.state.ascentRate}
            maxDepth={this.state.maxDepth}
            diveDepth={this.state.diveDepth}
            setCylinderCapacity={this.setCylinderCapacity}
            setCylinderPressure={this.setCylinderPressure}
            setPressureSafetyReserve={this.setPressureSafetyReserve}
            setOxygenRatio={this.setOxygenRatio}
            setDiverConsumption={this.setDiverConsumption}
            setO2PartialPressure={this.setO2PartialPressure}
            setAscentRate={this.setAscentRate}
            setDiveDepth={this.setDiveDepth}
          />
          <DiveResults
            cylinderCapacity={this.state.cylinderCapacity}
            cylinderPressure={this.state.cylinderPressure}
            pressureSafetyReserve={this.state.pressureSafetyReserve}
            diverConsumption={this.state.diverConsumption}
            ascentRate={this.state.ascentRate}
            diveDepth={this.state.diveDepth}
            error={error}
          />
          <MN90TableAtDepthWrapper
            depth={this.state.diveDepth}
            error={error}
          />
        </main>
        <Footer />
        <UserConsent />
      </>
    );
  }
}

export default App;
