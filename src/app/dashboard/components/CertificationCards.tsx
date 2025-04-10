import { TeacherStats } from '@/services/teacherService';

interface CertificationCardsProps {
  certifications: TeacherStats['certifications'];
}

export function CertificationCards({
  certifications,
}: CertificationCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {certifications.map((cert: TeacherStats['certifications'][0]) => (
        <div
          key={cert.id}
          className="bg-[#13141f] rounded-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105"
        >
          <div className="w-16 h-16 mb-3 bg-blue-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-1">{cert.title}</h3>
          <span className="text-gray-400 text-sm">{cert.date}</span>
          <span className="text-gray-400 text-xs mt-1">{cert.type}</span>
        </div>
      ))}
    </div>
  );
}
