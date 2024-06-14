/** @format */

import { useParams } from "react-router-dom";
import "./SpotDetailPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import { getReviewsBySpotById, setReviews } from "../../store/reviews";
import ReviewCard from "./ReviewCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddReviewModal from "../ReviewModal/ReviewModal";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const current = useSelector(state=>state.spotState.current)
  const reviews = useSelector(state=>state.reviewState.reviews)
  const user = useSelector(state=>state.session.user)

  const isLoaded = useSelector((state) => state.spotState.current.isLoaded);
  useEffect(() => {
    dispatch(setReviews({}));
    dispatch(getSpotById(spotId));
    dispatch(getReviewsBySpotById(spotId));
  }, [dispatch, spotId]);
  const previewImg = current?.SpotImages && current?.SpotImages.length > 0 ? current?.SpotImages.filter(img => img.preview===true) : [{url: ''}]

  return isLoaded ? (
    !current.error ? (
      <div className='spot-detail-container'>
        <h1>{current.name}</h1>
        <h3>{`${current.city}, ${current.state}, ${current.country}`}</h3>

        <div className='img-container'>
          <img className='main-preview-img' src={previewImg[0].url} />

          <div className='img-small-container'>
            {current.SpotImages.map((img, i) => {
              if (!img.preview) {

                return (
                  <div key={i} className="small-img-container">
                    <img key={img.id} src={img.url} />
                  </div>
              );
              }
            })}
          </div>
        </div>

        <div className='spot-info-container'>
          <div className='spot-info'>
            <h2>{`Hosted by ${current.Owner.firstName} ${current.Owner.lastName}`}</h2>
            <p>{current.description}</p>
          </div>

          <div className='spot-reserve-container'>
            <div className='spot-reserve-card'>
              <div className='spot-reserve-info'>
                <p className='spot-price'>
                  <span>{`$${current.price}`}</span>night
                </p>
                <div className='spot-reserve-review-info'>
                  <div>
                    <FaStar />
                    {current.avgStarRating <= 0 ? 'New' : current.avgStarRating}
                  </div>
                  •
                  <div>
                    {current.numReviews}{" "}
                    {current.numReviews === 1 ? "review" : "reviews"}
                  </div>
                </div>
              </div>
              <button
                className='primary-btn'
                onClick={() => alert("Feature Coming Soon..")}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>

        {reviews && (
          <div className='reviews-container'>
            <h2>
              <FaStar />
              {current.numReviews > 0
                ? `${current.avgStarRating} • ${current.numReviews} ${
                    current.numReviews === 1 ? "review" : "reviews"
                  }`
                : "New"}
            </h2>
            <div style={{ width: "fit-content" }}>
              {user &&
                current.Owner.id !== user.id &&
                !Object.values(reviews).find(review=> review.userId === user.id) && (
                  <OpenModalButton
                    buttonText={"Post Your Review"}
                    modalComponent={<AddReviewModal spotId={current.id} />}
                  />
                )}
            </div>
            {Object.values(reviews).length === 0 &&
            user &&
            current.Owner.id !== user.id ? (
              <h3>Be the first one to post a review!</h3>
            ) : (
              Object.values(reviews)
                .reverse()
                .map((review) => <ReviewCard key={review.id} review={review} />)
            )}
          </div>
        )}
      </div>
    ) : (
      <h2>{current.error}</h2>
    )
  ) : (
    <h1>Loading...</h1>
  );
};

export default SpotDetailPage;
