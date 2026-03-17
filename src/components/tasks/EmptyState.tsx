function EmptyState() {
  return (
    <div role="status" aria-live="polite" className="empty-state" style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
      <h2>No tasks yet!</h2>
      <p>Add a task using the form above to get started.</p>
    </div>
  )
}

export default EmptyState
