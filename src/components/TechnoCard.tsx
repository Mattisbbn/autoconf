import { Icon } from "@iconify/react"


export default function TechnoCard({icon, title, onClick,selectedTechno}: {icon: string, title: string, onClick: () => void, selectedTechno: string}) {
  return (
    <div className={`bg-gray-700/50 rounded-lg p-4 cursor-pointer h-40 w-60 flex flex-col items-center justify-center border-3  transition-all duration-200 ${selectedTechno === title ? "border-azure-radiance-600" : "border-gray-700 hover:border-azure-radiance-600/50 "}`} onClick={onClick} >
        <Icon icon={icon} className="w-14 h-14 text-white" />
        <p className="text-white font-semibold mt-2">{title}</p>
    </div>
  )
}