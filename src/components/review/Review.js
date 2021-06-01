const Review = (props) => {

    return (
        <div className="review-row">
            <div className="card" style={{padding:'10px'}}>
                <div className="card-body">
                    <h5 className="card-title">{props.customerName}  {props.rating}/5 <i className="fa fa-star" aria-hidden="true"></i> {props.date === "NULL" ? '' : `at ${props.date}`} </h5>
                    <p className="card-text">{props.comments}</p>
                </div>
            </div>
            <div style={{borderBottom:'1px solid grey',width:'80%'}}></div>
        </div>);
}

export default Review;