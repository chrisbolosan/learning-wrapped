import React, { useState } from 'react';

const DashboardPage = () => {
  // Initial state for favorites
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'Math Playground',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      image: '/math-playground.jpg',
      isFavorited: true,
    },
    {
      id: '2',
      title: 'Science Lab',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      image: '/science-lab.jpg',
      isFavorited: true,
    },
  ]);

  const commonActivities = [
    { id: 'c1', title: 'Class Sidekick', icon: '👥', isFavorited: false },
    { id: 'c2', title: 'Pulse: Bellringer', icon: '🔔', isFavorited: false },
    { id: 'c3', title: 'Pulse: Exit Ticket', icon: '🎫', isFavorited: false },
    { id: 'c4', title: 'Video', icon: '🎥', isFavorited: false },
  ];

  const [activities, setActivities] = useState(commonActivities);
  const [popularItems, setPopularItems] = useState(
    Array(4).fill({ ...favorites[0], id: Math.random().toString() })
  );
  const [recentItems, setRecentItems] = useState(
    Array(4).fill({ ...favorites[0], id: Math.random().toString() })
  );

  // Toggle favorite status
  const toggleFavorite = (id, section) => {
    const updateItems = (items) =>
      items.map((item) =>
        item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
      );

    switch (section) {
      case 'favorites':
        setFavorites(updateItems);
        break;
      case 'activities':
        setActivities(updateItems);
        break;
      case 'popular':
        setPopularItems(updateItems);
        break;
      case 'recent':
        setRecentItems(updateItems);
        break;
    }
  };

  // Card component
  const Card = ({ item, onToggleFavorite, section }) => (
    <div className="min-w-[280px] bg-blue-900 rounded-lg overflow-hidden">
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{item.title}</h3>
          <button
            onClick={() => onToggleFavorite(item.id, section)}
            className="text-white transition-opacity duration-200 hover:opacity-100"
            aria-label={
              item.isFavorited ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            {item.isFavorited ? '⭐' : '☆'}
          </button>
        </div>
        <p className="text-sm text-gray-300">{item.description}</p>
        <button className="mt-3 px-4 py-1 bg-blue-600 rounded-md text-sm hover:bg-blue-700 transition-colors">
          Open
        </button>
      </div>
    </div>
  );

  // Activity Card component
  const ActivityCard = ({ activity, onToggleFavorite }) => (
    <div className="min-w-[240px] p-6 bg-gray-800 rounded-lg border border-gray-700 flex items-center gap-3">
      <span className="text-2xl">{activity.icon}</span>
      <span>{activity.title}</span>
      <button
        onClick={() => onToggleFavorite(activity.id, 'activities')}
        className="ml-auto text-white transition-opacity duration-200 hover:opacity-100"
        aria-label={
          activity.isFavorited ? 'Remove from favorites' : 'Add to favorites'
        }
      >
        {activity.isFavorited ? '⭐' : '☆'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Favorites Section */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Favorites</h2>
        <div className="flex gap-4">
          {favorites.map((item) => (
            <Card
              key={item.id}
              item={item}
              onToggleFavorite={toggleFavorite}
              section="favorites"
            />
          ))}
        </div>
      </section>

      {/* Common Activities */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Common Activities</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Popular Now */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Popular Now</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {popularItems.map((item) => (
            <Card
              key={item.id}
              item={item}
              onToggleFavorite={toggleFavorite}
              section="popular"
            />
          ))}
        </div>
      </section>

      {/* Recently Accessed */}
      <section>
        <h2 className="text-lg mb-4">Recently Accessed</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recentItems.map((item) => (
            <Card
              key={item.id}
              item={item}
              onToggleFavorite={toggleFavorite}
              section="recent"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
