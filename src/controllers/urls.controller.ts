import { NextFunction, Request, Response } from 'express';
import UrlService from '@/services/urls.service';
import { CreatePathDto } from '@/dtos/url.dto';
import { Url } from '@/interfaces/urls.interface';

class UrlController {
  private urlService = new UrlService();

  public createByUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const urlData: CreatePathDto = req.body;

      const createUrlData: Url = await this.urlService.createPathByUrl(urlData.url, urlData.customPath);

      res.status(200).json({ data: createUrlData, message: 'pathCreated' });
    } catch (error) {
      next(error);
    }
  };

  public getUrlByPath = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const path: string = req.params.path as string;
      const url: string = await this.urlService.resolvePath(path);

      res.status(202).redirect(url);
    } catch (error) {
      next(error);
    }
  };
}

export default UrlController;
