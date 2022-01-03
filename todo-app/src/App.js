import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Footer from "./components/Footer.js"
import Content from './components/Content';
function App() {
  return (
    <>
    <section className="todoapp">
       <Header/>
       <Content/>
    </section>
    <Footer/>
    </>
  );
}

export default App;
