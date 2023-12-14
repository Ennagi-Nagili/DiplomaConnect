import { StudentTable } from '../../components/customTable/tables/StudentTable';

export const StudentsPage = () => {
  return (
    <div className="table-container">
      <StudentTable type={'student'} />
    </div>
  );
};
