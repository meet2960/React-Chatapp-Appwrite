import moment from "moment";
export const formatDate = (dateString: string): string => {
  const formatedDate = moment(dateString).format("DD/MM/YY h:mm:ss A");
  return formatedDate;
};

export const utcMomentObject = (dateString: string): string => {
  const momentObj = moment.utc(dateString);
  const formatedDate = momentObj.format("DD/MM/YY, h:mm A");
  return formatedDate;
};
