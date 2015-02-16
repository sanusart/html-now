describe('Unit: Filters', function () {

    var $filter;

    beforeEach(function () {
        module('htmlNow');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should use noSpace filter to deal with spaces', function () {
        var string = 'hello world';
        var result;
        result = $filter('noSpace')(string);
        expect(result).toEqual('hello-world');
    });

    it('should use setVersion filter to set versions', function () {
        var val = {
            url: '//cdn.jsdelivr.net/jquery/###/jquery.js',
            version: '1.11.1'
        };
        var result;
        result = $filter('setVersion')(val.url, val.version)
        expect(result).toEqual('//cdn.jsdelivr.net/jquery/1.11.1/jquery.js');
    });

});