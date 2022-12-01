import { useContext } from 'react';

import { getReservedSeats } from '../../functions';
import { SeatContext } from './../../context/seatContext';

const ReloadButton = () => {
  const { setSeats } = useContext(SeatContext);
  const handleClick = () => setSeats(getReservedSeats());

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Reload seats
    </button>
  );
};

export default ReloadButton;
