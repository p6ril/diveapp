import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detects the browser language settings
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      fr: {
        translation: {
          app: {
            header: {
              name: 'Dive App',
              title: 'Calculateur de Plongée',
              logo: {
                title: 'Plongeur sous-marin',
                alt: 'Dessin d\'un plongeur sous-marin',
                width: '500',
                height: '270'
              }
            },
            footer: {
              copyright: 'Copyright 2023 © Cyril Pierron'
            }
          },
          cylinder: {
            fieldsetLegend: 'Paramètres du bloc',
            capacity: {
              label: 'Volume (litres)'
            },
            pressure: {
              label: 'Pression (bars)',
              placeholder: 'ex: 200',
              warning: 'Une valeur numérique entière multiple de 10 est attendue. Elle doit être supérieure à la valeur de la réserve et inférieure à {{maxPressure}} bars.'
            },
            reserve: {
              label: 'Réserve (bars)',
              placeholder: 'ex: 50',
              warning: 'Une valeur numérique entière, multiple de 10, comprise entre {{min}} et {{max}} est attendue (souvent la réserve est fixée à 50 bars). Bien sûr, la réserve doit aussi être inférieure à la pression.'
            },
            oxygenRatio: {
              label: 'Oxygen (%)',
              air: 'Air',
              nitrox: 'Nitrox'
            }
          },
          diver: {
            fieldsetLegend: 'Contexte du plongeur',
            consumptionLabel: 'Consommation (l/min)',
            o2PartialPressureLabel: 'Pression partielle d\'O<1>2</1>',
            ascentRateLabel: 'Vitesse de remontée (m/min)',
            authorizedMaxDepth: 'Profondeur maximum autorisée : {{maxDepth}} mètres'
          },
          dive: {
            fieldsetLegend: 'Objectif de palanquée',
            depth: {
              label: 'Profondeur (mètres)',
              placeholder: 'ex: 20',
              warning: 'Une valeur numérique entière positive non nulle inférieure ou égale à {{maxDepth}} est attendue.'
            },
            checkboxLabel: 'Plongées successives',
            gpsLabel: 'GPS',
            lastDiveEndTimeLabel: 'Fin de la plongée précédente',
            nextDiveTimeLabel: 'Heure de la prochaine plongée',
          },
          results: {
            title: 'Paramètres de calcul',
            depth: {
              label: 'Profondeur cible',
              value: '{{depth}} mètres',
              operatinglabel: 'Palier(s) considéré(s)',
              operatingvalue: '{{depth}} mètres'
            },
            operatingvolume: {
              label: 'Volume opérationnel',
              value: '{{operatingVolume}} litres'
            },
            operatingpressure: {
              value: '{{operatingPressure}} bars'
            },
            button: {
              previous: 'Plongée plus courte',
              next: 'Plongée plus longue'
            },
            warning: {
              lowvolume: 'Aucune plongée n\'est possible. Veuillez vérifier vos paramètres, en particulier la configuration de votre bouteille. Le volume d\'air disponible est insuffisant.'
            }
          },
          divesummary: {
            title: {
              singular: '1 Plongée possible',
              plural: '{{count}} Plongées possibles ({{index}}/{{count}})',
            },
            information:{
              ndldive: 'Plongée dans la courbe de sécurité :-)',
              maxdurationdive: 'Plongée de durée maximum !',
            },
            volume: {
              label: 'Volume consommé',
              value: '{{volume}} litres ({{volumeRatio}}%)'
            },
            maxduration: {
              label: 'Durée maximum de plongée',
              value: '{{duration}} minutes'
            },
            stop: {
              label: '- Palier à {{stopDepth}} mètres',
              value: '{{stopDuration}} minutes'
            },
            dtr: {
              label: 'Durée Totale de Remontée (DTR)',
              value: '{{dtr}} minutes'
            },
            consumption: {
              title: 'Consommation',
              dive: '- au fond',
              ascent: '- à la remontée',
              deco: '- au(x) palier(s)'
            },
            ascentminpressure: {
              label: 'Pression minimum de remontée'
            },
            gps: {
              label: 'Groupe de Plongées Successives (GPS)', 
              value: '{{gps}}' 
            },
            safetywarning: {
              img: {
                title: 'warning icon',
                alt: 'warning icon',
                width: 96,
                height:96
              },
              warningmessage: '<strong>ATTENTION RISQUE DE PANNE D\'AIR</strong><br />la réserve pourrait s\'avérer insuffisante pour effectuer les paliers suivants en cas de dépassement de la durée maximale au fond. Il est recommandé de ne pas effectuer cette plongée et d\'opter pour une durée plus courte.'
            }
          },
          mn90tableatdepth: {
            title: 'Table MN90 à {{depth}} mètres',
            table: {
              header: {
                duration: 'Durée',
                stops: 'Paliers'
              }
            }
          },
          userconsent: {
            content: '<0>J\'ai créé cette application à des fins pédagogiques uniquement.</0><1>Les calculs s\'appuient sur les tables <1>MN90 de la FFESSM</1> (Fédération Française d\'Études et de Sports Sous-Marins). Ils définissent des profils de plongées dits "carrés" et respectent les règles édictées par la <3>FFESSM</3>.</1><2><0>Cette application n\'est pas destinée à remplacer un ordinateur de plongée !</0></2><3><0>Elle n\'affranchit pas non plus les plongeurs de disposer des connaissances nécessaires et indispensables pour effectuer des plongées en toute sécurité !</0></3><4>Je ne pourrai pas, en conséquence, être tenu responsable de l\'utilisation de cette application.</4>',
            consentbutton: 'J\'ai compris'
          }
        }
      }
    }
  });


export default i18n;
