import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Briefcase, GraduationCap, PenTool as Tool, Award, DollarSign, TrendingUp, Users, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProfessionDetail() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', title: 'About', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'skills', title: 'Skills & Tools', icon: Tool },
    { id: 'career', title: 'Career Path', icon: TrendingUp },
    { id: 'salary', title: 'Salary', icon: DollarSign },
    { id: 'certifications', title: 'Certifications', icon: Award },
    { id: 'influencers', title: 'Influencers', icon: Users },
    { id: 'companies', title: 'Companies', icon: Building2 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
    }
  };

  const mockProfession = {
    title: "Software Engineer",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    about: "Software engineers design and develop computer software and applications...",
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Master's degree (optional)",
    ],
    skills: [
      "Programming Languages (Java, Python, JavaScript)",
      "Data Structures & Algorithms",
      "Software Design Patterns",
    ],
    tools: [
      "Git",
      "Visual Studio Code",
      "Docker",
    ],
    certifications: [
      "AWS Certified Developer",
      "Google Cloud Professional Developer",
    ],
    salaryRange: {
      entry: "60,000",
      mid: "100,000",
      senior: "150,000",
    },
    careerPath: [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Lead Software Engineer",
      "Software Architect",
    ],
    influencers: [
      {
        name: "John Doe",
        role: "Tech Lead at Google",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    companies: [
      "Google",
      "Microsoft",
      "Amazon",
      "Apple",
    ],
    tags: ["Technology", "Programming", "Software Development", "Computer Science"],
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[280px_1fr] gap-8">
          {/* Fixed Navigation */}
          <div className="h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 px-4">
            <nav className="space-y-2">
              {sections.map(({ id, title, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === id
                      ? 'bg-primary-50 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="py-8 pr-8">
            {/* Title & Tags */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{mockProfession.title}</h1>
              <div className="flex flex-wrap gap-2">
                {mockProfession.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Carousel */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {mockProfession.images.map((image, index) => (
                      <div key={index} className="relative flex-[0_0_100%] min-w-0">
                        <img 
                          src={image} 
                          alt="" 
                          className="w-full h-[400px] object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {mockProfession.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {/* About */}
              <div id="about" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary-500" />
                  About
                </h2>
                <p className="text-gray-600">{mockProfession.about}</p>
              </div>

              {/* Education */}
              <div id="education" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary-500" />
                  Education Requirements
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {mockProfession.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>

              {/* Skills & Tools */}
              <div id="skills" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tool className="h-5 w-5 text-primary-500" />
                  Required Skills & Tools
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {mockProfession.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Tools</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {mockProfession.tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Career Path */}
              <div id="career" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-500" />
                  Career Path Progression
                </h2>
                <div className="relative">
                  {mockProfession.careerPath.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                        {index + 1}
                      </div>
                      <div className="text-gray-900">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div id="salary" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary-500" />
                  Salary Range
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Entry Level</div>
                    <div className="text-2xl font-semibold text-gray-900">${mockProfession.salaryRange.entry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Mid Level</div>
                    <div className="text-2xl font-semibold text-gray-900">${mockProfession.salaryRange.mid}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Senior Level</div>
                    <div className="text-2xl font-semibold text-gray-900">${mockProfession.salaryRange.senior}</div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div id="certifications" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-500" />
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {mockProfession.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-secondary-500" />
                      <span className="text-gray-600">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Influencers */}
              <div id="influencers" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-500" />
                  Related Influencers
                </h2>
                <div className="space-y-4">
                  {mockProfession.influencers.map((influencer, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img src={influencer.image} alt={influencer.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-900">{influencer.name}</div>
                        <div className="text-sm text-gray-600">{influencer.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Companies */}
              <div id="companies" className="bg-white rounded-xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary-500" />
                  Related Companies
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {mockProfession.companies.map((company, index) => (
                    <div key={index} className="px-3 py-2 bg-gray-50 rounded-lg text-gray-600 text-sm">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}