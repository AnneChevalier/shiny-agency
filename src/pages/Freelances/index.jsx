import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  text-align: center;
  padding-bottom: 30px;
`
// dans la correction il y a deux lignes color... Je pense que l'on devrait enlever la première...
const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  )
  // Ici le "?" permet de s'assurer que data existe bien.
  const freelancersList = data?.freelancersList
  //const [freelancersList, setFreelancersList] = useState([])
  //const [isDataLoading, setDataLoading] = useState(false)
  //const [error, setError] = useState(null)

  //async function fetchData() {
  //  setDataLoading(true)
  //  try {
  //    const response = await fetch(`http://localhost:8000/freelances`)
  //    const { freelancersList } = await response.json()
  //    setFreelancersList(freelancersList)
  //  } catch (error) {
  //    console.log('===== error =====', error)
  //    setError(true)
  //  } finally {
  //    setDataLoading(false)
  //  }
  //}

  //useEffect(() => {
  //  fetchData()
  //}, [])

  if (error) {
    return <span>Oups il y a une erreur</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>

      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job} //profile.jobTitle dans les exos précédents
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
