import Header from './components/Header.jsx';
import BestProductsList from './components/BestProductsList.jsx';
import AllProductsList from './components/AllProductsList.jsx';
import Footer from './components/Footer.jsx';

import './components/reset.css'
import './components/common.css'
import './components/App.css'
import './components/Header.css'
import './components/BestProductsList.css'
import './components/AllProductsList.css'
import './components/Footer.css'

function App() {
  return (
    <>
     <Header />
     <main>
      <BestProductsList />
      <AllProductsList />
     </main>
     <Footer />
    </>
  )
}

export default App;
