export const stringDate = async (datePost) => {
  const [year, month, day] = datePost.split("T")[0].split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return [day, monthNames[Number(month) - 1], year];
};
