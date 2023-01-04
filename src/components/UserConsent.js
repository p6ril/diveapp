import { Trans, useTranslation } from 'react-i18next';

function onUserContentClick() {
  document.cookie = 'user_consent=1;max-age=2592000;;samesite=strict'; // the cookie remains valid for a month
  document.getElementById('userConsent').style.display="none";
}

function UserConsent() {
  let { t } = useTranslation();

  if ( !document.cookie ) {
    return (
      <div id='userConsent'>
        <div>
          <Trans i18nKey='userconsent.content'>
            <p>J'ai créé cette application à des fins pédagogiques uniquement.</p>
            <p>Les calculs s'appuient sur les tables <a href="https://www.plongee-plaisir.com/fr/book/tables-plongee/">
               MN90 de la FFESSM</a> (Fédération Française d'Études et de Sports Sous-Marins). Ils définissent des
               profils de plongées dits "carrés" et respectent les règles édictées par la&nbsp; 
               <a href="https://ffessm.fr/">FFESSM</a>.</p>
            <p><strong>Cette application n'est pas destinée à remplacer un ordinateur de plongée !</strong></p> 
            <p><strong>Elle n'affranchit pas non plus les plongeurs de disposer des connaissances nécessaires et 
               indispensables pour effectuer des plongées en toute sécurité !</strong></p>
            <p>Je ne pourrai pas, en conséquence, être tenu responsable de l'utilisation de cette application.</p>
          </Trans>
          <div id='consentButton' onClick={onUserContentClick}>{t('userconsent.consentbutton')}</div>
        </div>
      </div>
    );
  }
  return null;
}

export default UserConsent;
