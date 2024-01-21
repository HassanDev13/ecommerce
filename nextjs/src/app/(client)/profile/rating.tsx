import React, { useState } from "react";

interface RatingProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  desabled?: boolean;
}

const Rating: React.FC<RatingProps> = ({ initialValue = 0, onChange  , desabled}) => {
  const [rating, setRating] = useState(initialValue);

  const handleRatingClick = (value: number) => {
    if(desabled) return;
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <ul className="flex items-center justify-center">
      {stars.map((star) => (
        <li  key={star} onClick={() => handleRatingClick(star)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`mr-1 h-5 w-5 ${
              star <= rating
                ? "text-primary dark:text-primary-400"
                : "text-gray-300 dark:text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-5 w-5 text-warning"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default Rating;
