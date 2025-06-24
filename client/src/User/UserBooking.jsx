import React, { useEffect, useState } from 'react';
import styles from './UserBooking.module.css';
import UserSidebar from './UserSidebar';
import axios from 'axios';

export default function UserBooking() {
  const [cars, setCars] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCars();
    fetchLocations();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/postcars/booking");
      setCars(res.data);
    } catch (err) {
      console.error("Booking car fetch error:", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/locationmaster/");
      setLocations(res.data);
    } catch (err) {
      console.error("Location fetch error:", err);
    }
  };

  const handleBookClick = (car) => {
    setSelectedCar(car);
    setPaymentStep(false);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setPickupDate('');
    setDropDate('');
    setPickupLocation('');
    setDropLocation('');
    setPaymentMethod('');
    setPaymentStep(false);
  };

  const handleConfirmBooking = () => {
    if (!pickupDate || !dropDate || !pickupLocation || !dropLocation) {
      alert("Please fill all booking details.");
      return;
    }

    if (new Date(dropDate) <= new Date(pickupDate)) {
      alert("Drop date must be after pickup date.");
      return;
    }

    setPaymentStep(true);
  };

  const handleMakePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const totalDays = Math.ceil((new Date(dropDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = totalDays * selectedCar.price;

    const bookingData = {
      userId: user._id,
      carId: selectedCar._id,
      pickupDate,
      dropDate,
      pickupLocation,
      dropLocation,
      totalAmount,
      paymentMethod,
      status: "Pending"
    };

    try {
      const res = await axios.post("http://localhost:5000/booking", bookingData);
      if (res.data.success) {
        alert("✅ Booking Confirmed!");
        closeModal();
      } else {
        alert("❌ Booking Failed!");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <UserSidebar />
      </div>
      <div className={styles.mainContent}>
        <h2 className={styles.heading}>Available Cars for Booking</h2>
        <div className={styles.orderList}>
          {cars.length === 0 ? (
            <p className={styles.empty}>No cars available for booking at the moment.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className={styles.card}>
                <img
                  src={car.carimage1 ? `http://localhost:5000/upload/${car.carimage1}` : 'https://via.placeholder.com/150'}
                  alt={car.cartitle}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{car.cartitle}</h3>
                  <p><strong>Price:</strong> ₹{car.price}/day</p>
                  <p><strong>Model:</strong> {car.variant}</p>
                  <p><strong>RC Number:</strong> {car.carvehicleno}</p>
                  <p><strong>Owner:</strong> {car.vehicleownerid?.fullname || 'N/A'}</p>
                  <button className={styles.bookBtn} onClick={() => handleBookClick(car)}>
                    Book This Car
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedCar && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {!paymentStep ? (
              <>
                <h3>Confirm Booking</h3>
                <p><strong>Car:</strong> {selectedCar.cartitle}</p>
                <p><strong>Price:</strong> ₹{selectedCar.price}/day</p>

                <div className={styles.formGroup}>
                  <label>Pickup Date:</label>
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                </div>

                <div className={styles.formGroup}>
                  <label>Drop Date:</label>
                  <input type="date" value={dropDate} onChange={(e) => setDropDate(e.target.value)} />
                </div>

                <div className={styles.formGroup}>
                  <label>Pickup Location:</label>
                  <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                    <option value="">Select Pickup Location</option>
                    {locations.map((loc) => (
                      <option key={loc._id} value={loc.locationname}>{loc.locationname}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Drop Location:</label>
                  <select value={dropLocation} onChange={(e) => setDropLocation(e.target.value)}>
                    <option value="">Select Drop Location</option>
                    {locations.map((loc) => (
                      <option key={loc._id} value={loc.locationname}>{loc.locationname}</option>
                    ))}
                  </select>
                </div>

                <button className={styles.confirmBtn} onClick={handleConfirmBooking}>
                  Continue to Payment
                </button>
              </>
            ) : (
              <>
                <h3>Payment</h3>
                <p><strong>Car:</strong> {selectedCar.cartitle}</p>
                <p><strong>Total Days:</strong> {Math.ceil((new Date(dropDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))}</p>
                <p><strong>Total Price:</strong> ₹{Math.ceil((new Date(dropDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)) * selectedCar.price}</p>

                <div className={styles.formGroup}>
                  <label>Select Payment Method:</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">Choose Payment Option</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Debit/Credit Card</option>
                    <option value="COD">Cash on Delivery</option>
                  </select>
                </div>

                <button className={styles.confirmBtn} onClick={handleMakePayment}>
                  Make Payment
                </button>
              </>
            )}
            <button className={styles.closeBtn} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
