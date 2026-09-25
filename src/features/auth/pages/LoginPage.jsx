import { useState, useEffect } from 'react'
import { LockKeyhole, LogIn, Mail, KeyRound, RefreshCw, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { routes } from '../../../config/routes'
import AuthCard from '../components/AuthCard'
import AuthField from '../components/AuthField'

// API Base Endpoints
const API_BASE_URL = 'http://127.0.0.1:8000/account'

// Comprehensive Role-to-Route Dynamic Mapping
const destinations = {
  customer: routes.consumer.dashboard,
  consumer: routes.consumer.dashboard,
  seller: routes.farmer.dashboard,
  farmer: routes.farmer.dashboard,
  rider: routes.delivery.dashboard,
  delivery: routes.delivery.dashboard,
  admin: routes.farmer.dashboard,
}

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // View Mode: 'login' | 'verify'
  const [mode, setMode] = useState('login')

  // Form States
  const [form, setForm] = useState({
    identifier: location.state?.email || '',
    password: '',
    remember: false,
  })
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Direct OTP Verification States
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // Timer for Resend OTP Countdown
  useEffect(() => {
    let timer
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [resendTimer])

  // Helper to extract clean error string from API responses
  const getErrorMessage = (apiErr, fallbackMsg) => {
    if (!apiErr) return fallbackMsg
    if (typeof apiErr === 'string') return apiErr
    if (apiErr.detail) return apiErr.detail
    if (apiErr.message) return apiErr.message
    if (apiErr.email) return Array.isArray(apiErr.email) ? apiErr.email[0] : apiErr.email
    if (apiErr.non_field_errors) return Array.isArray(apiErr.non_field_errors) ? apiErr.non_field_errors[0] : apiErr.non_field_errors
    return fallbackMsg
  }

  // Dynamic Route Resolver Helper
  const getDashboardRoute = (userRole) => {
    if (!userRole) return routes.consumer.dashboard
    const normalizedRole = String(userRole).trim().toLowerCase()
    return destinations[normalizedRole] || routes.consumer.dashboard
  }

  const update = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '', api: '' }))
    setOtpError('')
    setOtpSuccess('')
  }

  // ── HANDLE LOGIN SUBMIT ──────────────────────────────────────────────
  const submit = async (event) => {
    event.preventDefault()
    const next = {}
    const cleanEmail = form.identifier.trim().toLowerCase()

    if (!cleanEmail) next.identifier = 'Please enter your email address.'
    if (!form.password) next.password = 'Please enter your password.'

    setErrors(next)

    if (Object.keys(next).length === 0) {
      setLoading(true)
      try {
        const response = await axios.post(`${API_BASE_URL}/login/`, {
          email: cleanEmail,
          password: form.password,
        })

        // FIXED: Using 'access_token' and 'refresh_token' matching your Django LoginView
        const { access_token, refresh_token, role, user, is_verified } = response.data
        const assignedRole = role || user?.role

        // Handle Unverified Account Flag directly from Login Response
        if (is_verified === false) {
          setMode('verify')
          setOtpSuccess('Account not verified yet. Sending fresh OTP...')
          await sendOtpRequest(cleanEmail)
          setLoading(false)
          return
        }

        // Token & Role Storage Setup
        const storage = form.remember ? localStorage : sessionStorage
        if (access_token) storage.setItem('access_token', access_token)
        if (refresh_token) storage.setItem('refresh_token', refresh_token)
        if (assignedRole) storage.setItem('khetsetu-role', assignedRole)

        window.dispatchEvent(new Event('storage'))

        // Redirect according to user role to designated dashboard
        const targetRoute = getDashboardRoute(assignedRole)
        navigate(targetRoute, { replace: true })

      } catch (err) {
        const apiData = err.response?.data
        const status = err.response?.status
        const errorMsg = getErrorMessage(apiData, '').toLowerCase()

        const isUnverifiedError =
          apiData?.is_verified === false ||
          errorMsg.includes('not verified') ||
          errorMsg.includes('unverified') ||
          errorMsg.includes('verify your email')

        if (isUnverifiedError) {
          setMode('verify')
          setOtpSuccess('Account unverified. Sending OTP verification code...')
          await sendOtpRequest(cleanEmail)
        } else {
          setErrors((prev) => ({
            ...prev,
            api: status === 401 
              ? 'Invalid email or password. Please try again.' 
              : getErrorMessage(apiData, 'Failed to sign in. Please try again.'),
          }))
        }
      } finally {
        setLoading(false)
      }
    }
  }

  // Helper Function for Sending OTP Payload
  const sendOtpRequest = async (emailToUse) => {
    if (!emailToUse) {
      setOtpError('Please provide a valid email address.')
      return
    }

    try {
      await axios.post(`${API_BASE_URL}/resend-otp/`, { email: emailToUse })
      setResendTimer(60)
      setOtpSuccess(`Verification code sent to ${emailToUse}. Check your inbox.`)
    } catch (err) {
      const apiErr = err.response?.data
      setOtpError(getErrorMessage(apiErr, 'Unable to send OTP. Please check the email address.'))
    }
  }

  // ── HANDLE OTP VERIFICATION SUBMIT ──────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    const cleanEmail = form.identifier.trim().toLowerCase()

    if (!cleanEmail) {
      setErrors({ identifier: 'Email address is required for verification.' })
      return
    }

    if (!otp || otp.trim().length < 4) {
      setOtpError('Please enter a valid OTP code.')
      return
    }

    setOtpLoading(true)
    setOtpError('')
    setOtpSuccess('')

    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp/`, {
        email: cleanEmail,
        otp: otp.trim(),
      })

      const { access_token, refresh_token, role, user } = response.data
      const assignedRole = role || user?.role

      if (access_token && refresh_token) {
        const storage = form.remember ? localStorage : sessionStorage
        storage.setItem('access_token', access_token)
        storage.setItem('refresh_token', refresh_token)
        if (assignedRole) storage.setItem('khetsetu-role', assignedRole)

        window.dispatchEvent(new Event('storage'))

        const targetRoute = getDashboardRoute(assignedRole)
        navigate(targetRoute, { replace: true })
      } else {
        setOtpSuccess('Email verified successfully! You can now sign in with your credentials.')
        setMode('login')
      }

    } catch (err) {
      const apiErr = err.response?.data
      setOtpError(getErrorMessage(apiErr, 'Invalid or expired OTP code. Try again.'))
    } finally {
      setOtpLoading(false)
    }
  }

  return (
    <AuthCard
      title={mode === 'login' ? 'Welcome Back' : 'Verify Email Account'}
      subtitle={
        mode === 'login'
          ? 'Sign in to access your dashboard, orders, and services.'
          : 'Enter the verification OTP sent to your email address.'
      }
      alternateText={mode === 'login' ? "Don't have an account?" : 'Already verified?'}
      alternateLabel={mode === 'login' ? 'Create Account' : 'Back to Login'}
      alternateTo={mode === 'login' ? routes.auth.signup : '#'}
      onAlternateClick={mode === 'verify' ? () => setMode('login') : undefined}
    >
      {location.state?.created && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          Account created successfully. Please sign in or verify your email.
        </div>
      )}

      {errors.api && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {errors.api}
        </div>
      )}

      {/* ────────────────── MODE 1: LOGIN FORM ────────────────── */}
      {mode === 'login' ? (
        <form className="auth-form space-y-4" onSubmit={submit} noValidate>
          <AuthField
            icon={Mail}
            name="identifier"
            value={form.identifier}
            onChange={update}
            placeholder="Email Address"
            autoComplete="username"
            error={errors.identifier}
          />

          <AuthField
            icon={LockKeyhole}
            name="password"
            type={visible ? 'text' : 'password'}
            value={form.password}
            onChange={update}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password}
            onToggle={() => setVisible((current) => !current)}
            toggleLabel={visible ? 'Hide password' : 'Show password'}
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={update}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              Remember me
            </label>
            <button
              className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
              type="button"
            >
              Forgot password?
            </button>
          </div>

          <button
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Quick Direct OTP Mode Switcher */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setMode('verify')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck size={15} />
              <span>Unverified account? Verify via OTP</span>
            </button>
          </div>
        </form>
      ) : (
        /* ────────────────── MODE 2: DIRECT OTP VERIFICATION ────────────────── */
        <form className="auth-form space-y-4" onSubmit={handleVerifyOtp} noValidate>
          {otpSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              {otpSuccess}
            </div>
          )}

          {otpError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {otpError}
            </div>
          )}

          <AuthField
            icon={Mail}
            name="identifier"
            value={form.identifier}
            onChange={update}
            placeholder="Email Address to Verify"
            error={errors.identifier}
          />

          <AuthField
            icon={KeyRound}
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter Verification OTP"
            error={otpError}
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              onClick={() => sendOtpRequest(form.identifier.trim().toLowerCase())}
              disabled={resendTimer > 0}
            >
              <RefreshCw size={13} className={resendTimer > 0 ? '' : 'hover:rotate-180 transition-transform duration-300'} />
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send / Resend OTP'}
            </button>

            <button
              type="button"
              className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
              onClick={() => setMode('login')}
            >
              <ArrowLeft size={13} />
              Back to Login
            </button>
          </div>

          <button
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            type="submit"
            disabled={otpLoading}
          >
            {otpLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Verifying OTP...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Verify & Continue</span>
              </>
            )}
          </button>
        </form>
      )}
    </AuthCard>
  )
}