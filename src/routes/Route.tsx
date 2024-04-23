import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import paths from './paths'

import Page from 'components/Page/Page'
import PageLoading from 'components/PageLoading/PageLoading'

const Home = lazy(() => import('@/pages/Home/Home.tsx'))
const PickOne = lazy(() => import('pages/PickOne/PickOne.tsx'))
const PickPairs = lazy(() => import('pages/PickPairs/PickPairs.tsx'))
const PickTeams = lazy(() => import('@/pages/PickTeams/PickTeams.tsx'))
const TwoLists = lazy(() => import('@/pages/TwoLists/TwoLists.tsx'))
const PageNotFound = lazy(() => import('pages/PageNotFound'))

interface Routes {
   path: string
   element: React.ReactNode
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
   <Suspense fallback={<PageLoading />}>
      <Page>
         <Component />
      </Page>
   </Suspense>
)

const routes: Routes[] = [
   { path: paths.HOME, element: getRouteElement(Home) },
   { path: paths.PICK_ONE, element: getRouteElement(PickOne) },
   { path: paths.PICK_PAIRS, element: getRouteElement(PickPairs) },
   { path: paths.PICK_TEAMS, element: getRouteElement(PickTeams) },
   { path: paths.TWO_LISTS, element: getRouteElement(TwoLists) },
   { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
]

export default createBrowserRouter(routes)
