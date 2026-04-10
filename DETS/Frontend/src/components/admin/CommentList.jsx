// src/components/admin/CommentsList.jsx
import React from 'react';
import { MessageCircle, Paperclip, MoreHorizontal } from 'lucide-react';

const CommentsList = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="relative group">
          {/* Ghost Card */}
          <div className="absolute inset-0 bg-blue-100 border-2 border-dashed border-blue-400 rounded-lg"></div>

          {/* Actual Card */}
          <div
            className={`relative z-10 bg-white rounded-lg shadow p-4 transition-all duration-300 hover:rotate-[1.5deg] hover:-translate-y-[3px] hover:translate-x-[2px] hover:shadow-md hover:shadow-blue-100 hover:border border-dashed border-purple-300 ${
              comment.highlight ? 'bg-purple-50' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'bottom left',
          
            }}
          >
            <div className="flex justify-between mb-2">
              <div
                className="text-xs font-medium px-2 py-1 rounded bg-opacity-10 inline-block"
                style={{
                  backgroundColor:
                    comment.priority === 'High'
                      ? '#a855f7'
                      : '#f97316',
                  color:
                    comment.priority === 'High' ? '#A855F7' : '#F97316',
                }}
              >
                {comment.priority}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3 className="font-medium mb-1">{comment.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{comment.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {comment.users.map((user, idx) => (
                  <img
                    key={idx}
                    src={user}
                    alt={`User ${idx + 1}`}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div>

              <div className="flex space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MessageCircle size={16} className="mr-1" />
                  {comment.comments} comments
                </span>
                {comment.files > 0 && (
                  <span className="flex items-center">
                    <Paperclip size={16} className="mr-1" />
                    {comment.files} files
                  </span>
                )}
              </div>
            </div>

            
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
