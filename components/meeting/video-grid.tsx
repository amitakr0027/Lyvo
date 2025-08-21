"use client"

export function VideoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* Video grid component - to be implemented by frontend team */}
      <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-white">Video Feed 1</span>
      </div>
      <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-white">Video Feed 2</span>
      </div>
      <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-white">Video Feed 3</span>
      </div>
      <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-white">Video Feed 4</span>
      </div>
    </div>
  )
}
