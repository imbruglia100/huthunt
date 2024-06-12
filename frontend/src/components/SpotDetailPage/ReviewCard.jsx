import { FaStar } from 'react-icons/fa';
import './ReviewCard.css'
import { useDispatch } from 'react-redux';
import { delelteReview } from '../../store/reviews';
import DeletePopup from '../DeletePopup/DeletePopup';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const ReviewCard = ({ manage, review }) => {
    const {User} = review
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(delelteReview(review.id))
    }

    return (
        <div className="review-container">
            <h2>{User?.firstName[0].toUpperCase() + User?.firstName.slice(1) || 'Happy Renter'}</h2>
            {/* <h3>{review?.createdAt && review?.createdAt.split('T')[0]}</h3> */}
            {review?.review}
            <div className='star-container'>
                <FaStar/><span>{review.stars}</span>
            </div>
            {manage && (
                <div className="btns-group">
                <OpenModalButton
                    buttonText='Delete'
                    modalComponent={
                    <DeletePopup handleReviewDelete={handleDelete} />}
                    />
                </div>
            )}
        </div>
    )
}

export default ReviewCard;
