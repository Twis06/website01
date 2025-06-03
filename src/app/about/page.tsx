   // src/app/about/page.tsx
   export default function About() {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Hello! I&apos;m a passionate full-stack developer with a strong focus on creating
              beautiful, functional, and user-friendly web applications. I love solving
              complex problems and turning ideas into reality through code.
            </p>
            <p className="text-gray-600 mb-4">
              With several years of experience in web development, I&apos;ve worked on various
              projects ranging from small business websites to large-scale enterprise
              applications. I&apos;m always eager to learn new technologies and best practices
              to improve my skills.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Frontend Development</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 & CSS3</li>
                <li>Responsive Design</li>
                <li>State Management (Redux, Zustand)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Backend Development</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Node.js & Express</li>
                <li>PostgreSQL & MySQL</li>
                <li>RESTful APIs</li>
                <li>GraphQL</li>
                <li>Authentication & Authorization</li>
                <li>Database Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">DevOps & Tools</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Git & GitHub</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>CI/CD</li>
                <li>Linux</li>
                <li>Testing (Jest, Cypress)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Soft Skills</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Problem Solving</li>
                <li>Team Collaboration</li>
                <li>Communication</li>
                <li>Project Management</li>
                <li>Agile Methodologies</li>
                <li>Technical Documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold">Senior Full Stack Developer</h3>
              <p className="text-gray-600">Company Name • 2020 - Present</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Led development of multiple web applications using React and Node.js</li>
                <li>Implemented CI/CD pipelines using GitHub Actions and AWS</li>
                <li>Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Full Stack Developer</h3>
              <p className="text-gray-600">Previous Company • 2018 - 2020</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Developed and maintained RESTful APIs</li>
                <li>Built responsive web interfaces using modern frontend frameworks</li>
                <li>Optimized database queries and improved application performance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-gray-600">University Name • 2014 - 2018</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Relevant Certifications</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>AWS Certified Developer - Associate</li>
                <li>MongoDB Certified Developer</li>
                <li>React Advanced Concepts Certification</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    );
  }