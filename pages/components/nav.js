import Link from 'next/link'

const Nav = ({ children }) => {
  return (
    <div className="text-black border-b-2 border-black mx-4">
      <nav className="flex justify-between container mx-auto py-4">
        <Link href="/">
          <p className="text-lg font-bold tracking-wide">The Exhibitionist</p>
        </Link>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            <Link href="/">
              <p className="hover:underline px-3 py-1 text-sm font-medium">
                Home
              </p>
            </Link>
            <Link href="/explore">
              <p className=" hover:underline px-3 py-1 text-sm font-medium">
                Explore
              </p>
            </Link>
            <Link href="/about">
              <p className="hover:underline px-3 py-1 text-sm font-medium">
                About
              </p>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

export default Nav
