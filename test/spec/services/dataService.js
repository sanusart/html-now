describe('Unit: dataService', function () {

    beforeEach(module('htmlNow'));

    var dataService, $httpBackend;

    beforeEach(inject(function (_dataService_, $httpBackend) {
        dataService = _dataService_;
        httpBackend = $httpBackend;
    }));

    it('should have getLibs() function', function () {
        expect(angular.isFunction(dataService.getLibs)).toBe(true);
    });

    it('should be able to match libs versions', function () {

        var returnGet = [{
            "name": "jQuery v1",
            "url": "//cdn.jsdelivr.net/jquery/###/jquery.js",
            "version": "1.11.2",
            "type": "js"
        },
            {
                "name": "jQuery-migrate",
                "url": "//cdn.jsdelivr.net/jquery.migrate/###/jquery-migrate.js",
                "version": "1.2.1",
                "type": "js"
            },
            {
                "name": "jQuery v2",
                "url": "//cdn.jsdelivr.net/jquery/###/jquery.js",
                "version": "2.1.3",
                "type": "js"
            }];

        httpBackend.expectGET('./data/libs.json').respond(returnGet);
        dataService.getLibs(function (result) {
            expect([
                result.data[0].version,
                result.data[1].version,
                result.data[2].version
            ]).toEqual([
                '1.11.2',
                '1.2.1',
                '2.1.3']);
        });

        httpBackend.flush();

    });

});