import { csrfFetch } from './csrf';

const SET_REVIEWS = "reviews/setReviews";
const ADD_REVIEW = "reviews/addReview";
const REMOVE_REVIEW = "reviews/removeReview"

const RESET = "reviews/reset"
export const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  };
};

export const resetReviews = () => {
  return {
    type: RESET
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review
  }
}

const removeReview = (id) => {
  return {
    type: REMOVE_REVIEW,
    payload: id
  }
}

export const getReviewsBySpotById = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const spotReviews = await response.json()
        const newState = {};
        spotReviews.Reviews && spotReviews.Reviews.forEach(review => {

          newState[review.id] = review
        })

        dispatch(setReviews(newState))
        return newState
    }
}

export const getReviewsByCurrentUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`)

  if(response.ok){
      const userReviews = await response.json()
      const newState = {};
      userReviews.Reviews && userReviews.Reviews.forEach(review => {

        newState[review.id] = review
      })

      dispatch(setReviews(newState))
      return newState
  }
}

export const createAReviewWithId = (id, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  if(response.ok){
      const newReview = await response.json()
      dispatch(addReview(newReview))
      return newReview
  }

  const { errors } = await response.json()
  return errors
}

export const deleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "delete",
})

  if(response.ok){
     return dispatch(removeReview(id))
  }

  const { errors } = await response.json()
  return errors
}

const initialState = { reviews: null, isLoaded: false};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: {...action.payload}, isLoaded: true };
    case ADD_REVIEW:
      return {...state, reviews: {...state.reviews, [action.payload.id]: action.payload}, isLoaded: true}
    case REMOVE_REVIEW:{
      const { [action.payload]: removedReview, ...remainingReviews } =
        state.reviews;

      return {
        ...state,
        reviews: remainingReviews,
        isLoaded: true,
      };
    }
    case RESET:
      return initialState
    default:
      return state;
  }
};

export default reviewsReducer;
