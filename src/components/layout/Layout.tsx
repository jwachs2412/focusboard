type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1>FocusBoard</h1>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  )
}

export default Layout
