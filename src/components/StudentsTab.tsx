import Navbar from './Navbar'
import StudentsDashboard from './StudentDashboard'
import { useSidebar } from './ui/sidebar'

function CustomTrigger() {
    const { toggleSidebar, isMobile } = useSidebar()
   
    return isMobile && <button onClick={toggleSidebar}>Toggle Sidebar</button>
  }

const StudentsTab = () => {
  return (
    <div className='bg-secondary h-full'>
    <CustomTrigger />
    <div className='p-6'>
        <Navbar />
        <StudentsDashboard />
    </div>
    
    </div>
  )
}

export default StudentsTab