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
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState(null);
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
                const params = new URLSearchParams({
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                });
                const url = `https://backend-agustrisa.as1.pitunnel.net/api/dataGrafik?type=${sensor}&${params.toString()}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const minValue = Math.min(
                        ...data.map((item) => item.value)
                    );
                    const maxValue = Math.max(
                        ...data.map((item) => item.value)
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

    const handleOpenModal = (sensor) => {
        setModalType(3);
        setModalData({
            name: sensor,
            value: sensorDataLimits[sensor],
        });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const updateLimit = (sensor, type, value) => {
        setSensorDataLimits((prevLimits) => ({
            ...prevLimits,
            [sensor]: {
                ...prevLimits[sensor],
                [type]: value,
            },
        }));
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
                data={sensorDataLimits.temperature}
                onChange={(type, value) =>
                    updateLimit("temperature", type, value)
                }
                onSave={() => handleOpenModal("temperature")}
            />
            <SensorLimitCard
                name="Dryness"
                icon={drynessIcon}
                limit={limitSensor.dryness}
                data={sensorDataLimits.dryness}
                onChange={(type, value) =>
                    updateLimit("dryness", type, value)
                }
                onSave={() => handleOpenModal("dryness")}
            />
            <SensorLimitCard
                name="Pressure"
                icon={Pressure}
                limit={limitSensor.pressure}
                data={sensorDataLimits.pressure}
                onChange={(type, value) =>
                    updateLimit("pressure", type, value)
                }
                onSave={() => handleOpenModal("pressure")}
            />
            <SensorLimitCard
                name="Flow"
                icon={Flow}
                limit={limitSensor.flow}
                data={sensorDataLimits.flow}
                onChange={(type, value) => updateLimit("flow", type, value)}
                onSave={() => handleOpenModal("flow")}
            />
            <SensorLimitCard
                name="Power Prediction"
                icon={PowerIcon}
                limit={limitSensor.power}
                data={sensorDataLimits.power}
                onChange={(type, value) =>
                    updateLimit("power", type, value)
                }
                onSave={() => handleOpenModal("power")}
            />

            {modalOpen && (
                <Modal
                    type={modalType}
                    close={handleCloseModal}
                    data={modalData}
                />
            )}
        </div>
    );
};

export default Batas;
