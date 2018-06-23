import * as React from 'react';
import * as io from 'socket.io-client';
import { Formik, Form, FormikActions } from 'formik';
import { Col, Row, Block } from 'emotion-jsxstyle';
// import * as qs from 'qs';
let socket = io.connect(process.env.REACT_APP_API_URL as string);
import Textarea from 'react-textarea-autosize';
import { Theme } from './Theme';
import { Instructions } from './components/Instructions';
import Linkify from 'react-linkify';

// const Formish = Formik as any;
export interface AppState {
  connected: boolean;
  forbidden: boolean;
  room?: string;
  numUsers: number;
  numViewers: number;
  tmpMessage?: string;
  user?: any;
  users: any;
  warning?: string;
  messages: any[];
  origin?: any;
  source?: any;
  error?: any;
}

const Origins = [
  process.env.NODE_ENV === 'development' && '',
  process.env.NODE_ENV === 'development' && 'http://localhost:5000',
  'https://www.shellypalmer.com',
  'https://disco.chat',
  'https://talk.disco.chat',
  'https://api.disco.chat',
].filter(Boolean);

class App extends React.Component<{}, AppState> {
  container: any;
  room: any;
  username: HTMLInputElement | null;

  state: AppState = {
    forbidden: false,
    connected: false,
    numUsers: 0,
    numViewers: 0,
    users: {},
    messages:
      process.env.NODE_ENV === 'development'
        ? [
            // seed some stuff when developing.
            {
              username: 'jared',
              content:
                ' hello https://github.com/tasti/react-linkify/blob/master/src/Linkify.jsx',
            },

            {
              username: 'jared',
              content:
                ' hello https://github.com/tasti/react-linkify/blob/master/src/Linkify.jsx',
            },
          ]
        : [],
  };

  componentDidMount() {
    window.addEventListener('message', this.receiver, false);

    socket.on('WARN', ({ text }: any) => {
      this.setState({ warning: text });
    });

    socket.on('view chat', ({ numUsers, numViewers }: any) => {
      this.setState({ numUsers, numViewers, connected: true });
    });

    socket.on('viewer joined', ({ numViewers }: any) => {
      this.setState({ numViewers });
    });

    socket.on('viewer left', ({ numViewers }: any) => {
      this.setState({ numViewers });
    });

    socket.on('login', ({ numUsers, username }: any) => {
      this.setState({ numUsers, user: username });

      if (this.state.source) {
        this.state.source.postMessage(
          { cmd: 'LOGIN', username },
          this.state.origin
        );
      }

      if (this.state.tmpMessage) {
        this.setState(
          s => ({
            ...s,
            messages: s.messages.concat({
              username: s.user,
              content: s.tmpMessage,
            }),
          }),
          this.scrollToBottom
        );
        socket.emit('new message', {
          content: this.state.tmpMessage.trim(),
          room: this.state.room,
        });
      }
    });

    socket.on('user left', ({ numUsers }: any) => {
      this.setState({ numUsers });
    });

    socket.on('user joined', ({ username, numUsers }: any) =>
      this.setState(state => ({
        ...state,
        numUsers: numUsers,
        users: {
          ...state.users,
          [username]: true,
        },
      }))
    );

    socket.on('new message', (data: any) => {
      this.setState(
        s => ({ ...s, messages: s.messages.concat(data) }),
        this.scrollToBottom
      );
    });
  }

  // Invoked immediately before a component is unmounted from the DOM.
  componentWillUnmount() {
    window.removeEventListener('message', this.receiver, false);
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // Not called for the initial render
  componentDidUpdate(prevProps: {}, prevState: any) {
    if (prevState.messages.length !== this.state.messages.length) {
      if (this.container) {
        if (
          this.container.scrollTop + this.container.clientHeight + 42 ===
          this.container.scrollHeight
        ) {
          this.scrollToBottom();
        }
      }
    }
  }

  receiver = (e: MessageEvent) => {
    if (
      process.env.NODE_ENV !== 'development' &&
      Origins.filter(o => o === e.origin).length === 0
    ) {
      this.setState({ forbidden: true });
      e.source.postMessage(
        { code: -1, message: 'invalid configuration' },
        e.origin
      );
    } else {
      this.setState({ room: e.data.room, origin: e.origin, source: e.source });
      e.source.postMessage({ code: 1, message: 'connected' }, e.origin);
      socket.emit('add viewer', { room: e.data.room });
      if (e.data.username) {
        socket.emit('add user', {
          username: e.data.username,
          room: e.data.room,
        });
      }
    }
  };

  scrollToBottom = () => {
    this.container.scrollTop = this.container.scrollHeight;
  };

  handleSubmit = (
    values: { text: string; username: string },
    { setStatus, setSubmitting, resetForm }: FormikActions<{ text: string }>
  ) => {
    if (values.text.trim() !== '') {
      if (this.state.user) {
        socket.emit('new message', {
          content: values.text.trim(),
          room: this.state.room,
        });

        this.setState(
          s => ({
            ...s,
            messages: s.messages.concat({
              username: s.user,
              content: values.text,
            }),
          }),
          this.scrollToBottom
        );
        resetForm({ text: '' });
      } else {
        if (
          !this.state.user &&
          values.text.trim() !== '' &&
          values.username.trim() !== ''
        ) {
          this.setState({ tmpMessage: values.text }, () => {
            socket.emit('add user', {
              username: values.username,
              room: this.state.room,
            });
          });
          resetForm({ text: '' });
        } else {
          console.log(values);
          setStatus('no username');
          setSubmitting(false);
        }
      }
    }
  };

  handleLogin = (values: { username: string }) => {
    this.setState({ user: values.username });
    socket.emit('add user', {
      username: values.username,
      room: this.state.room,
    });
  };

  handleClose = () => {
    if (this.state.source) {
      this.state.source.postMessage({ cmd: 'CLOSE' }, this.state.origin);
    }
  };

  render() {
    if (this.state.forbidden) {
      return 'not allowed hssere';
    }

    if (!this.state.connected) {
      return 'connecting...';
    }
    return (
      <Col
        props={{ id: 'chat' }}
        fontFamily={Theme.sans}
        height="100%"
        width="100%"
        backgroundColor="#fff"
        css={{
          '@media only screen and (min-width: 500px)': {
            borderRadius: 12,
          },
        }}
      >
        <Row
          height={50}
          width="100%"
          backgroundColor="#16171A"
          borderBottom="1px solid #eee"
          paddingLeft="1rem"
          css={{
            '@media only screen and (min-width: 500px)': {
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            },
          }}
          paddingRight=".5rem"
          alignItems="center"
          justifyContent="space-between"
          fontWeight="bold"
        >
          <Block color="#fff" WebkitFontSmoothing="anti-aliased">
            Shelly's Chat (Beta)
            <Block fontSize="8px" color="#ddd" margin=".25rem auto">
              powered by Disco.chat
            </Block>
          </Block>
          <Block
            component="button"
            height={36}
            cursor="pointer"
            props={{
              onClick: this.handleClose,
              'aria-label': 'Close',
              'aria-controls': 'chat',
            }}
          >
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
              <g className="nc-icon-wrapper" fill="#eee" aria-hidden="true">
                <path
                  fill="#eee"
                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                />
              </g>
            </svg>
          </Block>
        </Row>

        <Col
          flexBasis="1px"
          flexGrow="1"
          minHeight="0"
          minWidth="0"
          overflowX="scroll"
          className="scrolls"
          paddingBottom="1rem"
          margin="0 auto"
          width="100%"
          pointerEvents="auto"
          transform="translateZ(0)"
          props={{ ref: (e: any) => (this.container = e) }}
        >
          <div />
          <Instructions />
          {this.state.messages.map((m, i) => (
            <Block
              key={`message-${i}`}
              maxWidth="600px"
              margin="0 auto"
              width="100%"
            >
              <Row
                padding=" 0 .5rem"
                maxWidth="600px"
                margin={
                  i === 0 ||
                  this.state.messages[i - 1].username !==
                    this.state.messages[i].username
                    ? '.5rem auto .1rem'
                    : '.1rem auto'
                }
                alignItems={
                  m.username === this.state.user ? 'flex-end' : 'flex-start'
                }
                justifyContent={
                  m.username === this.state.user ? 'flex-end' : 'flex-start'
                }
                width="100%"
              >
                <Col
                  fontSize={14}
                  flex="none"
                  width="100%"
                  maxWidth="65%"
                  alignItems={
                    m.username === this.state.user ? 'flex-end' : 'flex-start'
                  }
                  justifyContent="flex-end"
                >
                  {(i === 0 ||
                    this.state.messages[i - 1].username !==
                      this.state.messages[i].username) && (
                    <Block
                      flex="none"
                      color={m.username === this.state.user ? '#0af' : '#999'}
                      fontSize="12px"
                      padding=".25rem"
                      fontWeight="bold"
                    >
                      {m.username}
                    </Block>
                  )}
                  <Block
                    flex="1"
                    background={
                      m.username === this.state.user ? '#0af' : '#E6ECF7'
                    }
                    backgroundImage={
                      m.username === this.state.user
                        ? 'radial-gradient(ellipse farthest-corner at top right,#007DF4 0%,#0af 100%)'
                        : 'radial-gradient(ellipse farthest-corner at top left,#F6FBFC 0%,#E6ECF7 100%)'
                    }
                    color={m.username === this.state.user ? '#fff' : '#16171A'}
                    borderRadius={16}
                    padding=".5rem 1rem"
                    className={m.username === this.state.user && 'from-me'}
                  >
                    <Linkify>{m.content}</Linkify>
                  </Block>
                </Col>
              </Row>
            </Block>
          ))}

          {!!this.state.warning && (
            <Block
              key="message-warning"
              padding=".5rem "
              maxWidth="600px"
              margin="0 auto"
              width="100%"
            >
              {this.state.warning}
            </Block>
          )}
        </Col>
        <Formik
          initialValues={{ text: '', username: '' }}
          onSubmit={this.handleSubmit}
          render={({
            handleChange,
            handleBlur,
            values,
            status,
            submitForm,
            resetForm,
            setFieldValue,
          }: any) => (
            <Block
              maxWidth="600px"
              width="100%"
              margin="0 auto"
              borderTop="1px solid #DFE7EF"
            >
              <Block component={Form}>
                <Row
                  alignItems="center"
                  justifyContent="space-around"
                  padding="0"
                >
                  {!status ? (
                    <Block
                      component={Textarea}
                      width="100%"
                      background="#fff"
                      border="1px solid #DFE7EF"
                      fontSize="16px"
                      flex="1"
                      color="#16171A"
                      marginLeft="1rem"
                      marginTop="1rem"
                      marginBottom="1rem"
                      padding=".5rem 1rem"
                      resize="none"
                      fontFamily={Theme.sans}
                      transition="border .3s ease-out"
                      borderRadius={16}
                      css={{
                        ':focus': {
                          outline: 0,
                          border: '1px solid #828c99',
                        },
                        ':hover': {
                          outline: 0,
                          border: '1px solid #828c99',
                        },
                        '::placeholder': {
                          color: '#9197a3',
                          fontSize: 14,
                        },
                      }}
                      props={{
                        type: 'text',
                        name: 'text',
                        placeholder: 'Send a message...',
                        onChange: handleChange,
                        onBlur: handleBlur,
                        onKeyDown: (e: any) => {
                          if (e.keyCode === 13 && e.shiftKey === false) {
                            submitForm();
                          }
                        },
                        autoFocus: true,

                        value:
                          values.text === '\n'
                            ? values.text.trim()
                            : values.text,
                      }}
                    />
                  ) : (
                    <Block
                      component="input"
                      width="100%"
                      background="#fff"
                      border="1px solid #DFE7EF"
                      fontSize="16px"
                      flex="1"
                      marginLeft="1rem"
                      padding=".5rem 1rem"
                      fontFamily={Theme.sans}
                      borderRadius={16}
                      css={{
                        ':focus': {
                          outline: 0,
                          border: '1px solid #7b16ff',
                        },
                      }}
                      props={{
                        type: 'text',
                        name: 'username',
                        placeholder: 'Give yourself a username...',
                        onChange: handleChange,

                        autoFocus: true,
                        onBlur: handleBlur,
                        value: values.username,
                      }}
                    />
                  )}
                  <Block
                    component="button"
                    props={{ type: 'submit' }}
                    background="transparent"
                    outline="none"
                    border="none"
                    cursor="pointer"
                    bottom="0"
                    padding="1rem"
                    right="0"
                    fontWeight="600"
                    color="#828c99"
                    transition="all .2s ease-out"
                    css={{
                      ':hover': {
                        color: '#16171A',
                      },
                    }}
                    fontSize="1rem"
                  >
                    <svg
                      fillRule="evenodd"
                      clipRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="1.414"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-labelledby="title"
                      viewBox="0 0 32 32"
                      preserveAspectRatio="xMidYMid meet"
                      id="send-fill"
                      style={{ fill: 'currentColor', height: 32, width: 32 }}
                    >
                      <path d="M16.044,15.012c-0.005,-0.104 -0.071,-0.205 -0.198,-0.232l-7.45,-1.579c-0.231,-0.049 -0.396,-0.253 -0.396,-0.489l0,-5.712c0,-0.73 0.698,-1.159 1.419,-0.908c4.295,1.497 12.081,5.408 15.616,8.025c0.34,0.252 0.515,0.573 0.52,0.895c-0.005,0.323 -0.18,0.644 -0.52,0.896c-3.535,2.617 -11.321,6.868 -15.616,8.365c-0.721,0.251 -1.419,-0.178 -1.419,-0.908l0,-6.052c0,-0.236 0.165,-0.44 0.396,-0.489l7.45,-1.579c0.127,-0.027 0.193,-0.129 0.198,-0.233Z" />
                    </svg>
                  </Block>
                </Row>
              </Block>
            </Block>
          )}
        />
      </Col>
    );
  }
}

export default App;
