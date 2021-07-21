import React from 'react';
//import  FirstComponent from './components/learning-examples/FirstComponet';
//import SecondComponent from './components/learning-examples/SecondComponent';
import './App.css';
import './bootstrap.css';
//import { render } from '@testing-library/react';
//import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp'



function App() {
  return (
    <div className="App">
        {/*<Counter/>*/}
        < TodoApp />
    </div>
  );
}

// function LearningComponent() {
//   return (
//     <div className="LearningComponent">
//         My Hello World!
//         <FirstComponent/>
//         <SecondComponent/>
//     </div>
//   );
// }



export default App;
