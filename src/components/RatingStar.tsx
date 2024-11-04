const RatingStar = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const clampedRating = Math.max(0, Math.min(Number(rating), totalStars));

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < clampedRating ? "text-yellow-500" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-700">{clampedRating.toFixed(1)}/5</span>
    </div>
  );
};

export default RatingStar;
