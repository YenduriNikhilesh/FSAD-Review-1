import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.password === formData.confirmPassword) {
      localStorage.setItem('user', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email
      }))
      navigate('/home')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5 }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card-glass w-full max-w-md"
      >
        <motion.div
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">VEDA</h1>
          <p className="text-slate-300">Join Us Today</p>
        </motion.div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
            />
          </motion.div>

          {/* Email */}
          <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
            />
          </motion.div>

          {/* Password */}
          <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-emerald-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-slate-200 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-emerald-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            custom={5}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full btn-primary mt-6"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Login Link */}
        <motion.p custom={6} variants={itemVariants} initial="hidden" animate="visible" className="text-center mt-6 text-slate-300">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
          >
            Login
          </button>
        </motion.p>

        {/* Divider */}
        <motion.div custom={7} variants={itemVariants} initial="hidden" animate="visible" className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with</span>
          </div>
        </motion.div>

        {/* Social Buttons */}
        <motion.div custom={8} variants={itemVariants} initial="hidden" animate="visible" className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            🔵 Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            f Facebook
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
