import { createClient } from '@/lib/supabase/server'
import { ListingCard } from '@/components/listing-card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Empty } from '@/components/ui/empty'

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings:', error)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Travel Experiences
          </h1>
          <p className="text-lg text-gray-600">
            Find and book unique travel experiences from creators around the world
          </p>
        </div>

        {!listings || listings.length === 0 ? (
          <div className="mt-12">
            <Empty
              title="No experiences yet"
              description="Be the first to create a travel experience listing"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                location={listing.location}
                image_url={listing.image_url}
                price={listing.price}
                description={listing.description}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
