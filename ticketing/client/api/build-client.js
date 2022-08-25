import axios from 'axios';

export default function buildClient({ req }) {
  if (typeof window === 'undefined') {
    // we are on server
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // on the browser
    return axios.create({
      baseURL: '/',
    });
  }
}
