import { createFileRoute } from '@tanstack/react-router'
import { useProblem } from '@/client/problem/getProblem';

export const Route = createFileRoute('/problems/$day')({
  component: RouteComponent,
})

function RouteComponent() {
  const { day } = Route.useParams();
  const problemQuery = useProblem(day)

  if (problemQuery.isLoading) {
    return <div>Loading...</div>
  }

  return <div>Hello "/problems/$day"!</div>
}
