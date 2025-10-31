import {ChevronDownIcon} from "@heroicons/react/24/outline/index.js"

export default function LocationSelect() {
  return (
    <div className='relative w-30'>
      <select
        className="w-full px-3 py-1.5 rounded-full text-sm border-2 border-gray-300 bg-white text-gray-500
                 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400
                 appearance-none cursor-pointer"
      >
        <option value="kyiv">Київ</option>
      </select>
      <ChevronDownIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none'/>
    </div>
  )
}