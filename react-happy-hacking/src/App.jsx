import { AppLayout } from './layouts/AppLayout';
import { Header } from './components/Header';

function App() {
  return (
    <AppLayout>
      <Header />
      <div className="App">this is mobile</div>
    </AppLayout>
  );
}

export default App;
