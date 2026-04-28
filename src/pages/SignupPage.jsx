import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from "../services/authService";

/* ─── Google Fonts ─── */
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

/* ─── Floating dust mote ─── */
const Mote = ({ delay, x, y, size }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      borderRadius: '50%',
      background: 'rgba(251,191,36,0.55)',
      pointerEvents: 'none',
    }}
    animate={{ y: [0, -24, 0], x: [0, 8, -5, 0], opacity: [0, 0.75, 0] }}
    transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
)

/* ─── Stacked books SVG ─── */
const BooksIllustration = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 280, opacity: 0.92 }}>
    {/* Shadow */}
    <ellipse cx="140" cy="185" rx="100" ry="12" fill="rgba(251,191,36,0.12)" />

    {/* Book 1 – tallest, left tilt */}
    <g transform="rotate(-8, 60, 140)">
      <rect x="30" y="60" width="38" height="120" rx="3" fill="#1a3a5c" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
      <rect x="30" y="60" width="6" height="120" rx="2" fill="rgba(251,191,36,0.55)" />
      {[80,96,112,128,144].map((y,i)=>(
        <line key={i} x1="40" y1={y} x2="64" y2={y} stroke="rgba(251,191,36,0.22)" strokeWidth="1"/>
      ))}
      <text x="49" y="125" fontSize="9" fill="rgba(251,191,36,0.7)"
        fontFamily="serif" transform="rotate(90,49,125)">HISTORY</text>
    </g>

    {/* Book 2 – middle */}
    <g transform="rotate(2, 110, 145)">
      <rect x="88" y="80" width="44" height="105" rx="3" fill="#0f2d4a" stroke="rgba(251,191,36,0.45)" strokeWidth="1" />
      <rect x="88" y="80" width="7" height="105" rx="2" fill="rgba(180,100,10,0.7)" />
      {[100,116,132,148,164].map((y,i)=>(
        <line key={i} x1="99" y1={y} x2="128" y2={y} stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>
      ))}
      <text x="110" y="138" fontSize="9" fill="rgba(251,191,36,0.65)"
        fontFamily="serif" transform="rotate(90,110,138)">SCIENCE</text>
    </g>

    {/* Book 3 – right tilt */}
    <g transform="rotate(-4, 160, 142)">
      <rect x="140" y="72" width="40" height="112" rx="3" fill="#162e48" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
      <rect x="140" y="72" width="6" height="112" rx="2" fill="rgba(251,191,36,0.45)" />
      {[92,108,124,140,156].map((y,i)=>(
        <line key={i} x1="150" y1={y} x2="176" y2={y} stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>
      ))}
      <text x="161" y="132" fontSize="9" fill="rgba(251,191,36,0.65)"
        fontFamily="serif" transform="rotate(90,161,132)">PHILOSOPHY</text>
    </g>

    {/* Book 4 – short, rightmost */}
    <g transform="rotate(6, 205, 152)">
      <rect x="188" y="100" width="36" height="88" rx="3" fill="#1e3a5f" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
      <rect x="188" y="100" width="6" height="88" rx="2" fill="rgba(180,100,10,0.55)" />
      {[116,132,148,164].map((y,i)=>(
        <line key={i} x1="198" y1={y} x2="220" y2={y} stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>
      ))}
      <text x="207" y="148" fontSize="8" fill="rgba(251,191,36,0.6)"
        fontFamily="serif" transform="rotate(90,207,148)">ARTS</text>
    </g>

    {/* Floating stars */}
    {[[45,30],[130,15],[210,25],[80,12],[170,35]].map(([cx,cy],i)=>(
      <motion.circle key={i} cx={cx} cy={cy} r="1.8"
        fill="rgba(251,191,36,0.85)"
        animate={{ opacity: [0.2, 1, 0.2], r: [1.2, 2, 1.2] }}
        transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.6 }} />
    ))}

    {/* Reading lamp glow */}
    <ellipse cx="140" cy="58" rx="45" ry="20" fill="rgba(251,191,36,0.07)" />
  </svg>
)

/* ─── Password strength indicator ─── */
const PasswordStrength = ({ password }) => {
  const checks = [
    { label: 'At least 4 chars', ok: password.length >= 4 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number included', ok: /\d/.test(password) },
  ]
  if (!password) return null
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
      {checks.map(c => (
        <span key={c.label} style={{
          fontFamily: "'Lora', serif", fontSize: 11,
          color: c.ok ? '#86efac' : 'rgba(253,230,138,0.35)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 9 }}>{c.ok ? '✔' : '○'}</span>
          {c.label}
        </span>
      ))}
    </motion.div>
  )
}

/* ─── Reusable Field ─── */
const Field = ({ label, icon: Icon, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <label style={{
      fontFamily: "'Lora', serif", fontSize: 13,
      letterSpacing: '0.05em', color: 'rgba(253,230,138,0.85)', fontWeight: 500,
    }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: 14, top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(251,191,36,0.55)', display: 'flex', pointerEvents: 'none',
      }}>
        <Icon size={15} />
      </span>
      {children}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ fontFamily: "'Lora', serif", fontSize: 11.5, color: '#fca5a5', margin: 0 }}>
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

const inputStyle = (focused) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 16px 12px 42px',
  background: focused ? 'rgba(251,191,36,0.07)' : 'rgba(255,255,255,0.05)',
  border: `1px solid ${focused ? 'rgba(251,191,36,0.7)' : 'rgba(251,191,36,0.2)'}`,
  borderRadius: 10,
  color: '#fef3c7',
  fontFamily: "'Lora', serif",
  fontSize: 14.5,
  outline: 'none',
  transition: 'all 0.25s ease',
  caretColor: '#fbbf24',
})

/* ═══════════════════════════════════════════════════════ */
export default function SignupPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [show, setShow] = useState({ password: false, confirm: false })
  const [focused, setFocused] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()

  const motes = Array.from({ length: 14 }, (_, i) => ({
    id: i, delay: i * 0.65,
    x: 5 + (i * 7) % 90,
    y: 5 + (i * 13) % 90,
    size: 3 + (i % 4) * 2 + 'px',
  }))

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))
  const focus = (f, v) => () => setFocused(p => ({ ...p, [f]: v }))

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 4) e.password = 'Minimum 4 characters'
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!agreed) e.terms = 'You must agree to the terms'
    return e
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password
        })
      })

      const data = await res.text()

      if (!res.ok) {
        setError(data)
        setLoading(false)
        return
      }

      navigate('/login')

    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
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

        {/* ── LEFT DECORATIVE PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: '0 0 44%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 44px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #0c1e35 0%, #091525 60%, #060e1a 100%)',
            borderRight: '1px solid rgba(251,191,36,0.12)',
          }}>

          {/* Warm radial glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(180,100,10,0.16) 0%, transparent 70%)',
          }} />
          {/* Top arch */}
          <div style={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 320, height: 160, borderRadius: '0 0 160px 160px',
            border: '1px solid rgba(251,191,36,0.1)', pointerEvents: 'none',
          }} />
          {/* Dot grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(251,191,36,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Dust motes */}
          {motes.map(m => <Mote key={m.id} {...m} />)}

          {/* Content */}
          <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              <BooksIllustration />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 40, fontWeight: 700, color: '#fbbf24',
                margin: '24px 0 6px', letterSpacing: '-0.01em', lineHeight: 1.1,
              }}>
              VEDA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              style={{
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                fontSize: 15, color: 'rgba(253,230,138,0.65)',
                margin: '0 0 18px', letterSpacing: '0.04em',
              }}>
              Your Digital Library of Knowledge
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                width: 60, height: 1, margin: '0 auto 18px',
                background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
              }} />

            {/* 3 benefit pills */}
            {[
              { icon: '📚', text: '50,000+ curated books' },
              { icon: '🔖', text: 'Personalized reading lists' },
              { icon: '🌐', text: 'Access from any device' },
            ].map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.12)',
                  borderRadius: 10, padding: '10px 16px',
                  marginBottom: 10, textAlign: 'left',
                }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <span style={{
                  fontFamily: "'Lora', serif", fontSize: 13,
                  color: 'rgba(253,230,138,0.7)',
                }}>
                  {b.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom golden shelf line */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.4) 30%, rgba(251,191,36,0.6) 50%, rgba(251,191,36,0.4) 70%, transparent 100%)',
          }} />
        </motion.div>

        {/* ── RIGHT FORM PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 32px',
            background: '#060d1a',
            position: 'relative',
            overflowY: 'auto',
          }}>

          {/* Dot grid texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(251,191,36,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, padding: '24px 0' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 12,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#fbbf24', margin: '0 0 10px',
              }}>
                Join the community
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 30,
                fontWeight: 700, color: '#fef3c7', margin: 0, lineHeight: 1.25,
              }}>
                Begin your journey<br />
                <span style={{ fontStyle: 'italic', color: '#fbbf24' }}>through the stacks</span>
              </h2>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Full Name */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Field label="Full Name" icon={User} error={errors.fullName}>
                  <input
                    type="text" placeholder="Jane Austen"
                    value={form.fullName} onChange={set('fullName')}
                    onFocus={focus('fullName', true)} onBlur={focus('fullName', false)}
                    style={inputStyle(focused.fullName)}
                  />
                </Field>
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
                <Field label="Email Address" icon={Mail} error={errors.email}>
                  <input
                    type="email" placeholder="you@example.com"
                    value={form.email} onChange={set('email')}
                    onFocus={focus('email', true)} onBlur={focus('email', false)}
                    style={inputStyle(focused.email)}
                  />
                </Field>
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}>
                <Field label="Password" icon={Lock} error={errors.password}>
                  <input
                    type={show.password ? 'text' : 'password'} placeholder="••••••••"
                    value={form.password} onChange={set('password')}
                    onFocus={focus('password', true)} onBlur={focus('password', false)}
                    style={{ ...inputStyle(focused.password), paddingRight: 44 }}
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, password: !p.password }))}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(251,191,36,0.5)', padding: 0, display: 'flex',
                    }}>
                    {show.password ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Field>
                <PasswordStrength password={form.password} />
              </motion.div>

              {/* Confirm Password */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.64 }}>
                <Field label="Confirm Password" icon={ShieldCheck} error={errors.confirmPassword}>
                  <input
                    type={show.confirm ? 'text' : 'password'} placeholder="••••••••"
                    value={form.confirmPassword} onChange={set('confirmPassword')}
                    onFocus={focus('confirm', true)} onBlur={focus('confirm', false)}
                    style={{
                      ...inputStyle(focused.confirm),
                      paddingRight: 44,
                      borderColor: form.confirmPassword && form.password === form.confirmPassword
                        ? 'rgba(134,239,172,0.6)'
                        : focused.confirm ? 'rgba(251,191,36,0.7)' : 'rgba(251,191,36,0.2)',
                    }}
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(251,191,36,0.5)', padding: 0, display: 'flex',
                    }}>
                    {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </Field>
              </motion.div>

              {/* Terms checkbox */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}>
                <label style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
                  fontFamily: "'Lora', serif", fontSize: 12.5, color: 'rgba(253,230,138,0.6)',
                  lineHeight: 1.5,
                }}>
                  <div onClick={() => setAgreed(v => !v)}
                    style={{
                      marginTop: 2, flexShrink: 0,
                      width: 18, height: 18, borderRadius: 5,
                      border: `1.5px solid ${agreed ? '#fbbf24' : errors.terms ? '#fca5a5' : 'rgba(251,191,36,0.3)'}`,
                      background: agreed ? 'rgba(251,191,36,0.18)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span>
                    I agree to the{' '}
                    <span style={{ color: '#fbbf24', textDecoration: 'underline', textDecorationColor: 'rgba(251,191,36,0.4)', cursor: 'pointer' }}>
                      Terms of Service
                    </span>
                    {' '}and{' '}
                    <span style={{ color: '#fbbf24', textDecoration: 'underline', textDecorationColor: 'rgba(251,191,36,0.4)', cursor: 'pointer' }}>
                      Privacy Policy
                    </span>
                  </span>
                </label>
                {errors.terms && (
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 11.5, color: '#fca5a5', margin: '4px 0 0' }}>
                    {errors.terms}
                  </p>
                )}
              </motion.div>

              {error && (
                <div className="text-red-400 text-sm mb-3">
                  {error}
                </div>
              )}

              {/* General error */}
              <AnimatePresence>
                {errors.general && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', color: '#fca5a5', fontSize: 13, margin: 0, fontFamily: "'Lora', serif" }}>
                    {errors.general}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <motion.button
                  type="submit" disabled={loading}
                  whileHover={!loading ? { scale: 1.015 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    background: loading
                      ? 'rgba(180,120,10,0.4)'
                      : 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
                    border: 'none',
                    borderRadius: 12,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 600,
                    color: '#0c1a06',
                    letterSpacing: '0.03em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: loading ? 'none' : '0 4px 24px rgba(251,191,36,0.22)',
                    transition: 'background 0.3s',
                  }}>
                  {loading ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                      Registering your account…
                    </motion.span>
                  ) : (
                    <>
                      Create My Account
                      <ArrowRight size={17} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0 18px' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(251,191,36,0.15)' }} />
              <span style={{ fontFamily: "'Lora', serif", fontSize: 11.5, color: 'rgba(253,230,138,0.35)', fontStyle: 'italic' }}>
                or sign up with
              </span>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(251,191,36,0.15)' }} />
            </motion.div>

            {/* Social buttons */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Google', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )},
                { label: 'Facebook', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )},
              ].map(({ label, icon }) => (
                <motion.button key={label}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(251,191,36,0.45)' }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  style={{
                    flex: 1, padding: '11px 16px',
                    background: 'transparent',
                    border: '1px solid rgba(251,191,36,0.2)',
                    borderRadius: 10, cursor: 'pointer',
                    fontFamily: "'Lora', serif", fontSize: 13.5,
                    color: 'rgba(253,230,138,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    transition: 'border-color 0.25s',
                  }}>
                  {icon} {label}
                </motion.button>
              ))}
            </motion.div>

            {/* Login link */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{
                textAlign: 'center', marginTop: 24,
                fontFamily: "'Lora', serif", fontStyle: 'italic',
                fontSize: 13.5, color: 'rgba(253,230,138,0.5)',
              }}>
              Already a member?{' '}
              <button onClick={() => navigate('/login')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Lora', serif", fontStyle: 'italic',
                  color: '#fbbf24', fontSize: 13.5, padding: 0,
                  textDecoration: 'underline', textDecorationColor: 'rgba(251,191,36,0.4)',
                }}>
                Sign in to your library
              </button>
            </motion.p>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
              style={{
                textAlign: 'center', marginTop: 20,
                fontFamily: "'Lora', serif", fontSize: 11,
                color: 'rgba(253,230,138,0.22)', letterSpacing: '0.04em',
              }}>
              © 2025 VEDA Educational Library · All rights reserved
            </motion.p>

          </div>
        </motion.div>

      </div>
    </>
  )
}
