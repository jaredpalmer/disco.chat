/** @jsx h */
import { h, Component, render } from 'preact';

class DiscoLauncher extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDesktop: false,
      isConnected: false,
    };
    this.frame = null;
  }

  componentWillMount() {
    if (typeof window !== 'object') {
      return;
    }
    this.mediaQueryList = window.matchMedia('(min-width: 500px)');
    this.mediaQueryList.addListener(this.updateMatches);
    this.updateMatches();
  }

  componentDidMount() {
    // const frame = document.getElementById('disco-frame');
    window.addEventListener(
      'message',
      e => {
        if (e.origin === this.props.src) {
          if (e.data.code) {
            if (e.data.code === 1) {
              this.setState({ isConnected: true });
            }
            if (e.data.code === -1) {
              this.setState({ isConnected: false });
              console.error(
                'Invalid Disco configuration. Please check that your API key is correct and your account is in good standing.'
              );
            }
          }
          if (e.data.cmd === 'CLOSE') {
            this.setState({ isOpen: false });
          }
          if (e.data.cmd === 'LOGIN') {
            window.localStorage.setItem('disco', e.data.username);
          }
        }
      },
      false
    );
    setTimeout(() => {
      this.frame.contentWindow.postMessage(
        {
          key: this.props.apiKey,
          room: window.location.href,
          username: window.localStorage.getItem('disco'),
        },

        this.props.src
      );
    }, 1000);
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  updateMatches = () => {
    this.setState({ isDesktop: this.mediaQueryList.matches });
  };

  handleClick = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  getFrameStyle = () => {
    const mobile = {
      display: 'block',
      transition: 'all .2s ease',
      position: 'fixed',
      transform: this.state.isOpen
        ? 'translate3d(0,0,0)'
        : 'translate3d(0, calc(100% + 80px) ,0)',
      right: 0,
      top: 0,
      left: 0,
      bottom: 0,
      willChange: 'transform, borderRadisu, right, bottom',
      borderRadius: 0,
      zIndex: 1200,
      background: '#fff',
      boxShadow: 'none',
      width: '100%',
      height: '100%',
    };
    if (this.state.isDesktop) {
      return {
        ...mobile,
        position: 'fixed',
        borderRadius: 12,
        width: 370,
        height: 500,
        right: 12,
        bottom: 80,
        top: 'auto',
        left: 'auto',
        boxShadow: '0 8px 15px rgba(0,0,0,.2)',
      };
    }
    return mobile;
  };

  render({ src }, { isOpen, isDesktop, isConnected }) {
    return (
      <div
        style={{
          position: 'static',
          bottom: 0,
          right: 0,
          top: 0,
          left: 0,
          display: isConnected ? 'block' : 'none',
          height: isDesktop ? (isOpen ? 500 : 0) : isOpen ? '100%' : 0,
          width: isDesktop ? (isOpen ? 370 : 0) : isOpen ? '100%' : 0,
          zIndex: 2147483647,
        }}
      >
        {isDesktop && (
          <button
            type="button"
            onClick={this.handleClick}
            style={{
              position: 'fixed',
              bottom: 12,
              right: 12,
              outline: '0',
              backgroundColor: '#7B16FF',
              backgroundImage:
                'radial-gradient(ellipse farthest-corner at top left,#7B16FF 0%,#4400CC 100%)',
              borderRadius: '28px',
              height: 56,
              width: 56,
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 15px rgba(0,0,0,.2)',
              zIndex: 2147483647,
            }}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 32 32"
              style={{
                verticalAlign: 'middle',
              }}
              width="24"
              height="24"
            >
              <g class="nc-icon-wrapper" fill="#fff">
                <path
                  data-color="color-2"
                  fill="#fff"
                  d="M31,9h-3v11c0,1.105-0.895,2-2,2H15.128l-4.580,4h9.124l6.739,4.813 c0.301,0.216,0.699,0.249,1.039,0.076C27.791,30.718,28,30.375,28,30v-4h3c0.552,0,1-0.448,1-1V10C32,9.448,31.552,9,31,9z"
                />
                <path
                  fill="#fff"
                  d="M25,1H1C0.447,1,0,1.447,0,2v17c0,0.553,0.447,1,1,1h4v6c0,0.393,0.229,0.748,0.587,0.91 c0.351,0.161,0.773,0.103,1.071-0.157L14.376,20H25c0.553,0,1-0.447,1-1V2C26,1.447,25.553,1,25,1z"
                />
              </g>
            </svg>
          </button>
        )}
        {!isDesktop &&
          !isOpen && (
            <button
              type="button"
              onClick={this.handleClick}
              style={{
                position: 'fixed',
                bottom: 12,
                right: 12,
                outline: '0',
                backgroundColor: '#7B16FF',
                backgroundImage:
                  'radial-gradient(ellipse farthest-corner at top left,#7B16FF 0%,#4400CC 100%)',
                borderRadius: '28px',
                height: 56,
                width: 56,
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 15px rgba(0,0,0,.2)',
                zIndex: 2147483647,
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                style={{
                  verticalAlign: 'middle',
                }}
                width="24"
                height="24"
              >
                <g class="nc-icon-wrapper" fill="#fff">
                  <path
                    data-color="color-2"
                    fill="#fff"
                    d="M31,9h-3v11c0,1.105-0.895,2-2,2H15.128l-4.580,4h9.124l6.739,4.813 c0.301,0.216,0.699,0.249,1.039,0.076C27.791,30.718,28,30.375,28,30v-4h3c0.552,0,1-0.448,1-1V10C32,9.448,31.552,9,31,9z"
                  />
                  <path
                    fill="#fff"
                    d="M25,1H1C0.447,1,0,1.447,0,2v17c0,0.553,0.447,1,1,1h4v6c0,0.393,0.229,0.748,0.587,0.91 c0.351,0.161,0.773,0.103,1.071-0.157L14.376,20H25c0.553,0,1-0.447,1-1V2C26,1.447,25.553,1,25,1z"
                  />
                </g>
              </svg>
            </button>
          )}
        <iframe
          id="disco-frame"
          ref={e => (this.frame = e)}
          style={this.getFrameStyle()}
          scrolling="no"
          title="disco"
          src={src}
          frameborder="0"
        />
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            height: 500,
            width: 500,
            background:
              'radial-gradient(ellipse at bottom right,rgba(29,39,54,.16) 0,rgba(29,39,54,0) 80%)',
            content: '',
            pointerEvents: 'none',
            willChange: 'opacity',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity .1s ease',
            zIndex: 0,
          }}
        />
      </div>
    );
  }
}

class Disco {
  constructor(props) {
    this.props = props;
    this.isOpen = false;
    this.src =
      process.env.NODE_ENV === 'production'
        ? 'https://talk.disco.chat'
        : 'http://localhost:3000';
  }

  init = config => {
    render(
      <DiscoLauncher apiKey={this.props.key} src={this.src} />,
      document.body
    );
  };
}

export default Disco;
