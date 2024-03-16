import Logo from './components/Logo';
import StockPriceWidget from './components/StockPriceWidget';
import User from './components/User';

function App() {
  return (
    <div className="flex flex-col justify-center" data-testid="app">
      <header className='h-20 bg-slate-300 p-8 px-14 flex items-center justify-between text-center'>
        <Logo />
        <User />
      </header>
      <main>
        <StockPriceWidget />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
