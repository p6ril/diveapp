# diveapp

Scuba Diving Calculator App

Application URL: https://diveapp.p6ril.fr/
Github: https://github.com/p6ril/diveapp
Quick video demo: https://youtu.be/XN9Oe3UvXkY

[TOC]

## A Word Of Warning / Liability

I'm developing this app with the following purposes in mind:

1. Learn ReactJs
2. Education: while I'm training for the [CMAS](https://www.cmas.org/en) (2 and 3 stars) certifications
3. Be the tool I was looking for (and didn't find) when preparing for a dive

**This application does not replace a diving computer.**

it is aimed for CMAS 2 stars (and beyond) certified divers (or equivalent in other federations) who are assumed to have the appropriate knowledge to securely manage their own dives with decompression stops as necessary. This app does not free its users from having the mandatory training and experience for such longer, deeper dives (i.e. typically requiring deco stops).

**Use at your own risk I can't be held responsible for the usage of this app.**

## Physiology

The recreational scuba divers breathe air compressed in a cylinder when underwater. At depth a scuba divers is literally "crushed" by tons of water above. Fortunately the human body is mostly constituted of water too (i.e. not compressible) and dense enough to support this undamaged. The air we breathe however must be compressed appropriately (through the regulator) so we can inflate our lungs against the water pressure.

The air is roughly composed of 21% oxygen and 79% nitrogen (to keep things simple). At 40m the air we breathe is 5 times denser than at see level. Thus the air in our lungs creates a "density imbalance" inside our body. Our cells consume the oxygen to create energy out of glucose. Thus the extra dense oxygen isn't really an issue here. The nitrogen however is an inert gas that doesn't play any role in our metabolism. When we stay underwater long enough, the high pressure nitrogen in our lungs actually dilutes itself in our blood stream, tissues and organs in order to create a "nitrogen pressure equilibrium" with the air we breathe.

The fact that our body saturates itself with nitrogen is the reason why we may not ascend from a dive without deco stops and also the reason why we can't ascend too fast either. As we ascend (thus reducing the pressure with "less" water above) a new nitrogen equilibrium must be found as our body may be more saturated with nitrogen than the air we breathe at that point.

Here comes decompression stops. It leaves our body some time to (partially) desaturate and release the excess nitrogen through natural breathing. The control of the ascent speed for its part avoids the nitrogen in our body to literally "bubble up" which can cause various symptoms (including some serious issues). A good example of this phenomenon is if you quickly open a bottle of sparking water (or sparkling soda). The quick change of pressure inside the bottle creates bubbles. you don't want this to happen in your brain, joints or blood flow.

## Dive Security

Long (physiological) story short: if you foresee to dive long enough, deep enough or both, you must prepare in advance, at the very least to make sure you'll have enough air.

This is where this app comes in.

As I'm French I use the "MN90 tables" (from the French National Marine) that provide data on the decompression requirements for dives up to 60m, depending on the time spent underwater. I also follow the [FFESSM](https://ffessm.fr/) (the French Federation for subaquatic activities) recommendations (with some optimizations) for the way I calculate the air requirements for a dive.

## App Usage

## App Software Architecture Roadmap

* Move away from [Create React App](https://create-react-app.dev/) and use [Vite](https://vitejs.dev/) instead
  * Learning material:
    * [Use Vite to Speed Up Web Development](https://www.freecodecamp.org/news/complete-vite-course-for-beginners/)
* Rework the app from scratch to avoid props drilling => continue learning React and implement useContext  and useReducer hooks
  * Learning material:
    * [React State Management – Intermediate JavaScript Course](https://www.youtube.com/watch?v=-bEzt5ISACA)
    * [React State Hooks: useReducer, useState, useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/)
    * [How to create Redux with React Hooks?](https://www.robinwieruch.de/redux-with-react-hooks/)
    * [How to Use the React Context API in Your Projects](https://www.freecodecamp.org/news/context-api-in-react/)
* A good next learning step could be to use a proper state management 3rd party. Redux may be an overkill. A more lightweight library like [Zustand](https://github.com/pmndrs/zustand) could be a good start
* Implement automated unit tests to avoid regressions:
  * Learning material:
    * [How to Write Unit Tests in React](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/)
    * [How to Test User Interactions Using the React Testing Library](https://www.freecodecamp.org/news/how-to-test-user-interactions-in-react/)
* Improve forms accessibility and WCAG support
  * Learning material:
    * [Web Accessibility – Common ARIA Mistakes to Avoid](https://www.freecodecamp.org/news/web-accessibility-common-aria-mistakes-to-avoid/)
    * [How to Build HTML Forms Right](https://austingil.com/how-to-build-html-forms-right-semantics/)
    * [How to Build Forms in React](https://www.freecodecamp.org/news/how-to-build-forms-in-react/)
    * [How to Validate Forms in React – A Step-By-Step Tutorial for Beginners](https://www.freecodecamp.org/news/how-to-validate-forms-in-react/)
    * [Web Accessibility Best Practices – How to Ensure Everyone Can Use Your Website](https://www.freecodecamp.org/news/web-accessibility-best-practices/)
* Check performances
  * Learning material:
    * [How to Measure and Improve the Performance of a React App](https://www.freecodecamp.org/news/measure-and-improve-performance-of-react-apps/)
* Learn typescript and switch from javascript to typescrit ?
  * Learning material:
    * [How to Use TypeScript – Beginner-Friendly TS Tutorial](https://www.freecodecamp.org/news/an-introduction-to-typescript/)
    * [How to Use TypeScript in React Apps](https://www.freecodecamp.org/news/using-typescript-in-react-apps/)
    * [How to use TypeScript with React... But should you?](https://www.youtube.com/watch?v=ydkQlJhodio)
    * [React Typescript Tutorial](https://www.youtube.com/watch?v=Z5iWr6Srsj8)
    * [TypeScript Course In ReactJS - TypeScript](https://www.youtube.com/watch?v=1jMJDbq7ZX4)
    * [How to Use TypeScript with React](https://www.freecodecamp.org/news/use-typescript-with-react/)
    * [Configurer un projet TypeScript / React pour les tests unitaires et d'intégration avec Jest et testing-library](https://craftacademy.substack.com/p/configurer-un-projet-typescript-react)
* Build up an API to request MN90 table data through queries (that would introduce a back-end component, what would the benefits be besides having fun implementing a scuba diving API platform ... which in itself could be a learning target) ? Leverage Flask ?

## Features Roadmap

* Internationalization is implemented out of the box, translate the app at least in English
* Add the possibility to choose a language
* Allow for a personalized configuration like feet vs meters or PSI versus bars, ...
* Allow for personalized default values like preferred gaz mix (air vs nitrox and at which %), max O<sub>2</sub> Partial Pressure, usual ascent rate, ... 
* Leverage the menu part that is useless for now
* The app is PWA enabled how could I better leverage PWA (to offer what additional feature or added value ?) ?
* How about different algorithm to calculate the air consumption during the ascent (integral ?)
