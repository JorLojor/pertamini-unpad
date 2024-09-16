import { useState, useEffect } from "react";
import Temperature from "../assets/TemperatureIcon.svg";
import Flow from "../assets/FlowIcon.svg";
import Pressure from "../assets/PressureIcon.svg";
import drynessIcon from "../assets/DrynessIcon.svg";
import Modal from "../components/modal/Modal";
import PowerIcon from "../assets/PowerIcon.svg";
import SensorLimitCard from "../components/sensorLimitCard/sensorLimitCard";

const Batas = () => {
     const [modalOpen, setModalOpen] = useState(false);
     const [limitSensor, setLimitSensor] = useState({
          dryness: { min: 0, max: 0 },
          temperature: { min: 0, max: 0 },
          pressure: { min: 0, max: 0 },
          flow: { min: 0, max: 0 },
          power: { min: 0, max: 0 },
     });
     const [sensorDataLimits, setSensorDataLimits] = useState({
          dryness: { min: null, max: null },
          temperature: { min: null, max: null },
          pressure: { min: null, max: null },
          flow: { min: null, max: null },
          power: { min: null, max: null },
     });

     const fetchSensorLimits = async () => {
          try {
               const setupStartDate = new Date();
               setupStartDate.setDate(setupStartDate.getDate() - 1);
               const setupEndDate = new Date();

               const formattedStartDate = `${setupStartDate.getFullYear()}-${String(
                    setupStartDate.getMonth() + 1
               ).padStart(2, "0")}-${String(setupStartDate.getDate()).padStart(
                    2,
                    "0"
               )}`;
               const formattedEndDate = `${setupEndDate.getFullYear()}-${String(
                    setupEndDate.getMonth() + 1
               ).padStart(2, "0")}-${String(setupEndDate.getDate()).padStart(
                    2,
                    "0"
               )}`;

               const sensors = [
                    "dryness",
                    "temperature",
                    "pressure",
                    "flow",
                    "power",
               ];

               let limits = {};

               for (const sensor of sensors) {
                    console.log(sensor);

                    const params = new URLSearchParams({
                         startDate: formattedStartDate,
                         endDate: formattedEndDate,
                    });
                    const url = `https://backend-agustrisa.as1.pitunnel.net/api/dataGrafik?type=${sensor}&${params.toString()}`;
                    console.log("url Batas   : ", url);
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.length > 0) {
                         const minValue = Math.min(
                              ...data.map((item) => item.value)
                         );
                         const maxValue = Math.max(
                              ...data.map((item) => item.value)
                         );
                         console.log(
                              `Min: ${minValue}, Max: ${maxValue} for sensor: ${sensor}`
                         );

                         limits[sensor] = {
                              min: minValue,
                              max: maxValue,
                         };
                    } else {
                         limits[sensor] = {
                              min: 0,
                              max: 0,
                         };
                    }
               }

               setSensorDataLimits(limits);
          } catch (error) {
               console.error("Error fetching sensor limits:", error);
          }
     };

     const handleCloseModal = () => {
          setModalOpen(false);
     };

     const updateLimit = (sensor, type, value) => {
          setLimitSensor((prevLimits) => ({
               ...prevLimits,
               [sensor]: {
                    ...prevLimits[sensor],
                    [type]: parseFloat(value) || 0,
               },
          }));
     };

     const SetLimit = async () => {
          try {
               const limitsToStore = {};

               for (const sensor in limitSensor) {
                    const sensorLimits = limitSensor[sensor];

                    const payload = {
                         type: sensor,
                         batasAtas: parseFloat(sensorLimits.max),
                         batasBawah: parseFloat(sensorLimits.min),
                    };

                    limitsToStore[sensor] = payload;

                    const response = await fetch(
                         "https://backend-agustrisa.as1.pitunnel.net/api/setlimit",
                         {
                              method: "POST",
                              headers: {
                                   "Content-Type": "application/json",
                              },
                              body: JSON.stringify(payload),
                         }
                    );

                    if (!response.ok) {
                         throw new Error(
                              `Error setting limit for ${sensor}: ${response.statusText}`
                         );
                    }

                    const responseData = await response.json();
                    console.log(
                         `Successfully set limit for ${sensor}:`,
                         responseData
                    );
               }

               localStorage.setItem(
                    "sensorLimits",
                    JSON.stringify(limitsToStore)
               );

               alert("Successfully updated limits for all sensors.");
          } catch (error) {
               console.error("Error setting limits:", error.message);
               alert("Failed to update sensor limits.");
          }
     };

     useEffect(() => {
          fetchSensorLimits();
     }, []);

     return (
          <div className="pt-24">
               <SensorLimitCard
                    name="Temperature"
                    icon={Temperature}
                    limit={limitSensor.temperature}
                    placeholder={sensorDataLimits.temperature}
                    onChange={(type, value) =>
                         updateLimit("temperature", type, value)
                    }
               />
               <SensorLimitCard
                    name="Dryness"
                    icon={drynessIcon}
                    limit={limitSensor.dryness}
                    placeholder={sensorDataLimits.dryness}
                    onChange={(type, value) =>
                         updateLimit("dryness", type, value)
                    }
               />
               <SensorLimitCard
                    name="Pressure"
                    icon={Pressure}
                    limit={limitSensor.pressure}
                    placeholder={sensorDataLimits.pressure}
                    onChange={(type, value) =>
                         updateLimit("pressure", type, value)
                    }
               />
               <SensorLimitCard
                    name="Flow"
                    icon={Flow}
                    limit={limitSensor.flow}
                    placeholder={sensorDataLimits.flow}
                    onChange={(type, value) => updateLimit("flow", type, value)}
               />
               <SensorLimitCard
                    name="Power Prediction"
                    icon={PowerIcon}
                    limit={limitSensor.power}
                    placeholder={sensorDataLimits.power}
                    onChange={(type, value) =>
                         updateLimit("power", type, value)
                    }
               />

               <div className="text-center mt-6">
                    <button
                         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                         onClick={SetLimit}>
                         Save Limits
                    </button>
               </div>

               {modalOpen && <Modal type={2} close={handleCloseModal} />}
          </div>
     );
};

export default Batas;
