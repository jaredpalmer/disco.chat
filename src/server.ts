require('dotenv').config({ silent: process.env.NODE_ENV !== 'production' });
import * as express from 'express';
import * as morgan from 'morgan';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as throng from 'throng';
import { setupSockets } from './setupSockets';
import { Police } from './Police';
const lanes = require('lanes')();

const port = parseInt(process.env.PORT as any, 10) || 5000;
const concurrency = parseInt(process.env.WEB_CONCURRENCY as any, 10) || 1;

function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err.stack);
  res
    .status(500)
    .type('text')
    .send('Internal Server Error');
  next(err);
}

function createServer(): any {
  const app = express();

  app.disable('x-powered-by');
  app.use(errorHandler);
  app.use((req, res, next) => {
    if (!process.env.LOCAL && req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.hostname + req.url}`);
    } else {
      next(); // Continue to other routes if we're not redirecting
    }
  });

  if (process.env.NODE_ENV !== 'test') {
    app.use(
      morgan(
        process.env.NODE_ENV === 'production'
          ? // Modified version of the Heroku router's log format
            // https://devcenter.heroku.com/articles/http-routing#heroku-router-log-format
            'method=:method path=":url" host=:req[host] request_id=:req[x-request-id] cf_ray=:req[cf-ray]  status=:status bytes=:res[content-length]'
          : 'dev'
      )
    );
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static('public'));
  app.get('/about', (_req, res, next) => {
    fs.readFile(
      path.join(__dirname, '../public/about.html'),
      'utf8',
      (err, data) => {
        if (err) {
          next(err);
        }
        res.send(data);
      }
    );
  });

  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-type,Accept,X-Access-Token,X-Key'
    );
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  return app as any;
}

function startServer(id: number) {
  Police.loadJail('jail.txt');
  const server = http.createServer(createServer());
  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  (server as any).setTimeout(25000, (socket: any) => {
    const message = `Timeout of 25 seconds exceeded`;

    socket.end(
      [
        'HTTP/1.1 503 Service Unavailable',
        'Date: ' + new Date().toISOString(),
        'Content-Length: ' + Buffer.byteLength(message),
        'Content-Type: text/plain',
        'Connection: close',
        '',
        message,
      ].join('\r\n')
    );
  });

  setupSockets(server);

  lanes.join(server, () => {
    console.log('Server #%s listening on port %s, Ctrl+C to stop', id, port);
  });
}

function master() {
  // listen() in the master process (this is the router)
  lanes.listen(port, () => {
    console.log(`Master listening on ${port}`);
  });
}

(throng as any)({
  workers: concurrency,
  grace: 25000,
  master: master,
  start: startServer,
  lifetime: Infinity,
});
