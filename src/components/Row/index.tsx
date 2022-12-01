import { Seat } from '../../context/seatContext';

const Row = ({
  row,
  section,
  sectionName,
}: {
  row: string;
  section: Record<string, any>;
  sectionName: string;
}) => {
  return (
    <div className="mb-2">
      <span className="me-2">{row}</span>
      {section
        .filter((seat: Seat) => seat.row === row)
        .map(({ seatNumber, tier, booked }: Seat) => {
          return (
            <span
              className={`seat tier${tier} booked-${booked}`}
              key={`${sectionName}-${row}-${seatNumber}`}
            >
              {seatNumber}
            </span>
          );
        })}
    </div>
  );
};

export default Row;
