const randomid = (): string => {
  const id = Math.random().toString(36).substring(7);
  return id;
};

export const generateid = (times: number = 2): string => {
  const id = Array.from({length: times}, () => randomid()).join("");
  return id
};

export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
}

export const copyToClipboard = (data: any) => {
  if(typeof data !== "string") return navigator.clipboard.writeText(JSON.stringify(data));
  return navigator.clipboard.writeText(data);
};

export const readFromClipboard = async () => {
  try {
    let data = await navigator.clipboard.readText();
    if (data.includes("{") || data.includes("[")) {
      try {
        data = JSON.parse(data);
      } catch {
        // If JSON parsing fails, just return the raw string
        return data;
      }
    }
    // Optional: Validate data if you expect an object with certain properties (e.g., x, y)
    if (
      typeof data === 'object' &&
      data !== null &&
      ('x' in data || 'y' in data)
    ) {
      // You can add more checks here if desired
      return data;
    }
    return data; // Return raw string or parsed data
  } catch (error) {
    // Clipboard access error or permission denied, safely return null or empty
    console.error("Clipboard access error:", error);
    return null;
  }
};

