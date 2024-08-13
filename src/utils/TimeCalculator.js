const TimeCalculator = (firebaseTimestamp) => {
  // Convert the Firebase timestamp to a JavaScript Date object
  const postDate = new Date(firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000);

  // Check if the date is valid
  if (isNaN(postDate.getTime())) {
    return "Invalid date";
  }

  // Calculate the difference in seconds
  const now = new Date();
  const differenceInSeconds = Math.floor((now - postDate) / 1000);

  // Determine the appropriate time ago string
  let interval = Math.floor(differenceInSeconds / 31536000);
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

  interval = Math.floor(differenceInSeconds / 2592000);
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

  interval = Math.floor(differenceInSeconds / 86400);
  if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

  interval = Math.floor(differenceInSeconds / 3600);
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

  interval = Math.floor(differenceInSeconds / 60);
  if (interval >= 1) return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;

  return "Just now";
};

  export default TimeCalculator;