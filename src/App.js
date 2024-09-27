import { Footer, Header } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import { useState } from "react";


function App() {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")) || false);
  return (
    <section className='dark:bg-bg'>
    <Header setLoginState={setLogin} />
    <AllRoutes login={login}/>
    <Footer />
    </section>
  );
}

export default App;
