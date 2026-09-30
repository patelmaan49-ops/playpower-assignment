const img = (name: string) => `/images/${name}`;

export interface Photo {
  src: string;
  alt: string;
}

export interface PhotoGroup {
  id: string;
  title: string;
  subtitle: string;
  photos: Photo[];
}

const group = (id: string, title: string, subtitle: string, files: string[]): PhotoGroup => ({
  id,
  title,
  subtitle,
  photos: files.map((f) => ({ src: img(f), alt: title })),
});

export const photoGroups: PhotoGroup[] = [
  group('living-1', 'Living room 1', 'Sofa · Air conditioning · Ceiling fan · TV', [
    '79addceb-8c2d-419b-80ff-e29af426a94c.jpg',
    'a45feaa2-b607-4092-83ac-5fd4b2894959.jpg',
    'a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpg',
    'f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpg',
  ]),
  group('living-2', 'Living room 2', 'Ceiling fan · Hot tub', [
    '70325367-cbae-4993-b560-18cd3f6edd53.jpg',
    '090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpg',
    '2367476f-11c4-4a14-a7c6-267be62c1d59.jpg',
    '3c90338e-86b4-423f-aae1-279e0ccc3a18.jpg',
    '9be71047-fc52-438a-9270-75cb470f6752.jpg',
  ]),
  group('kitchen', 'Full kitchen', 'Refrigerator · Microwave · Stove · Washer', [
    '56c44812-52c0-4481-90d8-101ec1f34c7a.jpg',
    '9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpg',
    '3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpg',
  ]),
  group('bedroom', 'Bedroom', '1 double bed · Air conditioning', [
    '67c61c6f-6260-4809-9510-0360e58a345d.jpg',
    '0622ab42-b851-4d55-9d9f-df3143bc5909.jpg',
    '48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpg',
  ]),
  group('bathroom', 'Full bathroom', 'Shower · Hot water', ['97c78f8a-5090-4663-aebc-ba4e13b47092.jpg']),
  group('gym', 'Gym', 'Shared gym', ['9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpg']),
  group('exterior', 'Exterior', 'Building · Surroundings', [
    '23ea6621-6f74-4baa-acea-2fd03e312b41.jpg',
    '42befad7-fb29-473d-91db-b03e7a544d1d.jpg',
    '5b856fde-a393-41bf-b373-c9d02e64221f.jpg',
    '608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpg',
    'c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpg',
  ]),
  group('pool', 'Pool', 'Shared swimming pool', [
    '8eb65a8b-e795-4870-b141-6f63b1be24ae.jpg',
    'fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpg',
  ]),
  group('additional', 'Additional photos', 'More views of the space', [
    '153aa732-4935-48b8-a6fe-b469b6af5efc.jpg',
    '34529829-a971-44d3-ac2f-90ea3678a34d.jpg',
    'f6de1663-4e9c-4414-b63b-29a154a92ee1.jpg',
    '1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpg',
  ]),
];

export const allPhotos: Photo[] = photoGroups.flatMap((g) => g.photos);

const heroFiles = [
  ['70325367-cbae-4993-b560-18cd3f6edd53.jpg', 'Lounge area with rattan chairs'],
  ['9be71047-fc52-438a-9270-75cb470f6752.jpg', 'Room view 2'],
  ['42befad7-fb29-473d-91db-b03e7a544d1d.jpg', 'Room view 3'],
  ['67c61c6f-6260-4809-9510-0360e58a345d.jpg', 'Room view 4'],
  ['f6de1663-4e9c-4414-b63b-29a154a92ee1.jpg', 'Room view 5'],
];

export const heroPhotos: Photo[] = heroFiles.map(([f, alt]) => ({ src: img(f), alt }));

export const listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  facts: ['3 guests', '1 bedroom', '1 bed', '1 bathroom'],
  rating: '4.96',
  reviewCount: 24,
  description:
    '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴',
  highlights: [
    { icon: 'door', title: 'Great check-in experience', text: 'Recent guests loved the smooth start to this stay.' },
    { icon: 'key', title: 'Self check-in', text: 'You can check in with the building staff.' },
    { icon: 'pool', title: 'Dive right in', text: 'This is one of the few places in the area with a pool.' },
  ],
  beds: [
    { name: 'Bedroom', text: '1 double bed', photo: img('67c61c6f-6260-4809-9510-0360e58a345d.jpg') },
    { name: 'Living room', text: '1 sofa', photo: img('f6de1663-4e9c-4414-b63b-29a154a92ee1.jpg') },
  ],
  amenities: [
    { icon: 'kitchen', label: 'Kitchen' },
    { icon: 'wifi', label: 'Wifi' },
    { icon: 'workspace', label: 'Dedicated workspace' },
    { icon: 'parking', label: 'Free parking on premises' },
    { icon: 'pool', label: 'Shared swimming pool' },
    { icon: 'tub', label: 'Private Hot tub & Jacuzzi' },
    { icon: 'pets', label: 'Pets allowed' },
    { icon: 'camera', label: 'Exterior security cameras on property' },
    { icon: 'co', label: 'Carbon monoxide alarm', unavailable: true },
    { icon: 'smoke', label: 'Smoke alarm', unavailable: true },
  ],
  amenityTotal: 50,
  ratings: [
    ['Cleanliness', '5.0'],
    ['Accuracy', '5.0'],
    ['Check-in', '5.0'],
    ['Communication', '5.0'],
    ['Location', '4.8'],
    ['Value', '4.8'],
  ],
  distribution: [0.92, 0.06, 0.02, 0, 0],
  tags: [
    ['🛁', 'Hot tub', 8],
    ['✅', 'Accuracy', 7],
    ['📅', 'Condition', 5],
    ['🤝', 'Hospitality', 10],
    ['🛋️', 'Comfort', 6],
    ['🍽️', 'Amenities', 3],
    ['🎨', 'Decor', 3],
    ['🚗', 'Getting around', 2],
  ] as [string, string, number][],
  reviews: [
    {
      name: 'Aniket',
      tenure: '7 years on Airbnb',
      stars: 5,
      when: '1 week ago',
      avatar: img('e1b97f1b-8702-4abf-896e-957ec8c9687a.jpg'),
      text: 'We stayed for 4 days and it was awesome experience. Everything was perfect and as described. The host niraj was so helpful and proactive, always supporting be it getting scooty or cab for airport, making our stay even more comfortable. I will recommend this place to everyone!',
    },
    {
      name: 'Vinay',
      tenure: '3 years on Airbnb',
      stars: 4,
      when: 'June 2026',
      text: 'The property is very amazing. The rooms were clean equipped with all the necessary appliances and well maintained. Warm lights & aesthetic furniture make this place feel just like 2nd home. The host(Niraj) is also very helpful always a call away.',
    },
    {
      name: 'Prajyot',
      tenure: '4 years on Airbnb',
      stars: 5,
      when: '2 weeks ago',
      avatar: img('62280d0a-ec2a-465a-a16a-17f011d0e813.jpg'),
      text: 'The stay was a great weekend escape with great service and all basic and necessary amenities at hand. The best experience was the jacuzzi room, it was truly relaxing and soothing ambiance!',
    },
    {
      name: 'Aheesh',
      tenure: '2 years on Airbnb',
      stars: 5,
      when: 'May 2026',
      avatar: img('fc1006cc-0221-42d2-862e-987c817c5156.jpg'),
      text: 'This place truly made our Goa trip memorable! We absolutely loved the property, everything was exactly as shown in the pictures. The jacuzzi was amazing, and the house itself was beautifully maintained.',
    },
  ],
  location: {
    place: 'Candolim, Goa, India',
    text: 'Located in the heart of Candolim, North Goa. Just 10 minutes away from Candolim Beach, fine dining, popular shacks, and supermarkets, while remaining in a peaceful, secure gated community.',
    center: [15.5177, 73.7626] as [number, number],
  },
  host: {
    name: 'Mirashya Homes',
    avatar: img('6b72f8b5-0e66-4bf1-8ba3-ff0f87ff3687.jpg'),
    reviews: '1499',
    rating: '4.68',
    years: '2',
    facts: ['Born in the 80s', 'Where I went to school: NICMAR GOA'],
    coHosts: [
      { name: 'Sharath', avatar: img('090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpg') },
      { name: 'Aman Dev Pahwa', avatar: img('a45feaa2-b607-4092-83ac-5fd4b2894959.jpg') },
      { name: 'Maria Karen Priyanka', avatar: img('f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpg') },
      { name: 'Simran', avatar: img('1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpg') },
      { name: 'Pallavi', avatar: img('a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpg') },
      { name: 'Sanyukta', avatar: img('9be71047-fc52-438a-9270-75cb470f6752.jpg') },
      { name: 'Shruti', initial: 'S' },
      { name: 'Amisha', initial: 'A' },
    ],
    response: ['Response rate: 100%', 'Responds within an hour'],
  },
  footer: [
    { title: 'Support', links: ['Help Centre', 'Get help with a safety issue', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options', 'Report neighbourhood concern'] },
    { title: 'Hosting', links: ['Airbnb your home', 'AirCover for Hosts', 'Hosting resources', 'Community forum', 'Hosting responsibly', 'Join a free hosting class', 'Find a co-host'] },
    { title: 'Airbnb', links: ['Newsroom', 'New features', 'Careers', 'Investors', 'Airbnb.org emergency stays'] },
  ],
};
