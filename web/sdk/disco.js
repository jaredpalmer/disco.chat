/** @jsx h */
import { h, Component, render } from 'preact';

const css = `
#disco-container,
#disco-container div,
#disco-container button,
#disco-container svg {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  font-size-adjust: none !important;
  font-size: 100% !important;
  font-style: normal !important;
  letter-spacing: normal !important;
  font-stretch: normal !important;
  font-variant: normal !important;
  font-weight: 400 !important;
  font: normal normal 100% -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  text-align: left !important;
  text-align-last: auto !important;
  text-decoration: none !important;
  -webkit-text-emphasis: none !important;
  text-emphasis: none !important;
  text-height: auto !important;
  text-indent: 0 !important;
  text-justify: auto !important;
  text-outline: none !important;
  text-shadow: none !important;
  text-transform: none !important;
  text-wrap: normal !important;
  alignment-adjust: auto !important;
  alignment-baseline: baseline !important;
  -webkit-animation: none 0 ease 0 1 normal !important;
  animation: none 0 ease 0 1 normal !important;
  -webkit-animation-play-state: running !important;
  animation-play-state: running !important;
  -webkit-appearance: normal !important;
  -moz-appearance: normal !important;
  appearance: normal !important;
  azimuth: center !important;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  background: none 0 0 auto repeat scroll padding-box transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  baseline-shift: baseline !important;
  binding: none !important;
  bleed: 6pt !important;
  bookmark-label: content() !important;
  bookmark-level: none !important;
  bookmark-state: open !important;
  bookmark-target: none !important;
  border: 0 none transparent !important;
  border-radius: 0 !important;
  bottom: auto !important;
  box-align: stretch !important;
  -webkit-box-decoration-break: slice !important;
  box-decoration-break: slice !important;
  box-direction: normal !important;
  box-flex: 0.0 !important;
  box-flex-group: 1 !important;
  box-lines: single !important;
  box-ordinal-group: 1 !important;
  box-orient: inline-axis !important;
  box-pack: start !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-box-sizing: content-box !important;
  box-sizing: content-box !important;
  -webkit-column-break-after: auto !important;
  break-after: auto !important;
  -webkit-column-break-before: auto !important;
  break-before: auto !important;
  -webkit-column-break-inside: auto !important;
  break-inside: auto !important;
  caption-side: top !important;
  clear: none !important;
  clip: auto !important;
  color: inherit !important;
  color-profile: auto !important;
  -webkit-column-count: auto !important;
  column-count: auto !important;
  -webkit-column-fill: balance !important;
  column-fill: balance !important;
  -webkit-column-gap: normal !important;
  column-gap: normal !important;
  -webkit-column-rule: medium medium #1f1f1f !important;
  column-rule: medium medium #1f1f1f !important;
  -webkit-column-span: 1 !important;
  column-span: 1 !important;
  -webkit-column-width: auto !important;
  column-width: auto !important;
  -webkit-columns: auto auto !important;
  columns: auto auto !important;
  content: normal !important;
  counter-increment: none !important;
  counter-reset: none !important;
  crop: auto !important;
  cursor: auto !important;
  direction: ltr !important;
  display: inline !important;
  dominant-baseline: auto !important;
  drop-initial-after-adjust: text-after-edge !important;
  drop-initial-after-align: baseline !important;
  drop-initial-before-adjust: text-before-edge !important;
  drop-initial-before-align: caps-height !important;
  drop-initial-size: auto !important;
  drop-initial-value: initial !important;
  elevation: level !important;
  empty-cells: show !important;
  fit: fill !important;
  fit-position: 0 0 !important;
  float: none !important;
  float-offset: 0 0 !important;
  grid-columns: none !important;
  grid-rows: none !important;
  hanging-punctuation: none !important;
  height: auto !important;
  hyphenate-after: auto !important;
  hyphenate-before: auto !important;
  hyphenate-character: auto !important;
  hyphenate-lines: no-limit !important;
  hyphenate-resource: none !important;
  -webkit-hyphens: manual !important;
  -ms-hyphens: manual !important;
  hyphens: manual !important;
  icon: auto !important;
  image-orientation: auto !important;
  image-rendering: auto !important;
  image-resolution: normal !important;
  inline-box-align: last !important;
  left: auto !important;
  line-height: inherit !important;
  line-stacking: inline-line-height exclude-ruby consider-shifts !important;
  list-style: disc outside none !important;
  margin: 0 !important;
  marks: none !important;
  marquee-direction: forward !important;
  marquee-loop: 1 !important;
  marquee-play-count: 1 !important;
  marquee-speed: normal !important;
  marquee-style: scroll !important;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  move-to: normal !important;
  nav-down: auto !important;
  nav-index: auto !important;
  nav-left: auto !important;
  nav-right: auto !important;
  nav-up: auto !important;
  opacity: 1 !important;
  orphans: 2 !important;
  outline: medium none invert !important;
  outline-offset: 0 !important;
  overflow: visible !important;
  overflow-style: auto !important;
  padding: 0 !important;
  page: auto !important;
  page-break-after: auto !important;
  page-break-before: auto !important;
  page-break-inside: auto !important;
  page-policy: start !important;
  -webkit-perspective: none !important;
  perspective: none !important;
  -webkit-perspective-origin: 50% 50% !important;
  perspective-origin: 50% 50% !important;
  pointer-events: auto !important;
  position: static !important;
  presentation-level: 0 !important;
  punctuation-trim: none !important;
  quotes: none !important;
  rendering-intent: auto !important;
  resize: none !important;
  right: auto !important;
  rotation: 0 !important;
  rotation-point: 50% 50% !important;
  ruby-align: auto !important;
  ruby-overhang: none !important;
  ruby-position: before !important;
  ruby-span: none !important;
  size: auto !important;
  string-set: none !important;
  table-layout: auto !important;
  top: auto !important;
  -webkit-transform: none !important;
  transform: none !important;
  -webkit-transform-origin: 50% 50% 0 !important;
  transform-origin: 50% 50% 0 !important;
  -webkit-transform-style: flat !important;
  transform-style: flat !important;
  -webkit-transition: all 0 ease 0 !important;
  transition: all 0 ease 0 !important;
  unicode-bidi: normal !important;
  vertical-align: baseline !important;
  white-space: normal !important;
  white-space-collapse: collapse !important;
  widows: 2 !important;
  width: auto !important;
  word-break: normal !important;
  word-spacing: normal !important;
  word-wrap: normal !important;
  z-index: auto !important;
  text-align: start !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(enabled=false)" !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

#disco-container svg {
  vertical-align: middle !important;
}

#disco-container div {
  display: block !important;
  box-sizing: border-box !important;
}

#disco-container .disco-wrapper {
  position: static !important;
  bottom: 0px !important;
  right: 0px !important;
  top: 0px !important;
  left: 0px !important; 
  height: 0px;
  width: 0px;
  z-index: 2147483647 !important;
}

#disco-container .disco-reader {
  position: fixed !important;
  bottom: 18px !important;
  font-weight: bold !important;
  right: 72px !important;
  outline: 0px !important;
  z-index: 2147483647 !important;
  font-size: 14px !important;
  background: rgb(255, 255, 255) !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 15px !important;
  border-radius: 4px !important;
  text-align: center !important;
  padding: 12px !important;
  cursor: pointer !important;
  display: block !important;
}

#disco-container .disco-reader.disco-reader--open {
  display: none !important;
}

#disco-container .disco-button {
  position: fixed !important;
  cursor: pointer;
  display: block !important;
  bottom: 12px !important;
  right: 12px !important;
  text-align: center !important;
  outline: none !important;
  background-color: rgb(123, 22, 255) !important;
  background-image: radial-gradient(at left top, rgb(123, 22, 255) 0%, rgb(68, 0, 204) 100%) !important;
  border-radius: 28px !important;
  height: 56px !important;
  width: 56px !important;
  border: none !important;
  cursor: pointer !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 15px !important;
  z-index: 2147483647 !important;
}

#disco-container .disco-button.disco-button--mobile {
  display: none !important;
}
`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet) {
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

class DiscoLauncher extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDesktop: false,
      isConnected: false,
    };
    this.frame = null;
    if (typeof window !== 'object') {
      return;
    }
    this.mediaQueryList = window.matchMedia('(min-width: 500px)');
    this.mediaQueryList.addListener(this.updateMatches);
  }

  componentDidMount() {
    this.updateMatches();
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
      if (this.frame !== null) {
        this.frame.contentWindow.postMessage(
          {
            key: this.props.apiKey,
            room: window.location.href,
            username: window.localStorage.getItem('disco'),
          },

          this.props.src
        );
      }
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
      transition: 'all .2s ease-out',
      position: 'fixed',
      transform: this.state.isOpen
        ? 'translate3d(0,0,0)'
        : 'translate3d(0, calc(100% + 80px) ,0)',
      right: 0,
      top: 0,
      left: 0,
      bottom: 0,
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
      <div id="disco-container">
        <div
          className="disco-wrapper"
          style={{
            height: isDesktop ? (isOpen ? 500 : 0) : isOpen ? '100%' : 0,
            width: isDesktop ? (isOpen ? 370 : 0) : isOpen ? '100%' : 0,
          }}
        >
          <button
            type="button"
            className={
              isOpen ? 'disco-reader disco-reader--open' : 'disco-reader'
            }
            onClick={this.handleClick}
          >
            Chat with other readers...
          </button>
          <button
            type="button"
            className={`disco-button ${
              !isDesktop && isOpen ? 'disco-button--mobile' : ''
            }`}
            onClick={this.handleClick}
          >
            {isOpen ? (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                style={{ verticalAlign: 'middle' }}
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#eee"
                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                />
              </svg>
            ) : (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
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
            )}
          </button>

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
