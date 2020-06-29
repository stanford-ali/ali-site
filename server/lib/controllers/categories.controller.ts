import Category from '../models/categories.model';
import {Request, Response, NextFunction} from 'express';

export default class CategoryController {
  public getCategories(req: Request, res: Response, next: NextFunction) {
    Category.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public getCategoryByID(req: Request, res: Response, next: NextFunction) {
    Category.findById(req.params.categoryid, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public addCategory(req: Request, res: Response, next: NextFunction) {
    Category.insertMany(req.body, (error, data) => {
      if (error) {
        console.log(JSON.parse(JSON.stringify(req.body)));
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public updateCategory(req: Request, res: Response, next: NextFunction) {
    Category.findOneAndUpdate({_id: req.params.categoryid}, req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public removeCategory(req: Request, res: Response, next: NextFunction) {
    Category.remove({_id: req.params.categoryid}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({message: 'Successfully removed faculty member.'});
    })
  }
}