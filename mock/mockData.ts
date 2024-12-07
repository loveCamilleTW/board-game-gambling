export const mockUsers = [
  {
    name: 'John Doe',
    points: 5000,
    avatar: '' // Add avatar URL if needed
  },
  {
    name: 'Peter Parker',
    points: 10000,
    avatar: '' // Add avatar URL if needed
  }
] 

export const mockGames = [
  {
    id: 1,
    name: 'Poker Tournament',
    state: 'OPEN',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(), // Set to specific date/time
    players: mockUsers
  },
  {
    id: 2,
    name: 'Blackjack Table',
    state: 'CLOSED',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(), // Set to specific date/time
    players: mockUsers
  },
  {
    id: 3,
    name: 'Roulette Game',
    state: 'ENDING',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(), // Set to specific date/time
    players: mockUsers
  },
  {
    id: 4,
    name: 'Baccarat Room',
    state: 'OPEN',
    startTime: new Date('2024-01-01T12:00:00Z').toISOString(), // Set to specific date/time
    players: mockUsers
  }
]