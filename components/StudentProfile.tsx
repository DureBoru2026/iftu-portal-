import React from 'react';
import { User, ExamResult } from '../types';
import BadgesAchievements from './BadgesAchievements';

interface StudentProfileProps {
  user?: User | null;
  currentUser?: User | null;
  results?: ExamResult[];
  userResults?: ExamResult[];
  onClose?: () => void;
  onEdit?: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  user,
  currentUser,
  results = [],
  userResults = [],
  onClose,
  onEdit
}) => {
  const profileUser = user || currentUser;
  const displayResults = results.length > 0 ? results : userResults;

  if (!profileUser) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
        <p className="text-gray-500">No student profile data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 h-32 relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6 gap-4">
          <img
            src={profileUser.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser.name}`}
            alt={profileUser.name}
            className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-md object-cover"
          />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profileUser.name}</h2>
            <p className="text-sm text-gray-500">{profileUser.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase">
                {profileUser.role}
              </span>
              {profileUser.grade && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  {profileUser.grade}
                </span>
              )}
              {profileUser.stream && (
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                  {profileUser.stream}
                </span>
              )}
            </div>
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              National ID (NID)
            </span>
            <span className="text-sm font-medium text-gray-800">
              {profileUser.nid || 'N/A'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              School / Institution
            </span>
            <span className="text-sm font-medium text-gray-800">
              {profileUser.school || 'IFTU Digital Academy'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Accumulated Points
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {profileUser.points || 0} pts
            </span>
          </div>
        </div>

        {/* Interactive Badges & Achievements Section */}
        <div className="mb-8">
          <BadgesAchievements user={profileUser} />
        </div>

        {/* Exam Performance Overview */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Exam Performance History</h3>
          {displayResults.length === 0 ? (
            <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl">
              No exam results recorded yet.
            </p>
          ) : (
            <div className="space-y-2">
              {displayResults.map((result, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      Exam #{result.examId}
                    </div>
                    <div className="text-xs text-gray-500">{result.completedAt}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-600">
                      {result.score} / {result.totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((result.score / result.totalPoints) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
