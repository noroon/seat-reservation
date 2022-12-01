import { Fragment, useContext } from 'react';
import { Seat, SeatContext } from '../../context/seatContext';
import './index.scss';

const TierInfo = () => {
  const { seats } = useContext(SeatContext);

  return (
    <div className="d-flex mb-3">
      {[...new Set(seats.map((obj: Seat) => obj['tier']))].map((tier) => (
        <Fragment key={`tier-0${tier}`}>
          <span className={`tier-info tier${tier}`}></span>
          <p>Tier {tier}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default TierInfo;
