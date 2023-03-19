function start() {
  class Bookmark extends React.Component {
    constructor(props) {
      super(props);
      console.log('Bookmark component created');
    }
    // static defaultProps = { description: 'Unknown' };
    static propTypes = { description: PropTypes.string };
    title = this.props.title;
    titleStyle = { color: 'red' };
    render() {
      return (
        <li>
          <h2 style={this.titleStyle}>{this.title}</h2>
          <a href={this.props.href}>{this.props.description}</a>
          <button
            onClick={() => {
              this.title = this.title + '-CHANGED';
              this.setState({});
            }}
          >
            Click Me
          </button>
        </li>
      );
    }
  }
  ReactDOM.render(
    <div>
      <h1>Bookmarks</h1>
      <ul>
        <Bookmark
          title={'Etherient'}
          href={'http://'}
          description={'The home bla bla'}
        />
        <Bookmark
          title={'Frank'}
          href={'http://abc.com'}
          description={'The home bldsfkjlajflkashfla'}
        />
      </ul>
    </div>,
    document.getElementById('mainContainer')
  );
}
