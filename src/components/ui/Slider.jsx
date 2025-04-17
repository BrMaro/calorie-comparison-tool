"use client"

import { useState, useRef, useEffect } from "react"

export function Slider({ min, max, step, value, onValueChange, id }) {
  const [currentValue, setCurrentValue] = useState(value[0])
  const sliderRef = useRef(null)
  const isDragging = useRef(false)

  const calculatePercentage = (value) => {
    return ((value - min) / (max - min)) * 100
  }

  const calculateValue = (percentage) => {
    const rawValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(rawValue / step) * step
    return Math.min(max, Math.max(min, steppedValue))
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    updateValue(e)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateValue(e)
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const updateValue = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
      const newValue = calculateValue(percentage)
      setCurrentValue(newValue)
      onValueChange([newValue])
    }
  }

  useEffect(() => {
    setCurrentValue(value[0])
  }, [value])

  return (
    <div className="slider" ref={sliderRef} onClick={updateValue} id={id}>
      <div className="slider-track" style={{ width: `${calculatePercentage(currentValue)}%` }} />
      <div
        className="slider-thumb"
        style={{ left: `${calculatePercentage(currentValue)}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
