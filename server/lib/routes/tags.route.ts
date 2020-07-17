import {/*Request, Response,*/ Application} from 'express';
import TagController from '../controllers/tags.controller';

export default class TagRouter {
  public tagController: TagController = new TagController();
  
  public routes(app: Application): void {
    app.route('/tags')
      .get(this.tagController.getTags)
      .post(this.tagController.addTag)

    app.route('/tag/:tagid')
      .get(this.tagController.getTagByID)
      .put(this.tagController.updateTag)
      .delete(this.tagController.removeTag)
  }
}