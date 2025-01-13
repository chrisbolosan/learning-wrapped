'use client';

import React, { useState } from 'react';

const CourseCard = ({
  title,
  description,
  imageSrc,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-[#1a1b26] rounded-lg overflow-hidden border border-blue-900/30 max-w-80">
      <button
        className="w-full bg-blue-600 px-4 py-2 flex justify-between items-center text-white text-sm border-none hover:bg-blue-700 hover:opacity-70 transition-colors rounded"
        onClick={() => alert(`Opening course: ${title}`)}
      >
        Open
      </button>
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[140px] object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 text-white hover:scale-110 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'white' : 'none'}
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
const ActivityCard = ({ icon, title }) => (
  <div className="bg-[#1a1b26] rounded-lg border border-purple-500/20 p-6 flex flex-col items-center justify-center relative">
    <div className="absolute top-2 right-2">
      <button className="text-purple-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
    </div>
    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
      {icon}
    </div>
    <span className="text-white text-center">{title}</span>
  </div>
);

const CreatorCard = ({ name, imageSrc }) => (
  <div className="bg-[#1a1b26] rounded-lg border border-purple-500/20 p-6 flex flex-col items-center justify-center">
    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
      <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-white text-lg">{name}</span>
  </div>
);

const DashboardLayout = () => {
  const initialCourses = [
    {
      id: 1,
      title: 'Math Playground',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      imageSrc: '/math_playground.png',
    },
    {
      id: 2,
      title: 'Science Lab',
      description:
        'The AI-Generated Quiz Tool project focuses on providing students and learners with accessible and effective means to reinforce...',
      imageSrc: '/science_lab.png',
    },
    {
      id: 3,
      title: 'Art Studio',
      description:
        'Explore your creativity with interactive activities designed for artistic growth and self-expression.',
      imageSrc: '/science_lab.png',
    },
    {
      id: 4,
      title: 'History Archives',
      description:
        'Dive into the past with engaging history lessons and archival exploration tools.',
      imageSrc: '/math_playground.png',
    },
  ];
  const activities = [
    {
      title: 'Class Sidekick',
      icon: (
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Pulse: Bellringer',
      icon: (
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.536 8.464a5 5 0 010 7.072M12 18c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"
          />
        </svg>
      ),
    },
    {
      title: 'Pulse: Exit Ticket',
      icon: (
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  const creators = [
    { name: 'John', imageSrc: '/john.png' },
    { name: 'Morgan', imageSrc: '/morgan.png' },
    { name: 'Corey', imageSrc: '/corey.png' },
    { name: 'Paul', imageSrc: '/paul.png' },
  ];

  const [favorites, setFavorites] = useState([]);
  const [courseData] = useState(initialCourses);

  const handleToggleFavorite = (course) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === course.id)) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.id !== course.id);
      }
      // Add to favorites
      return [...prevFavorites, course];
    });
  };

  return (
    <div className="min-h-screen bg-[#13141f] text-white p-8 space-y-12">
      {/* Favorites Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                isFavorite
                onToggleFavorite={() => handleToggleFavorite(course)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Common Activities */}
      <section>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Common Activities</h2>
          <div className="flex-1 h-px bg-gray-800 ml-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </section>

      {/* Popular Now */}
      <section>
        <h2 className="text-lg font-medium mb-4">Popular Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courseData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some((fav) => fav.id === course.id)}
              onToggleFavorite={() => handleToggleFavorite(course)}
            />
          ))}
        </div>
      </section>

      {/* Recently Accessed */}
      <section>
        <h2 className="text-lg font-medium mb-4">Recently Accessed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courseData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some((fav) => fav.id === course.id)}
              onToggleFavorite={() => handleToggleFavorite(course)}
            />
          ))}
        </div>
      </section>

      {/* Featured Creators */}
      <section>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Featured Creators</h2>
          <div className="flex-1 h-px bg-gray-800 ml-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {creators.map((creator, index) => (
            <CreatorCard key={index} {...creator} />
          ))}
        </div>
      </section>

      {/* Subject-Specific */}
      <section>
        <h2 className="text-lg font-medium mb-4">Subject-Specific</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courseData.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some((fav) => fav.id === course.id)}
              onToggleFavorite={() => handleToggleFavorite(course)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
