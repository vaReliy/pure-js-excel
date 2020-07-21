console.log('==> module.js!'); // fixme

async function start() {
  return Promise.resolve('=> async working!');
}

start().then(console.log);
