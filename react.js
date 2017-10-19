import React, {Component} from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

  const Coder = ({user}) =>
    <span title={user.login} id={user.login}>
      <img style={{width: '100px', height: '100px'}} src={user.avatar_url} />
    </span>;

  class CodersList extends Component {
      constructor(props) {
          super(props);
          this.state = {
              users: [],
          };
      }
      fetchData(url) {
          this.setState({ isLoading: true });
          fetch(url)
              .then((response) => {
                  if (!response.ok) {
                      throw Error(response.statusText);
                  }
                  this.setState({ isLoading: false });
                  return response;
              })
              .then((response) => response.json())
              .then((users) => this.setState({ users }))
              .catch(() => this.setState({ hasErrored: true }));
      }
      componentDidMount() {
          this.fetchData('https://api.github.com/search/users?q=location:Wroclaw+location:Wrocław?&per_page=80');
      }
      render() {
        return (
            <div>
                {this.state.users.items && this.state.users.items.map((user) => <Coder key={user.id} user={user} />)}
            </div>
        );
      }
  }
  class App extends React.Component {
    render() {
      return <CodersList />;
    }
  }
  ReactDOM.render(
      <App />,
      document.getElementById('app')
  );

});
