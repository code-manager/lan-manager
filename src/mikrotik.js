import MikroNode from 'mikronode';
import uuid from 'uuid';
import bytes from 'bytes';

function throwError(message) { throw new Error(message); }

const ROUTER_IP = '192.168.1.1';
const ROUTER_USERNAME = process.env.ROUTER_USERNAME || throwError('Please set ROUTER_USERNAME Enviornmant Variable');
const ROUTER_PASSWORD = process.env.ROUTER_PASSWORD || throwError('Please set ROUTER_PASSWORD Enviornmant Variable');
let mikrotikConnection;

export async function getConnection() {
  if(mikrotikConnection) return mikrotikConnection;
  const device = new MikroNode(ROUTER_IP);
  const [ login ] = await device.connect();
  mikrotikConnection = await login(ROUTER_USERNAME, ROUTER_PASSWORD);
  mikrotikConnection.closeOnDone(true);
  mikrotikConnection.on('close', ()=> { mikrotikConnection = null; });
  return mikrotikConnection;
}

export async function getChannel(name) {
  const connection = await getConnection();
  if(!name) name = uuid.v4();
  const channel = connection.openChannel(name);  
  channel.closeOnDone(true);
  return channel;
}

export async function executeCommandOnRouter(command, data) {
  const channel = await getChannel();  
  return new Promise((resolve, reject)=> {
    channel.write(command, data);
    channel.on('done', ({ data })=> {
      resolve(data.map( item=> MikroNode.resultsToObj(item)));
    });
  });
}