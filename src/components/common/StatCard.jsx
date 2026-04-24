function StatCard({ title, value, subtitle }) {
  return (
    <div className="relative bg-white border border-blue-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-200">

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-2xl"></div>

      {/* Title */}
      <div className="text-sm font-medium text-gray-600 tracking-wide">
        {title}
      </div>

      {/* Value */}
      <div className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <div className="mt-2 text-xs text-gray-500">
          {subtitle}
        </div>
      )}

    </div>
  );
}

export default StatCard;