import Row from '../Row';
import { getRowNamesArray } from '../../functions';

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
      {[...getRowNamesArray(section)].map((row) => (
        <Row
          row={String(row)}
          section={section}
          sectionName={sectionName}
          key={`${sectionName}-${row}`}
        />
      ))}
    </div>
  );
};

export default Section;
