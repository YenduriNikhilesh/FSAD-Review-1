import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-white/10 bg-slate-900/50 backdrop-blur-md mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">VEDA</h3>
            <p className="text-slate-400 text-sm">One Platform All Knowledge</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/research" className="hover:text-emerald-400 transition">Research</a></li>
              <li><a href="/career" className="hover:text-emerald-400 transition">Career</a></li>
              <li><a href="/cultural" className="hover:text-emerald-400 transition">Cultural</a></li>
              <li><a href="/legal" className="hover:text-emerald-400 transition">Legal</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Support</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Cookies</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-slate-500 text-sm">
            © 2024 VEDA. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
