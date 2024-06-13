import { useModal } from '../../context/Modal';
import './DeletePopup.css'

const DeletePopup = ({handleSpotDelete, handleReviewDelete}) => {
    const {closeModal} = useModal()
    const handleDelete = async () => {
        if(handleSpotDelete){
            await handleSpotDelete()
        } else {
           await handleReviewDelete()
        }

        closeModal()
    }
    return (
        <div className='delete-container'>
            <h3>Confim Delete</h3>
            <div className='button-container-delete'>
                <button className="primary-btn" onClick={handleDelete} style={{width:"fit-content"}}>Yes</button>
                <button className="secondary-btn" onClick={closeModal} style={{width:"fit-content"}}>No</button>
            </div>
        </div>
    )
}

export default DeletePopup;
