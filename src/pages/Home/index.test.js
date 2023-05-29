import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Home from './'
import { ThemeProvider } from '../../utils/context'

describe('The Home component', () => {
  it('should render without crash', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )
  })
  it('should render title', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )
    expect(
      screen.getByText(
        'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents'
      )
    ).toBeTruthy()
    // correction mais l'autre marche aussi
    //expect(
    //  screen.getByRole('heading', {
    //    level: 2,
    //    text:
    //      'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents',
    //  })
    //).toBeTruthy()
  })
})
