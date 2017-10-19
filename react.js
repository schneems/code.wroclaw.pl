import React, {Component} from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

  const Coder = ({coder}) =>
    <span title={coder.login} id={coder.login}>
      <img style={{width: '100px', height: '100px'}} src={coder.avatar_url} />
    </span>;

  class CodersList extends Component {
      constructor(props) {
          super(props);
          this.state = {
              coders: [],
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
              .then((coders) => this.setState({ coders }))
              .catch(() => this.setState({ hasErrored: true }));
      }
      componentDidMount() {
          this.fetchData('https://api.github.com/search/users?q=location:Wroclaw+location:Wrocław?&per_page=80');
      }
      render() {
        return (
            <div>
                {this.state.coders.items && this.state.coders.items.map((coder) => <Coder key={coder.id} coder={coder} />)}
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
