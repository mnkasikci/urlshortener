import { Url } from '@/interfaces/urls.interface';
import { HttpException } from '@exceptions/HttpException';
import urlModel from '@models/urls.model';
import { isEmpty } from '@utils/util';

class UrlService {
  public urls = urlModel;

  public async createPathByUrl(sentUrl: string, path: string | undefined): Promise<Url> {
    if (isEmpty(sentUrl)) throw new HttpException(400, 'url is empty');

    const findUrl: Url = this.urls.find((url: Url) => url.url === sentUrl);
    if (findUrl) return findUrl;
    if (path === undefined) {
      path = this.generatePath();
    }
    while (this.urls.find((url: Url) => url.path === path)) {
      path = this.generatePath();
    }
    const newUrl: Url = { path: path, url: sentUrl };
    this.urls = [...this.urls, newUrl];
    return newUrl;
  }
  public async resolvePath(path: string): Promise<string> {
    const findUrl: Url = this.urls.find((url: Url) => url.path === path);
    if (!findUrl) throw new HttpException(409, "Path doesn't exist");
    return findUrl.url;
  }
  generatePath(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export default UrlService;
