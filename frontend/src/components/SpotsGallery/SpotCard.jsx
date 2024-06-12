/** @format */

import { useNavigate } from "react-router-dom";
import house from "../../assets/house.png";
import "./Spots.css";
import { FaStar } from "react-icons/fa";
import { deleteUserSpot } from "../../store/session";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditPage from "../ManageHutsPage/EditPage";
import DeletePopup from '../DeletePopup/DeletePopup'

const SpotCard = ({ spot, manage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleRoute = () => {
    navigate(`/huts/${spot.id}`);
  };
  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(deleteUserSpot(spot.id))
  }
  return (
    spot ? <div className='spot-card'>
      <div
        aria-describedby='spot-name'
        onClick={handleRoute}
        className='spot-img-container'
      >
        <img className='spot-img' src={spot?.previewImage || house} />
        <div role='tooltip' id='spot-name'>
          {spot?.name}
        </div>
      </div>
      <div className='spot-info'>
        <div>
          <p>
            {spot?.city}, {spot?.state}
          </p>
          <p>${spot?.price}/night</p>
        </div>
        <p className='spot-star-rating'>
          {spot?.avgRating === 0 ? (
            "New!"
          ) : (
            <>
              <FaStar />
              {Number(spot?.avgRating).toFixed(1)}
            </>
          )}
        </p>
      </div>
      {manage && (
        <div className="btns-group">
          <OpenModalButton
              buttonText='Edit'
              className='secondary-btn'
              modalComponent={<EditPage spot={spot} />}
            />
            <OpenModalButton
              buttonText='Delete'
              modalComponent={
              <DeletePopup handleSpotDelete={handleDelete} />}
            />
        </div>
      )}
    </div> : ''
  );
};

export default SpotCard;
