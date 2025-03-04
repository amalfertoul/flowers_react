import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, deleteReview } from "../redux/slices/reviewsSlice";

const ReviewsComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {items.map(review => (
          <li key={review.id}>
            {review.phrase} <button onClick={() => dispatch(deleteReview(review.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsComponent;
