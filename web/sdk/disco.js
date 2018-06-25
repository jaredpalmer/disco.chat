/** @jsx h */
import { h, Component, render } from 'preact';

const css = `
#disco-container a,
#disco-container abbr,
#disco-container acronym,
#disco-container address,
#disco-container applet,
#disco-container article,
#disco-container aside,
#disco-container audio,
#disco-container b,
#disco-container big,
#disco-container blockquote,
#disco-container button,
#disco-container canvas,
#disco-container caption,
#disco-container center,
#disco-container cite,
#disco-container code,
#disco-container dd,
#disco-container del,
#disco-container details,
#disco-container dfn,
#disco-container div,
#disco-container div.form,
#disco-container dl,
#disco-container dt,
#disco-container em,
#disco-container fieldset,
#disco-container figcaption,
#disco-container figure,
#disco-container footer,
#disco-container form,
#disco-container h1,
#disco-container h2,
#disco-container h3,
#disco-container h4,
#disco-container h5,
#disco-container h6,
#disco-container header,
#disco-container hgroup,
#disco-container i,
#disco-container iframe,
#disco-container img,
#disco-container input,
#disco-container input[type],
#disco-container ins,
#disco-container kbd,
#disco-container label,
#disco-container legend,
#disco-container li,
#disco-container mark,
#disco-container menu,
#disco-container nav,
#disco-container object,
#disco-container ol,
#disco-container p,
#disco-container pre,
#disco-container q,
#disco-container s,
#disco-container samp,
#disco-container section,
#disco-container small,
#disco-container span,
#disco-container strike,
#disco-container strong,
#disco-container sub,
#disco-container summary,
#disco-container sup,
#disco-container table,
#disco-container tbody,
#disco-container td,
#disco-container textarea,
#disco-container tfoot,
#disco-container th,
#disco-container thead,
#disco-container time,
#disco-container tr,
#disco-container tt,
#disco-container u,
#disco-container ul,
#disco-container var,
#disco-container video {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size-adjust: none;
  font-size: 100%;
  font-style: normal;
  letter-spacing: normal;
  font-stretch: normal;
  font-variant: normal;
  font-weight: 400;
  font: normal normal 100% -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: left;
  text-align-last: auto;
  text-decoration: none;
  -webkit-text-emphasis: none;
  text-emphasis: none;
  text-height: auto;
  text-indent: 0;
  text-justify: auto;
  text-outline: none;
  text-shadow: none;
  text-transform: none;
  text-wrap: normal;
  alignment-adjust: auto;
  alignment-baseline: baseline;
  -webkit-animation: none 0 ease 0 1 normal;
  animation: none 0 ease 0 1 normal;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  -webkit-appearance: normal;
  -moz-appearance: normal;
  appearance: normal;
  azimuth: center;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  background: none 0 0 auto repeat scroll padding-box transparent;
  background-color: transparent;
  background-image: none;
  baseline-shift: baseline;
  binding: none;
  bleed: 6pt;
  bookmark-label: content();
  bookmark-level: none;
  bookmark-state: open;
  bookmark-target: none;
  border: 0 none transparent;
  border-radius: 0;
  bottom: auto;
  box-align: stretch;
  -webkit-box-decoration-break: slice;
  box-decoration-break: slice;
  box-direction: normal;
  box-flex: 0.0;
  box-flex-group: 1;
  box-lines: single;
  box-ordinal-group: 1;
  box-orient: inline-axis;
  box-pack: start;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-column-break-after: auto;
  break-after: auto;
  -webkit-column-break-before: auto;
  break-before: auto;
  -webkit-column-break-inside: auto;
  break-inside: auto;
  caption-side: top;
  clear: none;
  clip: auto;
  color: inherit;
  color-profile: auto;
  -webkit-column-count: auto;
  column-count: auto;
  -webkit-column-fill: balance;
  column-fill: balance;
  -webkit-column-gap: normal;
  column-gap: normal;
  -webkit-column-rule: medium medium #1f1f1f;
  column-rule: medium medium #1f1f1f;
  -webkit-column-span: 1;
  column-span: 1;
  -webkit-column-width: auto;
  column-width: auto;
  -webkit-columns: auto auto;
  columns: auto auto;
  content: normal;
  counter-increment: none;
  counter-reset: none;
  crop: auto;
  cursor: auto;
  direction: ltr;
  display: inline;
  dominant-baseline: auto;
  drop-initial-after-adjust: text-after-edge;
  drop-initial-after-align: baseline;
  drop-initial-before-adjust: text-before-edge;
  drop-initial-before-align: caps-height;
  drop-initial-size: auto;
  drop-initial-value: initial;
  elevation: level;
  empty-cells: show;
  fit: fill;
  fit-position: 0 0;
  float: none;
  float-offset: 0 0;
  grid-columns: none;
  grid-rows: none;
  hanging-punctuation: none;
  height: auto;
  hyphenate-after: auto;
  hyphenate-before: auto;
  hyphenate-character: auto;
  hyphenate-lines: no-limit;
  hyphenate-resource: none;
  -webkit-hyphens: manual;
  -ms-hyphens: manual;
  hyphens: manual;
  icon: auto;
  image-orientation: auto;
  image-rendering: auto;
  image-resolution: normal;
  inline-box-align: last;
  left: auto;
  line-height: inherit;
  line-stacking: inline-line-height exclude-ruby consider-shifts;
  list-style: disc outside none;
  margin: 0;
  marks: none;
  marquee-direction: forward;
  marquee-loop: 1;
  marquee-play-count: 1;
  marquee-speed: normal;
  marquee-style: scroll;
  max-height: none;
  max-width: none;
  min-height: 0;
  min-width: 0;
  move-to: normal;
  nav-down: auto;
  nav-index: auto;
  nav-left: auto;
  nav-right: auto;
  nav-up: auto;
  opacity: 1;
  orphans: 2;
  outline: medium none invert;
  outline-offset: 0;
  overflow: visible;
  overflow-style: auto;
  padding: 0;
  page: auto;
  page-break-after: auto;
  page-break-before: auto;
  page-break-inside: auto;
  page-policy: start;
  -webkit-perspective: none;
  perspective: none;
  -webkit-perspective-origin: 50% 50%;
  perspective-origin: 50% 50%;
  pointer-events: auto;
  position: static;
  presentation-level: 0;
  punctuation-trim: none;
  quotes: none;
  rendering-intent: auto;
  resize: none;
  right: auto;
  rotation: 0;
  rotation-point: 50% 50%;
  ruby-align: auto;
  ruby-overhang: none;
  ruby-position: before;
  ruby-span: none;
  size: auto;
  string-set: none;
  table-layout: auto;
  top: auto;
  -webkit-transform: none;
  transform: none;
  -webkit-transform-origin: 50% 50% 0;
  transform-origin: 50% 50% 0;
  -webkit-transform-style: flat;
  transform-style: flat;
  -webkit-transition: all 0 ease 0;
  transition: all 0 ease 0;
  unicode-bidi: normal;
  vertical-align: baseline;
  white-space: normal;
  white-space-collapse: collapse;
  widows: 2;
  width: auto;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  z-index: auto;
  text-align: start;
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(enabled=false)";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
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
    this.updateMatches();
  }

  componentDidMount() {
    window.addEventListener(
      'message',
      e => {
        if (e.origin === this.props.src) {
          console.log('preact', e);
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
      <div id="disco-container" style={{ display: 'block' }}>
        <div
          style={{
            position: 'static',
            bottom: 0,
            right: 0,
            top: 0,
            left: 0,
            height: isDesktop ? (isOpen ? 500 : 0) : isOpen ? '100%' : 0,
            width: isDesktop ? (isOpen ? 370 : 0) : isOpen ? '100%' : 0,
            height: 570,
            width: 370,
            zIndex: 2147483647,
          }}
        >
          <button
            type="button"
            style={{
              position: 'fixed',
              bottom: 18,
              fontWeight: 'bold',
              right: 72,
              outline: '0',
              display: isDesktop
                ? isOpen
                  ? 'none'
                  : 'block'
                : isOpen
                  ? 'none'
                  : 'block',
              zIndex: 2147483647,
              fontSize: 14,
              background: '#fff',
              boxShadow: '0 8px 15px rgba(0,0,0,.2)',
              borderRadius: 4,
              textAlign: 'center',
              padding: 12,
            }}
            onClick={this.handleClick}
          >
            Chat with other readers...
          </button>
          <button
            type="button"
            onClick={this.handleClick}
            style={{
              position: 'fixed',
              display: isDesktop ? 'block' : isOpen ? 'none' : 'block',
              bottom: 12,
              right: 12,
              textAlign: 'center',
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
