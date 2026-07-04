import { Info, Code, Database, Server, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>About</h1>
        <p className="page-subtitle">Learn about the Election Management System</p>
      </div>

      <div className="about-section">
        <div className="about-card">
          <div className="about-icon">
            <Info />
          </div>
          <h2>What is EMS?</h2>
          <p>
            The Election Management System (EMS) is a comprehensive platform designed to manage electoral processes,
            from voter registration to live result tracking. Built with modern technologies, EMS provides administrators
            with powerful tools to manage elections, candidates, constituencies, and polling stations efficiently.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <Code />
          </div>
          <h2>Frontend Technology</h2>
          <p>
            Built with React 18 and TypeScript for type safety and modern development practices.
            Uses Vite for fast development and optimized builds. Features include:
          </p>
          <ul>
            <li>React Router for seamless navigation</li>
            <li>Recharts for data visualization</li>
            <li>Lucide React for beautiful icons</li>
            <li>Responsive design for all screen sizes</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <Server />
          </div>
          <h2>Backend Technology</h2>
          <p>
            Powered by Spring Boot 3.3.5 with Java 17, providing a robust and scalable REST API.
            Key features include:
          </p>
          <ul>
            <li>Spring Data JPA for database operations</li>
            <li>H2 Database for data persistence</li>
            <li>Validation for data integrity</li>
            <li>CORS configuration for frontend integration</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <Database />
          </div>
          <h2>Data Management</h2>
          <p>
            EMS manages comprehensive electoral data including:
          </p>
          <ul>
            <li>Voter registration and information</li>
            <li>Candidate profiles and party affiliations</li>
            <li>Constituency and polling station management</li>
            <li>Election scheduling and configuration</li>
            <li>Real-time vote counting and results</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <Shield />
          </div>
          <h2>Security & Integrity</h2>
          <p>
            EMS is designed with election integrity in mind:
          </p>
          <ul>
            <li>One voter, one vote per election enforcement</li>
            <li>Validated data entry through all forms</li>
            <li>Secure API endpoints</li>
            <li>Transparent result tracking</li>
          </ul>
        </div>

        <div className="about-card version-card">
          <h2>System Version</h2>
          <div className="version-info">
            <div className="version-item">
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>
            <div className="version-item">
              <span>Release Date</span>
              <strong>2026</strong>
            </div>
            <div className="version-item">
              <span>Spring Boot</span>
              <strong>3.3.5</strong>
            </div>
            <div className="version-item">
              <span>React</span>
              <strong>18.3.1</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
