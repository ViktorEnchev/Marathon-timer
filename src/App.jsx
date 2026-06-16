import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/logo.png'

const TARGET_DATE = new Date('2027-03-14T00:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = TARGET_DATE - now

  if (diff <= 0) {
    return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7

  return {
    weeks,
    days,
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    total: diff,
  }
}

function Digit({ value, label }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="digit-block">
      <div className="digit-value">{padded}</div>
      <div className="digit-label">{label}</div>
    </div>
  )
}

export default function App() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="app">
      <div className="noise" />
      <div className="glow-orb glow-orb--1" />
      <div className="glow-orb glow-orb--2" />

      <main className="container">
        {/* Logo */}
        <div className="logo-placeholder">
          <img src={logo} alt="Bridgeburners logo" className="logo-img" />
        </div>

        {/* Title */}
        <div className="title-block">
          <p className="subtitle">The</p>
          <h1 className="title">
            <span className="title-accent">Bridgeburners</span> Book Club
          </h1>
          <p className="tagline">
            must answer the call and march to&nbsp;
            <span className="highlight">Rome</span>
            &nbsp;— to run a marathon
          </p>
        </div>

        {/* Countdown */}
        <div className="countdown">
          <Digit value={time.weeks}   label="Weeks"   />
          <div className="sep">:</div>
          <Digit value={time.days}    label="Days"    />
          <div className="sep">:</div>
          <Digit value={time.hours}   label="Hours"   />
          <div className="sep">:</div>
          <Digit value={time.minutes} label="Minutes" />
          <div className="sep">:</div>
          <Digit value={time.seconds} label="Seconds" />
        </div>

        <p className="target-date">14 · III · MMXXVII</p>
      </main>
    </div>
  )
}
