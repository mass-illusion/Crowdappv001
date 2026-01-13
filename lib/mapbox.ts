// Mapbox configuration
export const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'

// Mapbox styles
export const MAPBOX_STYLES = {
  STREET: 'mapbox://styles/mapbox/streets-v12',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11',
}

// Default map configuration
export const DEFAULT_MAP_CONFIG = {
  style: MAPBOX_STYLES.STREET,
  center: [-122.4194, 37.7749], // San Francisco coordinates
  zoom: 12,
}

// Place categories with colors
export const PLACE_CATEGORIES = {
  restaurant: {
    color: '#FF6B6B',
    icon: '🍽️',
    label: 'Restaurant'
  },
  bar: {
    color: '#4ECDC4',
    icon: '🍺',
    label: 'Bar'
  },
  coffee: {
    color: '#45B7D1',
    icon: '☕',
    label: 'Coffee Shop'
  },
  boba: {
    color: '#96CEB4',
    icon: '🧋',
    label: 'Boba Place'
  },
  ice_cream: {
    color: '#FECA57',
    icon: '🍦',
    label: 'Ice Cream Shop'
  },
  other: {
    color: '#A8E6CF',
    icon: '📍',
    label: 'Other'
  }
}