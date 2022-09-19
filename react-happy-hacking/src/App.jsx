import { AppLayout } from './layouts/AppLayout';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <AppLayout>
      <Header />
      <NavBar />
    </AppLayout>
  );
}

export default App;
