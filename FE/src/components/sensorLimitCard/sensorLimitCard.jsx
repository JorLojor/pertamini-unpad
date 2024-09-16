import PropTypes from "prop-types";

const SensorLimitCard = ({ name, icon, limit, placeholder, onChange }) => {
     return (
          <div className="card bg-white rounded-2xl px-0 py-3 my-6">
               <div className="card-header flex justify-between items-center border-b-2 border-b-[#F4F6F6] w-full px-8 pb-4">
                    <h2 className="text-[22px] font-bold">
                         Set Limit Sensor {name}
                    </h2>
                    <img src={icon} alt={`${name} Icon`} />
               </div>
               <div className="card-body flex flex-wrap justify-around items-center px-8 py-4 pt-6">
                    <label htmlFor="">
                         <p className="text-[48px] w-full sm:w-auto text-center sm:text-left">
                              Limit minimum
                         </p>
                    </label>
                    <input
                         className="border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0"
                         type="number"
                         value={limit.min}
                         placeholder={
                              placeholder && placeholder.min !== null
                                   ? `Min: ${placeholder.min}`
                                   : "Loading..."
                         }
                         onChange={(e) => onChange("min", e.target.value)}
                    />

                    <p className="text-[48px] w-full sm:w-auto text-center sm:text-left">
                         -
                    </p>

                    <label htmlFor="">
                         <p className="text-[48px] w-full sm:w-auto text-center sm:text-left">
                              Limit maximum
                         </p>
                    </label>

                    <input
                         className="border-[#E5E5E5] border-2 text-center text-[48px] font-medium w-full sm:w-[30%] h-[90px] mb-4 sm:mb-0"
                         type="number"
                         value={limit.max}
                         placeholder={
                              placeholder && placeholder.max !== null
                                   ? `Max: ${placeholder.max}`
                                   : "Loading..."
                         }
                         onChange={(e) => onChange("max", e.target.value)}
                    />
               </div>
          </div>
     );
};

SensorLimitCard.propTypes = {
     name: PropTypes.string.isRequired,
     icon: PropTypes.string.isRequired,
     limit: PropTypes.object.isRequired,
     placeholder: PropTypes.object.isRequired,
     onChange: PropTypes.func.isRequired,
};

export default SensorLimitCard;
