export function formatDateString(originalDateString: string | number | Date): string {
    const originalDate = new Date(originalDateString);
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    return originalDate.toLocaleString("en-US", options);
  }