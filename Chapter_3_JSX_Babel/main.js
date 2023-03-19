function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function start() {
  class Bookmark extends React.Component {
    constructor(props) {
      super(props);
      _defineProperty(this, "title", this.props.title);
      _defineProperty(this, "titleStyle", {
        color: 'red'
      });
      console.log('Bookmark component created');
    }
    // static defaultProps = { description: 'Unknown' };

    render() {
      return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h2", {
        style: this.titleStyle
      }, this.title), /*#__PURE__*/React.createElement("a", {
        href: this.props.href
      }, this.props.description), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          this.title = this.title + '-CHANGED';
          this.setState({});
        }
      }, "Click Me"));
    }
  }
  _defineProperty(Bookmark, "propTypes", {
    description: PropTypes.string
  });
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Bookmarks"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement(Bookmark, {
    title: 'Etherient',
    href: 'http://',
    description: 'The home bla bla'
  }), /*#__PURE__*/React.createElement(Bookmark, {
    title: 'Frank',
    href: 'http://abc.com',
    description: 'The home bldsfkjlajflkashfla'
  }))), document.getElementById('mainContainer'));
}
