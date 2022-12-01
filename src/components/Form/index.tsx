import { FormEvent, useContext } from 'react';
import { SeatContext } from '../../context/seatContext';
import { bookSeats } from '../../functions';

const Form = () => {
  const { seats } = useContext(SeatContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const seatNumber = Number(data.get('seatNumber'));    
    console.log(seatNumber);
    
    bookSeats(seats, seatNumber)
    return;
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="w-75 mt-5 d-flex flex-column align-items-center">
      <div className="form-group d-flex flex-column align-items-center mb-4">
        <label htmlFor="numberOfSeats" className='mb-2'>Search for adjacent seats:</label>
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
  );
};

export default Form;
