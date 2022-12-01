import { useContext } from 'react';
import { Seat, SeatContext } from '../../context/seatContext';
import './index.scss';

const TierInfo = () => {
  const { seats } = useContext(SeatContext);

  return (
    <div className="d-flex mb-3">
      {[...new Set(seats.map((obj: Seat) => obj['tier']))].map((tier) => (
        <>
          <span className={`tier-info tier${tier}`}></span>
          <p>Tier {tier}</p>
        </>
      ))}
    </div>
  );
};

export default TierInfo;
