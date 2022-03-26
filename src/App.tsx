import logo from './logo.svg';
import {Helmet} from 'react-helmet';
import './App.css';
import {DropdownMenu} from './components';

const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Crypto</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <main className="App-header">
        <ul className="divide-y divide-gray-200">
          {people.map(person => (
            <li
              key={person.email}
              className="py-4 my-3 flex bg-sky-400 rounded-lg">
              <img
                className="h-10 w-10 ml-3 rounded-full"
                src={person.image}
                alt=""
              />
              <div className="mx-3">
                <p className="text-sm font-medium text-gray-900">
                  {person.name}
                </p>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-blue-400">Hello blue 700</div>

        <DropdownMenu />

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </main>
    </div>
  );
}

export default App;
