import React from 'react'

function Footer() {
  return (
     <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Brand */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">MyApp</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Making life easier, one line of code at a time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer