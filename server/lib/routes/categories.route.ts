import {/*Request, Response,*/ Application} from 'express';
import CategoryController from '../controllers/categories.controller';

export default class CategoryRouter {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    app.route('/categories')
      .get(this.categoryController.getCategories)
      .post(this.categoryController.addCategory)

    app.route('/categories/:categoryid')
      .get(this.categoryController.getCategoryByID)
      .put(this.categoryController.updateCategory)
      .delete(this.categoryController.removeCategory)
  }
}