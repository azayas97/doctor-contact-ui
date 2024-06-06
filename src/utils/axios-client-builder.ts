import axios, { AxiosPromise } from 'axios';

type AxiosMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IAxiosClientBuilder<T> {
  method(httpMethod: AxiosMethod): AxiosClientBuilder<T>
  baseUrl(base: string): AxiosClientBuilder<T>
  payload(data: any): AxiosClientBuilder<T>
  path(uriPath: string): AxiosClientBuilder<T>
  build(): AxiosPromise<T>
}

class AxiosClientBuilder<T> implements IAxiosClientBuilder<T>{
  private httpMethod: AxiosMethod = 'GET';
  private base: string = '';
  private data: any;
  private uriPath: string | undefined;
  private creds: boolean = false;

  public method(httpMethod: AxiosMethod): AxiosClientBuilder<T> {
    this.httpMethod = httpMethod;
    return this;
  }

  public baseUrl(base: string): AxiosClientBuilder<T> {
    this.base = base;
    return this;
  }

  public payload(data: any): AxiosClientBuilder<T> {
    this.data = data;
    return this;
  }

  public path(uriPath: string): AxiosClientBuilder<T> {
    this.uriPath = uriPath;
    return this;
  }

  public useCredentials(): AxiosClientBuilder<T> {
    this.creds = true;
    return this;
  }

  public build(): AxiosPromise<T> {
    return axios({
      url: `${this.base}${this.uriPath}`,
      method: this.httpMethod,
      data: this.data,
      withCredentials: this.creds
    })
  }
}

export default AxiosClientBuilder;
