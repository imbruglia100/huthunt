/** @format */

import { useState } from "react";
// import { FaStar } from "react-icons/fa";
import './ReviewModal.css'
import { useDispatch } from "react-redux";
import { createAReviewWithId } from "../../store/reviews";

const AddReviewModal = ({spotId}) => {
  const [review, setReview] = useState({
    review: '',
    stars: 5
  })
const dispatch = useDispatch()

  //   const starContainer= document.getElementById("star-rating-container")

  //   const starArr = Array.from(starContainer.childNodes)

  //   starContainer.addEventListener('mouseover', (e) => {
  //   e.stopPropagation()
  //   const currStar = e.target
  //   const currIndex = starArr.indexOf(currStar)
  //   if(starArr.length > 0 && starArr.includes(e.target)){
  //     starArr.forEach((star, i) => {
  //       if(i <= currIndex){
  //         star.classList.add('gold')
  //       }
  //     })
  //   }
  // })

  const handleChange = e => {
    e.preventDefault();
    setReview(prev => {return{...prev, stars: +e.target.value}})
  }
  const handleSubmit = async () => {

    dispatch(createAReviewWithId(spotId, review))
  };
  return (
    <form className='modalForm' onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <div className='input-container'>
        <textarea style={{height: "100px"}} onChange={(e) => setReview(prev=> {return {...prev, review:e.target.value}})} value={review.review} placeholder='Leave your review here...' />
      </div>
      <div className='input-container'>
        {/* <div id="star-rating-container">
          <FaStar id='0'/>
          <FaStar id='1'/>
          <FaStar id='2'/>
          <FaStar id='3'/>
          <FaStar id='4'/>
        </div> */}
        <label>Star Rating</label>
          <select onChange={handleChange} defaultValue={review.stars}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
      </div>

      <button disabled={review.review.length < 10} className='primary-btn'>Submit your review</button>
    </form>
  );
};

export default AddReviewModal;
