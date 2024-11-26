import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

// This is the star function that I used in the Frontend Frameworks exam, and modified for use in TypeScript and styling in Tailwind!

interface CalcRatingsProps {
  rating: number;
}
export const CalcRatings: React.FC<CalcRatingsProps> = ({ rating }) => {
  const blueStars = "text-theme-blue text-2xl";
  const fullStar = <FaStar className={blueStars} />;
  const halfStar = <FaStarHalfAlt className={blueStars} />;
  const hollowStar = <FaRegStar className={blueStars} />;
  const stars = [];
  const integerPart = Math.floor(rating);
  const decimalPart = rating - integerPart;
  for (let i = 0; i < integerPart; i++) {
    stars.push(<span key={i}>{fullStar}</span>);
  }
  if (decimalPart >= 0.5) {
    stars.push(<span key={integerPart}>{halfStar}</span>);
  }
  const totalStars = decimalPart >= 0.5 ? integerPart + 1 : integerPart;
  for (let i = totalStars; i < 5; i++) {
    stars.push(<span key={i + integerPart}>{hollowStar}</span>);
  }
  return (
    <div className="flex flex-row items-center justify-center mb-2 mt-2">
      {stars}
    </div>
  );
};