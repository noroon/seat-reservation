import { Seat } from '../../context/seatContext';
import Row from '../Row';

const Section = ({
  sectionName,
  section,
}: {
  sectionName: string;
  section: Record<string, any>;
}) => {
  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <h5 className="mb-3">{sectionName}</h5>
      {[...new Set(section.map((obj: Seat) => obj['row']))].map((row) => (
        <Row row={String(row)} section={section} />
      ))}
    </div>
  );
};

export default Section;
