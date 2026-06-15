import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Osteopatia from './pages/Osteopatia'
import AlinhamentoAtivo from './pages/AlinhamentoAtivo'
import Agendamentos from './pages/Agendamentos'

const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'osteopatia', element: <Osteopatia /> },
      { path: 'alinhamento-ativo', element: <AlinhamentoAtivo /> },
      { path: 'agendamentos', element: <Agendamentos /> },
    ],
  },
]

export default routes
