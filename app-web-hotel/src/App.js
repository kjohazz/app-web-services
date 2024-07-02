import React from 'react';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Header from './components/Header/Header';
//import Navigation from './components/Navigation/Navigation';

function App() {
  /*const homeLinks = [
    { url: '/', text: 'Inicio' },
    { url: '/tours', text: 'Tours' },
    { url: '/contacto', text: 'Contacto' }
  ];*/

  return (
    <div className="App">
      <Header />

      <AdminPanel />
    </div>
  );
}

export default App;