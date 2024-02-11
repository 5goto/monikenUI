import get from '../../../assets/optionsRadio/get.png';
import post from '../../../assets/optionsRadio/post.png';
import put from '../../../assets/optionsRadio/put.png';
import patch from '../../../assets/optionsRadio/patch.png';
import deleteImg from '../../../assets/optionsRadio/delete.png';
import headImg from '../../../assets/optionsRadio/head.png';

export interface ShortCollectionInterface {
  id: string;
  name: string;
  endpoint: string;
}

export interface Route extends ShortCollectionInterface {
  method: string;
  status: string;
  body?: { [key: string]: string }[];
  headers?: { [key: string]: string }[];
  timeout?: number;
  description?: string;
}

export const routeMethod = [
  { value: 'GET', label: 'GET', image: get },
  { value: 'POST', label: 'POST', image: post },
  { value: 'PUT', label: 'PUT', image: put },
  { value: 'PATCH', label: 'PATCH', image: patch },
  { value: 'DELETE', label: 'DELETE', image: deleteImg },
  { value: 'HEAD', label: 'HEAD', image: headImg },
];
