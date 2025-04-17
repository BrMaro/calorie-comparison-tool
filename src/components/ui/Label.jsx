export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  )
}
