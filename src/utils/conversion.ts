export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format the date part
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  
    // Format the time part
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24-hour format
    });
  
    return `${formattedDate} ${formattedTime}`;
  }