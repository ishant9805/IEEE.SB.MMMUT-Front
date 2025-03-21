import { useState, useEffect } from 'react';
import { getContactSubmissions, deleteContactSubmission } from '../api/contact';
import ContactSubmissionForm from '../components/ContactSubmissionForm';

const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getContactSubmissions(token);
      setSubmissions(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      await deleteContactSubmission(id, token);
      fetchSubmissions(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting submission:', error);
      setError('Failed to delete submission. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ieee-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-ieee-blue mb-6">Contact Submissions</h2>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-ieee-blue text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{submission.name}</td>
                  <td className="px-4 py-3">{submission.email}</td>
                  <td className="px-4 py-3">{submission.subject}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{submission.message}</td>
                  <td className="px-4 py-3">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-ieee-blue hover:text-ieee-red mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(submission._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {submissions.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No submissions found
            </div>
          )}
        </div>
      </div>

      {/* View Submission Form */}
      {selectedSubmission && (
        <ContactSubmissionForm
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default AdminContactSubmissions;