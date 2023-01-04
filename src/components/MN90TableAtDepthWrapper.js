import { useTranslation } from 'react-i18next';
import MN90TableAtDepth from './MN90TableAtDepth';
import mn90 from '../data/mn90';

/* The idea here is to decouple as much as possible the MN90TableAtDepth
 * component fron its rendering environment (title, whatever ...).
 * I just want it to display the MN90 table for a specified depth. Hence
 * the introduction of a wrapper component to set the context.
 */

function MN90TableAtDepthWrapper(props) {
  const { t } = useTranslation(); // only call hooks at the top level: https://reactjs.org/docs/hooks-rules.html

  if ( !props.depth || props.error ) { // beware this is the dive depth not necessarily a MN90 table depth
    return null;
  }

  const mn90AtDepth = mn90.find(elm => (elm.depth >= props.depth)); // returns the 1st element found (if any) or undefined

  /* The issue here is that I want to get the closest next depth from
   * the MN90 table which isn't necessary the dive depth.
   */

  if ( !mn90AtDepth ) {
    return null;
  }

  return (
    <div id='mn90TableAtDepth'>
      <h2>{t('mn90tableatdepth.title', {depth: mn90AtDepth.depth})}</h2>
      <MN90TableAtDepth mn90AtDepth={mn90AtDepth} />
    </div>
  );
}

export default MN90TableAtDepthWrapper;
