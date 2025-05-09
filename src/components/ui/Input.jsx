"use client"

export function Input({ id, placeholder, type = "text", value, onChange }) {
  return <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className="input" />
}
