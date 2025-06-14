import React from "react";
import styles from "./Home.module.css";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
import car4 from "../assets/car4.png";


const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Rent a Car</h1>
      <p className={styles.subheading}>
        Choose from a wide range of vehicles for your needs.
      </p>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Location"
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Pick-up Date"
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Return Date"
          className={styles.input}
        />
        <button className={styles.searchBtn}>Search</button>
      </div>

      <div className={styles.carsSection}>
        {/* <img src="./assets/car1.png" alt="Car 1" className={styles.carImage} /> */}
        <img src={car1} alt="Car 1" className={styles.carImage} />
        <img src={car2} alt="Car 2" className={styles.carImage} />
        <img src={car3} alt="Car 3" className={styles.carImage} />
        <img src={car4} alt="Car 4" className={styles.carImage} />
        
      </div>
    </div>
  );
};

export default Home;




































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../ui/Navbar";
// import styles from "./Home.module.css";

// const Home = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/postcars");
//         console.log(response.data);
//         setCars(response.data);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };
//     fetchCars();
//   }, []);

//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className={styles.homeContainer}>
//         <h1 className={styles.homeTitle}>Available Cars for Rent</h1>
//         <div className={styles.cardGrid}>
//           {cars.map((car) => (
//             <div className={styles.carCard} key={car._id}>
//               <img
//                 src={`http://localhost:5000/uploads/${car.carimage1}`}
//                 alt={car.cartitle}
//                 className={styles.carImage}
//               />
//               <div className={styles.carDetails}>
//                 <h2 className={styles.carTitle}>{car.cartitle}</h2>
//                 <p><strong>Owner:</strong> {car.vehicleownerid?.fullname || "N/A"}</p>
//                 <p><strong>Rental Price:</strong> ₹{car.price} / day</p>
//                 <p><strong>Model Variant:</strong> {car.variant}</p>
//                 <p>
//                   <strong>Driver:</strong>{" "}
//                   <span
//                     className={
//                       car.driverstatus === "yes"
//                         ? styles.available
//                         : styles.notAvailable
//                     }
//                   >
//                     {car.driverstatus === "yes" ? "Available" : "Not Available"}
//                   </span>
//                 </p>
//                 <button className={styles.rentNowBtn}>Rent Now</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
