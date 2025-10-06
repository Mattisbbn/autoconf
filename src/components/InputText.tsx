import { Icon } from "@iconify/react"

export default function InputText({label, icon, value, onChange, placeholder}: {label: string, icon: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string}) {
    return (
        <div className="flex flex-col w-full mt-2">
            <label htmlFor="index-path" className="text-gray-500">{label}</label>
            <div className="relative flex flex-col w-full ">
                <Icon icon={icon} className="absolute left-4 top-1/2 w-6 h-6 -translate-y-1/2 text-gray-500" />
                <input value={value} onChange={onChange} type="text" placeholder={placeholder} className="w-full ps-12 p-4 rounded-lg bg-gray-700/50 text-white h-12" />
            </div>
        </div>
    )
}


