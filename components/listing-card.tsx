import Link from 'next/link'
import Image from 'next/image'

interface ListingCardProps {
  id: string
  title: string
  location: string
  image_url: string | null
  price: number
  description: string
}

export function ListingCard({
  id,
  title,
  location,
  image_url,
  price,
  description,
}: ListingCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative h-48 w-full bg-gray-200">
          {image_url ? (
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{location}</p>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">${price}</span>
            <span className="text-xs text-blue-600 font-semibold">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
