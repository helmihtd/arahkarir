import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockResults = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Design, develop, and maintain software applications using various programming languages and frameworks.",
    category: "Technology",
    salary: "$70,000 - $150,000",
    education: "Bachelor's Degree",
  },
  // Add more mock results as needed
];

export default function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const totalResults = 156; // Mock total
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search professions..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
                defaultValue="Software Engineer"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Showing {totalResults} results</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <button className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg border">
              Relevance
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6">
          {mockResults.map((result) => (
            <Link
              key={result.id}
              to={`/profession/${result.id}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 mb-4">{result.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {result.category}
                    </span>
                    <span className="px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm">
                      {result.education}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {result.salary}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}