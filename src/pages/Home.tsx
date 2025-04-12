import { Briefcase, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Career Exploration",
    description: "Discover diverse career paths and opportunities tailored to your interests and skills."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Educational Guidance",
    description: "Get detailed information about required education and training for your chosen career."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Professional Certification",
    description: "Learn about industry-recognized certifications that can advance your career."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Growth Insights",
    description: "Access salary data and growth projections to make informed career decisions."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Perfect
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"> Career Path</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore thousands of career opportunities and find the path that matches your passion
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a profession..."
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-primary-500 text-lg"
                />
                <Link
                  to="/search"
                  className="absolute right-2 top-2 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  Search
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border hover:border-primary-500 cursor-pointer">
                  Technology
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border hover:border-primary-500 cursor-pointer">
                  Healthcare
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border hover:border-primary-500 cursor-pointer">
                  Business
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border hover:border-primary-500 cursor-pointer">
                  Creative
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CareerPath?</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to make informed career decisions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white text-opacity-90">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}