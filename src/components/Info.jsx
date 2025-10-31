import {ChatBubbleLeftEllipsisIcon, MagnifyingGlassIcon, MapPinIcon} from "@heroicons/react/24/outline/index.js"

export default function Info() {
  return (
    <div className='px-6 md:px-16 py-10 md:py-0'>

      <h2 className="text-xl font-bold text-gray-500 mb-4">
        Як це працює?
      </h2>

      <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16'>
        <div className='flex items-center justify-center gap-2'>
          <span className='flex items-center justify-center p-3 rounded-full bg-blue-100'>
            <MagnifyingGlassIcon className='w-6 h-6 text-blue-400 '/>
          </span>
          <p className='text-md font-semibold text-gray-500'>
            Обери категорію
          </p>
        </div>

        <div className='flex items-center justify-center gap-2'>
          <span className='flex items-center justify-center p-3 rounded-full bg-blue-100'>
            <MapPinIcon className='w-6 h-6 text-blue-400 '/>
          </span>
          <p className='text-md font-semibold text-gray-500'>
            Переглянь на мапі
          </p>
        </div>

        <div className='flex items-center justify-center gap-2'>
          <span className='flex items-center justify-center p-3 rounded-full bg-blue-100'>
            <ChatBubbleLeftEllipsisIcon className='w-6 h-6 text-blue-400 '/>
          </span>
          <p className='text-md font-semibold text-gray-500'>
            Запишись на сайті
          </p>
        </div>
      </div>

    </div>
  )
}