/** @format */

import { FaStar } from "react-icons/fa";
import "./ReviewCard.css";
import { useDispatch } from "react-redux";
import { delelteReview } from "../../store/reviews";
import DeletePopup from "../DeletePopup/DeletePopup";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useEffect, useState } from "react";

const ReviewCard = ({ manage, review }) => {
  const { User } = review;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dispatch = useDispatch();
  const [date, setDate] = useState([])

  const handleDelete = async () => {
    await dispatch(delelteReview(review.id));
  };

  useEffect(() => {
    setDate(review?.createdAt && review?.createdAt.split("T")[0].split('-'))
  }, [])

  return (
    review && (
      <div className='review-container'>
        <div className='flex-container'>
          <h1>
            {User?.firstName[0].toUpperCase() + User?.firstName.slice(1) ||
              "Happy Renter"}
          </h1>
          <div className='star-container'>
            <FaStar />
            <span>{review?.stars}</span>
          </div>
        </div>
        <h3>{`${months[date[1] - 1]} ${date[2]}, ${date[0]}`}</h3>
        {review?.review}

        {manage && (
          <div className='btns-group'>
            <OpenModalButton
              buttonText='Delete'
              modalComponent={<DeletePopup handleReviewDelete={handleDelete} />}
            />
          </div>
        )}
      </div>
    )
  );
};

export default ReviewCard;
