import { IEOSNetwork } from '../typings';
import { JsonRpc } from 'eosjs';
import { EOS_NETWORK_LS_KEY } from './constants';

const createNetwork = (nodeEndpoint: string, chainId: string): IEOSNetwork => {
  const matches = /^(https?):\/\/(.+):(\d+)\D*$/.exec(nodeEndpoint);
  if (!matches) {
    throw new Error(
      `Could not parse EOS HTTP endpoint. Needs protocol and port: "${nodeEndpoint}"`,
    );
  }

  const [, httpProtocol, host, port] = matches;

  return {
    chainId,
    protocol: httpProtocol,
    host,
    port: Number.parseInt(port, 10),
    nodeEndpoint,
  };
};

const KylinNetwork: IEOSNetwork = createNetwork(
  `https://api-kylin.eoslaomao.com:443`,
  `5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191`,
);

const MainNetwork: IEOSNetwork = createNetwork(
  // `https://eos.greymass.com:443`,
  `https://api.eossweden.org:443`,
  `aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906`,
);

function getNetworkName() {
  return localStorage.getItem(EOS_NETWORK_LS_KEY);
}

function getNetwork() {
  const eosNetwork = getNetworkName()

  switch (eosNetwork) {
    case `kylin`:
      return KylinNetwork;
    default:
      return MainNetwork;
  }
}

function getDspEndpointForNetwork() {
  const eosNetwork = getNetworkName()

  switch (eosNetwork) {
    default:
      return `https://dsp.airdropsdac.com`;
  }
}

const network = getNetwork();

const rpc = new JsonRpc(network.nodeEndpoint);
const dspRpc = new JsonRpc(getDspEndpointForNetwork());

export { getNetwork, getNetworkName, rpc, dspRpc };
