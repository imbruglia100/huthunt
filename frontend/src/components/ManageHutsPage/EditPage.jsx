/** @format */

import "../CreateSpotPage/CreateSpotPage";
import { useState } from "react";
import { updateSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

const EditPage = ({ spot }) => {
  const {closeModal} = useModal()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [newSpot, setNewSpot] = useState({
    country: spot.country,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    lat: spot.lat,
    lng: spot.lng,
    description: spot.description.trim(),
    name: spot.name,
    price: spot.price,
  });
  const user = useSelector((state) => state.session.user);

  const handleHut = async (e) => {
    e.preventDefault()
    if (!Object.values(errors).length > 0) {
      const res = await dispatch(updateSpot(spot, newSpot));

      if (!res?.errors) {
        //   const img = await dispatch(addImagesWithId(res.id, images))
        //   if(!img?.errors){
        //     setNewSpot({})
        //     }
      }
      closeModal()
    }

    setErrors({});
  };
  return user && user.id === spot.ownerId ? (
    <form className='create-spot-form' onSubmit={handleHut}>
      <h1>Update Your Hut</h1>
      <div className='form-section'>
        <h2>Where</h2>
        <div className='form-item'>
          <label>
            Country <span className='error'>{errors.country}</span>
          </label>
          <input
            type='text'
            value={newSpot.country}
            placeholder='United States'
            onChange={({ target }) =>
              setNewSpot((prev) => {
                return { ...prev, country: target.value };
              })
            }
          />
        </div>

        <div className='form-item'>
          <label>
            Address<span className='error'>{errors.address}</span>
          </label>
          <input
            type='text'
            value={newSpot.address}
            placeholder='123 Main St'
            onChange={({ target }) =>
              setNewSpot((prev) => {
                return { ...prev, address: target.value };
              })
            }
          />
        </div>

        <div className='multi-form-items'>
          <div className='form-item'>
            <label>
              City<span className='error'>{errors.city}</span>
            </label>
            <input
              type='text'
              value={newSpot.city}
              placeholder='Boston'
              onChange={({ target }) =>
                setNewSpot((prev) => {
                  return { ...prev, city: target.value };
                })
              }
            />
          </div>

          <div className='form-item'>
            <label>
              State<span className='error'>{errors.state}</span>
            </label>
            <input
              type='text'
              value={newSpot.state}
              placeholder='MA'
              onChange={({ target }) =>
                setNewSpot((prev) => {
                  return { ...prev, state: target.value };
                })
              }
            />
          </div>
        </div>
        <div className='multi-form-items'>
          <div className='form-item'>
            <label>
              Latitude<span className='error'>{errors.lat}</span>
            </label>
            <input
              type='number'
              value={newSpot.lat}
              placeholder='32.125623'
              onChange={({ target }) =>
                setNewSpot((prev) => {
                  return { ...prev, lat: target.value };
                })
              }
            />
          </div>

          <div className='form-item'>
            <label>
              Longitude<span className='error'>{errors.lng}</span>
            </label>
            <input
              type='number'
              value={newSpot.lng}
              placeholder='-42.962523'
              onChange={({ target }) =>
                setNewSpot((prev) => {
                  return { ...prev, lng: target.value };
                })
              }
            />
          </div>
        </div>
      </div>

      <div className='form-section'>
        <h2>Describe it</h2>
        <div className='form-item'>
          <label>
            Description<span className='error'>{errors.description}</span>
          </label>
          <textarea
            type='text'
            value={newSpot.description}
            placeholder='Beautiful bungalow right near the beach!'
            onChange={({ target }) =>
              setNewSpot((prev) => {
                return { ...prev, description: target.value };
              })
            }
          />
        </div>
      </div>

      <div className='form-section'>
        <h2>Name Your Hut</h2>
        <div className='form-item'>
          <label>
            Name<span className='error'>{errors.name}</span>
          </label>
          <input
            type='text'
            value={newSpot.name}
            placeholder='Beach Bungalow'
            onChange={({ target }) =>
              setNewSpot((prev) => {
                return { ...prev, name: target.value };
              })
            }
          />
        </div>
      </div>

      <div className='form-section'>
        <h2>Set a Price</h2>
        <div className='form-item'>
          <label>
            Price<span className='error'>{errors.price}</span>
          </label>
          <input
            type='number'
            value={newSpot.price}
            placeholder='124'
            onChange={({ target }) =>
              setNewSpot((prev) => {
                return { ...prev, price: target.value };
              })
            }
          />
        </div>
      </div>
      <div>
        <button className='primary-btn'>Update</button>
      </div>
    </form>
  ) : (
    <Navigate to='/' />
  );
};

export default EditPage;
