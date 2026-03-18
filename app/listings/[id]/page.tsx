// 1. Rename your server client during import
import { createClient as createServerClient } from '@/lib/supabase/server'
// 2. Import the standard client for the static build
import { createClient as createStaticClient } from '@supabase/supabase-js'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  // ✅ 3. Use the static, cookie-less client here!
  const supabase = createStaticClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: listings } = await supabase.from('listings').select('id')

  return (listings || []).map((listing) => ({
    id: listing.id.toString(), // Converted to string to be safe
  }))
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // ✅ 4. Use your standard server client (with cookies) for the actual page
  const supabase = await createServerClient()

  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !listing) {
    notFound()
  }

  // Fetch user info
  const { data: userData } = await supabase
    .from('auth.users')
    .select('email')
    .eq('id', listing.user_id)
    .single()

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="outline" className="mb-6">
            ← Back to Feed
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96 w-full bg-gray-200">
            {listing.image_url ? (
              <Image
                src={listing.image_url}
                alt={listing.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500 text-lg">
                No image available
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-xl text-gray-600">{listing.location}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-gray-600 text-sm">Price</p>
                <p className="text-3xl font-bold text-blue-600">${listing.price}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Created by</p>
                <p className="text-lg font-semibold text-gray-900">
                  {userData?.email || 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Posted on</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(listing.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            <div className="mt-8">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}