import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-full sm:w-[180px]" />
              <Skeleton className="h-10 w-full sm:w-[180px]" />
            </div>

            <div className="rounded-md border">
              <div className="p-4">
                <div className="flex items-center space-x-4 py-4">
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/12" />
                  <Skeleton className="h-6 w-1/12" />
                  <Skeleton className="h-6 w-1/12" />
                  <Skeleton className="h-6 w-1/12" />
                  <Skeleton className="h-6 w-10" />
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-4">
                    <Skeleton className="h-5 w-1/6" />
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-5 w-1/12" />
                    <Skeleton className="h-5 w-1/12" />
                    <Skeleton className="h-5 w-1/12" />
                    <Skeleton className="h-5 w-1/12" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
