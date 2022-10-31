interface App {
  alertViewProps: AlertView
}

interface AppModal {
  open: (content: ReactNode) => void
  close: () => void
}

interface AlertView {
  isOpen: boolean
  open: (content: ReactNode) => void
  close: () => void
  content: ReactNode
}

interface ReactNativeWebView {
  postMessage: (msg: string) => void
  goBack: () => void
}
