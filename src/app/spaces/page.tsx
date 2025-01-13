import React from 'react';

const DashboardPage = () => {
  const favorites = [
    {
      title: 'Math Playground',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      image: '/math-playground.jpg',
    },
    {
      title: 'Science Lab',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      image: '/science-lab.jpg',
    },
  ];

  const commonActivities = [
    { title: 'Class Sidekick', icon: '👥' },
    { title: 'Pulse: Bellringer', icon: '🔔' },
    { title: 'Pulse: Exit Ticket', icon: '🎫' },
    { title: 'Video', icon: '🎥' },
  ];

  const popularNow = Array(4).fill(favorites[0]);
  const recentlyAccessed = Array(4).fill(favorites[0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Favorites Section */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Favorites</h2>
        <div className="flex gap-4">
          {favorites.map((item, index) => (
            <div
              key={index}
              className="w-72 bg-blue-900 rounded-lg overflow-hidden"
            >
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <button className="text-white opacity-75 hover:opacity-100">
                    ⭐
                  </button>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
                <button className="mt-3 px-4 py-1 bg-blue-600 rounded-md text-sm">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Activities */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Common Activities</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {commonActivities.map((activity, index) => (
            <div
              key={index}
              className="min-w-[240px] p-6 bg-gray-800 rounded-lg border border-gray-700 flex items-center gap-3"
            >
              <span className="text-2xl">{activity.icon}</span>
              <span>{activity.title}</span>
              <button className="ml-auto text-white opacity-75 hover:opacity-100">
                ⭐
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Now */}
      <section className="mb-12">
        <h2 className="text-lg mb-4">Popular Now</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {popularNow.map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] bg-blue-900 rounded-lg overflow-hidden"
            >
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <button className="text-white opacity-75 hover:opacity-100">
                    ⭐
                  </button>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
                <button className="mt-3 px-4 py-1 bg-blue-600 rounded-md text-sm">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Accessed */}
      <section>
        <h2 className="text-lg mb-4">Recently Accessed</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recentlyAccessed.map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] bg-blue-900 rounded-lg overflow-hidden"
            >
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-75"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <button className="text-white opacity-75 hover:opacity-100">
                    ⭐
                  </button>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
                <button className="mt-3 px-4 py-1 bg-blue-600 rounded-md text-sm">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
