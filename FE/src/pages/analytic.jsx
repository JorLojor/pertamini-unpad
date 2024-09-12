import AnaliticCardBig from "../components/analiticCard/analiticCardBig";
import { useEffect, useState } from "react";

const Analytic = ({ sensor }) => {
     // endpoint untuk dryness : https://backend-agustrisa.as1.pitunnel.net/api/trend/dryness?period=now
     // endpint untuk suhu : https://backend-agustrisa.as1.pitunnel.net/api/trend/suhu?period=now
     // endpoint untuk tekanan : https://backend-agustrisa.as1.pitunnel.net/api/trend/tekanan?period=now
     // endpoint untuk flow : https://backend-agustrisa.as1.pitunnel.net/api/trend/flow?period=now
     // endpoint untuk daya : https://backend-agustrisa.as1.pitunnel.net/api/trend/daya?period=now
     const [data, setData] = useState([]);
     const [dataCard, setDataCard] = useState({}); // dummy

     // dummy
     const updateRandomData = () => {
          const drynessValue = generateRandomValue();
          const suhuValue = generateRandomValue();
          const tekananValue = generateRandomValue();
          const flowValue = generateRandomValue();
          const dayaValue = generateRandomValue();

          setDataCard({
               dryness_steam: drynessValue,
               suhu: suhuValue,
               tekanan: tekananValue,
               flow: flowValue,
               energi: dayaValue,
          });
     };
     // dummy
     const generateRandomValue = () => {
          const value = (Math.random() * (100.5 - 99.0) + 99.0).toFixed(2);
          return value;
     };

     const fechDataNarasi = async () => {
          const res = await fetch(
               "https://backend-agustrisa.as1.pitunnel.net/api/trend/dryness?period=now"
          );
          const data = await res.json();
          console.log(data);
          setData(data);
     };

     useEffect(() => {
          fechDataNarasi();
     }, []);

     return (
          <>
               <div className="flex flex-wrap justify-around pt-24 w-full ">
                    pppp
               </div>
          </>
     );
   };
   
   export default Analytic;
   