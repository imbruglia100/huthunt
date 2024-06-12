/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsFromCurrent } from "../../store/session";
import "./ManageHuts.css";
import { useParams } from "react-router-dom";
import SpotCard from "../SpotsGallery/SpotCard";
import { getReviewsByCurrentUser, resetReviews } from "../../store/reviews";
import ReviewCard from "../SpotDetailPage/ReviewCard";

const ManagePage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const userSpots = useSelector((state) => state.session.userSpots);
  const userReviews = useSelector((state) => state.reviewState);

  useEffect(() => {
    dispatch(resetReviews());
    if (type === "huts") {
      dispatch(getSpotsFromCurrent());
    } else {
      dispatch(getReviewsByCurrentUser());
    }
  }, [dispatch, type]);

  const ManageReviews = () => {
    return (
      <div className='management-container'>
        <h1>Manage Your Reviews</h1>
        <div className='manage-review-cards'>
          {userReviews.isLoaded ? (
            Object.keys(userReviews.reviews).length > 0 ? (
              Object.values(userReviews.reviews).map((review, i) => (
                <ReviewCard key={i} manage={true} review={review} />
              ))
            ) : (
              <h2>Please visit a spot to post a review</h2>
            )
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    );
  };

  const ManageHuts = () => {
    return (
      <div className='management-container'>
        <h1>Manage Your Huts</h1>
        <div className='manage-spot-cards'>
          {userSpots.isLoaded ? (
            userSpots ? (
              Object.values(userSpots.spots).map((spot, i) => (
                <SpotCard manage={true} key={i} spot={spot} />
              ))
            ) : (
              <h2>You have no huts :{`(`}</h2>
            )
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    );
  };

  return <>{type === "huts" ? <ManageHuts /> : <ManageReviews />}</>;
};

export default ManagePage;
