describe('Unit: MainController', function () {
    beforeEach(module('htmlNow'));

    var ctrl, scope;

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        ctrl = $controller('Main', {
            $scope: scope
        });
    }));

    it('should create $scope.welcome when calling welcome', function () {
        expect(scope.welcome).toBe('Hello, Hello');
    });

});