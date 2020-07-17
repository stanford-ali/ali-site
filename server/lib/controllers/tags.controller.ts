import Tag from '../models/tags.model';
import {Request, Response, NextFunction} from 'express';

export default class TagController {
  public getTags(req: Request, res: Response, next: NextFunction) {
    Tag.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public getTagByID(req: Request, res: Response, next: NextFunction) {
    Tag.findById(req.params.tagid, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public addTag(req: Request, res: Response, next: NextFunction) {
    Tag.insertMany(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public updateTag(req: Request, res: Response, next: NextFunction) {
    Tag.findOneAndUpdate({_id: req.params.tagid}, req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public removeTag(req: Request, res: Response, next: NextFunction) {
    Tag.remove({_id: req.params.tagid}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({message: 'Successfully removed faculty member.'});
    })
  }
}