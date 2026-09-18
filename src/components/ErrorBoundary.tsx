import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur capturée par l'ErrorBoundary :", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', margin: '20px', color: '#991b1b' }}>
          <h2>Une erreur est survenue dans cette section.</h2>
          <p>{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Recharger la page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}