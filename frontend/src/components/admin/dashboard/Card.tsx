const Card = ({
  title,
  value,
  percentage,
  isPositive,
}: {
  title: string;
  value: number;
  percentage: string;
  isPositive: boolean;
}) => {
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";
  const percentageIcon = isPositive ? (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {value}
          </span>
          <h3 className="text-base font-normal text-gray-500">{title}</h3>
        </div>
        <div
          className={`ml-5 w-0 flex items-center justify-end flex-1 ${percentageColor} text-base font-bold`}
        >
          {percentage}% {percentageIcon}
        </div>
      </div>
    </div>
  );
};

export default Card;
