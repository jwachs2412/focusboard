function TaskSkeleton() {
  return (
    <li className="task-skeleton" aria-busy="true">
      {/* Simulated task title */}
      <span className="skeleton-title">&nbsp;</span>
      {/* Simulated delete button */}
      <button className="skeleton-button" disabled>
        &nbsp;
      </button>
    </li>
  )
}

export default TaskSkeleton
