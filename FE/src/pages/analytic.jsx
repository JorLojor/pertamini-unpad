const Analytic = ({ sensor }) => {
     return (
       <div className="pt-24">
         <h1 className="text-2xl">Analytic Page</h1>
         {sensor && <p className="text-lg">Selected Sensor: {sensor}</p>} {/* Display the selected sensor */}
       </div>
     );
   };
   
   export default Analytic;
   