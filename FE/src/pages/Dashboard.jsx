import Sidebar from '../components/sidebar/Sidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="main-content">
        isi dashbard
      </div>
    </div>
  );
};

export default Dashboard;
