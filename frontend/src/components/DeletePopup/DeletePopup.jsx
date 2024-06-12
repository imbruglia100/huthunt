import './DeletePopup.css'

const DeletePopup = ({handleSpotDelete, handleReviewDelete}) => {
    return (
        <div className='delete-container'>
            <h3>Confim Delete</h3>
            <div className='button-container-delete'>
                <button className="primary-btn" onClick={handleSpotDelete ? handleSpotDelete : handleReviewDelete} style={{width:"fit-content"}}>Yes</button>
                <button className="secondary-btn" onClick={window.focus()} style={{width:"fit-content"}}>No</button>
            </div>
        </div>
    )
}

export default DeletePopup;
