import StockPriceWidget from './components/StockPriceWidget';

function App() {
  return (
    <div className="flex flex-col justify-center" data-testid="app">
      <header>
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
