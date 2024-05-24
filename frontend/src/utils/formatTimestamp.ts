function formatTimestamp(timestamp: string | number | Date) {
    const now = new Date();
    const messageDate = new Date(timestamp);
  
    const isToday = now.toDateString() === messageDate.toDateString();
    const isYesterday = new Date(now.getTime() - 86400000).toDateString() === messageDate.toDateString();
  
    if (isToday) {
      return `Today at ${messageDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
    } else if (isYesterday) {
      return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`;
    } else {
      return messageDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  export default formatTimestamp