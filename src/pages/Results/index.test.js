import Results, { formatJobList, formatQueryParams } from './'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/test'

//test('Correction test', () => {
//  const expectedState = 'item2,'
//  expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
//})

//test('Mon test formatJobList', () => {
//  const result = formatJobList('item2', 3, 1)
//  expect(result).toEqual('item2,')
//})

describe('La fonction formatJobList', () => {
  test('ajoute une virgule à un item', () => {
    const result = formatJobList('item2', 3, 1)
    expect(result).toEqual('item2,')
  })
  test('ne met pas de virgule pour le dernier élément', () => {
    const result = formatJobList('item3', 3, 2)
    expect(result).toEqual('item3')
  })
})

describe('La fonction formatQueryParams', () => {
  test('formate les réponses', () => {
    const result = formatQueryParams({ 1: 'answer1' })
    expect(result).toEqual('a1=answer1')
  })
  test('ajoute & entre les réponses', () => {
    const result = formatQueryParams({ 1: 'answer1', 2: 'answer2' })
    expect(result).toEqual('a1=answer1&a2=answer2')
  })
})

const resultsMockedData = [
  {
    title: 'seo',
    description: `Le SEO est en charge du référencement web d'une page`,
  },
  {
    title: 'frontend',
    description: `Le développeur ou la développeuse frontend se charge de l'interface : interactions avec l'utilisateur, style, etc.`,
  },
]

const server = setupServer(
  rest.get('http://localhost:8000/results', (req, res, ctx) => {
    return res(ctx.json({ resultsData: resultsMockedData }))
  })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('The Results component', () => {
  test('should display the results after the data is loaded', async () => {
    render(<Results />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
    const jobTitleElements = screen.getAllByTestId('job-title')
    expect(jobTitleElements[0].textContent).toBe('seo')
    expect(jobTitleElements.length).toBe(2)
    const jobDescriptionElements = screen.getAllByTestId('job-description')
    expect(jobDescriptionElements[1].textContent).toBe(
      resultsMockedData[1].description
    )
    expect(jobDescriptionElements.length).toBe(2)
  })
})
