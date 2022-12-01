import { useContext } from 'react';
import { getSections } from '../../functions';
import { Seat, SeatContext } from './../../context/seatContext';
import './index.scss';

const Theatre = () => {
  const { seats } = useContext(SeatContext);
  const sections = getSections(seats);

  return (
    <>
      {(Object as any)
        .entries(sections)
        .map(
          ([sectionName, section]: [
            keyof typeof sections,
            Record<string, any>,
          ]) => {
            return (
              <>
                <h5>{sectionName}</h5>
                {[...new Set(section.map((obj: Seat) => obj['row']))].map(
                  (row) => (
                    <div>
                      <span>{String(row)}</span>
                      {section
                        .filter((seat: Seat) => seat.row === row)
                        .map(({ seatNumber, tier, booked }: Seat) => {
                          return (
                            <span
                              className={`seat tier${tier} booked-${booked}`}
                            >
                              {seatNumber}
                            </span>
                          );
                        })}
                    </div>
                  ),
                )}
              </>
            );
          },
        )}
    </>
  );
};

export default Theatre;
