import '../../style/ProfilePage.scss';
import { StudentTable } from '../../components/customTable/tables/StudentTable';

export const RequestsPage = () => {
  return (
    <div className="table-container">
      <StudentTable type={'request'} />
    </div>
  );
};
