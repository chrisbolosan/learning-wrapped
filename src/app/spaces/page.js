'use client';

import React, { useState } from 'react';
import { CourseCard } from '../components/Coursecard';
import { ActivityCard } from '../components/Activitycard';
import { CreatorCard } from '../components/Creatorcard';
import { Searchbar } from '../components/Searchbar';
import data from './data';

const DashboardLayout = () => {
  const [favorites, setFavorites] = useState([]);
  const [courseData] = useState(data.initialCourses);
  const [activities] = useState(data.initialActivities);
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
    <div className="min-h-screen bg-[#13141f] text-white p-4 md:p-6 lg:p-8 space-y-8 md:space-y-12">
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Favorites Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((fav) =>
              fav.type === 'activity' ? (
                <div className="h-full" key={fav.id}>
                  <ActivityCard
                    {...fav}
                    isFavorite
                    onToggleFavorite={() =>
                      handleToggleFavorite(fav, 'activity')
                    }
                  />
                </div>
              ) : (
                <div className="h-full" key={fav.id}>
                  <CourseCard
                    {...fav}
                    isFavorite
                    onToggleFavorite={() => handleToggleFavorite(fav, 'course')}
                  />
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* Popular Now */}
      <section>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Popular Now</h2>
          <div className="flex-1 h-px bg-gray-800 ml-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      <section>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Common Activities</h2>
          <div className="flex-1 h-px bg-gray-800 ml-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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

      <section>
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Featured Creators</h2>
          <div className="flex-1 h-px bg-gray-800 ml-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {data.creators.map((creator, index) => (
            <CreatorCard key={index} {...creator} />
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-medium">Recently Accessed</h2>
              <div className="flex-1 h-px bg-gray-800 ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCourses.slice(0, 4).map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isFavorite={favorites.some(
                    (fav) => fav.id === course.id && fav.type === 'course'
                  )}
                  onToggleFavorite={() =>
                    handleToggleFavorite(course, 'course')
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-medium">Subject-Specific</h2>
              <div className="flex-1 h-px bg-gray-800 ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCourses.slice(0, 4).map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  isFavorite={favorites.some(
                    (fav) => fav.id === course.id && fav.type === 'course'
                  )}
                  onToggleFavorite={() =>
                    handleToggleFavorite(course, 'course')
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
