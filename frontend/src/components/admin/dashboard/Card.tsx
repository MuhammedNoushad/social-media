const Card = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {value}
          </span>
          <h3 className="text-base font-normal text-gray-500">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
