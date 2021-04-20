import * as React from 'react'
import pubsub from 'sweet-pubsub'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {uniqueId} from 'lodash'

const Toast = () => {
  const [toasts, setToasts] = React.useState([])

  const removeToast = id => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id))
  }

  React.useEffect(() => {
    const addToast = ({type = 'success', title, message, duration = 3}) => {
      const id = uniqueId('toast-')

      setToasts(currentToasts => [...currentToasts, {id, type, title, message}])

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000)
      }
    }

    pubsub.on('toast', addToast)

    return () => {
      pubsub.off('toast', addToast)
    }
  }, [])

  return (
    <div className="fixed right-10 top-20 z-50">
      <TransitionGroup>
        {toasts.map(toast => {
          const toastRef = React.createRef(null)
          return (
            <CSSTransition
              nodeRef={toastRef}
              key={toast.id}
              classNames="toast"
              timeout={200}
            >
              <div
                ref={toastRef}
                key={toast.id}
                type={toast.type}
                onClick={() => removeToast(toast.id)}
                className={`relative p-3 rounded shadow-xl cursor-pointer mb-1 ${
                  toast.type === 'success' ? 'bg-green-400' : 'bg-red-400'
                }`}
                aria-hidden="true"
              >
                {toast.title}
                {toast.message}
              </div>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </div>
  )
}

export {Toast}
