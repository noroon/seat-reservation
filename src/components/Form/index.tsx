import { FormEvent, useContext } from 'react';
import { Seat, SeatContext } from '../../context/seatContext';
import { getBestSeats } from '../../functions';
import { useState } from 'react';

const Form = () => {
  const { seats } = useContext(SeatContext);
  const [bestSeats, setBestSeats] = useState<Seat[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const seatNumber = Number(data.get('seatNumber'));

    const bestSeats = getBestSeats(seats, seatNumber);
    setBestSeats(bestSeats);

    if (bestSeats.length > 0) {
      setErrorMessage('');
    } else {
      setErrorMessage("We didn't find any seats matching your search.");
    }
  };

  return (
    <span className="w-75 d-flex flex-column align-items-center">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-75 mt-5 d-flex flex-column align-items-center"
      >
        <div className="form-group d-flex flex-column align-items-center mb-4">
          <label htmlFor="numberOfSeats" className="mb-2">
            Search for adjacent seats:
          </label>
          <input
            type="number"
            name="seatNumber"
            max="4"
            min="1"
            defaultValue={1}
            className="form-control w-25"
            id="numberOfSeats"
          />
          <small className="form-text text-muted">
            Please give a number between 1 and 4
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {bestSeats.length > 0 && (
        <>
          <h6 className="mt-5">We've found these seats for you:</h6>
          {bestSeats.map(({ section, row, seatNumber }) => {
            return (
              <div key={`${section}-${row}${seatNumber}`}>
                <span>{`${section} ${row}${seatNumber}`}</span>
              </div>
            );
          })}
        </>
      )}
      {errorMessage && (
        <div className="alert alert-warning text-center" role="alert">
          {errorMessage}
        </div>
      )}
    </span>
  );
};

export default Form;
