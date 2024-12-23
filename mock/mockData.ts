export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    points: 5000,
    stats: {
      mu: 1500,    // skill level
      sigma: 300    // consistency
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: 2,
    name: 'Peter Parker',
    email: 'peter@example.com', 
    points: 10000,
    stats: {
      mu: 1800,
      sigma: 200
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter'
  },
  {
    id: 3,
    name: 'Mary Jane',
    email: 'mj@example.com',
    points: 7500,
    stats: {
      mu: 1650,
      sigma: 250
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary'
  },
  {
    id: 4, 
    name: 'Tony Stark',
    email: 'tony@stark.com',
    points: 15000,
    stats: {
      mu: 2000,
      sigma: 150
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tony'
  },
  {
    id: 5,
    name: 'Bruce Banner',
    email: 'bruce@example.com',
    points: 8000,
    stats: {
      mu: 1700,
      sigma: 275
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruce'
  }
]

export const mockMatches = [
  {
    id: 1,
    name: 'Poker Tournament',
    description: 'Texas Hold\'em tournament with 6 players',
    host: mockUsers[0],
    state: 'OPEN',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(),
    contestants: [
      { player: mockUsers[0], ratio: 1.5 },
      { player: mockUsers[1], ratio: 2.0 }
    ],
    bets: [
      { 
        bettor: mockUsers[1],
        contestant: mockUsers[0],
        points: 1000,
        status: 'PENDING'
      }
    ]
  },
  {
    id: 2,
    name: 'Blackjack Table',
    description: 'High stakes blackjack game',
    host: mockUsers[1], 
    state: 'CLOSED',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(),
    contestants: [
      { player: mockUsers[1], ratio: 1.8 }
    ],
    bets: [],
  },
  {
    id: 3,
    name: 'Chess Match', 
    description: 'Classical chess match between two players',
    host: mockUsers[0],
    state: 'CLOSED',
    startTime: new Date('2024-01-02T15:00:00Z').toISOString(),
    contestants: [
      { player: mockUsers[2], ratio: 1.2 },
      { player: mockUsers[4], ratio: 1.6 },
      { player: mockUsers[3], ratio: 1.4 }
    ],
    bets: [
      {
        bettor: mockUsers[1],
        contestant: mockUsers[2],
        points: 500,
        status: 'PENDING'
      },
      {
        bettor: mockUsers[3], 
        contestant: mockUsers[4],
        points: 750,
        status: 'PENDING'
      }
    ]
  },
  {
    id: 4,
    name: 'Mahjong Night',
    description: 'Traditional mahjong game with 4 players',
    host: mockUsers[1],
    state: 'ENDING',
    startTime: new Date('2024-01-03T18:30:00Z').toISOString(),
    contestants: [
      { player: mockUsers[0], ratio: 2.0 },
      { player: mockUsers[1], ratio: 1.5 }
    ],
    bets: []
  },
  {
    id: 5,
    name: 'Bridge Tournament',
    description: 'Competitive bridge tournament',
    host: mockUsers[0],
    state: 'OPEN',
    startTime: new Date('2024-01-04T14:00:00Z').toISOString(),
    contestants: [
      { player: mockUsers[0], ratio: 1.4 },
      { player: mockUsers[1], ratio: 1.7 }
    ],
    bets: [
      {
        bettor: mockUsers[0],
        contestant: mockUsers[1],
        points: 2000,
        status: 'PENDING'
      }
    ]
  }
]