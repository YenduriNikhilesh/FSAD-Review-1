import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, BookOpen, Mail, Lock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import API from "../services/api"

/* ─── Google Fonts injected once ─── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])
  return null
}

/* ─── Floating dust-mote particle ─── */
const Mote = ({ delay, x, y, size }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(251,191,36,0.55)',
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, -28, 0],
      x: [0, 10, -6, 0],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: 6 + delay,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

/* ─── Decorative open book SVG ─── */
const BookIllustration = () => (
  <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 280, opacity: 0.92 }}>
    <ellipse cx="130" cy="155" rx="90" ry="18" fill="rgba(251,191,36,0.18)" />
    <rect x="126" y="30" width="8" height="118" rx="3" fill="rgba(0,0,0,0.35)" />
    <path d="M130 30 C100 28 50 38 20 55 L20 148 C50 133 100 125 130 128Z"
      fill="#1e3a5f" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
    <path d="M130 30 C160 28 210 38 240 55 L240 148 C210 133 160 125 130 128Z"
      fill="#1e3a5f" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
    {[68, 80, 92, 104, 116, 128].map((y, i) => (
      <line key={i} x1="40" y1={y} x2={112 - i * 2} y2={y}
        stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
    ))}
    {[68, 80, 92, 104, 116, 128].map((y, i) => (
      <line key={i} x1="148" y1={y} x2={218 + i * 2} y2={y}
        stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
    ))}
    <rect x="128" y="30" width="4" height="98" fill="rgba(251,191,36,0.6)" rx="2" />
    <circle cx="76" cy="56" r="10" fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="1" />
    <circle cx="76" cy="56" r="4" fill="rgba(251,191,36,0.35)" />
    <circle cx="184" cy="56" r="10" fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="1" />
    <circle cx="184" cy="56" r="4" fill="rgba(251,191,36,0.35)" />
    {[[50, 22], [210, 18], [130, 12], [90, 10], [170, 15]].map(([cx, cy], i) => (
      <motion.circle key={i} cx={cx} cy={cy} r="1.5"
        fill="rgba(251,191,36,0.9)"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }} />
    ))}
  </svg>
)

/* ─── Styled input component ─── */
const Field = ({ label, icon: Icon, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{
      fontFamily: "'Lora', serif",
      fontSize: 13,
      letterSpacing: '0.05em',
      color: 'rgba(253,230,138,0.85)',
      fontWeight: 500,
    }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: 'rgba(251,191,36,0.6)', display: 'flex', pointerEvents: 'none',
      }}>
        <Icon size={16} />
      </span>
      {children}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ fontFamily: "'Lora', serif", fontSize: 12, color: '#fca5a5', margin: 0 }}>
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

const inputStyle = (focused) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 16px 13px 42px',
  background: focused ? 'rgba(251,191,36,0.07)' : 'rgba(255,255,255,0.05)',
  border: `1px solid ${focused ? 'rgba(251,191,36,0.7)' : 'rgba(251,191,36,0.2)'}`,
  borderRadius: 10,
  color: '#fef3c7',
  fontFamily: "'Lora', serif",
  fontSize: 15,
  outline: 'none',
  transition: 'all 0.25s ease',
  caretColor: '#fbbf24',
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState("")
  const [inputCaptcha, setInputCaptcha] = useState("")
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passFocused, setPassFocused] = useState(false)
  const [captchaFocused, setCaptchaFocused] = useState(false)
  const navigate = useNavigate()

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""

    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setCaptcha(code)
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/home")
    }
  }, [navigate])

  useEffect(() => {
    generateCaptcha()
  }, [])

  const motes = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    delay: i * 0.7,
    x: 5 + (i * 7) % 90,
    y: 5 + (i * 13) % 90,
    size: 3 + (i % 4) * 2 + 'px',
  }))

  const validate = () => {
    let e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email format'
    if (!password) e.password = 'Password is required'
    else if (password.length < 4) e.password = 'Minimum 4 characters'
    return e
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    setError(null)

    if (Object.keys(validationErrors).length > 0) return

    if (inputCaptcha.trim().toUpperCase() !== captcha) {
      alert("Captcha incorrect")
      setInputCaptcha("")
      generateCaptcha()
      return
    }

    setLoading(true)

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/home")
    } catch (err) {
      setError(err.response?.data || "Something went wrong")
      generateCaptcha()
      setInputCaptcha("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <FontLoader />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#070f1c',
        fontFamily: "'Lora', serif",
        overflow: 'hidden',
      }}>

        {/* ── LEFT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: '0 0 48%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 48px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #0c1e35 0%, #091525 60%, #060e1a 100%)',
            borderRight: '1px solid rgba(251,191,36,0.12)',
          }}>

          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(180,100,10,0.18) 0%, transparent 70%)',
          }} />

          <div style={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 320, height: 160,
            borderRadius: '0 0 160px 160px',
            border: '1px solid rgba(251,191,36,0.12)',
            pointerEvents: 'none',
          }} />

          {motes.map(m => <Mote key={m.id} {...m} />)}

          <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              <BookIllustration />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 42,
                fontWeight: 700,
                color: '#fbbf24',
                margin: '28px 0 8px',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}>
              VEDA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 16,
                color: 'rgba(253,230,138,0.7)',
                margin: '0 0 20px',
                letterSpacing: '0.04em',
              }}>
              Your Digital Library of Knowledge
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              style={{
                width: 60, height: 1,
                background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
                margin: '0 auto 20px',
              }} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 13.5,
                color: 'rgba(253,230,138,0.5)',
                lineHeight: 1.7,
                maxWidth: 280,
                margin: '0 auto',
              }}>
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
              <br />
              <span style={{ fontSize: 12, opacity: 0.6 }}>— George R.R. Martin</span>
            </motion.p>
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.4) 30%, rgba(251,191,36,0.6) 50%, rgba(251,191,36,0.4) 70%, transparent 100%)',
          }} />
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 32px',
            background: '#060d1a',
            position: 'relative',
          }}>

          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(251,191,36,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: 36 }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 13,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#fbbf24',
                margin: '0 0 10px',
              }}>
                Welcome Back
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                color: '#fef3c7',
                margin: 0,
                lineHeight: 1.2,
              }}>
                Sign in to your<br />
                <span style={{ fontStyle: 'italic', color: '#fbbf24' }}>library account</span>
              </h2>
            </motion.div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}>
                <Field label="Email Address" icon={Mail} error={errors.email}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    style={inputStyle(emailFocused)}
                  />
                </Field>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}>
                <Field label="Password" icon={Lock} error={errors.password}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPassFocused(true)}
                    onBlur={() => setPassFocused(false)}
                    style={{ ...inputStyle(passFocused), paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{
                      position: 'absolute', right: 14, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(251,191,36,0.55)', padding: 0, display: 'flex',
                    }}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </Field>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1px solid rgba(251,191,36,0.25)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fbbf24',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textAlign: 'center',
                    userSelect: 'none',
                  }}>
                    {captcha}
                  </div>

                  <button
                    type="button"
                    onClick={generateCaptcha}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 10,
                      border: '1px solid rgba(251,191,36,0.25)',
                      background: 'rgba(251,191,36,0.06)',
                      color: '#fbbf24',
                      cursor: 'pointer',
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    🔄
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={inputCaptcha}
                  onChange={(e) => setInputCaptcha(e.target.value.toUpperCase())}
                  onFocus={() => setCaptchaFocused(true)}
                  onBlur={() => setCaptchaFocused(false)}
                  style={{
                    ...inputStyle(captchaFocused),
                    paddingLeft: 16,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                />
              </motion.div>

              {error && (
                <div className="text-red-400 text-sm mb-3">
                  {typeof error === 'string'
                    ? error
                    : Object.values(error).map((e, i) => <div key={i}>{e}</div>)
                  }
                </div>
              )}

              <AnimatePresence>
                {errors.general && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', color: '#fca5a5', fontSize: 13, margin: 0, fontFamily: "'Lora', serif" }}>
                    {errors.general}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.015 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  background: loading
                    ? 'rgba(180,120,10,0.4)'
                    : 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
                  border: 'none',
                  borderRadius: 12,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0c1a06',
                  letterSpacing: '0.03em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transition: 'background 0.3s',
                  boxShadow: loading ? 'none' : '0 4px 24px rgba(251,191,36,0.25)',
                }}>
                {loading ? 'Opening the vault…' : (
                  <>
                    Enter the Library
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                margin: '28px 0 24px',
              }}>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(251,191,36,0.15)' }} />
              <span style={{ fontFamily: "'Lora', serif", fontSize: 12, color: 'rgba(253,230,138,0.35)', fontStyle: 'italic' }}>
                new to veda?
              </span>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(251,191,36,0.15)' }} />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.01, borderColor: 'rgba(251,191,36,0.55)' }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: '100%',
                padding: '13px 24px',
                background: 'transparent',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: 12,
                cursor: 'pointer',
                fontFamily: "'Lora', serif",
                fontStyle: 'italic',
                fontSize: 15,
                color: 'rgba(253,230,138,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'border-color 0.25s',
              }}>
              <BookOpen size={16} />
              Create a new account
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
