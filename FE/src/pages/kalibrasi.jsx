import { useEffect, useState } from 'react';
import Temperature from '../assets/TemperatureIcon.svg';
import Flow from '../assets/FlowIcon.svg';
import Pressure from '../assets/PressureIcon.svg';
import Modal from '../components/modal/Modal';
import axios from 'axios';

const Kalibrasi = () => {
  const [temperature, setTemperature] = useState({ min: 0, max: 0 });
  const [flow, setFlow] = useState({ min: 0, max: 0 });
  const [pressure, setPressure] = useState({ min: 0, max: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({ name: '', value: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-agustrisa.as1.pitunnel.net/api/dataCalibration');
      setTemperature({min:response.data[0].min_value, max:response.data[0].max_value});
      setFlow({min:response.data[2].min_value, max:response.data[2].max_value});
      setPressure({min:response.data[1].min_value, max:response.data[1].max_value});
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleKalibrasi = (sensor) => {
    setSelectedData({ name: sensor, value: sensor === 'temperature' ? temperature : sensor === 'flow' ? flow : pressure });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  return (
    <div className="pt-24">
      <div className="card bg-white rounded-2xl px-0 py-3 my-6">
        <div className="card-header flex justify-between items-center border-b-2 border-b-[#F4F6F6] w-full px-8 pb-4">
          <h2 className='text-[22px] font-bold'>Kalibrasi Sensor Temperature</h2>
          <img src={Temperature} alt="Temperature Icon" />
        </div>
        <div className="card-body flex flex-wrap justify-around items-center px-8 py-4 pt-6">
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={temperature.min}
            onChange={(e) => setTemperature({ ...temperature, min: e.target.value })}
          />
          <p className='text-[48px] w-full sm:w-auto text-center sm:text-left'>-</p>
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={temperature.max}
            onChange={(e) => setTemperature({ ...temperature, max: e.target.value })}
          />
          <button
            className='bg-[#616161] hover:bg-[#383B4C] text-white w-full sm:w-[30%] h-[90px] text-[24px]'
            onClick={() => handleKalibrasi('temperature')}
          >
            Kalibrasi
          </button>
        </div>
      </div>

      <div className="card bg-white rounded-2xl px-0 py-3 my-6">
        <div className="card-header flex justify-between items-center border-b-2 border-b-[#F4F6F6] w-full px-8 pb-4">
          <h2 className='text-[22px] font-bold'>Kalibrasi Sensor Flow</h2>
          <img src={Flow} alt="Flow Icon" />
        </div>
        <div className="card-body flex flex-wrap justify-around items-center px-8 py-4 pt-6">
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={flow.min}
            onChange={(e) => setFlow({ ...flow, min: e.target.value })}
          />
          <p className='text-[48px] w-full sm:w-auto text-center sm:text-left'>-</p>
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={flow.max}
            onChange={(e) => setFlow({ ...flow, max: e.target.value })}
          />
          <button
            className='bg-[#616161] hover:bg-[#383B4C] text-white w-full sm:w-[30%] h-[90px] text-[24px]'
            onClick={() => handleKalibrasi('flow')}
          >
            Kalibrasi
          </button>
        </div>
      </div>

      <div className="card bg-white rounded-2xl px-0 py-3 my-6">
        <div className="card-header flex justify-between items-center border-b-2 border-b-[#F4F6F6] w-full px-8 pb-4">
          <h2 className='text-[22px] font-bold'>Kalibrasi Sensor Pressure</h2>
          <img src={Pressure} alt="Pressure Icon" />
        </div>
        <div className="card-body flex flex-wrap justify-around items-center px-8 py-4 pt-6">
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={pressure.min}
            onChange={(e) => setPressure({ ...pressure, min: e.target.value })}
          />
          <p className='text-[48px] w-full sm:w-auto text-center sm:text-left'>-</p>
          <input
            className='border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0'
            type="number"
            value={pressure.max}
            onChange={(e) => setPressure({ ...pressure, max: e.target.value })}
          />
          <button
            className={`bg-[#616161] hover:bg-[#383B4C] text-white w-full sm:w-[30%] h-[90px] text-[24px]`}
            onClick={() => handleKalibrasi('pressure')}
          >
            Kalibrasi
          </button>
        </div>
      </div>

      {modalOpen && <Modal type={2} close={handleCloseModal} data={selectedData}></Modal>}
    </div>
  );
};

export default Kalibrasi;
