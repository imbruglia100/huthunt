/** @format */

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewModal.css";
import { useDispatch } from "react-redux";
import { createAReviewWithId, getReviewsBySpotById } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { getSpotById } from "../../store/spots";

const AddReviewModal = ({ spotId }) => {
  const { closeModal } = useModal();
  const [review, setReview] = useState({
    review: "",
    stars: 1,
  });
  const dispatch = useDispatch();
  const stars = document.querySelectorAll(".star");
  const handleRating = (val) => {
    setReview((prev) => ({ ...prev, stars: val }));
  };

  useEffect(() => {

    stars.forEach((star) => {
      console.log('adding event listener', star)
      star.addEventListener("click", handleRating);
    });

  },[])
  const handleSubmit = async () => {
    await dispatch(createAReviewWithId(spotId, review));
    await dispatch(getReviewsBySpotById(spotId));
    await dispatch(getSpotById(spotId));
    closeModal();
  };

  return (
    <form className='modalForm' onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <div className='input-container'>
        <textarea
          style={{ height: "100px" }}
          onChange={(e) =>
            setReview((prev) => {
              return { ...prev, review: e.target.value };
            })
          }
          value={review.review}
          placeholder='Leave your review here...'
        />
      </div>
      <div className='input-container'>
        <div id='star-rating-container'>
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`star ${value <= review.stars ? "gold" : ""}`}
              data-value={value}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>
      </div>

      <button disabled={review.review.length < 10} className='primary-btn'>
        Submit your review
      </button>
    </form>
  );
};

export default AddReviewModal;
