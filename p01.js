// Utility function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Main fetch function with fallback mechanism
  async function fetchCurrencyData() {
    const baseCurrency = "eur";
    const apiVersion = "v1";
    const endpoint = `currencies/${baseCurrency}.json`;
  
    const url = [
      // Primary URL
      `https://cdn.jsdelivr.net/v1/currencies/${baseCurrency}.json`,
      // Latest dynamic fallback on Cloudflare
      `https://latest.currency-api.pages.dev/${apiVersion}/${endpoint}`,
      // Date-specific fallback
      `https://${getCurrentDate()}.currency-api.pages.dev/${apiVersion}/${endpoint}`,
    ];
  
    for (let urls of url) {
      try {
        console.log(`Attempting to fetch from: ${url}`);
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(`Data successfully fetched from: ${url}`);
        return data; // Return data if the fetch was successful
      } catch (error) {
        console.warn(`Failed to fetch from: ${url}`, error);
        // Continue to the next URL if this one fails
      }
    }
  
    // If all fallbacks fail, throw an error
    throw new Error("Unable to fetch currency data from any source.");
  }
  
  // Example usage
  fetchCurrencyData()
    .then(data => {
      console.log("Final data:", data);
      // Process or display the fetched data
    })
    .catch(error => {
      console.error("All sources failed:", error);
    });
  