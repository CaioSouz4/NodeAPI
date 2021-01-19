module.exports = app => {
    const controllerCities = require('../controllers/city')();

    app.route('/api/v1/cidades')
        .get(controllerCities.listCities)    
        .post(controllerCities.addCity);

    app.route('/api/v1/cidades/:id')
        .get(controllerCities.detailsCity)
        .delete(controllerCities.deleteCity) 
        .put(controllerCities.editCity);
}