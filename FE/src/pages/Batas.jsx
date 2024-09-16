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
          dryness_steam: { min: 0, max: 0 },
          temperature: { min: 0, max: 0 },
          pressure: { min: 0, max: 0 },
          flow: { min: 0, max: 0 },
          power_prediction: { min: 0, max: 0 },
     });
     const [sensorDataLimits, setSensorDataLimits] = useState({
          dryness_steam: { min: null, max: null },
          temperature: { min: null, max: null },
          pressure: { min: null, max: null },
          flow: { min: null, max: null },
          power_prediction: { min: null, max: null },
     });

     const fetchSensorLimits = async () => {
          try {
               // ngeset tanggal 3 bulan yang lalu
               //    const currentDate = new Date().toISOString().split("T")[0];
               //    const threeMonthsAgo = new Date();
               //    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
               //    const startDate = threeMonthsAgo.toISOString().split("T")[0];

               const sensors = ["dryness", "Temperature", "Pressure", "flow", "Power"];
               const sensorMapping = {
                    dryness: "dryness_steam",
                    Temperature: "temperature",
                    Pressure: "pressure",
                    flow: "flow",
                    Power: "power_prediction",
               };

               let limits = {};

               for (const sensor of sensors) {
                    const response = await fetch(
                         //  `https://backend-agustrisa.as1.pitunnel.net/api/dataGrafik/${sensor}?startDate=${startDate}&endDate=${currentDate}`
                         `https://backend-agustrisa.as1.pitunnel.net/api/dataGrafik/${sensor}?startDate=&endDate=`
                    );
                    const data = await response.json();

                    const minValue = Math.min(
                         ...data.map((item) => item.value)
                    );
                    const maxValue = Math.max(
                         ...data.map((item) => item.value)
                    );

                    limits[sensorMapping[sensor]] = {
                         min: minValue,
                         max: maxValue,
                    };
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
                    [type]: value,
               },
          }));
     };

     const SetLimit = async () => {
          try {
               const limitsToStore = {};

               for (const sensor in limitSensor) {
                    const sensorLimits = limitSensor[sensor];

                    const payload = {
                         data: sensor,
                         batasAtas: parseFloat(sensorLimits.max),
                         batasBawah: parseFloat(sensorLimits.min),
                    };

                    limitsToStore[sensor] = payload;

                    const response = await fetch(
                         "https://backend-agustrisa.as1.pitunnel.net/api/setLimit",
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
                    limit={limitSensor.dryness_steam}
                    placeholder={sensorDataLimits.dryness_steam}
                    onChange={(type, value) =>
                         updateLimit("dryness_steam", type, value)
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
                    limit={limitSensor.power_prediction}
                    placeholder={sensorDataLimits.power_prediction}
                    onChange={(type, value) =>
                         updateLimit("power_prediction", type, value)
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
