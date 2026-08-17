// import { useState } from 'react';

const ContactSubmissionForm = ({ submission, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-ieee-blue">Submission Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-ieee-blue"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{submission.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{submission.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">{submission.subject}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <p className="mt-1 p-2 bg-gray-50 rounded whitespace-pre-wrap">
              {submission.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <p className="mt-1 p-2 bg-gray-50 rounded">
              {new Date(submission.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissionForm;
