// Australian team experiences for MVP
export const EXPERIENCES = [
  {
    id: 'blue-mountains-retreat',
    title: 'Blue Mountains Corporate Retreat',
    description: 'Luxury mountain lodge designed for team retreats and strategic planning. Stunning bushland views just 90 minutes from Sydney.',
    location: 'Blue Mountains, NSW',
    price_per_night: 680,
    max_guests: 12,
    image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    amenities: ['Conference Space', 'WiFi', 'Spa Facilities', 'Team Kitchen', 'Presentation Setup']
  },
  {
    id: 'sydney-harbour-charter',
    title: 'Sydney Harbour Corporate Charter',
    description: 'Premium yacht charter with skipper for team celebrations and client entertainment. Cruise past Opera House and Harbour Bridge.',
    location: 'Sydney Harbour, NSW',
    price_per_night: 4200,
    max_guests: 20,
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    amenities: ['Licensed Skipper', 'Premium Catering', 'AV Equipment', 'Harbour Views']
  },
  {
    id: 'hunter-valley-estate',
    title: 'Hunter Valley Wine Estate',
    description: 'Corporate vineyard retreat with structured team building, wine tastings, and strategy sessions in Australia\'s premier wine region.',
    location: 'Hunter Valley, NSW',
    price_per_night: 980,
    max_guests: 16,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    amenities: ['Team Building Activities', 'Wine Tastings', 'Corporate BBQ', 'Conference Facilities']
  },
  {
    id: 'bondi-beach-house',
    title: 'Bondi Beach Executive Retreat',
    description: 'Oceanfront executive retreat for leadership teams and board meetings. Iconic Bondi Beach location with premium facilities.',
    location: 'Bondi Beach, NSW',
    price_per_night: 1800,
    max_guests: 14,
    image_url: 'https://images.unsplash.com/photo-1520637836862-4d197d17c11a?w=800',
    amenities: ['Private Beach Access', 'Executive Dining', 'Ocean Terrace', 'Surf Lessons', 'Concierge Service']
  },
  {
    id: 'melbourne-rooftop-venue',
    title: 'Melbourne CBD Rooftop Venue',
    description: 'Premium rooftop venue in Melbourne\'s CBD perfect for team events and client entertainment. Stunning city skyline views.',
    location: 'Melbourne CBD, VIC',
    price_per_night: 1200,
    max_guests: 18,
    image_url: 'https://images.unsplash.com/photo-1551524164-6cf3f6ba4931?w=800',
    amenities: ['City Views', 'Event Space', 'Premium Bar', 'Corporate Catering', 'AV Setup']
  },
  {
    id: 'barossa-valley-winery',
    title: 'Barossa Valley Winery Experience',
    description: 'Exclusive winery experience in Australia\'s most famous wine region. Perfect for team celebrations and corporate hospitality.',
    location: 'Barossa Valley, SA',
    price_per_night: 750,
    max_guests: 24,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    amenities: ['Wine Tastings', 'Vineyard Tours', 'Private Dining', 'Team Activities', 'Transport Included']
  }
];

export function getExperienceById(id: string) {
  return EXPERIENCES.find(exp => exp.id === id);
}

export function getAllExperiences() {
  return EXPERIENCES;
}

// Helper function to format Australian currency
export function formatAUD(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0
  }).format(amount);
}