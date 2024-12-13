import "./App.css";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>

      <div className="min-h-[87vh]">
        {" "}
        <Manager></Manager>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
