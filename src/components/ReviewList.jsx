import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, deleteReview } from "../redux/slices/reviewsSlice";

const ReviewList = ({ setEditingReview }) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (status === "loading") return <p>Loading reviews...</p>;
  if (status === "failed") return <p>Failed to load reviews.</p>;

  return (
    <ul className="review-list">
      {items.map((review) => (
        <li key={review.id}>
          <p>{review.phrase}</p>
          <button onClick={() => setEditingReview(review)}>Edit</button>
          <button onClick={() => dispatch(deleteReview(review.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
