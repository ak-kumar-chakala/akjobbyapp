import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'
import JobCardDetails from './Components/JobCardDetails'
import LoginForm from './Components/LoginForm'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound'

import Home from './Components/Home'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
      exact
      path="/jobs"
      component={Jobs}
    />
    <ProtectedRoute exact path="/jobs/:id" component={JobCardDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
