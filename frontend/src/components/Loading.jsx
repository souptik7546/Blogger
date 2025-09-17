import { Loader2 } from "lucide-react";
function Loading() {
  return (
   <div className="flex flex-col items-center justify-center h-screen w-screen gap-3 bg-white dark:bg-gray-900">
      {/* Spinner */}
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />

      {/* Subtext */}
      <p className="text-gray-700 dark:text-gray-200 text-base animate-pulse">
        Loading, please wait...
      </p>
    </div>
  )
}

export default Loading