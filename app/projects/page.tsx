'use client';

import { Racing_Sans_One } from 'next/font/google';

const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
});

type ProjectsPageProps = {
  darkMode: boolean;
};

export default function ProjectsPage({ darkMode }: ProjectsPageProps) {
  const sectionPadding = 'py-32 px-6 md:px-0';
  const heading =
    'text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent';

  const projects = [
    [
      'Enterprise Resource Planning (ERP System)',
      <>
        ERP system covering key business operations:
        <ul className={`list-disc list-inside mt-2 ml-4 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li>Procure-To-Pay Process</li>
          <li>Warehouse Inventory</li>
          <li>Master Data</li>
          <li>Asset Management</li>
          <li>User Management Settings</li>
          <li>Reports</li>
          <li>Role-based Approval Access</li>
        </ul>
      </>,
    ],
    [
      'Human Resource Information Systems (HRIS)',
      <>
        Human Resource Information System modules:
        <ul className={`list-disc list-inside mt-2 ml-4 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li>Recruitment / Applicants</li>
          <li>Employee Data</li>
          <li>Time & Attendance</li>
          <li>Service Provider</li>
          <li>Reports</li>
          <li>Calendar</li>
          <li>Job Order</li>
          <li>Travel Order</li>
          <li>Overtime / Undertime</li>
          <li>Dashboard</li>
          <li>Master Data</li>
        </ul>
      </>,
    ],
    [
      'Accommodation Information System',
      <>
        Local accommodation management system without payment processing:
        <ul className={`list-disc list-inside mt-2 ml-4 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li>Manage available rental spaces</li>
          <li>Provide detailed information on accommodations</li>
          <li>Track occupancy and availability</li>
          <li>Maintain property details and amenities</li>
        </ul>
      </>,
    ],
    [
      'IT & Asset Management Dashboard',
      <>
        Centralized dashboard for IT assets and inventory:
        <ul className={`list-disc list-inside mt-2 ml-4 space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li>Real-time asset monitoring</li>
          <li>Inventory control and tracking</li>
          <li>Asset assignment and lifecycle management</li>
          <li>Comprehensive reporting and dashboards</li>
        </ul>
      </>,
    ],
  ];

  return (
    <section
      id="projects"
      className={`relative z-10 container mx-auto ${sectionPadding} flex flex-col gap-16`}
    >
      <h2 className={heading}>Projects</h2>

      {/* Optional background glow circles */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full -top-16 -left-16 pointer-events-none"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full -bottom-16 -right-16 pointer-events-none"></div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map(([title, desc], idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl border shadow-md transition-all duration-300
              ${darkMode 
                ? 'bg-white/5 border-white/10 hover:border-blue-400/50 hover:shadow-lg' 
                : 'bg-white/10 border-gray-300/30 hover:border-blue-400/50 hover:shadow-lg'
              }
            `}
          >
            <h3 className={`text-xl md:text-2xl font-bold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              {title}
            </h3>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}