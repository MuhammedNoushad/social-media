import moment from "moment";

function formatMessageTimeStamp(timestamp: string | number | Date) {
  const now = moment();
  const updatedAt = moment(timestamp);
  const duration = moment.duration(now.diff(updatedAt));

  if (duration.asMinutes() < 1) {
    return "now";
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  } else {
    return `${Math.floor(duration.asDays())}d`;
  }
}

export default formatMessageTimeStamp;
