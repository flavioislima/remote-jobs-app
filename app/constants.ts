// Constants for the Remote Work app
export enum adUnitIds {
  JOBS = 'ca-app-pub-4477713466828746/3523474164',
  SQUARE = 'ca-app-pub-4477713466828746/8984919217',
  FAVORITES = 'ca-app-pub-4477713466828746/2838383079'
}

export enum adSizes {
  SMART = 'SMART_BANNER',
  RECTANGLE = 'MEDIUM_RECTANGLE',
  SMALL = 'BANNER'
}

export const endpoint = 'https://us-central1-remote-work-br.cloudfunctions.net/getRemoteJobs'

// Add dummy default export for Expo Router
export default {};
