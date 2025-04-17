export function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`card-title ${className}`}>{children}</h3>
}

export function CardDescription({ children }) {
  return <p className="card-description">{children}</p>
}

export function CardContent({ children }) {
  return <div className="card-content">{children}</div>
}
