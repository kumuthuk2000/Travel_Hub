export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="h-fit w-full max-w-md bg-white rounded-lg shadow-lg my-10">
        {children}
      </div>
    </div>
  )
}
