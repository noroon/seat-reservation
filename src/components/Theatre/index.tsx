import { useContext } from 'react';
import { SeatContext } from './../../context/seatContext';

const Theatre = () => {
  const { seats } = useContext(SeatContext);

  return (
    <>
      {seats.map((seat) => {
        return <>{JSON.stringify(seat)}</>;
      })}
    </>
  );
};

export default Theatre;
