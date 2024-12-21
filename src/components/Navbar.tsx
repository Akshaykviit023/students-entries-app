import { Button } from "./ui/button"
import { Input } from "./ui/input"


const Navbar = () => {
  return (
    <div className="mb-4 flex justify-between items-center">
        <Input className="border-none h-12 max-w-[614px]" placeholder="Search your course" />

        <div className="flex items-center gap-6">
            <div className="flex gap-2">
            <Button className="rounded-full" variant="ghost"><img src="/help_icon.svg" alt="notAvail" /></Button>
            <Button className="rounded-full" variant="ghost"><img src="/message_icon.svg" alt="" /></Button>
            <Button className="rounded-full" variant="ghost"><img src="/settings_icon_1.svg" alt="" /></Button>
            <Button className="rounded-full" variant="ghost"><img src="/notification_icon.svg" alt="" /></Button>
            </div>
            
            <div className="flex items-center gap-5 text-lg font-semibold">
                <img src="/profile_pic.png" alt="" />
                <p>Adeline H. Dancy</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar