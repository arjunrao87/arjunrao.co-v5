import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="prose prose-stone text-6xl font-extrabold leading-9 tracking-tight dark:prose-invert md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="prose prose-stone mb-4 text-xl leading-normal dark:prose-invert md:text-2xl">
          Sorry, we couldn't find this page.
        </p>
        <p className="prose prose-stone mb-8 dark:prose-invert">
          But don't worry! You can find plenty of other things in these parts 📚
        </p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-stone-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
