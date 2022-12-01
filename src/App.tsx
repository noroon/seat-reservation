import Form from './components/Form';
import Theatre from './components/Theatre';
import { SeatProvider } from './context/seatContext';
import ReloadButton from './components/ReloadButton';

function App() {
  return (
    <div className="App container d-flex flex-column align-items-center pt-5">
      <SeatProvider>
        <Theatre />
        <ReloadButton />
        <Form />
      </SeatProvider>
    </div>
  );
}

export default App;
