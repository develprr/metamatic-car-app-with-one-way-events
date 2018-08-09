export class CarModelService {

  static filterByModel = (models, keyword) => Object.values(models).filter(
      (carModel) => carModel.model.toLowerCase().indexOf(keyword.toLowerCase()) > -1);

}
