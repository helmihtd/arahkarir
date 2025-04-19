import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="rounded-md border">
            <div className="p-4">
              <div className="flex items-center border-b pb-4">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6 ml-4" />
                <Skeleton className="h-4 w-1/6 ml-4" />
                <Skeleton className="h-4 w-1/6 ml-4" />
                <Skeleton className="h-4 w-1/6 ml-4" />
                <Skeleton className="h-4 w-1/6 ml-4" />
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center py-4 border-b last:border-0">
                  <Skeleton className="h-4 w-1/6" />
                  <Skeleton className="h-4 w-1/6 ml-4" />
                  <Skeleton className="h-4 w-1/6 ml-4" />
                  <Skeleton className="h-4 w-1/6 ml-4" />
                  <Skeleton className="h-4 w-1/6 ml-4" />
                  <Skeleton className="h-4 w-1/6 ml-4" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    </div>
  )
}
