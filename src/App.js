import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./components/paginas/Inicio";
import Empresa from "./components/paginas/Empresa";
import Contato from "./components/paginas/Contato";
import NovoProjeto from "./components/paginas/NovoProjeto";
import Projetos from "./components/paginas/Projetos";
import Projeto from "./components/paginas/Projeto";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/projeto/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
