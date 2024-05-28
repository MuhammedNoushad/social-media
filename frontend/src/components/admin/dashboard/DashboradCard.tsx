import useDashboardData from "../../../hooks/admin/useDashboardData";
import Card from "./Card";

function DashboardCard() {

  const {totalLikes, totalPosts, totalUsers} = useDashboardData()

  const cardData = [
    {
      title: 'Total Users',
      value: totalUsers,
      percentage: '14.6',
      isPositive: true,
    },
    {
      title: 'Total Posts',
      value: totalPosts,
      percentage: '32.9',
      isPositive: true,
    },
    {
      title: 'Total Likes',
      value: totalLikes ,
      percentage: '-2.7',
      isPositive: false,
    },
  ];

  return (
    <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
          isPositive={card.isPositive}
        />
      ))}
    </div>
  );
}

export default DashboardCard;