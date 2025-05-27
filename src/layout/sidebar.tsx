import MenuButton from "@/components/Sidebar/MenuButton"
import { MenuList } from "@/components/Sidebar/menulist"

const Sidebar = () => {

    console.log(MenuList)
    return (
        <div className="md:w-[300px] bg-black/20 shadow-sm flex-shrink-0 gap-4 flex flex-col px-4 sm:px-8 pt-12">
            {MenuList.map((menu, index)=>(
                <MenuButton {...menu} key={index} />
            ))}
        </div>
    )
}

export default Sidebar