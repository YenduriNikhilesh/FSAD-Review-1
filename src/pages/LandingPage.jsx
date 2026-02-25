import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const FloatingObject = ({ delay, duration }) => {
  const icons = ['📚', '📄', '📃', '🎓', '📋', '📊']
  const randomIcon = icons[Math.floor(Math.random() * icons.length)]

  return (
    <motion.div
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: [0, 100, 50, -100, 0],
        y: [0, -100, 50, 100, 0],
        rotate: 360
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        type: 'tween'
      }}
      className="absolute text-4xl"
    >
      {randomIcon}
    </motion.div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('floating')

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('zoom')
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (phase === 'zoom') {
      const redirectTimer = setTimeout(() => {
        navigate('/login')
      }, 3000)
      return () => clearTimeout(redirectTimer)
    }
  }, [phase, navigate])

  return (
    <div className="w-full h-screen bg-gradient-dark overflow-hidden flex items-center justify-center relative">
      {/* Floating objects phase */}
      {phase === 'floating' && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <FloatingObject
              key={i}
              delay={i * 0.3}
              duration={8 + i * 0.5}
            />
          ))}
        </>
      )}

      {/* Phone and boy illustration phase */}
      {phase === 'zoom' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-64 h-96"
        >
          {/* Boy holding phone */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-0 text-9xl"
          >
            🧒
          </motion.div>

          {/* Phone */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-0 w-40 h-80 bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl border-4 border-emerald-500 shadow-2xl shadow-emerald-500/50 flex items-center justify-center"
          >
            {/* Phone screen */}
            <div className="w-36 h-72 bg-gradient-emerald rounded-2xl flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-center"
              >
                <motion.h1
                  animate={{ fontSize: ['32px', '48px', '32px'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-bold text-white"
                >
                  VEDA
                </motion.h1>
                <p className="text-white/80 text-sm mt-2">Loading...</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'floating' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-20 text-center"
      >
        <h1 className="text-5xl font-bold text-gradient mb-4">VEDA</h1>
        <p className="text-xl text-emerald-300">One Platform All Knowledge</p>
      </motion.div>
    </div>
  )
}
