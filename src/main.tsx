import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { SidebarProvider, } from './components/ui/sidebar.tsx'
import { StudentSidebar } from './components/StudentSidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider>
        <StudentSidebar />
        <App />
      </SidebarProvider>
    </Provider>
  </StrictMode>,
)
