import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { HomePage } from "./pages/LandingPage";

function App() {
  return (
    <>
      <Header></Header>
      <HomePage/>
      <Footer></Footer>
    </>
  );
}

export default App;
