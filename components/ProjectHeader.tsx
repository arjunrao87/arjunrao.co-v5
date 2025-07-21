const ProjectHeader = () => (
  <div className="mb-16 text-center">
    <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
      Projects & Innovations
    </h1>
    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
      A collection of technical projects showcasing engineering leadership, scalable architecture,
      and innovative solutions. From building consumer applications to contributing to open-source
      infrastructure, these projects demonstrate expertise in full-stack development, distributed
      systems, and team leadership.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span>Live Projects</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
        <span>Open Source</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
        <span>Case Studies</span>
      </div>
    </div>
  </div>
)

export default ProjectHeader
