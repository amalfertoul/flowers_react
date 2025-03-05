import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReview, updateReview } from "../redux/slices/reviewsSlice";

const ReviewForm = ({ editingReview, setEditingReview }) => {
  const dispatch = useDispatch();
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    if (editingReview) setPhrase(editingReview.phrase);
  }, [editingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phrase.trim()) return alert("Please enter a review phrase.");

    const reviewData = { phrase };


    if (editingReview) {

    reviewData.id = editingReview.id;
    dispatch(updateReview({ id: editingReview.id, review: reviewData }));
    setEditingReview(null);
  } else {
    dispatch(addReview({ phrase }));
  }

  setPhrase("");
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <input
        type="text"
        placeholder="Write a review..."
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        required
      />
      <button type="submit">{editingReview ? "Update" : "Add"} Review</button>
      {editingReview && <button onClick={() => setEditingReview(null)}>Cancel</button>}
    </form>
  );
};

export default ReviewForm;
