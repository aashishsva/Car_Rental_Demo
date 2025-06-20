// components/VehicleOwnerReviews.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleOwnerSidebar from "./VehicleOwnerSidebar";
import styles from "./VehicleOwnerReviews.module.css";

const VehicleOwnerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [hiddenReviews, setHiddenReviews] = useState([]);

  const ownerId = JSON.parse(localStorage.getItem("vehicleowner"))?._id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/review/owner/${ownerId}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Review fetch error", error);
      }
    };

    if (ownerId) {
      fetchReviews();
    }
  }, [ownerId]);

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/review/${reviewId}`);
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Review delete error", error);
    }
  };

  const toggleHideReview = (reviewId) => {
    if (hiddenReviews.includes(reviewId)) {
      setHiddenReviews(hiddenReviews.filter((id) => id !== reviewId));
    } else {
      setHiddenReviews([...hiddenReviews, reviewId]);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.sidebarWrapper}>
        <VehicleOwnerSidebar />
      </div>
      <div className={styles.reviewContent}>
        <h2 className={styles.reviewTitle}>Car Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews found for your cars.</p>
        ) : (
          reviews.map((review) =>
            hiddenReviews.includes(review._id) ? null : (
              <div key={review._id} className={styles.reviewCard}>
                <p><strong>Car:</strong> {review.carid?.cartitle}</p>
                <p><strong>Passenger:</strong> {review.passengerid?.fullname}</p>
                <p><strong>Rating:</strong> {review.reviewrate} ⭐</p>
                <p><strong>Message:</strong> {review.reviewmessage}</p>
                <p><strong>Date:</strong> {new Date(review.postdate).toLocaleDateString()}</p>
                <div className={styles.reviewActions}>
                  <button onClick={() => deleteReview(review._id)}>🗑️ Delete</button>
                  <button onClick={() => toggleHideReview(review._id)}>🙈 Hide</button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default VehicleOwnerReviews;
