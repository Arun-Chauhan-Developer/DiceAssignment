import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap'

function App() {
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useState('')
  const [selectedSort, setSelectedSort] = useState('stargazers_count')
  const [isLoading, setIsLoading] = useState(false)

  const optionsForSort = [
    {
      name: 'Please Select a field for Sort', value: ''
    },
    {
      name: 'Name', value: 'name'
    },
    {
      name: 'Score', value: 'score'
    },
    {
      name: 'Watchers Count', value: 'watchers_count'
    },
    {
      name: 'Stars', value: 'stargazers_count'
    },
    {
      name: 'Created At', value: 'created_at'
    },
    {
      name: 'Updated At', value: 'updated_at'
    },
  ]

  const fetchRepoInfo = async(searchParams) => {
    setIsLoading(true)
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchParams}`).then((res) => {
      setIsLoading(false)
      return res.json()
    })
    setData([...response.items])
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form>
        <Form.Control placeholder='Search a repo' onChange={(e) => setSearchParams(e.target.value)}/>
        <Button className='btn-sm ml-3 btn-style cursor-pointer' onClick={() => fetchRepoInfo(searchParams)} disabled={!searchParams}>Search</Button>
        <Form.Control as='select' className='select ml-3 cursor-pointer' onChange={(e) => setSelectedSort(e.target.value)} disabled={data.length === 0}>
          {optionsForSort.map((each) => <option value={each.value} key={each.value}>{each.name}</option>)}
        </Form.Control>
        </Form>
      </header>
      {data.length === 0 && !isLoading && 
        <>
        <div className='text-style'>Welcome to my react app</div>
        <h4>Please type a repo name in the search box</h4>
        <br />
        <Image src={logo} className="App-logo" alt="logo" />
        </>
      }
      {isLoading ? 
        <Image className='img-style' src='https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif' />:
        <div className='wrapper'>
        {data.sort((a, b) => (a[selectedSort] > b[selectedSort] ? -1 : 1)).map((each) => 
        <Card key={each.id}>
          <Card.Img src={each.owner.avatar_url} />
          <Card.Body>
            <Card.Title>Repo Name: {each.name}</Card.Title>
            <Card.Text>Stars: {each.stargazers_count}</Card.Text>
            <Card.Text>Description: {each.description}</Card.Text>
            <Card.Text>Language: {each.language}</Card.Text>
          </Card.Body>
        </Card>)}
        </div>}
      </div>
  );
}

export default App;
