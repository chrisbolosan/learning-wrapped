'use client';

import React, { useState } from 'react';
import { CourseCard } from '../components/Coursecard';
import { ActivityCard } from '../components/Activitycard';
import { CreatorCard } from '../components/Creatorcard';
import { Searchbar } from '../components/Searchbar';

const DashboardLayout = () => {
  const creators = [
    { name: 'John', imageSrc: '/john.png' },
    { name: 'Morgan', imageSrc: '/morgan.png' },
    { name: 'Corey', imageSrc: '/corey.png' },
    { name: 'Paul', imageSrc: '/paul.png' },
  ];
  const initialCourses = [
    {
      id: 1,
      title: 'Math Playground',
      description: 'Explore math concepts interactively.',
      imageSrc: '/math_playground.png',
    },
    {
      id: 2,
      title: 'Science Lab',
      description: 'Discover the wonders of science experiments.',
      imageSrc: '/science_lab.png',
    },
  ];
  const initialActivities = [
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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

  const [favorites, setFavorites] = useState([]);
  const [courseData] = useState(initialCourses);
  const [activities] = useState(initialActivities);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFavorite = (item, type) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (fav) => fav.id === item.id && fav.type === type
      );
      if (exists) {
        return prevFavorites.filter(
          (fav) => fav.id !== item.id || fav.type !== type
        );
      }
      return [...prevFavorites, { ...item, type }];
    });
  };
  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#13141f] text-white p-8 space-y-12">
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Favorites Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((fav) =>
              fav.type === 'activity' ? (
                <ActivityCard
                  key={fav.id}
                  {...fav}
                  isFavorite
                  onToggleFavorite={() => handleToggleFavorite(fav, 'activity')}
                />
              ) : (
                <CourseCard
                  key={fav.id}
                  {...fav}
                  isFavorite
                  onToggleFavorite={() => handleToggleFavorite(fav, 'course')}
                />
              )
            )}
          </div>
        )}
      </section>

      {/* Popular Now */}
      <section>
        <h2 className="text-lg font-medium mb-4">Popular Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some(
                (fav) => fav.id === course.id && fav.type === 'course'
              )}
              onToggleFavorite={() => handleToggleFavorite(course, 'course')}
            />
          ))}
        </div>
      </section>

      {/* Common Activities */}
      <section>
        <h2 className="text-lg font-medium mb-4">Common Activities </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              isFavorite={favorites.some(
                (fav) => fav.id === activity.id && fav.type === 'activity'
              )}
              onToggleFavorite={() =>
                handleToggleFavorite(activity, 'activity')
              }
            />
          ))}
        </div>
      </section>

      {/* Recently Accessed */}
      <section>
        <h2 className="text-lg font-medium mb-4">Recently Accessed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some(
                (fav) => fav.id === course.id && fav.type === 'course'
              )}
              onToggleFavorite={() => handleToggleFavorite(course, 'course')}
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
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isFavorite={favorites.some(
                (fav) => fav.id === course.id && fav.type === 'course'
              )}
              onToggleFavorite={() => handleToggleFavorite(course, 'course')}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
