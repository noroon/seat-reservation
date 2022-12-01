import { useContext } from 'react';
import { SeatContext } from '../../context/seatContext';
import { bookSeats } from '../../functions';

const Form = () => {
  const { seats } = useContext(SeatContext);

  const handleSubmit = () => {
    bookSeats(seats)
    return;
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="w-75 mt-5 d-flex flex-column align-items-center">
      <div className="form-group d-flex flex-column align-items-center mb-4">
        <label htmlFor="numberOfSeats" className='mb-2'>Search for adjacent seats:</label>
        <input
          type="number"
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
  );
};

export default Form;
