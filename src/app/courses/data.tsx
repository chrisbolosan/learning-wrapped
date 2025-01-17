export interface Course {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const courseData: Record<string, Course> = {
  math: {
    title: 'Math Playground',
    subtitle: 'Explore math concepts interactively.',
    description:
      'Welcome to the Math Playground! This engaging space offers interactive, gamified experiences designed to make math fun and accessible for all students. With AI-generated challenges and step-by-step explanations, learners can practice and explore a variety of math concepts while building their skills in an exciting, hands-on way. Whether solving puzzles or tackling creative problems, the Math Playground encourages curiosity and active learning.',
    image: '/math_playground.png',
  },
  science: {
    title: 'Science Lab',
    subtitle: 'Discover the wonders of science experiments.',
    description:
      'Dive into the Science Lab! Explore experiments and fascinating facts designed to make science fun and accessible for all students. With AI-generated challenges and step-by-step explanations, learners can practice and explore a variety of science concepts while building their skills in an exciting, hands-on way. Whether solving puzzles or tackling creative problems, the Science Lab encourages curiosity and active learning.',
    image: '/space.jpg',
  },
};
