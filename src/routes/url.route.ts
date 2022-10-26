import { Router } from 'express';
import UrlController from '@/controllers/urls.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePathDto } from '@/dtos/url.dto';

class UrlRoute implements Routes {
  public path = '/';
  public router = Router();
  public urlsController = new UrlController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreatePathDto, 'body', true), this.urlsController.createByUrl);
    this.router.get(`${this.path}:path`, this.urlsController.getUrlByPath);
  }
}

export default UrlRoute;
