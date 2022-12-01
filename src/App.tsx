import Form from './components/Form';
import Theatre from './components/Theatre';
import { SeatProvider } from './context/seatContext';

function App() {
  return (
    <SeatProvider>
      <div className="container d-flex align-items-cente pt-5">
        <Theatre />
        <Form />
      </div>
    </SeatProvider>
  );
}

export default App;
